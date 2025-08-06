import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import FormCoberturaJuridicaComponent from '../../components/FormCoberturaJuridicaComponent'

const FormCoberturaJuridica = ({ route }) => {
  const navigation = useNavigation()

  const [id, setId] = useState('')
  const [plan, setPlan] = useState('')
  const [price, setPrice] = useState('')
  const [procedureTipe, setProcedureTipe] = useState('')
  const [nameC, setNameC] = useState('')
  const [logoIcon, setLogoIcon] = useState('')
  
  let date = new Date()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Formulario',
      headerTransparent: true,
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      //for android
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16
      },
    })

    setId(route.params?.id)
    setPlan(route.params?.plan)
    setPrice(route.params?.price)
    setProcedureTipe(route.params?.procedureTipe)
    setNameC(route.params?.name)
    setLogoIcon(route.params?.logoIcon)

  }, [navigation, date])


  return (
    <View style={styles.formCoberturaJuridica}>
      <View style={styles.formCoberturaJuridica_deader}>
        <ImageBackground style={styles.formCoberturaJuridica_deaderBackgroundImg} source={route.params?.backgroundImg}>
          <Text style={styles.formCoberturaJuridica_title}>{route.params?.name}</Text>
        </ImageBackground>
      </View>
      <View style={styles.formCoberturaJuridica_container}>
        <FormCoberturaJuridicaComponent id={id} plan={plan} price={price} procedureTipe={procedureTipe} nameC={nameC} logoIcon={logoIcon} />
      </View>
      <View style={styles.formCoberturaJuridica_logo}>
        <Image style={styles.formCoberturaJuridica_logoImg} source={route.params?.logoDetail} />
      </View>
    </View>
  )
}

export default FormCoberturaJuridica

const styles = StyleSheet.create({
  formCoberturaJuridica: {
    height: Dimensions.get('window').height,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  formCoberturaJuridica_deader: {
    height: 650,
    width: '100%',
  },
  formCoberturaJuridica_deaderBackgroundImg: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  formCoberturaJuridica_title: {
    marginTop: '22%',
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    maxWidth: 220,
    textAlign: 'center',
    lineHeight: 25
  },
  formCoberturaJuridica_container: {
    height: '75%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },

  formCoberturaJuridica_logo: {
    position: 'absolute',
    width: 85,
    height: 85,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    top: '19%'
  },
  formCoberturaJuridica_logoImg: {
    width: 70,
    height: 70
  }
})