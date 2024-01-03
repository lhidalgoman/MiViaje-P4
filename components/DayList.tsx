import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db} from '../firebaseConfig'; // Asegúrese de importar su configuración de Firebase
import { Itinerario } from '../interfaces/itinerario.interface';
import { FlatList } from 'react-native-gesture-handler';
import { Link, useNavigation } from 'expo-router';




export default function DayList() {
  const [items, setItems] = useState<Itinerario[]>([]); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Itinerario[];
      setItems(data);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Itinerario }) => (
  <View style={styles.dayContainer}>
      <View style={styles.day}>
        <Text style={styles.day}>{item.dia}</Text>
      </View>
      <Image style={styles.image} source={{ uri: item.ciudad.imagen }} />
      <Text style={styles.cityName}>{item.ciudad.nombre.toUpperCase()}</Text>
      <Link href={`/day/${item.id}`} style={{display:"flex", flexDirection: 'row', justifyContent: 'center', color: "#F5F5F0", fontFamily: "Poppins_700Bold", marginBottom: 10, textAlign: "center"}}>
        Ver más
        </Link>
</View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id ? item.id : item.ciudad.nombre}
      style={{marginTop: 50, marginBottom: 50}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e3d9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dayContainer: {
    backgroundColor: '#363636', 
    height: 300,
    borderRadius: 20,
    textAlign: 'center',
    color: '#FAF3F3', 
    fontFamily: 'Poppins_400Regular',
    elevation: 3, // Para sombra en Android
    shadowColor: '#000000', // Para sombra en iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    width: 250,
    marginBottom: 20,

  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FAF3F3',
    margin: 2
  },
  image: {
    width: 250,
    height: 160,
    backgroundColor: 'transparent',
    marginBottom: 16, 
    opacity: 0.85,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderColor: '#FAF3F3', 
  },
  cityName: {
    fontFamily: 'RedRose_700Bold', 
    fontSize: 40,
    marginBottom: 0,
    color: '#FAF3F3',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  }
});
