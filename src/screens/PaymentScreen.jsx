import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import {useStore} from '../store/store';
import ScreenHeader from '../components/ui/ScreenHeader';
import Button from '../components/ui/Button';
import PressableScale from '../components/ui/PressableScale';
import SuccessOverlay from '../components/SuccessOverlay';
import {LogoMark} from '../components/ui/Logo';
import {fakeRequest} from '../utils/validation';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING, TYPE} from '../Constants/theme';

const METHODS = [
  {key: 'card', label: 'Credit card', detail: 'Visa •••• 4638', icon: 'card-outline'},
  {key: 'apple', label: 'Apple Pay', detail: 'Pay with Face ID', icon: 'logo-apple'},
  {key: 'google', label: 'Google Pay', detail: 'Pay with your Google account', icon: 'logo-google'},
  {key: 'wallet', label: 'ShoeXpress Wallet', detail: 'Balance $250.00', icon: 'wallet-outline'},
];

const PaymentCard = ({active}) => (
  <LinearGradient
    colors={['#23232A', '#121215']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={[styles.card, active && styles.cardActive]}>
    <View style={styles.cardGlow} />
    <View style={styles.cardWatermark}>
      <LogoMark size={190} color="rgba(212,255,58,0.08)" cutColor="transparent" />
    </View>
    <View style={styles.cardTop}>
      <Ionicons name="hardware-chip-outline" size={30} color={COLORS.star} />
      <Text style={styles.visa}>VISA</Text>
    </View>
    <Text style={styles.cardNumber}>9823  8732  6745  4638</Text>
    <View style={styles.cardBottom}>
      <View>
        <Text style={styles.cardLabel}>Card holder</Text>
        <Text style={styles.cardValue}>Fadiora Oluwasegun</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.cardLabel}>Expires</Text>
        <Text style={styles.cardValue}>02/30</Text>
      </View>
    </View>
  </LinearGradient>
);

const PaymentScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const amount = route.params?.amount ?? useStore.getState().CartPrice;
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const selected = METHODS.find(m => m.key === method);

  const pay = async () => {
    setProcessing(true);
    await fakeRequest(1200);
    useStore.getState().calculateCartPrice();
    useStore.getState().addToOrderHistoryListFromCart();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setProcessing(false);
    setDone(true);
    setTimeout(() => navigation.popTo('Tab', {screen: 'History'}), 1700);
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{paddingBottom: 140 + insets.bottom}} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Payment" subtitle="Choose how you’d like to pay" onBack={() => navigation.goBack()} />

        <View style={styles.body}>
          <PressableScale onPress={() => setMethod('card')} scaleTo={0.98}>
            <PaymentCard active={method === 'card'} />
          </PressableScale>

          <Text style={styles.section}>Payment method</Text>
          <View style={styles.methods}>
            {METHODS.map(m => {
              const active = m.key === method;
              return (
                <PressableScale
                  key={m.key}
                  onPress={() => setMethod(m.key)}
                  scaleTo={0.98}
                  accessibilityRole="radio"
                  accessibilityState={{checked: active}}
                  style={[styles.method, active && styles.methodActive]}>
                  <View style={[styles.methodIcon, active && {backgroundColor: COLORS.accent}]}>
                    <Ionicons name={m.icon} size={20} color={active ? COLORS.onAccent : COLORS.text} />
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.methodLabel}>{m.label}</Text>
                    <Text style={styles.methodDetail}>{m.detail}</Text>
                  </View>
                  <View style={[styles.radio, active && styles.radioActive]}>
                    {active && <View style={styles.radioDot} />}
                  </View>
                </PressableScale>
              );
            })}
          </View>

          <View style={styles.summary}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Subtotal</Text>
              <Text style={styles.rowValue}>${amount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Delivery</Text>
              <Text style={[styles.rowValue, {color: COLORS.accent}]}>Free</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Estimated arrival</Text>
              <Text style={styles.rowValue}>2–4 days</Text>
            </View>
          </View>
          <View style={styles.secure}>
            <Ionicons name="lock-closed" size={12} color={COLORS.textFaint} />
            <Text style={TYPE.caption}>Payments are encrypted and secure</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, {paddingBottom: insets.bottom + SPACING.sm}]}>
        <View>
          <Text style={styles.rowLabel}>Total</Text>
          <Text style={styles.total}>${amount}</Text>
        </View>
        <Button
          title={processing ? 'Processing…' : `Pay with ${selected.label.replace('ShoeXpress ', '')}`}
          onPress={pay}
          loading={processing}
          style={{flex: 1}}
        />
      </View>

      {done && <SuccessOverlay title="Order confirmed" subtitle="Thanks for shopping with ShoeXpress. Your shoes are on the way." />}
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
  body: {paddingHorizontal: SPACING.lg},
  card: {
    height: 200,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardActive: {borderColor: COLORS.accent},
  cardGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    right: -70,
    top: -90,
    backgroundColor: 'rgba(212,255,58,0.10)',
  },
  cardWatermark: {position: 'absolute', right: -30, bottom: -40},
  cardTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  visa: {fontFamily: FONTFAMILY.black, fontSize: 22, color: COLORS.text, fontStyle: 'italic', letterSpacing: 1},
  cardNumber: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.xl, color: COLORS.text, letterSpacing: 2},
  cardBottom: {flexDirection: 'row', justifyContent: 'space-between'},
  cardLabel: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.xs, color: COLORS.textMuted},
  cardValue: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.sm, color: COLORS.text},
  section: {...TYPE.subheading, marginTop: SPACING.xl, marginBottom: SPACING.sm},
  methods: {gap: SPACING.xs},
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.sm,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  methodActive: {borderColor: COLORS.accent, backgroundColor: COLORS.surfaceRaised},
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodLabel: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.md, color: COLORS.text},
  methodDetail: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.xs, color: COLORS.textMuted},
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.textFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xxs,
  },
  radioActive: {borderColor: COLORS.accent},
  radioDot: {width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.accent},
  summary: {
    marginTop: SPACING.xl,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  rowLabel: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.sm, color: COLORS.textMuted},
  rowValue: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.sm, color: COLORS.text},
  secure: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: SPACING.md},
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  total: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.xxl, color: COLORS.text},
});
