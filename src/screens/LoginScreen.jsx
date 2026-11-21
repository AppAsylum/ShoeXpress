import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import AuthLayout from '../components/AuthLayout';
import TextField from '../components/ui/TextField';
import Button from '../components/ui/Button';
import {SPACING, TYPE} from '../Constants/theme';
import {fakeRequest, validateEmail, validatePassword} from '../utils/validation';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next = {email: validateEmail(email), password: validatePassword(password)};
    setErrors(next);
    if (next.email || next.password) return;
    setLoading(true);
    await fakeRequest();
    setLoading(false);
    navigation.reset({index: 0, routes: [{name: 'Tab'}]});
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where you left off."
      onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
      footer={
        <>
          <Text style={TYPE.label}>New to ShoeXpress?</Text>
          <Button title="Create account" variant="ghost" onPress={() => navigation.navigate('SignUp')} style={styles.link} />
        </>
      }>
      <TextField
        label="Email"
        icon="mail-outline"
        placeholder="you@example.com"
        value={email}
        onChangeText={v => {
          setEmail(v);
          if (errors.email) setErrors(e => ({...e, email: null}));
        }}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />
      <TextField
        label="Password"
        icon="lock-closed-outline"
        placeholder="Your password"
        value={password}
        onChangeText={v => {
          setPassword(v);
          if (errors.password) setErrors(e => ({...e, password: null}));
        }}
        error={errors.password}
        secure
        textContentType="password"
      />
      <Button
        title="Forgot password?"
        variant="ghost"
        onPress={() => navigation.navigate('ForgotPassword', {email})}
        style={styles.forgot}
      />
      <Button title="Log in" onPress={submit} loading={loading} />
    </AuthLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  link: {paddingHorizontal: SPACING.xs},
  forgot: {alignSelf: 'flex-end', marginTop: -SPACING.sm, paddingHorizontal: 0},
});
