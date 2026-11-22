import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING, TYPE} from '../../Constants/theme';

const TextField = ({label, icon, error, hint, secure, style, ...inputProps}) => {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const borderColor = error ? COLORS.danger : focused ? COLORS.accent : COLORS.border;

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.field, {borderColor}]}>
        {icon && (
          <Ionicons name={icon} size={18} color={focused ? COLORS.accent : COLORS.textFaint} />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.textFaint}
          selectionColor={COLORS.accent}
          secureTextEntry={secure && hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
        {secure && (
          <Pressable
            onPress={() => setHidden(h => !h)}
            hitSlop={10}
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}>
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={18} color={COLORS.textMuted} />
          </Pressable>
        )}
      </View>
      {(error || hint) && (
        <Text style={[styles.helper, error && {color: COLORS.danger}]}>{error || hint}</Text>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  label: {...TYPE.label, color: COLORS.text, marginBottom: SPACING.xs},
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    height: 54,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    backgroundColor: COLORS.surface,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.text,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
  },
  helper: {...TYPE.caption, color: COLORS.textMuted, marginTop: 6},
});
