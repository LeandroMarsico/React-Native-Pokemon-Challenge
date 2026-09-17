import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import { Text } from '@/components/text/text';
import { FontSize, FontWeight } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import type { PokemonStat } from '@/types/pokemonDetail';
import { capitalize } from '@/utils/text';
import { styles } from './statBar.styles';

/** In-game base stats top out at 255 (e.g. Blissey's HP) — used as the bar's full scale. */
const MAX_STAT_VALUE = 255;
const FILL_ANIMATION_DURATION_MS = 800;

export type StatBarProps = {
  stat: PokemonStat;
};

export function StatBar({ stat }: StatBarProps) {
  const theme = useTheme();
  const ratio = Math.min(stat.value / MAX_STAT_VALUE, 1);
  const label = capitalize(stat.name);
  const fillRatio = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fillRatio, {
      toValue: ratio,
      duration: FILL_ANIMATION_DURATION_MS,
      useNativeDriver: false,
    }).start();
  }, [fillRatio, ratio]);

  const fillWidth = fillRatio.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.row}>
      <Text size={FontSize.SM} style={styles.label}>
        {label}
      </Text>
      <View
        style={[styles.track, { backgroundColor: theme.backgroundSelected }]}
        accessibilityRole="progressbar"
        accessibilityLabel={label}
        accessibilityValue={{ min: 0, max: MAX_STAT_VALUE, now: stat.value }}
      >
        <Animated.View
          style={[
            styles.fill,
            { width: fillWidth, backgroundColor: theme.tint },
          ]}
        />
      </View>
      <Text size={FontSize.SM} weight={FontWeight.BOLD} style={styles.value}>
        {stat.value}
      </Text>
    </View>
  );
}
