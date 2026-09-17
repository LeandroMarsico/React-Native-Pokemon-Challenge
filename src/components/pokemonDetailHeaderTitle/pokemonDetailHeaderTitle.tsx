import { Text } from '@/components/text/text';
import { FontSize, FontWeight } from '@/constants/typography';
import { styles } from './pokemonDetailHeaderTitle.styles';

export type PokemonDetailHeaderTitleProps = {
  name: string;
};

/** Custom native-header title: the Pokémon name, sized bigger than the default header title style. */
export function PokemonDetailHeaderTitle({
  name,
}: PokemonDetailHeaderTitleProps) {
  return (
    <Text
      size={FontSize.XL}
      weight={FontWeight.BOLD}
      numberOfLines={1}
      style={styles.name}
    >
      {name}
    </Text>
  );
}
