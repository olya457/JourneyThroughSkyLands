import React, { useState, useEffect, useRef } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Share,
  Alert,
  Animated, 
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';

import SavedPlacesManager from '../utils/SavedPlacesManager'; 

const { width, height } = Dimensions.get('window');

const imageMap: { [key: string]: any } = {
  aoraki: require('../assets/aoraki.png'),
  bowen_falls: require('../assets/bowen_falls.png'),
  hobbiton: require('../assets/hobbiton.png'),
  milford: require('../assets/milford.png'),
  mirror_lakes: require('../assets/mirror_lakes.png'),
  nevis_highwire: require('../assets/nevis_highwire.png'),
  queenstown: require('../assets/queenstown.png'),
  sky_tower: require('../assets/sky_tower.png'),
  sutherland_falls: require('../assets/sutherland_falls.png'),
  waitomo: require('../assets/waitomo.png'),

};

type PlaceDetailRouteProp = RouteProp<RootStackParamList, 'PlaceDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PlaceDetailScreen() {
  const route = useRoute<PlaceDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { place } = route.params;

  const [showMap, setShowMap] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


  const cardOpacity = useRef(new Animated.Value(0)).current; 
  const cardScale = useRef(new Animated.Value(0.9)).current; 
  const mapOpacity = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const saved = await SavedPlacesManager.isSaved(place.title);
        setIsSaved(saved);
      } catch (error) {
        console.error("Failed to check saved status:", error);
      }
    };
    checkSavedStatus();

    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [place]);

  useEffect(() => {
    if (showMap) {
      Animated.timing(mapOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      mapOpacity.setValue(0);
    }
  }, [showMap]);

  const onShare = async () => {
    try {
     
      const shareMapUrl = `https://www.google.com/maps/search/?api=1&query=${place.coordinates.latitude},${place.coordinates.longitude}`;

      const shareMessage =
        `Check out ${place.title} in New Zealand!\n\n` +
        `${place.description}\n\n` + 
        `View on map: ${shareMapUrl}`;

      const result = await Share.share({
        message: shareMessage,
        url: shareMapUrl, 
        title: `Check out ${place.title} in New Zealand!`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log('Content shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error: any) {
      Alert.alert('Share Error', error.message);
    }
  };

  const onSaveToggle = async () => {
    try {
      if (isSaved) {
        await SavedPlacesManager.remove(place.title);
        Alert.alert('Place Removed', `${place.title} has been removed from saved places.`);
        setIsSaved(false);
      } else {
        await SavedPlacesManager.save(place);
        Alert.alert('Place Saved', `${place.title} added to saved places!`);
        setIsSaved(true);
        navigation.navigate('SavedLocations');
      }
    } catch (error: any) {
      Alert.alert('Save/Remove Error', error.message);
    }
  };

  const onOpenMap = () => {
    setShowMap(true);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/recommendations.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {}
        <View style={styles.headerBlock}>
          <Image
            source={require('../assets/group1.png')}
            style={styles.groupImage}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Recommendations for the visit</Text>
          </View>
        </View>

        {}
        <Animated.View
          style={[
            styles.detailCard,
            {
              opacity: cardOpacity,
              transform: [{ scale: cardScale }],
            },
          ]}
        >
          {showMap ? (
            <Animated.View style={[styles.mapContainer, { opacity: mapOpacity }]}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: place.coordinates.latitude,
                  longitude: place.coordinates.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: place.coordinates.latitude,
                    longitude: place.coordinates.longitude,
                  }}
                  title={place.title}
                  description={place.description}
                />
              </MapView>
              {}
              <TouchableOpacity
                onPress={() => setShowMap(false)}
                style={styles.backCircleMap}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FFF0B0', '#AD7942']}
                  style={styles.circleGradient}
                >
                  <Image
                    source={require('../assets/back_icon.png')}
                    style={styles.backIcon}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <>
              <View style={styles.imageContainer}>
                <Image
                  source={imageMap[place.imageName]}
                  style={styles.mainImage}
                  resizeMode="cover"
                />

                {}
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backCircle}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#FFF0B0', '#AD7942']}
                    style={styles.circleGradient}
                  >
                    <Image
                      source={require('../assets/back_icon.png')}
                      style={styles.backIcon}
                      resizeMode="contain"
                    />
                  </LinearGradient>
                </TouchableOpacity>

                {}
                <TouchableOpacity
                  style={styles.saveCircle}
                  onPress={onSaveToggle}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#FFF0B0', '#AD7942']}
                    style={styles.circleGradient}
                  >
                    <Image
                      source={require('../assets/saved_icon.png')}
                      style={[
                        styles.savedIcon,
                        { tintColor: isSaved ? 'black' : undefined } 
                      ]}
                      resizeMode="contain"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.contentArea}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.coordinates}>
                  Coordinates: {place.coordinates.latitude},{' '}
                  {place.coordinates.longitude}
                </Text>
                <Text style={styles.description}>{place.description}</Text>

                <View style={styles.buttonRow}>
                  {}
                  <TouchableOpacity style={styles.button} onPress={onOpenMap}>
                    <LinearGradient
                      colors={['#FFF0B0', '#AD7942']}
                      style={styles.gradientButton}
                    >
                      <Image
                        source={require('../assets/map_icon.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.buttonText}>Open on Map</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {}
                  <TouchableOpacity style={styles.button} onPress={onShare}>
                    <LinearGradient
                      colors={['#FFF0B0', '#AD7942']}
                      style={styles.gradientButton}
                    >
                      <Image
                        source={require('../assets/share_icon.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.buttonText}>Share</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}

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
    zIndex: 6,
  },
  textContainer: {
    position: 'absolute',
    bottom: 14,
    left: 20,
    zIndex: 7,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  detailCard: {
    width: width * 0.9,
    height: height < 700 ? 460 : 540,
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  imageContainer: {
    height: height < 700 ? 200 : 270,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backCircle: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  backCircleMap: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    zIndex: 1, 
  },
  saveCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  circleGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  backIcon: {
    width: 23,
    height: 18,
  },
  savedIcon: {
    width: 17,
    height: 24,
  },
  contentArea: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  coordinates: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 6,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginTop: 14,
    lineHeight: 20,
    flexShrink: 1, 
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  button: {
    width: width * 0.4,
    maxWidth: 145, 
    height: 46,
  },
  gradientButton: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  icon: {
    width: 21,
    height: 21,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});