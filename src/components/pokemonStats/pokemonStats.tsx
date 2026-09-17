import { View } from 'react-native';

import { StatBar } from '@/components/statBar/statBar';
import { Text } from '@/components/text/text';
import { Strings } from '@/constants/strings';
import { FontSize, FontWeight } from '@/constants/typography';
import type { PokemonStat } from '@/types/pokemonDetail';
import { styles } from './pokemonStats.styles';

export type PokemonStatsProps = {
  stats: readonly PokemonStat[];
};

/** "Estadísticas" section: title + one bar per base stat. */
export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <View style={styles.section}>
      <Text size={FontSize.LG} weight={FontWeight.SEMIBOLD}>
        {Strings.pokemonDetail.statsTitle}
      </Text>
      <View style={styles.list}>
        {stats.map((stat) => (
          <StatBar key={stat.name} stat={stat} />
        ))}
      </View>
    </View>
  );
}
