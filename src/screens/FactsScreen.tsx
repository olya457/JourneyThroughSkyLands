import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Share,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VerticalNavPanel from '../components/VerticalNavPanel';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 375;
const scale = width / BASE_WIDTH;
const responsiveSize = (size: number) => Math.round(size * scale);

const facts = [
  {
    title: 'Land of the Long White Cloud',
    description:
      'The Māori name for New Zealand is Aotearoa, which means “Land of the Long White Cloud”.',
  },
  {
    title: 'No Snakes, No Worries',
    description:
      'Unlike many other countries, New Zealand has no native snakes — not even in the wild.',
  },
  {
    title: 'Home of Middle-earth',
    description:
      'Much of The Lord of the Rings was filmed in NZ. Hobbiton and Fiordland became iconic sets.',
  },
  {
    title: 'The Bird That Can’t Fly',
    description:
      'The kiwi, a flightless and nocturnal bird, is a national symbol and found only in NZ.',
  },
  {
    title: 'Glowworm Caves',
    description:
      'Waitomo Caves glow naturally thanks to thousands of bioluminescent glowworms.',
  },
  {
    title: 'Southernmost Capital',
    description:
      'Wellington is the southernmost capital city in the world and is full of culture.',
  },
  {
    title: 'Earthquakes Are Common',
    description:
      'Located on the Ring of Fire, NZ experiences frequent minor quakes.',
  },
  {
    title: 'Ancient Trees',
    description:
      'Tāne Mahuta is a 2,000-year-old kauri tree revered by the Māori as “The Lord of the Forest”.',
  },
  {
    title: 'Three Official Languages',
    description:
      'English, Te Reo Māori, and NZ Sign Language are all official languages in New Zealand.',
  },
  {
    title: 'Sheep Outnumber People',
    description:
      'With 25 million sheep and 5 million people, NZ has 5 times more sheep than residents.',
  },
];

export default function FactsScreen() {
  const [index, setIndex] = useState(0);

  const headerAnim = useRef(new Animated.Value(-responsiveSize(100))).current;
  const navAnim = useRef(new Animated.Value(responsiveSize(100))).current;

  const factCardAnimX = useRef(new Animated.Value(0)).current;
  const factCardAnimOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(navAnim, {
        toValue: 0,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNextFact = () => {
    Animated.parallel([
      Animated.timing(factCardAnimX, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(factCardAnimOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex((prev) => (prev + 1) % facts.length);
      factCardAnimX.setValue(width);
      factCardAnimOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(factCardAnimX, {
          toValue: 0,
          duration: 400,
          delay: 100,
          useNativeDriver: true,
        }),
        Animated.timing(factCardAnimOpacity, {
          toValue: 1,
          duration: 400,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleShare = async () => {
    try {
      const shareUrl = 'https://www.google.com/search?q=New+Zealand+Facts';
      await Share.share({
        message: `Did you know?\n\n${facts[index].title}\n${facts[index].description}\n\nDiscover more facts about New Zealand!`,
        url: shareUrl,
        title: 'New Zealand Facts',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const current = facts[index];

  return (
    <ImageBackground
      source={require('../assets/facts_about.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {}
      <Animated.View style={[styles.headerBlock, { transform: [{ translateY: headerAnim }] }]}>
        <Image
          source={require('../assets/group1.png')}
          style={styles.groupImage}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Facts about New Zealand</Text>
        </View>
      </Animated.View>

      {}
      <View style={styles.mainContentArea}>
        {}
        <Animated.View
          style={[
            styles.contentRow,
            {
              transform: [{ translateX: factCardAnimX }],
              opacity: factCardAnimOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 240, 176, 0)', 'rgba(173, 121, 66, 0)']}
            style={styles.gradientBorder}
          >
            <View style={styles.transparentBox}>
              {}
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <LinearGradient
                  colors={['#FFF0B0', '#AD7942']}
                  style={styles.shareCircle}
                >
                  <Image
                    source={require('../assets/share_icon.png')}
                    style={styles.shareIcon}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.cardTitle}>{current.title}</Text>
              <Text style={styles.cardText}>{current.description}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {}
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleNextFact}>
          <LinearGradient
            colors={['#FFF0B0', '#AD7942']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require('../assets/were.png')}
                style={styles.wereIcon}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Generate a new fact</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {}
      <Animated.View style={[styles.navWrapper, { transform: [{ translateX: navAnim }] }]}>
        <VerticalNavPanel />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  navWrapper: {
    position: 'absolute',
    top: height < 700 ? responsiveSize(10) : responsiveSize(30),
    right: responsiveSize(8),
    zIndex: 10,
  },
  headerBlock: {
    width: width * 0.9,
    height: height < 700 ? responsiveSize(160) : responsiveSize(211),
    backgroundColor: '#302E2E',
    borderRadius: responsiveSize(20),
    alignSelf: 'flex-start',
    marginTop: height < 700 ? responsiveSize(8) : responsiveSize(14),
    marginLeft: responsiveSize(20),
    overflow: 'hidden',
    position: 'relative',
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
  mainContentArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingTop: responsiveSize(100),
    paddingBottom: responsiveSize(40),
  },
  contentRow: {
    zIndex: 1,
    width: '100%',
    alignItems: 'center', 
  },
  gradientBorder: {
    padding: responsiveSize(2),
    borderRadius: responsiveSize(14),
    width: responsiveSize(277),
    height: responsiveSize(264),
  },
  transparentBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: responsiveSize(12),
    padding: responsiveSize(14),
    justifyContent: 'center',
    position: 'relative',
    width: responsiveSize(273),
    height: responsiveSize(260),
  },
  cardTitle: {
    color: '#FFF0B0',
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    marginBottom: responsiveSize(10),
    paddingRight: responsiveSize(40),
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: responsiveSize(14),
    lineHeight: responsiveSize(20),
  },
  shareButton: {
    position: 'absolute',
    top: responsiveSize(10),
    right: responsiveSize(10),
    zIndex: 2,
  },
  shareCircle: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    borderRadius: responsiveSize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    width: responsiveSize(17),
    height: responsiveSize(17),
  },
  buttonWrapper: {
  },
  button: {
    width: responsiveSize(225),
    height: responsiveSize(66),
    borderRadius: responsiveSize(33),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wereIcon: {
    width: responsiveSize(20),
    height: responsiveSize(20),
    marginRight: responsiveSize(8),
  },
  buttonText: {
    color: '#000000',
    fontSize: responsiveSize(16),
    fontWeight: '600',
  },
});