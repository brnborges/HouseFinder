import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import mapMarker from '../images/map-marker3x.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Vacancy {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}


export default function VacanciesMap() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('vacancies').then(response => {
      setVacancies(response.data);
    });
  });


  function handleNavigateToVacancyDetails(id: number){
    navigation.navigate('VacancyDetails', { id });
  }

  function handleNavigateToCreateVacancy(){
    navigation.navigate('SelectMapPosition');
  }

    return (
      <View style={styles.container}>
      <MapView 
      provider={PROVIDER_GOOGLE}
      style={styles.map} 
      initialRegion={{
        latitude: 53.3498091,
        longitude: -6.2624435,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
      >
        {vacancies.map(vacancy => {
          return(
            <Marker 
            key={vacancy.id}
        icon={mapMarker}
        calloutAnchor={{
          x: 0.6,
          y: -0.3,
        }}
        coordinate={{
          latitude: vacancy.latitude,
          longitude: vacancy.longitude,
        }}
        >
          <Callout tooltip onPress={() => handleNavigateToVacancyDetails(vacancy.id)}>
            <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>{vacancy.name}</Text>
            </View>
          </Callout>
          </Marker>
          );
        })}
        </MapView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{vacancies.length}  Vacancies were found</Text>
          
          <RectButton style={styles.createVacanciesButton} onPress={handleNavigateToCreateVacancy}>
          <Feather name="plus" size={27} color="#FFF"/>
          </RectButton>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 130,
      height: 30,
      paddingHorizontal: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 35,
      justifyContent: 'center', 
      alignItems: 'center',
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 15,
      fontFamily: 'Nunito_700Bold',
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 2,
    },
  
    footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold',
      fontSize: 15,
    },
  
    createVacanciesButton: {
      width: 56,
      height: 56,
      backgroundColor: '#E16E76',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    }
  });