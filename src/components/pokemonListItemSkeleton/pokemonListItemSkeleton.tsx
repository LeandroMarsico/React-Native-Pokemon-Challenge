import { View } from 'react-native';

import { Skeleton } from '@/components/skeleton/skeleton';
import { styles as rowStyles } from '@/components/pokemonListItem/pokemonListItem.styles';
import { styles } from './pokemonListItemSkeleton.styles';

const ID_WIDTH = 40;
const NAME_WIDTH = 120;

/** Placeholder for one `PokemonListItem` row, shown while the first page of the list loads. */
export function PokemonListItemSkeleton() {
  return (
    <View style={rowStyles.row}>
      <Skeleton
        width={rowStyles.image.width}
        height={rowStyles.image.height}
        borderRadius={rowStyles.image.width}
      />
      <View style={[rowStyles.textContainer, styles.textContainer]}>
        <Skeleton width={ID_WIDTH} height={14} />
        <Skeleton width={NAME_WIDTH} height={20} />
      </View>
    </View>
  );
}
