import React, { useContext } from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import AuthBackgroundImg from '../../Assets/Icons/AuthBackgroundImg.jpg'
import AuthComponent from '../../components/AuthComponent'
import AuthComponentLogin from '../../components/AuthComponentLogin'
import { AuthContext } from '../../Context/AuthContext'
import LoadingScreen from '../LoadingScreen'

const Login = () => {
  const {loadingScreen} = useContext(AuthContext)

  return (
    <ImageBackground source={AuthBackgroundImg} style={styles.authBackgroundImg}>
      {loadingScreen === true ?
        <>
          <LoadingScreen />
        </>
        :
        <>
          <View style={styles.login}>
            <Text style={styles.login_title}>Blindaje Quirúrgico</Text>
          </View>
          <View style={styles.loginContent}>
            <View style={styles.loginContent_}>
              <AuthComponent autContentTitle='Bienveniedo de Vuelta' />
              <View style={styles.loginContent_inputs}>
                <AuthComponentLogin />
              </View>
            </View>
          </View>
        </>
      }
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
  authBackgroundImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  login: {
    height: '27%',
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
    height: '73%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContent_: {
    width: '80%',
    height: '85%',
    alignItems: 'center'
  },
  loginContent_inputs: {
    marginVertical: 20
  }
})