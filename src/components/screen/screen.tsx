import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { styles } from './screen.styles';

const DEFAULT_EDGES: Edge[] = ['top', 'bottom'];

export interface ScreenProps {
  children: ReactNode;
  header?: ReactNode;
  /** Which sides get safe-area padding. Defaults to both; pass `['bottom']` when the native stack header already covers the top. */
  edges?: Edge[];
}

/** Shared screen shell: safe area + optional header, so screens stop repeating that boilerplate. */
export function Screen({
  children,
  header,
  edges = DEFAULT_EDGES,
}: ScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={edges}>
      {header}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}
