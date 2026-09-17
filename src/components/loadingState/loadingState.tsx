import { ActivityIndicator, View } from 'react-native';

import { Text } from '@/components/text/text';
import { Strings } from '@/constants/strings';
import { FontSize } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { styles } from './loadingState.styles';

export type LoadingStateProps = {
  label?: string;
};

/** Full-space loading indicator, shown while a screen's first request is in flight. */
export function LoadingState({
  label = Strings.common.loading,
}: LoadingStateProps) {
  const theme = useTheme();

  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
    >
      <ActivityIndicator size="large" color={theme.tint} />
      <Text size={FontSize.SM} color="textSecondary" style={styles.label}>
        {label}
      </Text>
    </View>
  );
}
