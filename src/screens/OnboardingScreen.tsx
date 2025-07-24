import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import Video from 'react-native-video'; 

const { height } = Dimensions.get('window');
const isSmallScreen = height < 700;

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const animatedY = useRef(new Animated.Value(0)).current;
  const animatedY3 = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    if (currentIndex === 1) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedY, {
            toValue: -10,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(animatedY, {
            toValue: 10,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animatedY.stopAnimation();
      animatedY.setValue(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === 2) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedY3, {
            toValue: -10,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(animatedY3, {
            toValue: 10,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {

      animatedY3.stopAnimation();
      animatedY3.setValue(0);
    }
  }, [currentIndex]);


  const handleNext = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Home');
    }
  };

  const onboardingTexts = [
    "Hi, I'm your guide Liam. Together we'll discover the best parts of New Zealand - from volcanoes to fjords, from Maori legends to modern cities.",
    'Save your favorite locations and travel in comfort. Everything you need.',
    'New Zealand is not only about landscapes, but also history, culture and incredible facts that will surprise even the most experienced traveler.',
  ];

  return (
    <View style={styles.container}>
      {}
      <View style={styles.leftContainer}>
        <View style={styles.contentWrapper}>
          {}
          {currentIndex === 0 && (
            <Video 
              source={require('../assets/videos/onboarding_video.mp4')}
              style={[
                styles.media,
                isSmallScreen ? styles.videoSmall : styles.videoLarge,
              ]}
              resizeMode="cover"
              muted
              repeat
              paused={false}
            />
          )}

          {}
          {currentIndex === 1 && (
            <View style={styles.overlayContainer}>
              <Image
                source={require('../assets/image_hotoroom.png')}
                style={[
                  styles.baseImage,
                  isSmallScreen ? styles.imageSmall : styles.imageLarge,
                ]}
                resizeMode="cover"
              />
              <Animated.Image
                source={require('../assets/image2_hotoroom.png')}
                style={[
                  styles.overlayImage,
                  isSmallScreen ? styles.image2Small : styles.image2Large,
                  { transform: [{ translateY: animatedY }] }
                ]}
                resizeMode="contain"
              />
            </View>
          )}

          {}
          {currentIndex === 2 && (
            <View style={styles.overlayContainer}>
              <Image
                source={require('../assets/image_hotoroom.png')}
                style={[
                  styles.baseImage,
                  isSmallScreen ? styles.imageSmall : styles.imageLarge,
                ]}
                resizeMode="cover"
              />
              <Animated.Image
                source={require('../assets/image3_hotoroom.png')}
                style={[
                  styles.overlayImage,
                  isSmallScreen ? styles.image3Small : styles.image3Large,
                  { transform: [{ translateY: animatedY3 }] } 
                ]}
                resizeMode="contain"
              />
            </View>
          )}

          {}
          <View style={[styles.textContainer, { marginTop: isSmallScreen ? 30 : 60 }]}>
            <Text style={[styles.text, isSmallScreen && styles.textSmall]}>
              {onboardingTexts[currentIndex]}
            </Text>
          </View>
        </View>
      </View>

      {}
      <Pressable style={styles.rightContainer} onPress={handleNext}>
        <Image
          source={require('../assets/vector_union.png')}
          style={styles.vectorUnion}
          resizeMode="cover"
        />
      </Pressable>

      {}
      <View style={styles.paginationWrapper}>
        {[0, 1, 2].map((i) => (
          <Image
            key={i}
            source={
              currentIndex === i
                ? require('../assets/dot_active.png')
                : require('../assets/dot_inactive.png')
            }
            style={styles.dot}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#101010',
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 120,
  },

  media: {
    borderRadius: 12,
  },
  videoLarge: {
    width: 381,
    height: 566,
    marginLeft: -30,
  },
  videoSmall: {
    width: 300,
    height: 420,
    marginLeft: 0,
  },

  textContainer: {
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    lineHeight: 24,
  },
  textSmall: {
    fontSize: 14,
    lineHeight: 20,
  },

  overlayContainer: {
    width: '100%',
    height: isSmallScreen ? 420 : 566,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  baseImage: {
    alignSelf: 'center',
    marginTop: isSmallScreen ? 30 : 60,
    width: isSmallScreen ? 320 : 401,
    height: isSmallScreen ? 420 : 566,
    marginLeft: isSmallScreen ? 140 : 160,
  },
  imageLarge: {
    width: 381,
    height: 566,
  },
  imageSmall: {
    width: 300,
    height: 420,
  },
  overlayImage: {
    position: 'absolute',
    top: isSmallScreen ? 40 : 60,
    left: isSmallScreen ? 0 : -20,
    alignSelf: 'center',
  },
  image2Large: {
    width: 422,
    height: 422,
  },
  image2Small: {
    width: 280,
    height: 280,
  },
  image3Large: {
    width: 377,
    height: 377,
  },
  image3Small: {
    width: 260,
    height: 260,
  },

  paginationWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    marginHorizontal: 6,
  },

  rightContainer: {
    width: 138,
    height: height,
    position: 'relative',
  },
  vectorUnion: {
    width: '100%',
    height: '100%',
  },
});