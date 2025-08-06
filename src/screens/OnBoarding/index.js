import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import AuthBackgroundImg from '../../Assets/Icons/AuthBackgroundImg.jpg'
import { useNavigation } from '@react-navigation/native'

const OnBoarding = () => {
    const navigation = useNavigation()
  return (
    <ImageBackground style={styles.onBoarding} source={AuthBackgroundImg}>
        <View style={styles.onBoarding_}>
            <Text style={styles.onBoarding_title}>Blindaje Quirúrgico</Text>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={[styles.onBoarding_buttons, {backgroundColor: '#1B7BCC'}]}>
                    <Text style={{ color: 'white' }}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[styles.onBoarding_buttons, {backgroundColor: 'white'}]}>
                    <Text style={{ color: '#1B7BCC' }}>Regístrate</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
    onBoarding: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    onBoarding_: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    onBoarding_title: {
        width: 290,
        fontSize: 34,
        textAlign: 'center',
        lineHeight: 38,
        fontWeight: '700',
        color: 'white'
    },
    onBoarding_buttons: {
        width: 280,
        height: 60,
        marginVertical: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
    }
})