// app/splash.tsx or component

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync(); // <- important

export default function CustomSplash({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      await SplashScreen.hideAsync();
      onFinish();
    }, 2000); // splash for 2s

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/notes-icon-main.png')} style={styles.image} />
      <Text style={styles.text}>Welcomeeeee</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
