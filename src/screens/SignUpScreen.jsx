import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
} from 'react-native';
import AuthHeader from '../components/AuthHeader';
import {COLORS, FONTSIZE} from '../Constants/theme';

const view = require('../assets/icons/eye.png');
const hide = require('../assets/icons/eye-closed.png');

const SignUpScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordBorderColor, setPasswordBorderColor] = useState('#004BA8');

  const loginPress = () => {
    navigation.navigate('Login');
  };

  const mainScreenPress = () => {
    navigation.navigate('Tab');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = text => {
    setPassword(text);

    if (text.length === 0) {
      setPasswordBorderColor('#004BA8');
    } else if (text.length < 8) {
      setPasswordBorderColor('red');
    } else {
      setPasswordBorderColor('#004BA8');
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
       behavior="padding"
       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} 
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <AuthHeader 
          title='Create an Account'
          subTitle={"Get the best shoes for you at our\nstore conveniently"}
          />
          <View style={styles.textInputContainer}>
            <Text style={styles.inputTitle}>First name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
              />
            </View>
            <Text style={styles.inputTitle}>Last name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
            </View>
            <Text style={styles.inputTitle}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <Text style={styles.inputTitle}>Password</Text>
            <View
              style={[
                styles.passwordInputContainer,
                {borderColor: passwordBorderColor},
              ]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={togglePasswordVisibility}>
                <Image
                  source={showPassword ? view : hide}
                  style={{
                    height: FONTSIZE.size_20,
                    width: FONTSIZE.size_20,
                  }}
                />
              </TouchableOpacity>
            </View>
            {password.length < 8 && (
              <Text style={styles.passwordRequirement}>
                Should be at least 8 characters
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={mainScreenPress}
            activeOpacity={0.7}
            style={styles.signUpButton}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={loginPress}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: 'center',
            }}></Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex

  },
  scrollContent: {
    padding: 16,
  },
  textInputContainer: {
    alignSelf: 'center',
    height: 375,
    width: 328,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitle: {
    fontWeight: '600',
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    height: 48,
    width: 327,
    marginBottom: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 48,
    width: 327,
    borderColor: '#004BA8',
  },
  input: {
    backgroundColor: 'white',
    flex: 1,
    paddingLeft: 10,
    borderColor: '#004BA8',
    borderWidth: 1,
    borderRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingLeft: 5,
  },
  characters: {
    fontSize: 13,
    alignSelf: 'flex-start',
  },
  signUpButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
    marginTop: 10,
    height: 52,
    width: 186,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  signUpText: {
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.primaryLightGreyHex
  },
  loginText: {
    fontWeight: '400',
    color: '#114411',
    marginLeft: 3,
  },
  passwordRequirement: {
    marginTop: 5,
    fontSize: 13,
    alignSelf: 'flex-start',
  },
});
