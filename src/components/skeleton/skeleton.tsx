import { useEffect, useRef } from 'react';
import { Animated, type DimensionValue } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { styles } from './skeleton.styles';

const PULSE_DURATION_MS = 700;
const MIN_OPACITY = 0.35;
const MAX_OPACITY = 0.85;

export type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
};

/** Pulsing placeholder box, used to build skeleton screens while real content loads. */
export function Skeleton({
  width = '100%',
  height = 16,
  borderRadius = 8,
}: SkeletonProps) {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(MIN_OPACITY)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: MAX_OPACITY,
          duration: PULSE_DURATION_MS,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: MIN_OPACITY,
          duration: PULSE_DURATION_MS,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.backgroundSelected,
          opacity,
        },
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
