import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Navbar = () => {
  return (
    <View style={styles.navbar}>
        <View style={styles.navbarContent}>
            <Text>Alert</Text>
            <Text>Hola Cliente</Text>
            <Text>Icon</Text>
        </View>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        height: 100,
        width: '100%',
        alignItems: 'center'
    },
    navbarContent: {
        width: '90%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})