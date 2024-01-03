import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, ImageBackground } from 'react-native';
import { db } from '../../firebaseConfig';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { RouteProp } from '@react-navigation/native';
import { Itinerario } from '../../interfaces/itinerario.interface';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import NavigationBar from '../../components/NavBar';
import Svg, { Path } from 'react-native-svg';
import FontLoader from '../../components/FontLoader';
import ZoomableImage from '../../components/ZoomableImage';
import { FlatList } from 'react-native-gesture-handler';


type DayDetailRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

type Props = {
    route: DayDetailRouteProp;
};

const DayDetail: React.FC<Props> = ({ route }) => {
    const { id } = useLocalSearchParams() as { id: string };
    const [itinerario, setItinerario] = useState<Itinerario | null>(null);
    const router = useNavigation();
    const [isViewerVisible, setViewerVisible] = useState(false); 

    const renderItem = ({ item } : any) => (
        <View style={styles.listItem}>
            <Text style={{fontFamily: "Poppins_400Regular"}}>{item}</Text>
        </View>
    );

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

    const handleCloseViewer = () => {
        setViewerVisible(false);
    };
    
    const handleOpenViewer = () => {
        setViewerVisible(true);
        console.log("open")
    }

    if (!itinerario) {
        return <></>;
    }

    return (
        <FontLoader >
<View style={{justifyContent: "center", alignItems: "center", backgroundColor: "#e8e3d9", height: "100%"}}>
<NavigationBar/>
<Link href={"/"} style={{marginTop: 20, justifyContent: "flex-start", width: "100%", maxWidth: 470}}>

<Svg  height="28" width="26" viewBox="0 0 448 512"><Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></Svg>
</Link>
        <ScrollView style={styles.container}>
        <View style={styles.firstItem}>
            <View style={styles.cityContainer}>
                <View style={styles.titleCity}>
                    <Text style={styles.title}>CITY</Text>
                </View>
                <Pressable style={styles.bodyCity} onPress={() => handleOpenViewer()}>
                    <ImageBackground 
                        source={{ uri: itinerario.ciudad.imagen }} 
                        style={[styles.backgroundImage, {borderRadius: 20}]}
                    >
                        <Text style={styles.cityName}>{itinerario.ciudad.nombre}</Text>
                        <Text style={{color: "white", fontWeight: "700"}}>(Pulse para ampliar)</Text>
                    </ImageBackground>
                </Pressable>
            </View>
        </View>
        <View style={styles.secondItem}>
            <View style={styles.dayContainer}>
                <View style={styles.titleCity}>
                    <Text style={styles.title}>DAY</Text>
                </View>
                <View style={styles.bodyDay} >
                        <Text style={styles.dayText}>{itinerario.dia}</Text>
                </View>
            </View>
        </View>
        <View style={styles.thirdItem}>
        <View style={styles.activitiesContainer}>
            <View style={styles.titleActivities}>
                <Text style={styles.title}>ACTIVITIES</Text>
            </View>
            <View style={styles.bodyActivities}>
                <FlatList
                    data={itinerario?.actividades}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
        </View>
        <View style={styles.fourthItem}>
        <View style={styles.videoContainer}>

                <ImageBackground 
                    source={{ uri: itinerario.video.miniatura }} 
                    style={styles.backgroundImageVideo}
                >   
                    <Link href={`/media/${id}`}>
                    <Svg height="120" viewBox="0 0 512 512" fill="white">
                        <Path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/>
                    </Svg>
                    </Link>
                </ImageBackground>
            </View>
        </View>
        <View style={styles.fifthItem}>
            <View style={styles.hotelContainer}>
                <View style={styles.titleCity}>
                    <Text style={styles.title}>ACCOMODATION</Text>
                </View>
                <View style={styles.bodyHotel}>
                    <ImageBackground 
                        source={{ uri: itinerario.hotel.foto }} 
                        style={styles.backgroundImageHotel}
                    >
                        <Text style={styles.hotelName}>{itinerario.hotel.nombre}</Text>
                        <Text style={styles.hotelAddress}>{itinerario.hotel.direccion}</Text>
                    </ImageBackground>
                </View>
            </View>
        </View>
        <ZoomableImage 
            visible={isViewerVisible}
            images={[{ url: itinerario.ciudad.imagen }]}
            onClose={handleCloseViewer}
        />
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
    imageContainer:{
        height: 180,
        width: "100%",
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Poppins_700Bold',
    },
    firstItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        height: 230,
        maxWidth: 500

    },
    cityContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#333030', // Replace with actual color code
    },
    dayContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#9d4747', 
    },
    secondItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        height: 220,
        maxWidth: 500
    },
    activitiesContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#dab64d',
    },
    videoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        opacity: 0.8,
        overflow: 'hidden',
    },
    thirdItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        height: 350,
        maxWidth: 500
    },
    fourthItem:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        height: 300,
        maxWidth: 500
    },
    fifthItem:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        height: 300,
        maxWidth: 500
    },
    hotelContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#3c46a1',
    },
    titleCity: {
        flex: 1,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        
    },

    bodyCity: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        overflow: 'hidden',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 190,
    },

    backgroundImageVideo: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: "100%",
        borderRadius: 20,
    },

    backgroundImageHotel: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: "100%",
        borderRadius: 20,
        opacity: 0.7,
    },

    titleDay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '20%',
    },
    bodyDay: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
        
    },
    dayText: {
        fontSize: 120,
        fontWeight: 'bold',
        color: 'black',
    },
    cityName: {
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'RedRose_700Bold',
        textTransform: 'uppercase',
    },
    titleActivities: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '20%',
    },
    bodyActivities: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        fontFamily: 'Poppins_400Regular',
    },
    bodyHotel: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        overflow: 'hidden',
    },

    hotelName: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        textTransform: 'uppercase',
        padding: 20,
        width: "100%",
        paddingBottom: 0,
    },
    
    hotelAddress : {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        padding: 20,
        width: "100%",
    }
    
});

export default DayDetail;

