import React, { useEffect, useRef } from 'react';
import {
 View,
 Text,
 StyleSheet,
 ImageBackground,
 Dimensions,
 Image,
 TouchableOpacity,
 Share,
 ScrollView, 
 Animated, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VerticalNavPanel from '../components/VerticalNavPanel';


const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 375; 
const BASE_HEIGHT = 812; 
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;

const LOGO_SCALE_FACTOR = 0.8;


const responsiveSize = (size: number) => Math.round(size * scaleWidth);

const responsiveHeight = (size: number) => Math.round(size * scaleHeight);


export default function AboutAppScreen() {
 const handleShare = async () => {
 try {
 await Share.share({
 message:
 'Discover breathtaking locations in New Zealand with Journey Through SkyLands!\nhttps://example.com',
 });
 } catch (error) {
 console.error('Error sharing:', error);
 }
 };

 const headerAnim = useRef(new Animated.Value(-responsiveSize(100))).current;
 const navAnim = useRef(new Animated.Value(responsiveSize(100))).current;
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
 <ImageBackground
 source={require('../assets/recommendations.png')}
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
 <Text style={styles.headerText}>About the app</Text>
 </View>
 </Animated.View>


 {}
 <Animated.View style={[styles.navWrapper, { transform: [{ translateX: navAnim }] }]}>
 <VerticalNavPanel />
 </Animated.View>


 {}
 <ScrollView
 style={styles.scrollViewContent} 
 contentContainerStyle={styles.scrollViewContainer} 
 >
 {}
 <View style={styles.mainContentArea}>
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
 <LinearGradient
 colors={['#FFF0B0', '#AD7942']}
 style={styles.cardBorder}
 >
 <View style={styles.mainCard}>
 <Image
 source={require('../assets/logo.png')}
 style={styles.logo}
 resizeMode="contain"
 />


 <Text style={styles.descriptionText}>
 Journey Through Sky Lands is your personal travel companion across
 the breathtaking landscapes of New Zealand.
 {'\n\n'}
 Designed for curious explorers and adventure seekers, the app helps
 you discover top destinations, save your favorite spots, and
 navigate the country with ease. Whether you’re hiking alpine
 trails, exploring coastal towns, or immersing yourself in Māori
 culture, everything you need is in one place.
 </Text>


 <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
 <LinearGradient
 colors={['#FFF0B0', '#AD7942']}
 style={styles.buttonBackground}
 >
 <View style={styles.buttonContent}>
 <Image
 source={require('../assets/share_icon.png')}
 style={styles.shareIcon}
 resizeMode="contain"
 />
 <Text style={styles.buttonText}>Share the app</Text>
 </View>
 </LinearGradient>
 </TouchableOpacity>
 </View>
 </LinearGradient>
 </Animated.View>
 </View>
 </ScrollView>


 {}
 <Image
 source={require('../assets/union1.png')}
 style={styles.unionImage}
 resizeMode="stretch"
 />
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

 scrollViewContent: {
 flex: 1, 

 },
 scrollViewContainer: {
 flexGrow: 1, 
 justifyContent: 'center', 
 paddingTop: responsiveHeight(20), 
 paddingBottom: responsiveHeight(20), 
 },

 mainContentArea: {

 alignItems: 'flex-start', 
 paddingLeft: responsiveSize(20), 
 paddingRight: responsiveSize(20),
 },
 contentRow: {
 zIndex: 1,
 },
 cardBorder: {
 width: responsiveSize(290), 
 padding: responsiveSize(2),
 borderRadius: responsiveSize(22),
 },
 mainCard: {
 flex: 1, 
 backgroundColor: '#302E2E',
 borderRadius: responsiveSize(20),
 padding: responsiveSize(18),
 },
 logo: {
 width: Math.round(127 * scaleWidth * LOGO_SCALE_FACTOR),
 height: Math.round(127 * scaleWidth * LOGO_SCALE_FACTOR),
 alignSelf: 'center',
 marginBottom: responsiveSize(16),
 },
 descriptionText: {
 color: '#CCCCCC',
 fontSize: responsiveSize(14),
 lineHeight: responsiveSize(20),
 flexGrow: 1, 
 marginBottom: responsiveSize(20), 
 },
 shareButton: {
 alignSelf: 'center',
 marginTop: responsiveSize(20),
 },
 buttonBackground: {
 width: responsiveSize(162),
 height: responsiveSize(42),
 borderRadius: responsiveSize(21),
 justifyContent: 'center',
 alignItems: 'center',
 },
 buttonContent: {
 flexDirection: 'row',
 alignItems: 'center',
 },
 shareIcon: {
 width: responsiveSize(8),
 height: responsiveSize(13),
 marginRight: responsiveSize(6),
 },
 buttonText: {
 fontSize: responsiveSize(14),
 color: '#000000',
 fontWeight: '600',
 },
 unionImage: {
 position: 'absolute',
 top: 0,
 right: 0,
 width: responsiveSize(60),
 height: height + responsiveSize(20),
 zIndex: 2,
 },
});