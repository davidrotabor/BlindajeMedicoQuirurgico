import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AuthComponent = ({ autContentTitle }) => {
  return (
    <View style={styles.autContentTitle}>
      <Text style={styles.AuthComponent_title}>{autContentTitle}</Text>
    </View>
  )
}

export default AuthComponent

const styles = StyleSheet.create({
  autContentTitle: {
    width: '100%'
  },
  AuthComponent_title: {
      fontSize: 25,
      width: 150,
      fontWeight: '700',
      lineHeight: 24,
      color: 'black'
  },
})