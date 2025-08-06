import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const AuthComponentInput = ({ titleInput, iconInput, inputPlaceholder, isPassword, value }) => {
  return (
    <View style={styles.authComponentInput}>
        <Text style={styles.authComponentInput_title}>{titleInput}</Text>
        <View style={styles.authComponentInput_content_}>
            {iconInput}
            <TextInput placeholder={inputPlaceholder} style={styles.authComponentInput_contentInput} placeholderTextColor='black' secureTextEntry={isPassword} value={value} onChange={text => value} />
        </View>
    </View>
  )
}

export default AuthComponentInput

const styles = StyleSheet.create({
    authComponentInput: {
        marginVertical: 10
    },
    authComponentInput_title: {
        fontSize: 12,
        opacity: .5
    },
    authComponentInput_content_: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(27, 123, 204, .5)',
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    authComponentInput_contentInput: {
        width: '90%'
    }
})