import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import AuthComponent from '../../components/AuthComponent'
import AuthBackgroundImg from '../../Assets/Icons/AuthBackgroundImg.jpg'
import AuthComponentRegister from '../../components/AuthComponentRegister'
import { AuthContext } from '../../Context/AuthContext'
import LoadingScreen from '../LoadingScreen'

const Register = () => {
  const {loadingScreen} = useContext(AuthContext)

  return (
    <ImageBackground source={AuthBackgroundImg} style={styles.authBackgroundImg}>
      {loadingScreen === true ? 
        <LoadingScreen />
        :
        <>
          <View style={styles.login}>
            <Text style={styles.login_title}>Blindaje Quirúrgico</Text>
          </View>
          <View style={styles.loginContent}>
            <View style={styles.loginContent_}>
              <AuthComponent autContentTitle='Nuevo Usuario' />
              <ScrollView style={styles.loginContent_inputs} showsVerticalScrollIndicator={false}>
                <AuthComponentRegister />
              </ScrollView>
            </View>
          </View>
        </>
      }
    </ImageBackground>
  )
}

export default Register

const styles = StyleSheet.create({
  authBackgroundImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  login: {
    height: '25%',
    justifyContent: 'center',
  },
  login_title: {
      width: 300,
      fontSize: 35,
      textAlign: 'center',
      lineHeight: 34,
      fontWeight: '700',
      color: 'white'
  },
  loginContent: {
    width: '100%',
    height: '75%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContent_: {
    width: '80%',
    height: '87%',
    alignItems: 'center'
  },
  loginContent_inputs: {
    marginVertical: 10
  }
})