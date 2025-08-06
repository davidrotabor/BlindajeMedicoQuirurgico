import { Imge, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { REACT_APP_COBERTURA, TOKEN_WOMPI, API_WOMPI } from '@env'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormPaimentData from '../../components/FormPaimentData'
import { AuthContext } from '../../Context/AuthContext'
import LoadingScreen from '../LoadingScreen'

const PaimentData = ({ route, ...props }) => {
  const {setShopping, shopping, setLoadingScreen, loadingScreen} = useContext(AuthContext)
  const [acceptance_token, setacceptance_token]  = useState(false)
  const [Terminos, setTerminos]  = useState("#")
  console.log('carrito de compra en paimentData: ', shopping)

  console.log(route.params?.price, "SS")
    const navigation = useNavigation()


    useEffect(()=>{
      axios.get(`${API_WOMPI}merchants/${TOKEN_WOMPI}`).then(function (response) {
          const acceptance_token = response.data.data.presigned_acceptance.acceptance_token
          setacceptance_token(acceptance_token)
          setTerminos(response.data.data.presigned_acceptance.permalink)
      })
        .catch(function (error) {
            console.log('Error al enviar formulario')
            console.log(error);
            console.log(error.response);
        })
  }, [])

    const payCobertura = (values) => {
      setLoadingScreen(true)
      let price = 0;
        shopping.map((item)=>{
          console.log(item.price)
          price = parseFloat(price) + parseFloat(item.price.replace('.', ''));
          return price;
        })
  
      const exp_month = values.expCard.split("/")[0];
      const exp_year = values.expCard.split("/")[1];
      const data_card = {
        "number"      : values.numCard,
        "cvc"         : values.cvcCard, 
        "exp_month"   : exp_month, 
        "exp_year"    : exp_year, 
        "card_holder" : values.nameCard
      }


      const config = {
        headers: {
          "Authorization": `Bearer ${TOKEN_WOMPI}`,
        }
      }

      axios.post(`${API_WOMPI}/tokens/cards`, data_card, config).then(function (response) {
        console.log(response.data.data.id, "Token Tarjeta")

        const token_card = response.data.data.id

        const payment_method = {
            "type": "CARD",
            "token": token_card,
            "installments": 1,
        }

        navigation.navigate("PaymentSummary", {
          randomCode : Math.random(),
          amount_in_cents  : price,
          payment_concept  : "Pago Poliza",
          payment_method   : payment_method,
          data_card,
          acceptance_token : acceptance_token,
        })

        setLoadingScreen(false)

      }).catch(function (error) {
        console.log('Error al enviar formulario')
         console.log(error);
        console.log(error.response, "EL ERROR");
      })

    }

    




    // const payCobertura = (values) => {
    //   shopping.map((data, index) => {
    //     return (axios.post(`${REACT_APP_COBERTURA}/register`, {
    //       plan: data.plan, price: data.price, procedureTipe: data.procedureTipe, doctor_id: data.doctorsSelectedId, fullNameP: data.values.fullNameP, identificationP: data.values.identificationP, directionP: data.values.directionP, phoneP: data.values.phoneP, nitC: data.values.nitC, directionC: data.values.directionC, cityC: data.values.cityC, datePro: data.values.datePro.toLocaleDateString(), timePro: data.values.timePro.toLocaleTimeString()
    //     }).then(res => {
    //         console.log('Paciente Registrado Con Éxito')
    //         navigation.navigate('Homee')
    //         setShopping([])
    //     }).catch(e => {
    //         console.log('Error!', e.response)
    //     })
    //   )})
    // }

  //   const payCobertura = async (values) => {
  //     await axios.post(`${REACT_APP_COBERTURA}/register`, {
  //         plan: route.params?.plan, price: route.params?.price, procedureTipe: route.params?.procedureTipe, doctor_id: route.params?.doctorSelected[0].id , fullNameP: route.params?.values.fullNameP, identificationP: route.params?.values.identificationP, directionP: route.params?.values.directionP, phoneP: route.params?.values.phoneP, nitC: route.params?.values.nitC, directionC: route.params?.values.directionC, cityC: route.params?.values.cityC, datePro: route.params?.values.datePro.toLocaleDateString(), timePro: route.params?.values.timePro.toLocaleTimeString()
  //     }).then(res => {
  //         console.log('Paciente Registrado Con Éxito')
  //         navigation.navigate('Homee')
  //         setShopping([])
  //     }).catch(e => {
  //         console.log('Error!', e.response)
  //     })
  // }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Datos de la tarjeta',
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerTintColor: 'white',
            //for android
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 16
            },
        })
        }, [navigation])

  return (
    <View style={styles.paimentData}>
      {loadingScreen === true ?
        <LoadingScreen />
        :
        <Formik 
          initialValues={{
              nameCard: "carlos Cardenas",
              numCard: "4242424242424242",
              expCard: "12/24",
              cvcCard: "798"
          }}
          validationSchema={Yup.object({
              nameCard: Yup.string().typeError('El campo es requerido').required('El campo es requerido'),
              numCard: Yup.number().typeError('El campo debe ser de tipo numérico').required('El campo es requerido'),
              expCard: Yup.string().typeError('El campo es requerido').required('El campo es requerido'),
              cvcCard: Yup.number().typeError('El campo debe ser de tipo numérico').required('El campo es requerido')
          })}
          onSubmit={values => payCobertura(values)}
        >
          <FormPaimentData paimentVal={route.params?.price} />
        </Formik>

      }
    </View>
  )
}

export default PaimentData

const styles = StyleSheet.create({
    paimentData: {
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    }
})

// doctor_id: data.doctorSelected[0].id