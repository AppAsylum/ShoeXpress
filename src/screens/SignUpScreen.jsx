import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AuthLayout from '../components/AuthLayout';
import TextField from '../components/ui/TextField';
import Button from '../components/ui/Button';
import {COLORS, FONTFAMILY, SPACING, TYPE} from '../Constants/theme';
import {fakeRequest, validateEmail, validatePassword, validateRequired} from '../utils/validation';

const SignUpScreen = ({navigation}) => {
  const [form, setForm] = useState({firstName: '', lastName: '', email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = key => value => {
    setForm(f => ({...f, [key]: value}));
    if (errors[key]) setErrors(e => ({...e, [key]: null}));
  };

  const submit = async () => {
    const next = {
      firstName: validateRequired(form.firstName, 'first name'),
      lastName: validateRequired(form.lastName, 'last name'),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setLoading(true);
    await fakeRequest();
    setLoading(false);
    navigation.reset({index: 0, routes: [{name: 'Tab'}]});
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join ShoeXpress to save favourites and check out faster."
      footer={
        <>
          <Text style={TYPE.label}>Already have an account?</Text>
          <Button title="Log in" variant="ghost" onPress={() => navigation.navigate('Login')} style={styles.link} />
        </>
      }>
      <View style={styles.row}>
        <TextField
          style={{flex: 1}}
          label="First name"
          placeholder="Ada"
          value={form.firstName}
          onChangeText={set('firstName')}
          error={errors.firstName}
          autoCapitalize="words"
          textContentType="givenName"
        />
        <TextField
          style={{flex: 1}}
          label="Last name"
          placeholder="Lovelace"
          value={form.lastName}
          onChangeText={set('lastName')}
          error={errors.lastName}
          autoCapitalize="words"
          textContentType="familyName"
        />
      </View>
      <TextField
        label="Email"
        icon="mail-outline"
        placeholder="you@example.com"
        value={form.email}
        onChangeText={set('email')}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />
      <TextField
        label="Password"
        icon="lock-closed-outline"
        placeholder="At least 8 characters"
        value={form.password}
        onChangeText={set('password')}
        error={errors.password}
        hint="Use 8 or more characters"
        secure
        textContentType="newPassword"
      />
      <Button title="Create account" onPress={submit} loading={loading} style={{marginTop: SPACING.xs}} />
      <Text style={styles.terms}>
        By continuing you agree to our <Text style={styles.termsLink}>Terms</Text> and{' '}
        <Text style={styles.termsLink}>Privacy Policy</Text>.
      </Text>
    </AuthLayout>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', gap: SPACING.sm},
  link: {paddingHorizontal: SPACING.xs},
  terms: {...TYPE.caption, textAlign: 'center', color: COLORS.textMuted},
  termsLink: {color: COLORS.text, fontFamily: FONTFAMILY.medium},
});
