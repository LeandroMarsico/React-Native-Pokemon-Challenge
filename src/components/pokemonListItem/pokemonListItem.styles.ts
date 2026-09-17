import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import type { useTheme } from '@/hooks/useTheme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.two,
    borderRadius: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
  },
  textContainer: {
    flex: 1,
  },
});

/** Row background depends on theme + press state, so it can't live in the static `StyleSheet.create` above. */
export function getRowStyle(
  theme: ReturnType<typeof useTheme>,
  pressed: boolean,
) {
  return [
    styles.row,
    { backgroundColor: pressed ? theme.backgroundSelected : theme.background },
  ];
}
