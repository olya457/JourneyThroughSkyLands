import React, { useEffect, useRef } from 'react';
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
} from 'react-native';
import VerticalNavPanel from '../components/VerticalNavPanel';
import { places } from '../data/places';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

const { width, height } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const headerAnim = useRef(new Animated.Value(-100)).current; 
  const navAnim = useRef(new Animated.Value(100)).current; 
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
        Animated.timing(navAnim, {
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/recommendations.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {}
        {}
        <Animated.View style={[styles.headerBlock, { transform: [{ translateY: headerAnim }] }]}>
          <Image
            source={require('../assets/group1.png')}
            style={styles.groupImage}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Recommendations for the visit</Text>
          </View>
        </Animated.View>

        {}
        {}
        <Animated.View style={[styles.navWrapper, { transform: [{ translateX: navAnim }] }]}>
          <VerticalNavPanel />
        </Animated.View>

        {}
        {}
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
                  <LinearGradient
                    colors={['#FFF0B0', '#AD7942']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cardWrapper}
                  >
                    <View style={styles.card}>
                      <Image
                        source={getImageByName(item.imageName)}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Animated.View>

        {}
        <Image
          source={require('../assets/union1.png')}
          style={styles.unionImage}
          resizeMode="stretch"
        />
      </ImageBackground>
    </SafeAreaView>
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
    width: 90,
    height: height + 20, 
    zIndex: 2, 
  },

  navWrapper: {
    position: 'absolute',
    top: height < 700 ? 10 : 30,
    right: 8,
    zIndex: 10,
  },
  headerBlock: {
    width: width * 0.9,
    height: height < 700 ? 160 : 211,
    backgroundColor: '#302E2E',
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: height < 700 ? 8 : 14,
    marginLeft: 20,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 5, 
  },
  groupImage: {
    position: 'absolute',
    top: -10,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 14,
    left: 20,
    zIndex: 2,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  contentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
    paddingHorizontal: 20,
    zIndex: 1, 
  },
  transparentBox: {
    width: 360,
    height: 550,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 8,
  },
  cardWrapper: {
    borderRadius: 12,
    padding: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  card: {
    width: 350,
     height: 180, 
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    padding: 6,
  },
});