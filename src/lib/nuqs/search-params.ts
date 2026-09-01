import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const sortOrders = ["asc", "desc"] as const;
export const viewModes = ["list", "grid", "table"] as const;

export const appSearchParsers = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("createdAt"),
  order: parseAsStringLiteral(sortOrders).withDefault("desc"),
  view: parseAsStringLiteral(viewModes).withDefault("list"),
  archived: parseAsBoolean.withDefault(false),
};

export const appSearchParamsCache = createSearchParamsCache(appSearchParsers);

export type AppSearchParams = ReturnType<typeof appSearchParamsCache.all>;
