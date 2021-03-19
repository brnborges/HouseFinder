import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Onboargings from "./components/Onboarding";

import VacanciesMap from "./pages/VacanciesMap";
import VacancyDetails from "./pages/VacancyDetails";

import SelectMapPosition from "./pages/createVacancy/SelectMapPosition";
import VacancyData from "./pages/createVacancy/VacancyData";

const { Navigator, Screen } = createStackNavigator();

import Header from "./components/Header";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        <Screen name="Onboardings" component={Onboargings} />
        <Screen name="VacanciesMap" component={VacanciesMap} />
        <Screen
          name="VacancyDetails"
          component={VacancyDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Vacancy" />,
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Select on map" />,
          }}
        />
        <Screen
          name="VacancyData"
          component={VacancyData}
          options={{
            headerShown: true,
            header: () => <Header title="Inform details" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
