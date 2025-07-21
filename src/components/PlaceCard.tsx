import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { Place } from '../data/places';

interface Props {
  place: Place;
}

const { width } = Dimensions.get('window');

const imageMap: { [key: string]: any } = {
  bowen_falls: require('../assets/bowen_falls.png'),
  aoraki: require('../assets/aoraki.png'),
  hobbiton: require('../assets/hobbiton.png'),
  milford: require('../assets/milford.png'),
  mirror_lakes: require('../assets/mirror_lakes.png'),
  nevis_highwire: require('../assets/nevis_highwire.png'),
  queenstown: require('../assets/queenstown.png'),
  sky_tower: require('../assets/sky_tower.png'),
  sutherland_falls: require('../assets/sutherland_falls.png'),
  waitomo: require('../assets/waitomo.png'),
};

export default function PlaceCard({ place }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const imageSource = imageMap[place.imageName];
  if (!imageSource) return null;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PlaceDetail', { place })}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={['#FFF0B0', '#AD7942']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{place.title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 4,
    borderRadius: 12,
    marginTop: 160,      
    marginLeft: -40,     
    marginBottom: -144,
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 12,
    width: width - 80,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
