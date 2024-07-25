import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GetStarted = ({ navigation }) => {

  const navigateToSignup = () => {
    navigation.navigate('Signup'); // Navigate to the 'Signup' screen
  };

  return (
    <ImageBackground
      source={{ uri: 'https://rollingstoneindia.com/wp-content/uploads/2023/02/Desi-hip-hop-artist-KING-Credits-@xo.visuals-scaled-e1675337223346.jpg'}}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            <Text style={styles.beat}>Beat</Text>
            <Text style={styles.sphere}>Sphere</Text>
          </Text>
          <Text style={styles.caption}>Find your favorite music</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={navigateToSignup}>
              <Icon name="play" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            {/* Assuming you have a logo image */}
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  container: {
    padding: 20,
    alignItems: 'flex-start',
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  beat: {
    color: 'purple',
  },
  sphere: {
    color: 'white',
  },
  caption: {
    fontSize: 45,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 13,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default GetStarted;
