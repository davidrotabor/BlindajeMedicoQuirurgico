import { StyleSheet, Text, View, Image, TouchableOpacity, LogBox } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ArrowDown2, ArrowRight2, Card, Shop, ShopAdd } from 'iconsax-react-native'
import LogoNequi from '../../Assets/Icons/LogoNequi.png'
import { AuthContext } from '../../Context/AuthContext'

const ShoppingCartCobertura = ({ route }) => {
  const {setShopping, shopping, total} = useContext(AuthContext)
  // const {addItemCar} = useContext(AuthContext)
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ])

  console.log('doctorSelected: ', route.params?.doctorSelected)
  console.log('doctorsSelectedId: ', route.params?.doctorsSelectedId)
  console.log('Price: ', route.params?.price)

  const navigation = useNavigation()

  const [openPaimentMethod, setOpenPaimentMethod] = useState(!route.params?.car)
  

  const addShoppingCart = () => {
    const shoppingCartData = {
      nameC: route.params?.nameC,
      plan: route.params?.plan,
      price: route.params?.price,
      procedureTipe: route.params?.procedureTipe,
      values: route.params?.values,
      tipePaiment: 'Tarjeta',
      doctorSelected: route.params?.doctorSelected,
      doctorsSelectedId: route.params?.doctorsSelectedId,
      logoIcon: route.params?.logoIcon
    }
    setShopping([...shopping, shoppingCartData])

    navigation.navigate('AgregarServiciosStack')
  }

  const paimentCartAndAddShoppingCart = () => {
    if(route.params?.car){
      const shoppingCartData = {
        nameC: route.params?.nameC,
        plan: route.params?.plan,
        price: route.params?.price,
        procedureTipe: route.params?.procedureTipe,
        values: route.params?.values,
        tipePaiment: 'Tarjeta',
        doctorSelected: route.params?.doctorSelected,
        doctorsSelectedId: route.params?.doctorsSelectedId,
        logoIcon: route.params?.logoIcon,
      }
      setShopping([...shopping, shoppingCartData])
    }
    

    navigation.navigate('PaimentData')
  }


  const paymentNequi = () => {

    if(route.params?.car){
      const shoppingCartData = {
        nameC: route.params?.nameC,
        plan: route.params?.plan,
        price: route.params?.price,
        procedureTipe: route.params?.procedureTipe,
        values: route.params?.values,
        tipePaiment: 'Tarjeta',
        doctorSelected: route.params?.doctorSelected,
        doctorsSelectedId: route.params?.doctorsSelectedId,
        logoIcon: route.params?.logoIcon,
      }
      setShopping([...shopping, shoppingCartData])
    }
    

    navigation.navigate('PaymentNequi')
  }


  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Método de Pago',
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerTintColor: 'black',
      //for android
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16
      },
    })
  }, [navigation])

  return (
    <View style={styles.shoppingCartCoberturaContainer}>
      <View style={styles.shoppingCartCobertura}>
           {
            route.params?.car &&
            <TouchableOpacity style={styles.shoppingCartCobertura_method} onPress={addShoppingCart}>
              <View style={styles.shoppingCartCobertura_method_}>
                <ShopAdd size={30} color='black' />
                <View>
                  <Text style={styles.shoppingCartCobertura_methodFirstText}>Agregar al Carrito</Text>
                  <Text style={styles.shoppingCartCobertura_methodSecondText}>Continuar comprando</Text>
                </View>
                <ArrowRight2 size={25} color='#1B7BCC' />
              </View>
            </TouchableOpacity>
           } 
        <TouchableOpacity style={openPaimentMethod ? styles.shoppingCartCobertura_methodOpen : styles.shoppingCartCobertura_method} onPress={() => setOpenPaimentMethod(!openPaimentMethod)}>
          <View style={openPaimentMethod ? styles.shoppingCartCobertura_method_open : styles.shoppingCartCobertura_method_}>
            <Shop size={30} color={openPaimentMethod ? 'white' : 'black'} />
            <View>
              <Text style={openPaimentMethod ? styles.shoppingCartCobertura_methodFirstTextOpen : styles.shoppingCartCobertura_methodFirstText}>Ir a Pagar</Text>
              <Text style={openPaimentMethod ? styles.shoppingCartCobertura_methodSecondTextOpen : styles.shoppingCartCobertura_methodSecondText}>Carrito de Compra</Text>
            </View>
            {openPaimentMethod === true ?
              <ArrowDown2  size={25} color='white' />
              :
              <ArrowRight2 size={25} color='#1B7BCC' />
            }
          </View>
            {openPaimentMethod && 
              <View style={{width: '100%', alignItems: 'center'}}>
                <View style={styles.openPaimentMethod_card}>
                  <Text style={{ color: 'white' }}>Selecciona método de pago</Text>
                  <TouchableOpacity style={styles.openPaimentMethod_cardCredit} onPress={paimentCartAndAddShoppingCart}>
                    <View style={styles.shoppingCartCobertura_method_peq}>
                      <Card size={30} color='black' />
                      <View>
                        <Text style={styles.shoppingCartCobertura_methodFirstText}>Tarjeta de Crédito o Debito</Text>
                        <Text style={styles.shoppingCartCobertura_methodSecondText}>Paga con Visa o MasterCard</Text>
                      </View>
                      <ArrowRight2 size={25} color='#1B7BCC' />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.shoppingCartCobertura_method} onPress={paymentNequi}>
                    <View style={styles.shoppingCartCobertura_method_peq}>
                      <View>
                        <Image source={LogoNequi} style={styles.shoppingCartCobertura_methodNequi} />
                      </View>
                      <ArrowRight2 size={25} color='#1B7BCC' />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            }
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ShoppingCartCobertura

const styles = StyleSheet.create({
  shoppingCartCoberturaContainer: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  shoppingCartCobertura: {
    width: '80%',
    marginTop: 120
  },
  shoppingCartCobertura_method: {
    height: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    elevation: 5
  },
  shoppingCartCobertura_method_:{
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shoppingCartCobertura_methodFirstText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black'
  },
  shoppingCartCobertura_methodSecondText: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    color: 'black'
  },
  shoppingCartCobertura_methodNequi: {
    width: 125,
    height: 32
  },

  openPaimentMethod_card: {
    width: '85%',
    marginTop: 20
  },
  openPaimentMethod_cardCredit: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  shoppingCartCobertura_methodOpen: {
    height: 300,
    backgroundColor: '#1B7BCC',
    borderRadius: 20,
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    alignItems: 'center',
    marginTop: 25,
  },
  shoppingCartCobertura_method_open: {
    marginTop: 20,

    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shoppingCartCobertura_methodFirstTextOpen: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white'
  },
  shoppingCartCobertura_methodSecondTextOpen: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white'
  },
  shoppingCartCobertura_method_peq: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})



{/* <View style={styles.shoppingCartCobertura}>
    <Text>Selecciona método de pago</Text>
    <TouchableOpacity style={styles.shoppingCartCobertura_method} onPress={() => navigation.navigate('PaimentData', {plan: route.params?.plan, price: route.params?.price, procedureTipe: route.params?.procedureTipe, values: route.params?.values, tipePaiment: 'Tarjeta', doctorSelected: route.params?.doctorSelected})}>
      <View style={styles.shoppingCartCobertura_method_}>
        <Card size={30} color='black' />
        <View>
          <Text style={styles.shoppingCartCobertura_methodFirstText}>Tarjeta de Crédito o Debito</Text>
          <Text style={styles.shoppingCartCobertura_methodSecondText}>Paga con tu Visa o MasterCard</Text>
        </View>
        <ArrowRight2 size={25} color='#1B7BCC' />
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.shoppingCartCobertura_method} onPress={() => navigation.navigate('PaimentData', {plan: route.params?.plan, price: route.params?.price, values: route.params?.values, tipePaiment: 'Cuenta'})}>
      <View style={styles.shoppingCartCobertura_method_}>
        <View>
          <Image source={LogoNequi} style={styles.shoppingCartCobertura_methodNequi} />
        </View>
        <ArrowRight2 size={25} color='#1B7BCC' />
      </View>
    </TouchableOpacity>
  </View> */}

  // onPress={() => navigation.navigate('PaimentData', {plan: route.params?.plan, price: route.params?.price, values: route.params?.values, tipePaiment: 'Cuenta'})}