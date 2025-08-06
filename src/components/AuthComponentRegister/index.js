import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Hashtag, MessageText, PasswordCheck, User } from 'iconsax-react-native'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigation } from '@react-navigation/native'

const AuthComponentRegister = () => {
    const {register, setLoadingScreen} = useContext(AuthContext)
    const navigation = useNavigation()

    const [name, setName] = useState(null)
    const [identification, setIdentification] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [password_confirmation, setRepeatPassword_confirmation] = useState(null)

    const buttonRegister = () => {
        register(name, identification, email, password, password_confirmation)
        setLoadingScreen(true)
    }

  return (
    <>
      <View style={styles.authComponentRegister}>
        <Text style={styles.authComponentRegister_title}>Nombre</Text>
        <View style={styles.authComponentRegister_content}>
            <User size='20' color='black' style={{marginVertical: 8}} />
            <TextInput style={styles.authComponentRegister_componentInput} placeholder='Nombre Completo' placeholderTextColor='black' value={name} onChangeText={text => setName(text)} autoCapitalize='none' />
        </View>
      </View>
      <View style={styles.authComponentRegister}>
        <Text style={styles.authComponentRegister_title}>Identificación</Text>
        <View style={styles.authComponentRegister_content}>
            <Hashtag size='20' color='black' style={{marginVertical: 8}} />
            <TextInput style={styles.authComponentRegister_componentInput} placeholder='Número de identificación' placeholderTextColor='black' value={identification} onChangeText={text => setIdentification(text)} autoCapitalize='none' />
        </View>
      </View>
      <View style={styles.authComponentRegister}>
        <Text style={styles.authComponentRegister_title}>Email</Text>
        <View style={styles.authComponentRegister_content}>
            <MessageText size='20' color='black' style={{marginVertical: 8}} />
            <TextInput style={styles.authComponentRegister_componentInput} placeholder='Correo Electrónico' placeholderTextColor='black' value={email} onChangeText={text => setEmail(text)} autoCapitalize='none' />
        </View>
      </View>
      <View style={styles.authComponentRegister}>
        <Text style={styles.authComponentRegister_title}>Contraseña</Text>
        <View style={styles.authComponentRegister_content}>
            <PasswordCheck size='20' color='black' style={{marginVertical: 8}} />
            <TextInput style={styles.authComponentRegister_componentInput} placeholder='*********' placeholderTextColor='black' value={password} onChangeText={text => setPassword(text)} autoCapitalize='none' />
        </View>
      </View>
      <View style={styles.authComponentRegister}>
        <Text style={styles.authComponentRegister_title}>Repita Contraseña</Text>
        <View style={styles.authComponentRegister_content}>
            <PasswordCheck size='20' color='black' style={{marginVertical: 8}} />
            <TextInput style={styles.authComponentRegister_componentInput} placeholder='*********' placeholderTextColor='black' value={password_confirmation} onChangeText={text => setRepeatPassword_confirmation(text)} autoCapitalize='none' />
        </View>
      </View>
      <View style={styles.authComponentRegister_buttonContent}>
            <TouchableOpacity style={styles.authComponentRegister_button} onPress={buttonRegister}>
                <Text style={styles.authComponentRegister_buttonTitle}>Regístrate</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}

export default AuthComponentRegister

const styles = StyleSheet.create({
    authComponentRegister: {
        marginVertical: 10
    },
    authComponentRegister_title: {
        fontSize: 12,
        opacity: .5
    },
    authComponentRegister_content: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(27, 123, 204, .5)',
        // paddingVertical: 10,
        justifyContent: 'space-between',
        //for android
        alignItems: 'center'
    },
    authComponentRegister_componentInput: {
        width: '90%',
    },
    authComponentRegister_buttonContent: {
        alignItems: 'center',
        // marginTop: 20,
        marginVertical: 20
    },
    authComponentRegister_button: {
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
    authComponentRegister_buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
})