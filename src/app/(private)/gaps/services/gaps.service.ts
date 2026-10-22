import { apiFetch } from "@/services/api/client";
import type { Gap } from "@/app/(private)/gaps/types/gap.types";

export const gapsService = {
  getCurrent: () => apiFetch<Gap[]>("/gaps"),
};
