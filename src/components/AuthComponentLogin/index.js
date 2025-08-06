import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { MessageText } from 'iconsax-react-native'
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../../Context/AuthContext'

const AuthComponentLogin = () => {
    const {login} = useContext(AuthContext)

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

  return (
    <>
        <View style={styles.authComponentLogin}>
            <Text style={styles.authComponentLogin_title}>Email</Text>
            <View style={styles.authComponentLogin_content_}>
                <MessageText size='20' color='black' style={{marginVertical: 8}} />
                <TextInput style={styles.authComponentLogin_contentInput} placeholder='Correo Electrónico' placeholderTextColor='black' value={email} onChangeText={text => setEmail(text)} autoCapitalize='none' />
            </View>
        </View>
        <View style={styles.authComponentLogin}>
            <Text style={styles.authComponentLogin_title}>Contraseña</Text>
            <View style={styles.authComponentLogin_content_}>
                <MessageText size='20' color='black' style={{marginVertical: 8}} />
                <TextInput style={styles.authComponentLogin_contentInput} placeholder='*********' placeholderTextColor='black' value={password} onChangeText={text => setPassword(text)} autoCapitalize='none' />
            </View>
        </View>
        <View style={styles.authComponentLogin_ButtonContent}>
            <TouchableOpacity style={styles.authComponentLogin_Button} onPress={() => {login(email, password)}}>
                <Text style={styles.authComponentLogin_ButtonTitle}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}

export default AuthComponentLogin

const styles = StyleSheet.create({
    authComponentLogin: {
        marginVertical: 10
    },
    authComponentLogin_title: {
        fontSize: 12,
        opacity: .5
    },
    authComponentLogin_content_: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(27, 123, 204, .5)',
        // paddingVertical: 10,
        alignItems: 'center',
        //add for android
        justifyContent: 'space-between',
    },
    authComponentLogin_contentInput: {
        width: '90%',
    },
    authComponentLogin_ButtonContent: {
        alignItems: 'center',
        marginTop: 20
    },
    authComponentLogin_Button: {
        width: '80%',
        height: 60,
        backgroundColor: '#1B7BCC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
    },
    authComponentLogin_ButtonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
})