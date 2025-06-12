import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text } from 'react-native';

const { height } = Dimensions.get('window');

function RectangleComp() {
  return (
    <ImageBackground
                    source={require('./../assets/images/Rectangle.png')}
                    style={styles.rect}
                    resizeMode="stretch"
                >
                    <Text style={styles.title}>Pliē</Text>
                    <Image style={styles.icon} source={require('./../assets/images/icon.png')}/>
                </ImageBackground>
  );
}

const styles = StyleSheet.create({
    rect: {
        height: height * 0.4,
        justifyContent:'space-between',
        paddingTop:20,
    },
    icon:{
        alignSelf:'center',
        marginBottom:20,
    },
    title: {
        fontFamily: 'Comfortaa-Regular',
        fontWeight: '400',
        fontSize: 72,
        lineHeight: 72,
        letterSpacing: -1.08,
        textAlign: 'center',
        color: '#000',
    },
});


export default RectangleComp;


