// ShoeXpress design system — dark premium.
// One accent (volt), near-black surfaces in three steps, white type with two muted tones.

export const COLORS = {
  // Surfaces
  bg: '#0B0B0D',
  surface: '#151518',
  surfaceRaised: '#1E1E22',
  border: '#2A2A30',

  // Text
  text: '#FFFFFF',
  textMuted: '#A0A0A8',
  textFaint: '#5E5E66',

  // Accent
  accent: '#D4FF3A',
  accentSoft: 'rgba(212,255,58,0.12)',
  onAccent: '#0B0B0D',

  // Status
  danger: '#FF5A5F',
  dangerSoft: 'rgba(255,90,95,0.14)',
  star: '#FFC94A',

  // Overlays
  scrim: 'rgba(11,11,13,0.55)',
  scrimStrong: 'rgba(11,11,13,0.85)',
  glass: 'rgba(21,21,24,0.72)',
};

export const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const RADIUS = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const FONTFAMILY = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extrabold: 'Poppins-ExtraBold',
  black: 'Poppins-Black',
};

export const FONTSIZE = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 26,
  display: 34,
};

// Ready-made text styles so screens stay consistent.
export const TYPE = {
  display: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.display, lineHeight: 42, color: COLORS.text, letterSpacing: -0.5},
  title: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.xxl, lineHeight: 34, color: COLORS.text, letterSpacing: -0.3},
  heading: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.xl, lineHeight: 28, color: COLORS.text},
  subheading: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.lg, lineHeight: 24, color: COLORS.text},
  body: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.md, lineHeight: 23, color: COLORS.textMuted},
  label: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.sm, lineHeight: 18, color: COLORS.textMuted},
  caption: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.xs, lineHeight: 16, color: COLORS.textFaint},
  price: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.lg, color: COLORS.text},
  button: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.md, letterSpacing: 0.2},
};

export const SHADOW = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 8,
  },
};
