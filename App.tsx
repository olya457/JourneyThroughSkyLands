import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { NavPanelProvider } from './src/context/NavPanelContext'; 

export default function App() {
  return (
    <NavPanelProvider> 
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </NavPanelProvider>
  );
}
