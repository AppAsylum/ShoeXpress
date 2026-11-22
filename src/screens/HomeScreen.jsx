import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import {useStore} from '../store/store';
import {BRANDS} from '../Constants/ShoeData';
import ShoeCard from '../components/ShoeCard';
import ShoeImage from '../components/ui/ShoeImage';
import PressableScale from '../components/ui/PressableScale';
import {IconButton} from '../components/ui/Button';
import {Wordmark} from '../components/ui/Logo';
import EmptyState from '../components/ui/EmptyState';
import {addShoeToCart, toggleFavourite} from '../utils/cartActions';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING, TYPE} from '../Constants/theme';

const GUTTER = SPACING.lg;
const GAP = SPACING.sm;
const FEATURED_ID = '1'; // Air Jordan 1

const HomeScreen = ({navigation}) => {
  const ShoeList = useStore(s => s.ShoeList);
  const cartCount = useStore(s => s.CartList.reduce((n, i) => n + i.prices.reduce((m, p) => m + p.quantity, 0), 0));
  const tabBarHeight = useBottomTabBarHeight();
  const {width} = useWindowDimensions();
  const columns = width >= 700 ? 3 : 2;
  const cardWidth = (width - GUTTER * 2 - GAP * (columns - 1)) / columns;

  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All');
  const listRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ShoeList.filter(
      s =>
        (brand === 'All' || s.name === brand) &&
        (!q || s.model.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)),
    );
  }, [ShoeList, brand, query]);

  const featured = ShoeList.find(s => s.id === FEATURED_ID);
  const showFeatured = brand === 'All' && !query.trim() && featured;

  const openDetails = useCallback(
    shoe => navigation.push('Details', {index: shoe.index, id: shoe.id, type: shoe.type}),
    [navigation],
  );

  const selectBrand = b => {
    setBrand(b);
    listRef.current?.scrollToOffset({offset: 0, animated: true});
  };

  const header = (
    <View>
      <View style={styles.topBar}>
        <Wordmark size={20} />
        <View style={styles.topActions}>
          <IconButton icon="information-circle-outline" onPress={() => navigation.navigate('Credits')} label="About and photo credits" />
          <View>
            <IconButton icon="bag-handle-outline" onPress={() => navigation.navigate('Cart')} label="Open cart" />
            {cartCount > 0 && (
              <View style={styles.badge} pointerEvents="none">
                <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <Text style={[TYPE.display, styles.headline]}>
        Find your{'\n'}<Text style={{color: COLORS.accent}}>perfect pair</Text>
      </Text>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={query ? COLORS.accent : COLORS.textFaint} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search shoes or brands"
          placeholderTextColor={COLORS.textFaint}
          selectionColor={COLORS.accent}
          style={styles.searchInput}
          returnKeyType="search"
          autoCorrect={false}
        />
        {query ? (
          <Pressable onPress={() => setQuery('')} hitSlop={10} accessibilityLabel="Clear search">
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={styles.chipsScroll}>
        {BRANDS.map(b => {
          const active = b === brand;
          return (
            <PressableScale
              key={b}
              onPress={() => selectBrand(b)}
              scaleTo={0.94}
              style={[styles.chip, active && styles.chipActive]}
              accessibilityState={{selected: active}}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{b}</Text>
            </PressableScale>
          );
        })}
      </ScrollView>

      {showFeatured ? (
        <PressableScale onPress={() => openDetails(featured)} scaleTo={0.98} style={styles.featured}>
          <ShoeImage source={featured.imagelink_square} style={StyleSheet.absoluteFill} />
          <LinearGradient
            colors={['rgba(11,11,13,0)', 'rgba(11,11,13,0.9)']}
            start={{x: 0.3, y: 0}}
            end={{x: 0.3, y: 1}}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.featuredTag}>
            <Text style={styles.featuredTagText}>FEATURED DROP</Text>
          </View>
          <View style={styles.featuredInfo}>
            <View style={{flex: 1}}>
              <Text style={styles.featuredBrand}>{featured.name}</Text>
              <Text style={styles.featuredModel}>{featured.model}</Text>
            </View>
            <View style={styles.featuredCta}>
              <Text style={styles.featuredPrice}>${featured.prices[0].price}</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.onAccent} />
            </View>
          </View>
        </PressableScale>
      ) : null}

      <View style={styles.sectionRow}>
        <Text style={TYPE.subheading}>{query.trim() ? 'Results' : brand === 'All' ? 'All shoes' : brand}</Text>
        <Text style={TYPE.label}>{results.length} {results.length === 1 ? 'item' : 'items'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar style="light" />
      <FlatList
        ref={listRef}
        key={columns}
        data={results}
        numColumns={columns}
        keyExtractor={s => s.id}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="No shoes found"
            subtitle={`Nothing matches “${query.trim()}”. Try another name or brand.`}
            actionTitle="Clear search"
            onAction={() => {
              setQuery('');
              setBrand('All');
            }}
          />
        }
        columnWrapperStyle={{gap: GAP}}
        contentContainerStyle={{paddingHorizontal: GUTTER, paddingBottom: tabBarHeight + SPACING.xl, gap: GAP}}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ShoeCard
            shoe={item}
            width={cardWidth}
            onPress={() => openDetails(item)}
            onAdd={() => addShoeToCart(item)}
            onToggleFavourite={() => toggleFavourite(item)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
  topBar: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: SPACING.xs},
  topActions: {flexDirection: 'row', gap: SPACING.xs},
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.bg,
  },
  badgeText: {fontFamily: FONTFAMILY.bold, fontSize: 10, color: COLORS.onAccent},
  headline: {marginTop: SPACING.xl},
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    height: 52,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {flex: 1, height: '100%', color: COLORS.text, fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.md},
  chipsScroll: {marginHorizontal: -GUTTER, marginTop: SPACING.md},
  chips: {paddingHorizontal: GUTTER, gap: SPACING.xs},
  chip: {
    paddingHorizontal: SPACING.md,
    height: 38,
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {backgroundColor: COLORS.accent, borderColor: COLORS.accent},
  chipText: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.sm, color: COLORS.textMuted},
  chipTextActive: {color: COLORS.onAccent, fontFamily: FONTFAMILY.semibold},
  featured: {
    height: 210,
    marginTop: SPACING.lg,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.scrimStrong,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  featuredTagText: {fontFamily: FONTFAMILY.bold, fontSize: 10, color: COLORS.accent, letterSpacing: 1.2},
  featuredInfo: {flexDirection: 'row', alignItems: 'flex-end', gap: SPACING.sm},
  featuredBrand: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.xs, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.8},
  featuredModel: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.xl, color: COLORS.text},
  featuredCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    height: 40,
  },
  featuredPrice: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.md, color: COLORS.onAccent},
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxs,
  },
});
