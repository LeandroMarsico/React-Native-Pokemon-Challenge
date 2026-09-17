import { View } from 'react-native';

import { Text } from '@/components/text/text';
import { Strings } from '@/constants/strings';
import { FontSize, FontWeight } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { capitalize } from '@/utils/text';
import { styles } from './pokemonAbilities.styles';

export type PokemonAbilitiesProps = {
  abilities: readonly string[];
};

/** "Habilidades" section: title + one chip per ability. */
export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <Text size={FontSize.LG} weight={FontWeight.SEMIBOLD}>
        {Strings.pokemonDetail.abilitiesTitle}
      </Text>
      <View style={styles.chipRow}>
        {abilities.map((ability) => (
          <View
            key={ability}
            style={[styles.chip, { backgroundColor: theme.backgroundElement }]}
          >
            <Text size={FontSize.SM}>{capitalize(ability)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
