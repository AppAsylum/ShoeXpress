import React from 'react';
import {FlatList, Linking, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import Constants from 'expo-constants';
import ScreenHeader from '../components/ui/ScreenHeader';
import PressableScale from '../components/ui/PressableScale';
import ShoeImage from '../components/ui/ShoeImage';
import {LogoTile} from '../components/ui/Logo';
import CREDITS from '../Constants/credits';
import ShoeData from '../Constants/ShoeData';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING, TYPE} from '../Constants/theme';

// Thumbnails for the credits list, matched by photo key.
const welcome = {
  'welcome-1': require('../assets/images/welcome/welcome-1.jpg'),
  'welcome-2': require('../assets/images/welcome/welcome-2.jpg'),
  'welcome-3': require('../assets/images/welcome/welcome-3.jpg'),
};
const thumbFor = key => welcome[key] || ShoeData.find(s => s.photoKey === key)?.imagelink_square;

const CreditsScreen = ({navigation}) => {
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar style="light" />
      <FlatList
        data={CREDITS}
        keyExtractor={c => c.key}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <ScreenHeader title="About" onBack={() => navigation.goBack()} />
            <View style={styles.about}>
              <LogoTile size={72} />
              <View style={{flex: 1}}>
                <Text style={TYPE.heading}>
                  Shoe<Text style={{color: COLORS.accent}}>Xpress</Text>
                </Text>
                <Text style={TYPE.label}>Version {version}</Text>
              </View>
            </View>
            <Text style={styles.section}>Photo credits</Text>
            <Text style={[TYPE.body, styles.note]}>
              All product and lifestyle photos are released under CC0 (public domain). Thank you to these photographers.
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <PressableScale
            onPress={() => item.url && Linking.openURL(item.url)}
            scaleTo={0.98}
            style={styles.row}
            accessibilityRole="link"
            accessibilityLabel={`Photo by ${item.creator}`}>
            <ShoeImage source={thumbFor(item.key)} style={styles.thumb} />
            <View style={{flex: 1}}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.by} numberOfLines={1}>
                {item.creator} · {item.source}
              </Text>
            </View>
            <View style={styles.license}>
              <Text style={styles.licenseText}>{item.license}</Text>
            </View>
            <Ionicons name="open-outline" size={16} color={COLORS.textFaint} />
          </PressableScale>
        )}
      />
    </SafeAreaView>
  );
};

export default CreditsScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
  content: {paddingBottom: SPACING.xxxl, gap: SPACING.xs},
  about: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginHorizontal: SPACING.lg,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  section: {...TYPE.subheading, marginTop: SPACING.xl, marginHorizontal: SPACING.lg},
  note: {marginHorizontal: SPACING.lg, marginTop: SPACING.xxs, marginBottom: SPACING.sm, fontSize: FONTSIZE.sm},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginHorizontal: SPACING.lg,
    padding: SPACING.xs,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  thumb: {width: 44, height: 44, borderRadius: RADIUS.sm},
  title: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.sm, color: COLORS.text, textTransform: 'capitalize'},
  by: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.xs, color: COLORS.textMuted, textTransform: 'capitalize'},
  license: {paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: COLORS.accentSoft},
  licenseText: {fontFamily: FONTFAMILY.semibold, fontSize: 10, color: COLORS.accent},
});
