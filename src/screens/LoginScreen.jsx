import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native';
import AuthHeader from '../components/AuthHeader';
import { COLORS, FONTSIZE, SPACING } from '../Constants/theme';

const {width, height} = Dimensions.get('window');

const view = require('../assets/icons/eye.png');
const hide = require('../assets/icons/eye-closed.png');


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const signUpPress = () => {
    navigation.navigate('SignUp');
  };

  const [passwordBorderColor, setPasswordBorderColor] = useState('#004BA8');

  const forgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
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
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AuthHeader 
        title="Login"
        subTitle={"Get the best shoes for you at our\nstore conveniently"}
        />
        <View style={styles.textInputContainer}>
          <Text style={styles.inputTitle}>Email address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email address"
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
              placeholder="Password"
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
          <View style={styles.forgotPasswordAndCharacterText}>
          {password.length < 8 && (
            <Text style={styles.passwordRequirement}>
              Should be at least 8 characters
            </Text>
          )}
          <TouchableOpacity
            onPress={forgotPasswordPress}
            activeOpacity={0.5}
            style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
        onPress={mainScreenPress}
        activeOpacity={0.7} style={styles.loginButton}>
          <Text style={styles.LoginText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>You don't have an account?</Text>
          <TouchableOpacity onPress={signUpPress}>
            <Text style={styles.loginText}>Sign Up</Text>
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

export default LoginScreen;

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
    height: 280,
    width: width - 56,
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
  forgotPasswordAndCharacterText: {
    marginTop: SPACING.space_4,
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    width: 325
  },
  input: {
    backgroundColor: 'white',
    flex: 1,
    paddingLeft: 10,
    borderColor: '#004BA8',
    borderWidth: 1,
    borderRadius: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontWeight: '300',
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_12
  },
  icon: {
    marginRight: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingLeft: 5,
  },
  loginButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
    height: 52,
    width: 186,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  LoginText: {
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    marginTop: 140,
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
    fontSize: FONTSIZE.size_12,
    alignSelf: 'flex-start',
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
  },
});