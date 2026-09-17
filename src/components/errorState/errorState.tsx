import { Pressable, View } from 'react-native';

import { Text } from '@/components/text/text';
import { Strings } from '@/constants/strings';
import { FontSize, FontWeight } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import type { AppError } from '@/types/errors';
import { styles } from './errorState.styles';

export type ErrorStateProps = {
  error: AppError;
  onRetry?: () => void;
};

const MESSAGES: Record<AppError['kind'], string> = {
  network: Strings.errors.network,
  'not-found': Strings.errors.notFound,
  storage: Strings.errors.storage,
  unknown: Strings.errors.unknown,
};

/** Friendly error screen, mapping {@link AppError} kinds to user-facing copy. */
export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text
        size={FontSize.XXL}
        weight={FontWeight.SEMIBOLD}
        color="danger"
        style={styles.title}
      >
        {Strings.errors.title}
      </Text>
      <Text color="textSecondary" style={styles.message}>
        {MESSAGES[error.kind]}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel={Strings.errors.retry}
          style={[styles.retryButton, { backgroundColor: theme.tint }]}
        >
          <Text weight={FontWeight.SEMIBOLD} style={styles.retryLabel}>
            {Strings.errors.retry}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
