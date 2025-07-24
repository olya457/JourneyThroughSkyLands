import React from 'react';
import { View, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

const { height } = Dimensions.get('window');

const navItems: {
  route: 'Home' | 'SavedLocations' | 'Facts' | 'About';
  icon: any;
  key: string;
}[] = [
  { route: 'Home', icon: require('../assets/nav_play.png'), key: 'play' },
  { route: 'SavedLocations', icon: require('../assets/nav_bookmark.png'), key: 'save' },
  { route: 'Facts', icon: require('../assets/nav_info.png'), key: 'info' },
  { route: 'About', icon: require('../assets/nav_guide.png'), key: 'guide' },
];


export default function VerticalNavPanel() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = route.name === item.route;

        return (
          <Pressable
            key={item.key}
            onPress={() => {
              if (!isActive) {
                navigation.navigate(item.route);
              }
            }}
            style={[
              styles.circleButton,
              isActive ? styles.activeCircle : styles.inactiveCircle,
            ]}
          >
            <Image
              source={item.icon}
              style={[styles.icon, isActive ? styles.activeIcon : styles.inactiveIcon]}
              resizeMode="contain"
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: -17,
    top: height * 0.35,
    width: 80,
    height: 360,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    zIndex: 10,
  },
  circleButton: {
    width: 54,
    height: 54,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveCircle: {
    backgroundColor: 'black',
  },
  activeCircle: {
    backgroundColor: 'white',
  },
  icon: {
    width: 24,
    height: 24,
    
  },
  inactiveIcon: {
    tintColor: 'white',
  },
  activeIcon: {
    tintColor: 'black',
  },
});
