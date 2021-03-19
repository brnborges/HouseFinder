import React from "react";
import {
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";

import mapMarkerImg from "../images/map-marker3x.png";
import { RectButton } from "react-native-gesture-handler";

import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";
import { TouchableOpacity, Linking } from "react-native";

interface VacancyDetailsRouteParams {
    id: number;
}

interface Vacancy {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    rent_price: string;
    pet_allowed: boolean;
    images: Array<{
        id: number;
        url: string;
    }>;
}

export default function VacancyDetails() {
  const route = useRoute();
  const [vacancy, setVacancy] = useState<Vacancy>();

  const params = route.params as VacancyDetailsRouteParams;

  useEffect(() => {
      api.get(`vacancies/${params.id}`).then(response => {
        setVacancy(response.data);
      })
  }, [params.id])

  if (!vacancy) {
      return(
          <View style={styles.container}>
              <Text style={styles.description}>Loading...</Text>
          </View>
      )
  }

  function handleOpenGoogleMapsRoutes(){
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${vacancy?.latitude},${vacancy?.longitude}`)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
            {vacancy.images.map(image => {
                return(
                    <Image
                    key={image.id}
                    style={styles.image}
                    source={{ uri: image.url }}
                    />
                );
            })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{vacancy.name}</Text>
        <Text style={styles.description}>{vacancy.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: vacancy.latitude,
              longitude: vacancy.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
              latitude: vacancy.latitude,
              longitude: vacancy.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity onPress={handleOpenGoogleMapsRoutes} style={styles.routesContainer}>
            <Text style={styles.routesText}>See Google Maps directions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />
        
        <Text style={styles.title}>Property overview</Text>
        <Text style={styles.description}>{vacancy.instructions}
        
        </Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="dollar-sign" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Rental price         {vacancy.rent_price}
            </Text>
          </View>
          {vacancy.pet_allowed ? (
              <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="github" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
              Pets are               allowed
              </Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
            <Feather name="github" size={40} color="#FF669D" />
            <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
             Pets are not           allowed
            </Text>
          </View>
          )}
        </View>

        <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Contact me</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get("window").width,
    height: 240,
    resizeMode: "contain",
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: "#4D6F80",
    fontSize: 30,
    fontFamily: "Nunito_700Bold",
  },

  description: {
    fontFamily: "Nunito_600SemiBold",
    color: "#5c8599",
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "#B3DAE2",
    marginTop: 40,
    backgroundColor: "#E6F7FB",
  },

  mapStyle: {
    width: "100%",
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  routesText: {
    fontFamily: "Nunito_700Bold",
    color: "#0089a5",
  },

  separator: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#D3E2E6",
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  scheduleItem: {
    width: "48%",
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: "#E6F7FB",
    borderWidth: 1,
    borderColor: "#B3DAE2",
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: "#EDFFF6",
    borderWidth: 1,
    borderColor: "#A1E9C5",
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: "#FEF6F9",
    borderWidth: 1,
    borderColor: "#FFBCD4",
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: "#5C8599",
  },

  scheduleTextGreen: {
    color: "#37C77F",
  },

  scheduleTextRed: {
    color: "#FF669D",
  },

  contactButton: {
    backgroundColor: "#3CDC8C",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#FFF",
    fontSize: 16,
    marginLeft: 16,
  },
});
