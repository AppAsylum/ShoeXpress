import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from './Button';
import {COLORS, SPACING, TYPE} from '../../Constants/theme';

// Large left-aligned title with optional back button and right slot.
const ScreenHeader = ({title, subtitle, onBack, right}) => (
  <View style={styles.wrap}>
    {onBack && (
      <View style={styles.topRow}>
        <IconButton icon="chevron-back" onPress={onBack} label="Go back" />
        {right}
      </View>
    )}
    <View style={styles.titleRow}>
      <View style={{flex: 1}}>
        <Text style={TYPE.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {!onBack && right}
    </View>
  </View>
);

export default ScreenHeader;

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: SPACING.lg, paddingTop: SPACING.xs, paddingBottom: SPACING.md, gap: SPACING.md},
  topRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  titleRow: {flexDirection: 'row', alignItems: 'flex-end'},
  subtitle: {...TYPE.label, color: COLORS.textMuted, marginTop: 2},
});
