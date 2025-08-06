import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ServiceCard = ({ icon, name, description }) => {
  return (
    <View style={styles.serviceCard}>
      <View style={styles.serviceCard_}>
        <Image style={styles.serviceCard_image} source={icon} />
        <Text style={styles.serviceCard_name}>{name}</Text>
        <Text style={styles.serviceCard_description}>{description}</Text> 
      </View>
    </View>
  )
}

export default ServiceCard

const styles = StyleSheet.create({
    serviceCard: {
        width: 135,
        height: 160,
        backgroundColor: '#1B7BCC',
        borderRadius: 20,
        marginTop: 10,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 7,
    },
    serviceCard_: {
      width: '90%',
      maxHeight: '90%',
    },
    serviceCard_image: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      marginBottom: 5
    },
    serviceCard_name: {
        color: 'white',
        fontSize: 26,
        fontWeight: '900',
        lineHeight: 26,
        textTransform: 'uppercase',
        marginBottom: -2
    },
    serviceCard_description: {
      fontSize: 12,
      color: 'white',
      lineHeight: 12
    }
})