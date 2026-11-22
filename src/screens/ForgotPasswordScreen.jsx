import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import AuthLayout from '../components/AuthLayout';
import TextField from '../components/ui/TextField';
import Button from '../components/ui/Button';
import {COLORS, FONTFAMILY, RADIUS, SPACING, TYPE} from '../Constants/theme';
import {fakeRequest, validateEmail} from '../utils/validation';

const ForgotPasswordScreen = ({navigation, route}) => {
  const [email, setEmail] = useState(route.params?.email || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    const e = validateEmail(email);
    setError(e);
    if (e) return;
    setLoading(true);
    await fakeRequest();
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthLayout title="Check your inbox" onBack={() => navigation.goBack()}>
        <View style={styles.sentCard}>
          <View style={styles.sentIcon}>
            <Ionicons name="mail-open-outline" size={28} color={COLORS.accent} />
          </View>
          <Text style={TYPE.body}>
            If an account exists for <Text style={styles.email}>{email.trim()}</Text>, we’ve sent a
            link to reset your password.
          </Text>
        </View>
        <Button title="Back to log in" onPress={() => navigation.goBack()} />
        <Button title="Use a different email" variant="ghost" onPress={() => setSent(false)} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter the email you signed up with and we’ll send you a reset link."
      onBack={() => navigation.goBack()}>
      <TextField
        label="Email"
        icon="mail-outline"
        placeholder="you@example.com"
        value={email}
        onChangeText={v => {
          setEmail(v);
          if (error) setError(null);
        }}
        error={error}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />
      <Button title="Send reset link" onPress={submit} loading={loading} />
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  sentCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  sentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {color: COLORS.text, fontFamily: FONTFAMILY.semibold},
});
