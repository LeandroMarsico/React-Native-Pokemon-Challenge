import { View } from 'react-native';

import { InfoRow } from '@/components/infoRow/infoRow';
import { Strings } from '@/constants/strings';
import { useTheme } from '@/hooks/useTheme';
import type { PokemonDetail } from '@/types/pokemonDetail';
import { styles } from './pokemonInfoCard.styles';

export type PokemonInfoCardProps = {
  pokemon: PokemonDetail;
};

/** Height / weight / base experience row, on the theme's "element" background. */
export function PokemonInfoCard({ pokemon }: PokemonInfoCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <InfoRow
        label={Strings.pokemonDetail.heightLabel}
        value={`${pokemon.heightM.toFixed(1)} m`}
      />
      <InfoRow
        label={Strings.pokemonDetail.weightLabel}
        value={`${pokemon.weightKg.toFixed(1)} kg`}
      />
      <InfoRow
        label={Strings.pokemonDetail.baseExperienceLabel}
        value={String(pokemon.baseExperience)}
      />
    </View>
  );
}
