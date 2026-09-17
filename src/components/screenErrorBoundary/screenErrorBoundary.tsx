import { Image } from 'expo-image';
import type { ErrorBoundaryProps } from 'expo-router';
import { View } from 'react-native';

import { ErrorState } from '@/components/errorState/errorState';
import { Screen } from '@/components/screen/screen';
import { toAppError } from '@/types/errors';

import { styles } from './screenErrorBoundary.styles';

/**
 * Catch-all safety net for uncaught render errors, wired into `_layout.tsx` via
 * `unstable_settings.screenErrorBoundary` so Expo Router wraps *every* screen with it.
 *
 * This is deliberately separate from the `AppError` handling in `usePokemonList`/
 * `usePokemonDetail`: those cover *expected* failures (network, 404, storage) with
 * contextual retry, caught explicitly in a try/catch and turned into UI state. This
 * boundary is for *unexpected* bugs thrown during render that nothing already catches
 * — without it, that kind of error would crash the whole app instead of showing a
 * friendly, recoverable screen.
 *
 * Note: React error boundaries only catch render-time errors, not ones thrown from
 * event handlers, effects, or async code — those still need their own try/catch.
 */
export function ScreenErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <Screen>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/images/sleeping-pikachu.png')}
          style={styles.image}
          contentFit="contain"
          accessibilityIgnoresInvertColors
          // Decorative only — the message below already conveys the error to screen readers.
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
      </View>
      <ErrorState error={toAppError(error)} onRetry={retry} />
    </Screen>
  );
}
