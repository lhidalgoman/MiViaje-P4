import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { db } from '../../firebaseConfig';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { RouteProp } from '@react-navigation/native';
import { Itinerario } from '../../interfaces/itinerario.interface';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import NavigationBar from '../../components/NavBar';
import Svg, { Path } from 'react-native-svg';
import FontLoader from '../../components/FontLoader';
import Video from 'react-native-video';



type DayDetailRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

type Props = {
    route: DayDetailRouteProp;
};

const DayDetail: React.FC<Props> = ({ route }) => {
    const { id } = useLocalSearchParams() as { id: string };
    const [itinerario, setItinerario] = useState<Itinerario | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'data', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setItinerario(docSnap.data() as Itinerario);
            } else {
                console.log('No such document!');
            }
        };
       
        fetchData();
    }, [id]);


    if (!itinerario) {
        return <></>;
    }

    return (
        <FontLoader >
<View style={{justifyContent: "center", alignItems: "center", backgroundColor: "#e8e3d9", height: "100%"}}>
<NavigationBar/>
<Link href={`/day/${id}`} style={{marginTop: 20, justifyContent: "flex-start", width: "100%", maxWidth: 470}}>

<Svg  height="28" width="26" viewBox="0 0 448 512"><Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></Svg>
</Link>
        <ScrollView style={styles.container}>
        <video style={styles.video} controls autoPlay>
         <source src={itinerario?.video.link.startsWith("assets") ? "../../" + itinerario.video.link: itinerario?.video.link} type="video/mp4"/>
        </video>

        </ScrollView>
</View> </FontLoader>   );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: "100%",
        maxWidth: 500
    },
    video: {
        height: 300, // Altura del reproductor
        width: '100%' // Ancho del reproductor
      },
    
});

export default DayDetail;

