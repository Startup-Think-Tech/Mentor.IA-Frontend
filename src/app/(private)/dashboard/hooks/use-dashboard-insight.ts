"use client";

import { useEffect, useState } from "react";

import { insightService } from "@/app/(private)/dashboard/services/insight.service";
import type {
  DashboardInsight,
  InsightGeneration,
} from "@/app/(private)/dashboard/types/insight.types";
import { ApiError } from "@/services/api/client";

type InsightState = {
  insight: DashboardInsight | null;
  status: "idle" | "loading" | "generating" | "waiting" | "failed";
};

const initialState: InsightState = { insight: null, status: "idle" };
const POLL_INTERVAL_MS = 3_000;
const MAX_POLL_ATTEMPTS = 20;
const INSIGHT_CHECK_INTERVAL_MS = 10_000;
let insightGenerationRequest: Promise<InsightGeneration> | null = null;

function storageKey(kind: "job" | "key" | "waiting") {
  return `dashboard-insight:${kind}`;
}

function getOrCreateIdempotencyKey() {
  const stored = window.sessionStorage.getItem(storageKey("key"));
  if (stored) return stored;

  const key = crypto.randomUUID();
  window.sessionStorage.setItem(storageKey("key"), key);
  return key;
}

function clearStoredJob() {
  window.sessionStorage.removeItem(storageKey("job"));
  window.sessionStorage.removeItem(storageKey("key"));
  window.sessionStorage.removeItem(storageKey("waiting"));
}

function requestInsightGeneration(idempotencyKey: string) {
  if (!insightGenerationRequest) {
    insightGenerationRequest = insightService.generate(idempotencyKey).finally(() => {
      insightGenerationRequest = null;
    });
  }

  return insightGenerationRequest;
}

export function useDashboardInsight(enabled: boolean) {
  const [state, setState] = useState<InsightState>(initialState);

  useEffect(() => {
    if (!enabled) return;

    let active = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function setIfActive(nextState: InsightState) {
      if (active) setState(nextState);
    }

    async function finishWithInsight(insightId: string) {
      const insight = await insightService.getById(insightId);
      clearStoredJob();
      setIfActive({ insight, status: "idle" });
    }

    async function pollJob(jobId: string, attempt = 0): Promise<void> {
      try {
        const job = await insightService.getJob(jobId);
        if (!active) return;

        if (job.status === "concluido" && job.insight_id) {
          await finishWithInsight(job.insight_id);
          return;
        }

        if (job.status === "falhou" || attempt >= MAX_POLL_ATTEMPTS) {
          clearStoredJob();
          setIfActive({ insight: null, status: "failed" });
          return;
        }

        timer = setTimeout(() => void pollJob(jobId, attempt + 1), POLL_INTERVAL_MS);
      } catch {
        if (active) setState({ insight: null, status: "failed" });
      }
    }

    async function waitForExistingInsight() {
      try {
        const insights = await insightService.getAll();
        if (!active) return;

        if (insights[0]) {
          clearStoredJob();
          setIfActive({ insight: insights[0], status: "idle" });
          return;
        }

        timer = setTimeout(() => void waitForExistingInsight(), INSIGHT_CHECK_INTERVAL_MS);
      } catch {
        setIfActive({ insight: null, status: "failed" });
      }
    }

    async function loadInsight() {
      setIfActive({ insight: null, status: "loading" });

      try {
        const insights = await insightService.getAll();
        if (!active) return;

        if (insights[0]) {
          clearStoredJob();
          setIfActive({ insight: insights[0], status: "idle" });
          return;
        }

        setIfActive({ insight: null, status: "generating" });
        const currentJobId = window.sessionStorage.getItem(storageKey("job"));
        if (currentJobId) {
          await pollJob(currentJobId);
          return;
        }

        if (window.sessionStorage.getItem(storageKey("waiting"))) {
          setIfActive({ insight: null, status: "waiting" });
          await waitForExistingInsight();
          return;
        }

        const generation = await requestInsightGeneration(getOrCreateIdempotencyKey());
        window.sessionStorage.setItem(storageKey("job"), generation.job_id);
        await pollJob(generation.job_id);
      } catch (error) {
        if (error instanceof ApiError && error.status === 429) {
          window.sessionStorage.setItem(storageKey("waiting"), "true");
          setIfActive({ insight: null, status: "waiting" });
          await waitForExistingInsight();
          return;
        }

        setIfActive({ insight: null, status: "failed" });
      }
    }

    void loadInsight();

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [enabled]);

  return state;
}
