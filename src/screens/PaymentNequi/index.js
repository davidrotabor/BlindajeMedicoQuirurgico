import { Imge, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { REACT_APP_COBERTURA, TOKEN_WOMPI, API_WOMPI } from '@env'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormNequi from '../../components/FormNequi'
import { AuthContext } from '../../Context/AuthContext'
const PaimentData = ({ route, ...props }) => {
  const {setShopping, shopping} = useContext(AuthContext)
  const [acceptance_token, setacceptance_token]  = useState(false)
  const [Terminos, setTerminos]  = useState("#")
  const [requesting , setRequesting ]  = useState(false)
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

      
      const payment_method = {
        "type": "NEQUI",
        "phone_number": values.numberPhone
      }

      console.log({payment_method})
      console.log(acceptance_token, "TOKEN GENERADO")
     
      let price = 0;
        shopping.map((item)=>{
          console.log(item.price)
          price = parseFloat(price) + parseFloat(item.price.replace('.', ''));
          return price;
      })
  
      navigation.navigate("PaymentSummary", {
          randomCode : Math.random(),
          amount_in_cents  : price,
          payment_concept  : "Pago Poliza",
          payment_method   : payment_method,
          acceptance_token : acceptance_token,
      })

    }
   

    if(requesting){
      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1
        }}>
            <Text style={{

            }}>Espere un momento por favor . . .</Text>
        </View>)
    }


    useEffect(() => {
        navigation.setOptions({
            headerTitle: `Datos de la ${route.params?.tipePaiment}`,
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerTintColor: 'white'
        })
        
        }, [])

  return (
    <View style={styles.paimentData}>
      <Formik 
        initialValues={{
            numberPhone: "3991111111",
        }}
        validationSchema={Yup.object({
          numberPhone: Yup.string().typeError('El campo es requerido').required('El campo es requerido'),
        })}
        onSubmit={values => payCobertura(values)}
      >
        <FormNequi paimentVal={route.params?.price} />
      </Formik>
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