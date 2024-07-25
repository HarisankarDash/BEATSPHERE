import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { Fontisto, Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Appbar, useTheme } from 'react-native-paper';

const Loginscreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation();
 

  const handleGoback = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    // Perform your login logic here
    // For simplicity, directly navigate to 'Home'
    navigation.navigate('Dashboard');
  };

  const [loaded] = useFonts({
    Poppinslight: require('../../assets/Poppins-Light.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
     <Appbar.Header>
        <Appbar.BackAction onPress={handleGoback} />
        <Appbar.Content title="Login" />
      </Appbar.Header>
      <View style={styles.formcontainer}>
        <View style={styles.inputcontainer}>
          <Fontisto name="email" size={30} color={'#800080'} />
          <TextInput
            style={styles.textInput}
            placeholder='Enter your email'
            placeholderTextColor={'#800080'}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
          />
        </View>
        <View style={styles.inputcontainer}>
          <Ionicons name="lock-closed-outline" size={30} color={'#800080'} />
          <TextInput
            style={styles.textInput}
            placeholder='Enter your password'
            placeholderTextColor={'#800080'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity onPress={() => setSecureEntry(prev => !prev)}>
            <Ionicons name="eye-outline" size={20} color={'#800080'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotpsswrd}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.continue}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image source={require('../../assets/google.png')} style={styles.googleImage} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    top: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingtext: {
    fontSize: 32,
    color: '#e600e6',
    
  },
  formcontainer: {
    marginTop: 20,
  },
  inputcontainer: {
    borderWidth: 1,
    borderColor: '#4d004d',
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 15,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Poppinslight',
  },
  forgotpsswrd: {
    textAlign: 'right',
    color: '#800080',
    
  },
  loginButtonWrapper: {
    backgroundColor: '#800080',
    borderRadius: 80,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 17,
    
    textAlign: 'center',
    padding: 10,
  },
  continue: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 13,
    
    color: '#e600e6',
  },
  googleImage: {
    height: 25,
    width: 25,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#800080',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
  googleText: {
    fontSize: 17,
    
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 2,
  },
  accountText: {
    color: "#e600e6",
    
  },
  signupText: {
    color: '#e600e6',
    
    fontWeight: 'bold',
  },
});

export default Loginscreen;
