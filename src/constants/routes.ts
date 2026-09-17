/** Centralizes route paths so screens don't hardcode strings when calling `router.push`. */
export const Routes = {
  pokemonDetail: (id: number | string) => ({
    pathname: '/pokemon/[id]' as const,
    params: { id: String(id) },
  }),
};
