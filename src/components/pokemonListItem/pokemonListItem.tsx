import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/text/text';
import { Strings } from '@/constants/strings';
import { FontSize, FontWeight } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import type { Pokemon } from '@/types/pokemon';
import { capitalize } from '@/utils/text';
import { getRowStyle, styles } from './pokemonListItem.styles';

const ID_DIGITS = 3;

export type PokemonListItemProps = {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
};

/** Memoized: `usePokemonList` keeps existing item references stable across pages/refreshes, so this skips re-rendering rows that haven't changed while the list scrolls or grows. */
export const PokemonListItem = memo(function PokemonListItem({
  pokemon,
  onPress,
}: PokemonListItemProps) {
  const theme = useTheme();
  const name = capitalize(pokemon.name);

  function handlePress() {
    onPress(pokemon);
  }

  function renderRowStyle({ pressed }: { pressed: boolean }) {
    return getRowStyle(theme, pressed);
  }

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={Strings.pokemonList.viewDetailA11yLabel(name)}
      style={renderRowStyle}
    >
      <Image
        source={{ uri: pokemon.imageUrl }}
        style={styles.image}
        contentFit="contain"
        cachePolicy="disk"
        accessibilityIgnoresInvertColors
      />
      <View style={styles.textContainer}>
        <Text size={FontSize.SM} color="textSecondary">
          #{String(pokemon.id).padStart(ID_DIGITS, '0')}
        </Text>
        <Text size={FontSize.LG} weight={FontWeight.SEMIBOLD}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
});
