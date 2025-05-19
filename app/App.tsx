
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import RootLayout from './_layout';

export default function App() {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkForUpdate = async () => {
      if (__DEV__) {
        setIsChecking(false);
        return;
      }

      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.warn('Error checking for updates:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkForUpdate();
  }, []);

  if (isChecking) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return <RootLayout />;
}
