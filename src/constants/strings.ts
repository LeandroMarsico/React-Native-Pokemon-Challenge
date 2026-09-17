/** Single source of truth for user-facing copy. Swap this file for an i18n lookup later without touching components. */
export const Strings = {
  common: {
    loading: 'Cargando…',
    empty: 'No hay nada para mostrar todavía.',
  },
  pokemonList: {
    title: 'Pokédex',
    loading: 'Cargando Pokémon…',
    empty: 'No encontramos Pokémon para mostrar.',
    viewDetailA11yLabel: (name: string) => `Ver detalle de ${name}`,
  },
  pokemonDetail: {
    loading: 'Cargando Pokémon…',
    heightLabel: 'Altura',
    weightLabel: 'Peso',
    baseExperienceLabel: 'Exp. base',
    abilitiesTitle: 'Habilidades',
    statsTitle: 'Estadísticas',
    imageA11yLabel: (name: string) => `Imagen de ${name}`,
  },
  errors: {
    title: '¡Ups!',
    retry: 'Reintentar',
    network: 'Sin conexión. Revisá tu internet e intentá de nuevo.',
    notFound: 'No encontramos lo que buscabas.',
    storage: 'No se pudo acceder a los datos guardados.',
    unknown: 'Algo salió mal. Intentá de nuevo.',
  },
} as const;
