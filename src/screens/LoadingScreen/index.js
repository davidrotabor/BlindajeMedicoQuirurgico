import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import BlindajeLogo from '../../Assets/Icons/BlindajeLogo.png'

const LoadingScreen = () => {
  return (
    <View style={styles.loadingScreen}>
      <Image source={BlindajeLogo} />
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  loadingScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})