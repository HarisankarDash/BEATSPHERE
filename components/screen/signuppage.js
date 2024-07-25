import React, { useState } from 'react';
import { StyleSheet, Image, Text, StatusBar, View, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);
    const navigation = useNavigation();

    const handleGoback = () => {
        navigation.goBack();
    };

    const handleSignup = () => {
        // Validate inputs if necessary
        navigation.navigate("Login");
    };

    const [loaded] = useFonts({
        Poppinslight: require('../../assets/Poppins-Light.ttf'),
    });

    if (!loaded) {
        return null; // Render nothing while fonts are loading
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoback}>
                <FontAwesome6 name={"arrow-left"} color="#800080" size={25} />
            </TouchableOpacity>
            <View style={styles.textcontainer}>
                <Text style={styles.headingtext}>Let's Get Started</Text>
            </View>
            <View style={styles.formcontainer}>
                <View style={styles.inputcontainer}>
                    <Fontisto name={"email"} size={30} color={'#800080'} />
                    <TextInput style={styles.textInput}
                        placeholder='Enter your email'
                        placeholderTextColor={'#800080'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                    />
                </View>
                <View style={styles.inputcontainer}>
                    <Ionicons name={"person-outline"} size={30} color={'#800080'} />
                    <TextInput style={styles.textInput}
                        placeholder='Enter your username'
                        placeholderTextColor={'#800080'}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputcontainer}>
                    <Ionicons name={"lock-closed-outline"} size={30} color={'#800080'} />
                    <TextInput style={styles.textInput}
                        placeholder='Enter your password'
                        placeholderTextColor={'#800080'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={secureEntry}
                    />
                    <TouchableOpacity onPress={() => {
                        setSecureEntry((prev) => !prev);
                    }}>
                        <Ionicons name={"eye-outline"} size={20} color={'#800080'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
                    <Text style={styles.loginButtonText}>Sign up</Text>
                </TouchableOpacity>
                <Text style={styles.continue}>or continue with</Text>
                <TouchableOpacity style={styles.googleButtonContainer}>
                    <Image source={require('../../assets/google.png')} style={styles.googleImage} />
                    <Text style={styles.googleText}>Google</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.accountText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.signupText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: StatusBar.currentHeight,
        padding: 10
    },
    backButtonWrapper: {
        height: 40,
        width: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textcontainer: {
        marginVertical: 20,
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