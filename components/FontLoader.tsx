import React, { ReactNode } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFonts, RedRose_400Regular, RedRose_700Bold } from '@expo-google-fonts/red-rose';
import { Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

interface FontLoaderProps {
    children: ReactNode;
  }

  const FontLoader: React.FC<FontLoaderProps> = ({ children }) => {
    let [fontsLoaded] = useFonts({
        RedRose_400Regular,
        RedRose_700Bold,
        Poppins_500Medium,
        Poppins_400Regular,
        Poppins_700Bold
    });
  
    if (!fontsLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
  
    return <>{children}</>;
  };
  
  export default FontLoader;