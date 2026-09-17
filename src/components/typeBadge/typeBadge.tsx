import { View } from 'react-native';

import { Text } from '@/components/text/text';
import { DEFAULT_TYPE_COLOR, TYPE_COLORS } from '@/constants/typeColors';
import { FontWeight } from '@/constants/typography';
import { capitalize } from '@/utils/text';
import { styles } from './typeBadge.styles';

export type TypeBadgeProps = {
  type: string;
};

export function TypeBadge({ type }: TypeBadgeProps) {
  const color = TYPE_COLORS[type] ?? DEFAULT_TYPE_COLOR;

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text weight={FontWeight.BOLD} style={styles.label}>
        {capitalize(type)}
      </Text>
    </View>
  );
}
