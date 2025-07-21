import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 375; 
const scaleWidth = width / BASE_WIDTH;

const responsiveSize = (size: number) => Math.round(size * scaleWidth);

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 5000); 
    return () => clearTimeout(timeout);
  }, []);

  const glowAnim = useRef(new Animated.Value(0)).current;
  const centerScale = useRef(new Animated.Value(0.3)).current;
  const centerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.parallel([
      Animated.timing(centerScale, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
      Animated.timing(centerOpacity, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const pulseStyle = {
    transform: [
      {
        scale: glowAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.15],
        }),
      },
    ],
    opacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1],
    }),
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.blackBackground} />

      {}
      <Animated.Image
        source={require('../assets/glow_top.png')}
        style={[styles.topGlow, pulseStyle]}
        resizeMode="cover"
      />

      {}
      <View style={styles.centerImageWrapper}>
        <Animated.Image
          source={require('../assets/image_sky.png')}
          style={[
            styles.centerImage, 
            {
              transform: [{ scale: centerScale }],
              opacity: centerOpacity,
            },
          ]}
          resizeMode="contain"
        />
      </View>

      {}
      <View style={styles.webviewContainer}>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
              <html><head><style>
                body {
                  margin: 0;
                  background: #000;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                }
                .newtons-cradle {
                  --uib-size: 80px;
                  --uib-speed: 1.2s;
                  --uib-color: #FFFFFF;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: var(--uib-size);
                  height: var(--uib-size);
                }
                .newtons-cradle__dot {
                  position: relative;
                  display: flex;
                  align-items: center;
                  height: 100%;
                  width: 25%;
                  transform-origin: center top;
                }
                .newtons-cradle__dot::after {
                  content: '';
                  display: block;
                  width: 100%;
                  height: 25%;
                  border-radius: 50%;
                  background-color: var(--uib-color);
                }
                .newtons-cradle__dot:first-child {
                  animation: swing var(--uib-speed) linear infinite;
                }
                .newtons-cradle__dot:last-child {
                  animation: swing2 var(--uib-speed) linear infinite;
                }
                @keyframes swing {
                  0% { transform: rotate(0deg); animation-timing-function: ease-out; }
                  25% { transform: rotate(70deg); animation-timing-function: ease-in; }
                  50% { transform: rotate(0deg); animation-timing-function: linear; }
                }
                @keyframes swing2 {
                  0% { transform: rotate(0deg); animation-timing-function: linear; }
                  50% { transform: rotate(0deg); animation-timing-function: ease-out; }
                  75% { transform: rotate(-70deg); animation-timing-function: ease-in; }
                }
              </style></head><body>
                <div class="newtons-cradle">
                  <div class="newtons-cradle__dot"></div>
                  <div class="newtons-cradle__dot"></div>
                  <div class="newtons-cradle__dot"></div>
                  <div class="newtons-cradle__dot"></div>
                </div>
              </body></html>
            `,
          }}
          style={styles.webview}
          scrollEnabled={false}
        />
      </View>

      {}
      <Animated.Image
        source={require('../assets/glow_bottom.png')}
        style={[styles.bottomGlow, pulseStyle]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  blackBackground: {
  },
  centerImageWrapper: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: responsiveSize(453),
    height: responsiveSize(453),
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height * 0.25, 
    zIndex: 10,
  },
  webviewContainer: {
    position: 'absolute',
    bottom: responsiveSize(20), 
    width: '100%',
    height: responsiveSize(145), 
    zIndex: 10,
  },
  webview: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    pointerEvents: 'none', 
  },
  bottomGlow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.25, 
    zIndex: 11,
  },
});