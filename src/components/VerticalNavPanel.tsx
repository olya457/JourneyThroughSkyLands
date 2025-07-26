import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useNavPanel } from '../context/NavPanelContext';

const { width: D_WIDTH } = Dimensions.get('window');
const guidelineBaseWidth = 350;

const responsiveSize = (size: number) => {
  if (Platform.OS === 'ios') {
    return D_WIDTH <= 375 ? size * 0.8 : size * 1.1;
  } else {
    return (D_WIDTH / guidelineBaseWidth) * size;
  }
};

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

const PANEL_WIDTH = responsiveSize(60);
const PANEL_HEIGHT = responsiveSize(600);
const TOGGLE_BUTTON_SIZE = responsiveSize(60);
const TOP_OFFSET = responsiveSize(150);
const NAV_BUTTON_SIZE = responsiveSize(54);
const NAV_BUTTON_BORDER_RADIUS = NAV_BUTTON_SIZE / 2;
const NAV_ICON_SIZE = responsiveSize(24);
const NAV_BUTTON_GAP = responsiveSize(26);

export default function VerticalNavPanel() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { shouldBeInitiallyOpen, markPanelAsOpened } = useNavPanel();

  const [isVisible, setIsVisible] = useState(false);
  const [translateX] = useState(new Animated.Value(PANEL_WIDTH)); 

  useEffect(() => {
    if (route.name === 'Home' && shouldBeInitiallyOpen) {
      setIsVisible(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      markPanelAsOpened(); 
    } else {
      setIsVisible(false);
      translateX.setValue(PANEL_WIDTH); 
    }
  }, [route.name]);

  const togglePanel = () => {
    Animated.timing(translateX, {
      toValue: isVisible ? PANEL_WIDTH : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(!isVisible));
  };

  return (
    <>
      {}
      <Animated.View
        style={[
          styles.panelWrapper,
          {
            transform: [
              { translateY: TOP_OFFSET },
              { translateX: translateX },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['#FFF0B0', '#AD7942']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.panelGradientBackground}
        >
          <View style={styles.buttonColumn}>
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
                    style={[
                      styles.icon,
                      isActive ? styles.activeIcon : styles.inactiveIcon,
                    ]}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            })}
          </View>
        </LinearGradient>
      </Animated.View>

      {}
      <Animated.View
        style={[
          styles.fixedToggleWrapper,
          {
            top: '50%',
            transform: [
              { translateY: -TOGGLE_BUTTON_SIZE / 2 + TOP_OFFSET },
              { translateX: translateX },
            ],
          },
        ]}
      >
        <Pressable style={styles.toggleButtonContainer} onPress={togglePanel}>
          <LinearGradient
            colors={['#FFF0B0', '#AD7942']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.toggleButtonGradient}
          >
            <Image
              source={require('../assets/toggle_arrow.png')}
              style={[
                styles.toggleIcon,
                { transform: [{ rotate: isVisible ? '180deg' : '0deg' }] },
              ]}
              resizeMode="contain"
            />
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  panelWrapper: {
    position: 'absolute',
    right: 0,
    width: PANEL_WIDTH,
    height: PANEL_HEIGHT,
    zIndex: 10,
    overflow: 'hidden',
  },
  panelGradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: NAV_BUTTON_GAP,
  },
  circleButton: {
    width: NAV_BUTTON_SIZE,
    height: NAV_BUTTON_SIZE,
    borderRadius: NAV_BUTTON_BORDER_RADIUS,
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
    width: NAV_ICON_SIZE,
    height: NAV_ICON_SIZE,
  },
  inactiveIcon: {
    tintColor: 'white',
  },
  activeIcon: {
    tintColor: 'black',
  },
  fixedToggleWrapper: {
    position: 'absolute',
    right: PANEL_WIDTH + responsiveSize(5),
    zIndex: 20,
  },
  toggleButtonContainer: {
    width: TOGGLE_BUTTON_SIZE,
    height: TOGGLE_BUTTON_SIZE,
    borderRadius: TOGGLE_BUTTON_SIZE / 2,
    overflow: 'hidden',
  },
  toggleButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleIcon: {
    width: responsiveSize(37),
    height: responsiveSize(37),
    tintColor: 'black',
  },
});
