type QueryKeyFilters = Record<string, unknown>;

export const queryKeys = {
  all: ["app"] as const,
  lists: () => [...queryKeys.all, "list"] as const,
  list: (resource: string, filters?: QueryKeyFilters) =>
    [...queryKeys.lists(), resource, filters ?? {}] as const,
  details: () => [...queryKeys.all, "detail"] as const,
  detail: (resource: string, id: string | number) =>
    [...queryKeys.details(), resource, id] as const,
  custom: (segments: readonly unknown[]) =>
    [...queryKeys.all, ...segments] as const,
};
