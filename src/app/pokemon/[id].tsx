import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { ErrorState } from '@/components/errorState/errorState';
import { LoadingState } from '@/components/loadingState/loadingState';
import { PokemonAbilities } from '@/components/pokemonAbilities/pokemonAbilities';
import { PokemonDetailHeaderTitle } from '@/components/pokemonDetailHeaderTitle/pokemonDetailHeaderTitle';
import { PokemonInfoCard } from '@/components/pokemonInfoCard/pokemonInfoCard';
import { PokemonStats } from '@/components/pokemonStats/pokemonStats';
import { PokemonSummary } from '@/components/pokemonSummary/pokemonSummary';
import { Screen } from '@/components/screen/screen';
import { Strings } from '@/constants/strings';
import { Spacing } from '@/constants/theme';
import { usePokemonDetail } from '@/services/hooks/usePokemonDetail';
import { capitalize } from '@/utils/text';

/** Detail screen: sprite, name, types, height/weight/base experience, abilities and base stats. */
export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, error, retry } = usePokemonDetail(id);

  if (error) {
    return <ErrorState error={error} onRetry={retry} />;
  }

  if (!data) {
    return <LoadingState label={Strings.pokemonDetail.loading} />;
  }

  const pokemon = data;
  const name = capitalize(pokemon.name);

  function renderHeaderTitle() {
    return <PokemonDetailHeaderTitle name={name} />;
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: renderHeaderTitle }} />
      <Screen edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.content}>
          <PokemonSummary pokemon={pokemon} />
          <PokemonInfoCard pokemon={pokemon} />
          <PokemonAbilities abilities={pokemon.abilities} />
          <PokemonStats stats={pokemon.stats} />
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
});
