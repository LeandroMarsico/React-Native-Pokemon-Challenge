import { View } from 'react-native';

import { Text } from '@/components/text/text';
import { FontSize, FontWeight } from '@/constants/typography';
import { styles } from './infoRow.styles';

export type InfoRowProps = {
  label: string;
  value: string;
};

/** A simple label/value pair — used for height, weight, base experience. */
export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.container}>
      <Text size={FontSize.SM} color="textSecondary">
        {label}
      </Text>
      <Text size={FontSize.SM} weight={FontWeight.BOLD}>
        {value}
      </Text>
    </View>
  );
}
