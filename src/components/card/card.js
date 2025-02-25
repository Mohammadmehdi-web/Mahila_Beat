import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Card = ({image, title, backgroundColor,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, {backgroundColor}]}>
        <Image source={image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "40%",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:"3%",
    elevation: 5,// For shadow effect on Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "80%",
    height: 100,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default Card;
