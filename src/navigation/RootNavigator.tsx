import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import SavedLocationsScreen from '../screens/SavedLocationsScreen';
import FactsScreen from '../screens/FactsScreen';
import AboutAppScreen from '../screens/AboutAppScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';

import type { Place } from '../data/places'; 

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Home: undefined;
  SavedLocations: undefined;
  Facts: undefined;
  About: undefined;
  PlaceDetail: { place: Place }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SavedLocations" component={SavedLocationsScreen} />
      <Stack.Screen name="Facts" component={FactsScreen} />
      <Stack.Screen name="About" component={AboutAppScreen} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} /> 
    </Stack.Navigator>
  );
}
