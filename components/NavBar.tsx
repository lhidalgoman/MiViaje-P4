import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import Svg, { Path } from 'react-native-svg';



const NavigationBar = () => {

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 20, backgroundColor: "#9D4747", width: "100%"}}>
      <View style={{flexDirection: "column", alignItems: "center"}}>
      <Link href={"/"} style={{display:"flex", flexDirection: 'row', justifyContent: 'flex-end', color: "#F5F5F0"}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: "Poppins_500Medium"}}>MiViajeMobile</Text>
      </Link>
      <Link href={"/"} style={{display:"flex", flexDirection: 'row', alignItems: 'center', color: "#F5F5F0", marginTop: 10}}>
      <Svg fill="#F5F5F0" height="16" width="18" viewBox="0 0 576 512"><Path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></Svg>
     
      </Link>
      </View>
     
    </View>
  );
};


export default NavigationBar;