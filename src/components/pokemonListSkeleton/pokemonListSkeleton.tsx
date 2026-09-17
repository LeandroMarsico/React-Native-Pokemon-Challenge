import { View } from 'react-native';

import { PokemonListItemSkeleton } from '@/components/pokemonListItemSkeleton/pokemonListItemSkeleton';
import { styles } from './pokemonListSkeleton.styles';

const SKELETON_ROW_COUNT = 8;
const SKELETON_ROW_KEYS = Array.from(
  { length: SKELETON_ROW_COUNT },
  (_, index) => index,
);

/** Shown instead of `LoadingState` on the list screen's first load — mimics the real rows so content doesn't "pop in". */
export function PokemonListSkeleton() {
  return (
    <View
      style={styles.container}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {SKELETON_ROW_KEYS.map((key) => (
        <PokemonListItemSkeleton key={key} />
      ))}
    </View>
  );
}
