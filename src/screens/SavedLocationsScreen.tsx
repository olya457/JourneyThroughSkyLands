import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import VerticalNavPanel from '../components/VerticalNavPanel';
import LinearGradient from 'react-native-linear-gradient';
import SavedPlacesManager, { Place } from '../utils/SavedPlacesManager';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const responsiveSize = (size: number) => {
  if (Platform.OS === 'ios') {
    return width <= 375 ? size * 0.8 : size * 1.1;
  } else {
    return (width / guidelineBaseWidth) * size;
  }
};

const isSmallDevice = height < 700;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlaceDetail'>;

export default function SavedLocationsScreen() {
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const headerAnim = useRef(new Animated.Value(-responsiveSize(200))).current;

  const panelAppearAnim = useRef(new Animated.Value(responsiveSize(100))).current;

  const cardAnimations = useRef<{ [key: string]: Animated.Value }>({});

  useEffect(() => {
    const loadSaved = async () => {
      const data = await SavedPlacesManager.getAll();
      setSavedPlaces(data);

      if (data.length > 0) {
        data.forEach(place => {
          if (!cardAnimations.current[place.id]) {
            cardAnimations.current[place.id] = new Animated.Value(0);
          } else {
            cardAnimations.current[place.id].setValue(0);
          }
        });

        const animations = data.map((place, index) =>
          Animated.timing(cardAnimations.current[place.id], {
            toValue: 1,
            duration: 400,
            delay: index * 100,
            useNativeDriver: true,
          })
        );
        Animated.parallel(animations).start();
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      headerAnim.setValue(-responsiveSize(200));
      panelAppearAnim.setValue(responsiveSize(100));

      Animated.parallel([
        Animated.timing(headerAnim, {
          toValue: 0, 
          duration: 600,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(panelAppearAnim, {
          toValue: 0, 
          duration: 600,
          delay: 300,
          useNativeDriver: true,
        }),
      ]).start();

      loadSaved();
    });

    return unsubscribe;
  }, [navigation, headerAnim, panelAppearAnim]);

  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : Platform.OS === 'ios' ? 20 : 0;

  const HEADER_BLOCK_HEIGHT = isSmallDevice ? responsiveSize(190) : responsiveSize(211);

  const HEADER_BLOCK_WIDTH = isSmallDevice ? width * 0.95 : width * 0.9;

  const HEADER_BLOCK_CENTER_LEFT = (width - HEADER_BLOCK_WIDTH) / 2;


  return (
    <ImageBackground
      source={require('../assets/recommendations.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {}
      <Animated.View
        style={[
          styles.headerBlock,
          {
            top: STATUSBAR_HEIGHT + responsiveSize(isSmallDevice ? 5 : 0),
            left: HEADER_BLOCK_CENTER_LEFT,
            transform: [{ translateY: headerAnim }],
          },
        ]}
      >
        <Image
          source={require('../assets/group1.png')}
          style={styles.groupImage}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Saved Locations</Text>
        </View>
      </Animated.View>

      {}
      <Animated.View
        style={[
          styles.navPanelWrapper,
          {
            top: responsiveSize(20) + STATUSBAR_HEIGHT,
            transform: [{ translateX: panelAppearAnim }],
          },
        ]}
      >
        <VerticalNavPanel />
      </Animated.View>

      {}
      <SafeAreaView
        style={[
          styles.safeAreaContent,
          {
            paddingTop: STATUSBAR_HEIGHT + HEADER_BLOCK_HEIGHT + responsiveSize(10), 
            zIndex: Platform.OS === 'android' ? -1 : undefined, 
          },
        ]}
      >
        <View style={styles.contentContainer}>
          {savedPlaces.length === 0 ? (
            <Text style={styles.emptyText}>You have no saved locations.</Text>
          ) : (
            <FlatList
              data={savedPlaces}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatListContent}
              renderItem={({ item }) => {
                const animValue = cardAnimations.current[item.id] || new Animated.Value(0);
                const translateY = animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [responsiveSize(50), 0],
                });
                const opacity = animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                });

                return (
                  <Animated.View style={{ opacity, transform: [{ translateY }] }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('PlaceDetail', { place: item })}
                    >
                      <LinearGradient
                        colors={['#FFF0B0', '#AD7942']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.cardWrapper}
                      >
                        <ImageBackground
                          source={getImageByName(item.imageName)}
                          style={styles.card}
                          imageStyle={styles.cardImage}
                        >
                          <LinearGradient
                            colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                            style={styles.cardGradient}
                          >
                            <Text style={styles.cardTitle}>{item.title}</Text>
                          </LinearGradient>
                        </ImageBackground>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const getImageByName = (name: string): any => {
  switch (name) {
    case 'sky_tower':
      return require('../assets/sky_tower.png');
    case 'hobbiton':
      return require('../assets/hobbiton.png');
    case 'waitomo':
      return require('../assets/waitomo.png');
    case 'milford':
      return require('../assets/milford.png');
    case 'sutherland_falls':
      return require('../assets/sutherland_falls.png');
    case 'mirror_lakes':
      return require('../assets/mirror_lakes.png');
    case 'aoraki':
      return require('../assets/aoraki.png');
    case 'queenstown':
      return require('../assets/queenstown.png');
    case 'nevis_highwire':
      return require('../assets/nevis_highwire.png');
    case 'bowen_falls':
      return require('../assets/bowen_falls.png');
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  navPanelWrapper: {
    position: 'absolute',
    top: height < 700 ? responsiveSize(10) : responsiveSize(30),
    right: responsiveSize(8),
    zIndex: 10,
  },
  safeAreaContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerBlock: {
    position: 'absolute', 
    width: isSmallDevice ? width * 0.95 : width * 0.9,
   height: isSmallDevice ? responsiveSize(190 + 10) : responsiveSize(211),
    backgroundColor: '#302E2E',
    borderRadius: responsiveSize(20),
    overflow: 'hidden',
    zIndex: 5,
  },
  groupImage: {
    position: 'absolute',
    top: responsiveSize(-10),
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: responsiveSize(14),
    left: responsiveSize(20),
    zIndex: 2,
  },
  headerText: {
    color: 'white',
    fontSize: responsiveSize(16),
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: responsiveSize(40),
    zIndex: 1,
    alignItems: 'center', 
  },
  emptyText: {
    color: '#CCCCCC',
    fontSize: responsiveSize(16),
    textAlign: 'center', 
    marginTop: responsiveSize(50), 
    paddingHorizontal: responsiveSize(20), 
  },
  cardWrapper: {
    width: isSmallDevice ? width * 0.9 : responsiveSize(300),
    aspectRatio: 342 / 242,
    marginBottom: responsiveSize(16),
    borderRadius: responsiveSize(16),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  card: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: responsiveSize(16),
  },
  cardGradient: {
    height: responsiveSize(50),
    justifyContent: 'flex-end',
  },
  cardTitle: {
    color: 'white',
    fontSize: isSmallDevice ? responsiveSize(18) : responsiveSize(16),
    fontWeight: '600',
    paddingLeft: responsiveSize(12),
    paddingBottom: responsiveSize(10),
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
flatListContent: {
  paddingTop: responsiveSize(isSmallDevice ? 210 : 210),
  alignItems: 'center',
},
});