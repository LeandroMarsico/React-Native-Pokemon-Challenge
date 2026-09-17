import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import type { ThemeColor } from '@/constants/theme';
import { FontSize, FontWeight } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { styles } from './text.styles';

export interface TextProps extends RNTextProps {
  size?: FontSize;
  weight?: FontWeight;
  color?: ThemeColor;
}

/** App-wide text component: size and weight are explicit props instead of a fixed set of named variants. */
export function Text({
  size = FontSize.MD,
  weight = FontWeight.REGULAR,
  color,
  style,
  ...rest
}: TextProps) {
  const theme = useTheme();

  return (
    <RNText
      style={[
        styles[size],
        styles[weight],
        { color: theme[color ?? 'text'] },
        style,
      ]}
      {...rest}
    />
  );
}
