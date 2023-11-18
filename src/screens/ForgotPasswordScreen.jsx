import { StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    SafeAreaView,
    Dimensions,
    Image, } from 'react-native'
    import React, {useState} from 'react';
  import { BORDERRADIUS, COLORS } from '../Constants/theme';
  
    const {width, height} = Dimensions.get('window');
  const arrowBack = require('../assets/icons/left.png')
  
  const ForgotPasswordScreen = ({navigation}) => {
    const [text, setText] = useState('')
  
    const handleTextChange = text => {
      setText(text);
    };
  
    const previousScreenPress = () => {
      navigation.pop();
    };
    const resetPasswordPress = () => {
      navigation.navigate('PasswordResetScreen');
    };
    return (
      <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableOpacity 
      style={{
        borderWidth: 1,
        marginLeft: 10,
        padding: 20,
        height: 30,
          width: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: BORDERRADIUS.radius_10,
          backgroundColor: COLORS.primaryDarkGreyHex
      }}
      onPress={previousScreenPress}>
        {/* <Icon name="arrow-back" size={30} color="black" style={styles.icon} /> */}
        <Image 
        source={arrowBack}
        style={{
          height: 30,
          width: 30
        }}
        tintColor={COLORS.primaryLightGreyHex}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.recoveryText}>
          Let's help you recover{'\n'}your account
        </Text>
        <Text style={styles.enterEmailAddressText}>
          Enter registered email address
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={text}
          onChangeText={handleTextChange}
        />
        <TouchableOpacity
          onPress={resetPasswordPress}
          activeOpacity={0.6}
          style={styles.resetPasswordButton}>
          <Text style={styles.resetEmailText}>Send reset email</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    )
  }
  
  export default ForgotPasswordScreen
  
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: COLORS.primaryBlackHex,
    },
    container: {
      flexGrow: 1,
    },
    scrollContent: {
      height: 274,
      width: width - 50,
      alignSelf: 'center',
      marginTop: 15,
    },
    icon: {
      paddingTop: 15,
    },
    recoveryText: {
      textAlign: 'center',
      fontSize: 25,
      fontWeight: '600',
      color: COLORS.primaryOrangeHex,
    },
    enterEmailAddressText: {
      marginTop: 25,
      fontSize: 17,
      fontWeight: '400',
      color: COLORS.primaryWhiteHex
    },
    input: {
      width: width - 52,
      height: 48,
      borderWidth: 1,
      borderColor: '#004BA8',
      borderRadius: 5,
      paddingLeft: 10,
      marginTop: 10,
      alignSelf: 'center',
      backgroundColor: COLORS.primaryWhiteHex
    },
    resetPasswordButton: {
      marginTop: 50,
      alignSelf: 'center',
      backgroundColor: COLORS.primaryOrangeHex,
      height: 52,
      width: 186,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    resetEmailText: {
      fontWeight: '500',
      color: 'white',
    },
  })
  