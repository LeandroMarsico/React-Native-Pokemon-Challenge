import { View } from 'react-native';

import { Text } from '@/components/text/text';
import { Strings } from '@/constants/strings';
import { styles } from './emptyState.styles';

export type EmptyStateProps = {
  message?: string;
};

/** Shown when a successful request resolves with zero items. */
export function EmptyState({
  message = Strings.common.empty,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text color="textSecondary" style={styles.message}>
        {message}
      </Text>
    </View>
  );
}
