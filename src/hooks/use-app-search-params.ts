"use client";

import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";

import { sortOrders, viewModes } from "@/lib/nuqs";

const appSearchParsers = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("createdAt"),
  order: parseAsStringLiteral(sortOrders).withDefault("desc"),
  view: parseAsStringLiteral(viewModes).withDefault("list"),
  archived: parseAsBoolean.withDefault(false),
};

export function useAppSearchParams() {
  const [params, setParams] = useQueryStates(appSearchParsers, {
    history: "push",
    shallow: false,
  });

  return {
    params,
    // Atualiza a busca e volta para a primeira pagina.
    setSearch: (search: string) => setParams({ search, page: 1 }),
    // Troca apenas a pagina atual
    setPage: (page: number) => setParams({ page }),
    // Altera itens por pagina e reinicia a paginacao.
    setPerPage: (perPage: number) => setParams({ perPage, page: 1 }),
    // Define o campo usado na ordenacao.
    setSort: (sort: string) => setParams({ sort, page: 1 }),
    // Alterna entre ordem crescente e decrescente.
    setOrder: (order: (typeof sortOrders)[number]) =>
      setParams({ order, page: 1 }), 
    setView: (view: (typeof viewModes)[number]) => setParams({ view }), // Troca o modo de visualizacao.
    setArchived: (archived: boolean) => setParams({ archived, page: 1 }), // Filtra registros arquivados ou ativos.
    resetFilters: () =>
      setParams({
        search: "",
        page: 1,
        perPage: 10,
        sort: "createdAt",
        order: "desc",
        view: "list",
        archived: false,
      }), // Restaura todos os filtros para os valores iniciais.
  };
}
