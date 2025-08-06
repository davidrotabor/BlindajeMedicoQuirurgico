import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AuthComponentButton = ({ buttonTitle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.authComponentButton}>
        <Text style={styles.authComponentButton_title}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

export default AuthComponentButton

const styles = StyleSheet.create({
    authComponentButton: {
        width: '80%',
        height: 60,
        backgroundColor: '#1B7BCC',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 20,
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
    },
    authComponentButton_title: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
})