import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import VerticalNavPanel from '../components/VerticalNavPanel';
import { places } from '../data/places';
import LinearGradient from 'react-native-linear-gradient';
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

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const headerAnim = useRef(new Animated.Value(-responsiveSize(100))).current;
  const panelAppearAnim = useRef(new Animated.Value(responsiveSize(100))).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
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
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(contentScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : Platform.OS === 'ios' ? 20 : 0;

  return (
    <ImageBackground
      source={require('../assets/recommendations.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.View
        style={[
          styles.headerBlock,
          {
            marginTop: STATUSBAR_HEIGHT + responsiveSize(isSmallDevice ? 5 : 14), 
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
          <Text style={styles.headerText}>Recommendations {'\n'} for the visit</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.navWrapper, { top: responsiveSize(20) + STATUSBAR_HEIGHT, transform: [{ translateX: panelAppearAnim }] }]}>
        <VerticalNavPanel />
      </Animated.View>

      <Animated.View
        style={[
          styles.contentRow,
          {
            opacity: contentOpacity,
            transform: [{ scale: contentScale }],
          },
        ]}
      >
        <View style={styles.transparentBox}>
          <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('PlaceDetail', { place: item })}
              >
                <View style={styles.cardWrapper}>
                  <ImageBackground
                    source={getImageByName(item.imageName)}
                    style={styles.cardImageBackground}
                    imageStyle={styles.cardImage}
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                      style={styles.titleOverlay}
                    >
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Animated.View>
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
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  unionImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: responsiveSize(60),
    height: height + responsiveSize(20),
    zIndex: 2,
  },
  navWrapper: {
    position: 'absolute',
    right: responsiveSize(8),
    zIndex: 10,
  },
  headerBlock: {
    width: isSmallDevice ? width * 0.95 : width * 0.9,
  height: isSmallDevice ? responsiveSize(190 + 10) : responsiveSize(211),
    backgroundColor: '#302E2E',
    borderRadius: responsiveSize(20),
    alignSelf: 'center',
    marginLeft: isSmallDevice ? 0 : responsiveSize(20),
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
  contentRow: {
    justifyContent: 'center',
    marginTop: responsiveSize(isSmallDevice ? 20 : 30),
    paddingHorizontal: responsiveSize(isSmallDevice ? 0 : 20),
    zIndex: 1,
    flex: 1,
  },
  transparentBox: {
    width: isSmallDevice ? width * 0.95 : responsiveSize(290),
    height: isSmallDevice ? responsiveSize(500) : responsiveSize(550),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: responsiveSize(12),
    overflow: 'hidden',
    padding: responsiveSize(2),
    alignSelf: 'center',
  },
  cardWrapper: {
    width: isSmallDevice ? width * 0.9 : '100%',
    aspectRatio: 342 / 242,
    marginBottom: responsiveSize(isSmallDevice ? 12 : 16),
    borderRadius: responsiveSize(16),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  cardImageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveSize(16),
  },
  titleOverlay: {
    paddingLeft: responsiveSize(6),
    paddingBottom: responsiveSize(10),
    height: responsiveSize(50),
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  cardTitle: {
    color: 'white',
    fontSize: isSmallDevice ? responsiveSize(18) : responsiveSize(18), 
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});