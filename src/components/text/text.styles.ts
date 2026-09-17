import { StyleSheet } from 'react-native';

/** One entry per `FontSize` and one per `FontWeight` — the component picks which to combine. */
export const styles = StyleSheet.create({
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  md: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 20,
    lineHeight: 26,
  },
  xl: {
    fontSize: 28,
    lineHeight: 34,
  },
  xxl: {
    fontSize: 32,
    lineHeight: 40,
  },
  regular: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});
