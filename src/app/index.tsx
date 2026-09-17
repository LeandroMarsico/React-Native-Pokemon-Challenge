import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/emptyState/emptyState';
import { ErrorState } from '@/components/errorState/errorState';
import { ListSeparator } from '@/components/listSeparator/listSeparator';
import { PokemonListItem } from '@/components/pokemonListItem/pokemonListItem';
import { PokemonListSkeleton } from '@/components/pokemonListSkeleton/pokemonListSkeleton';
import { Text } from '@/components/text/text';
import { PokemonListStatus } from '@/constants/requestStatus';
import { Routes } from '@/constants/routes';
import { Strings } from '@/constants/strings';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { FontSize, FontWeight } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { usePokemonList } from '@/services/hooks/usePokemonList';
import { UnknownError } from '@/types/errors';
import type { Pokemon } from '@/types/pokemon';

function keyExtractor(item: Pokemon): string {
  return String(item.id);
}

/** Pokédex home: paginated list of Pokémon, navigating to the detail screen on selection. */
export default function PokemonListScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { items, status, error, hasMore, refresh, loadMore } = usePokemonList();

  const handleSelect = useCallback(
    (pokemon: Pokemon) => router.push(Routes.pokemonDetail(pokemon.id)),
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => (
      <PokemonListItem pokemon={item} onPress={handleSelect} />
    ),
    [handleSelect],
  );

  const hasNoItems = items.length === 0;
  const isLoading = status === PokemonListStatus.LOADING;

  const fallbackViews: Partial<Record<PokemonListStatus, ReactNode>> = {
    [PokemonListStatus.EMPTY]: (
      <EmptyState message={Strings.pokemonList.empty} />
    ),
    ...(hasNoItems && {
      [PokemonListStatus.ERROR]: (
        <ErrorState error={error ?? new UnknownError()} onRetry={refresh} />
      ),
    }),
  };
  const fallback = fallbackViews[status];
  if (fallback) return fallback;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text size={FontSize.XXL} weight={FontWeight.SEMIBOLD}>
          {Strings.pokemonList.title}
        </Text>
      </View>
      {isLoading ? (
        <PokemonListSkeleton />
      ) : (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={ListSeparator}
          refreshControl={
            <RefreshControl
              refreshing={status === PokemonListStatus.REFRESHING}
              onRefresh={refresh}
              tintColor={theme.tint}
            />
          }
          onEndReachedThreshold={0.4}
          onEndReached={hasMore ? loadMore : undefined}
          ListFooterComponent={
            status === PokemonListStatus.LOADING_MORE ? (
              <ActivityIndicator style={styles.footer} />
            ) : null
          }
          removeClippedSubviews
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  footer: {
    marginVertical: Spacing.three,
  },
});
