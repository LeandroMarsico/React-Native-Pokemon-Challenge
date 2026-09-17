import { Image } from 'expo-image';
import { View } from 'react-native';

import { Text } from '@/components/text/text';
import { TypeBadge } from '@/components/typeBadge/typeBadge';
import {
  DEFAULT_TYPE_COLOR,
  TYPE_COLORS,
  TYPE_TINT_ALPHA,
} from '@/constants/typeColors';
import { Strings } from '@/constants/strings';
import { FontSize } from '@/constants/typography';
import type { PokemonDetail } from '@/types/pokemonDetail';
import { capitalize } from '@/utils/text';
import { styles } from './pokemonSummary.styles';

const ID_DIGITS = 3;

export type PokemonSummaryProps = {
  pokemon: PokemonDetail;
};

/** Top section of the detail screen: artwork, id and type badges, tinted by the primary type. */
export function PokemonSummary({ pokemon }: PokemonSummaryProps) {
  const name = capitalize(pokemon.name);
  const accentColor = TYPE_COLORS[pokemon.types[0]] ?? DEFAULT_TYPE_COLOR;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: `${accentColor}${TYPE_TINT_ALPHA}` },
      ]}
    >
      <Image
        source={{ uri: pokemon.imageUrl }}
        style={styles.image}
        contentFit="contain"
        cachePolicy="disk"
        accessibilityIgnoresInvertColors
        accessibilityLabel={Strings.pokemonDetail.imageA11yLabel(name)}
      />
      <Text size={FontSize.SM} color="textSecondary">
        #{String(pokemon.id).padStart(ID_DIGITS, '0')}
      </Text>
      <View style={styles.typeRow}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </View>
    </View>
  );
}
