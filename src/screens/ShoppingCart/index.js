import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import ShoppingSingleCart from './ShoppingSingleCart'
import { useNavigation } from '@react-navigation/native'

const ShoppingCart = () => {
  const navigation = useNavigation()
  const {shopping, setShopping, total, setTotal} = useContext(AuthContext)

  console.log('productos en carrito: ', shopping)
  console.log('length: ', shopping.length)
  
  const deleteCobertureCart = (item) => {
    const newCobertureList = shopping.filter((elements) => elements !== item)
    setShopping(newCobertureList)
  }

  const sumaPrice = () => {
    const sumatoria = shopping.reduce((sum, value) => (
      typeof value.price == "string" ?
      sum + parseFloat(value.price) : sum
    ), 0)
    setTotal(sumatoria)
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Carrito de Compra',
      headerTintColor: 'black',
      headerBackTitleVisible: false,
      //for android
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16
      },
    })
    sumaPrice()
  }, [navigation, shopping])

  return (
    <View style={styles.shoppingCart}>
      {shopping.length !== 0 ?
        <>
          <View style={{ width: '90%', height: '70%' }}>
            <FlatList data={shopping} keyExtractor={(item) => item.values.fullNameP} renderItem={({item}) => <ShoppingSingleCart title={item.nameC} img={item.logoIcon} doctorOne={item.doctorSelected[0].name} doctorTwo={item.doctorSelected[1]?.name} patient={item.values.fullNameP} price={item.price} onPress={() => deleteCobertureCart(item)} />} />
          </View>
          <View style={{width: '80%', height: 120, justifyContent: 'center'}}>
            <View style={{width: '100%', height: '80%', justifyContent: 'space-between'}}>
              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black'}}>Pagar</Text>
                <Text style={{color: 'black'}}>{total}.000</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.shoppingCart_button} onPress={() => navigation.navigate('PaimentData', {total: total, car: false})}>
                  <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>Ir a Pagar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
        :
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Text style={{color: 'black'}}>Carrito de compra vacío</Text>
        </View>
      }
    </View>
  )
}

export default ShoppingCart

const styles = StyleSheet.create({
  shoppingCart: {
    height: Dimensions.get('window').height,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  shoppingCart_button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1B7BCC',
    marginTop: 20,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    elevation: 5
  }
})