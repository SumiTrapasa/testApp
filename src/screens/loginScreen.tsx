import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import RectangleComp from '../components/Rectangle';
import CustomTextInput from '../components/TextInputComp';
import { TextInput } from 'react-native-paper';
import CustomButton from '../components/ButtonComp';
import { useNavigation } from '@react-navigation/native';
import { handleLogin } from '../services/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('testpracticaluser001@mailinator.com');
  const [password, setPassword] = useState('Test@123');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const onLoginPress = async () => {
    const result = await handleLogin(email, password);
    if (result.success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } else {
      Alert.alert('Login Failed', result.message || 'Something went wrong.');
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <RectangleComp />
          <View style={styles.loginInput}>
            <CustomTextInput
              labelText="Email:"
              placeholder="email@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomTextInput
              labelText="Password:"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry = {!showPassword}
              right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={handlePassword} />}
              helper_text_Input="Forgot Password?"
            />
            <CustomButton style={styles.btn} title="Sign In" onPress={onLoginPress} />
            <Text style={styles.textStyle}>Not a member? Sign Up Here</Text>

            <View style={styles.divider}>
              <View style={styles.line} />
              <View style={styles.textWrapper}>
                <Text style={styles.dividerText}>or Sign In with:</Text>
              </View>
              <View style={styles.line} />
            </View>

            <View style={styles.icons}>
              <Image source={require('./../assets/images/google.png')} />
              <Image source={require('./../assets/images/apple.png')} />
              <Image style={styles.icon} source={require('./../assets/images/facebook.png')} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  loginInput: {
    paddingHorizontal: 20,
    gap: 12,
  },
  btn: {
    alignSelf: 'flex-end',
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#4F4F4F',
  },
  textWrapper: {
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  dividerText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 14,
    color: '#4F4F4F',
    textAlign: 'center',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    marginTop: 12,
  },
  icon: {
    marginTop: 6,
  },
});
