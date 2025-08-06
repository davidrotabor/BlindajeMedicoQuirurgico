import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ShoppingSingleCart = ({ title, img, doctorOne, doctorTwo, patient, price, onPress }) => {

  return (
    <View style={styles.shoppingSingleCart}>
      <View style={{width: '94%', flexDirection: 'row'}}>
        <View style={styles.shoppingSingleCart_img}>
          <Image source={img} style={{width: 60, height: 60}} />
        </View>
        <View style={styles.shoppingSingleCart_content}>
          <View style={{width: '70%'}}>
            <Text style={{fontSize: 16, fontWeight: '800', letterSpacing: -.5, color: 'black'}}>{title}</Text>
            <Text style={{fontSize: 12, fontWeight: '600', color: 'black'}}>Cirujano:</Text>
            <Text style={{fontSize: 12, fontWeight: '300', color: 'black'}}>{doctorOne}</Text>
            {doctorTwo ?
             <Text style={{fontSize: 12, fontWeight: '300', color: 'black'}}>{doctorTwo}</Text>
             :
             null
            }
            <Text style={{fontSize: 12, fontWeight: '600', color: 'black'}}>Paciente:</Text>
            <Text style={{fontSize: 12, fontWeight: '300', color: 'black'}}>{patient}</Text>
          </View>
          <View style={styles.shoppingSingleCart_contentRight}>
            <TouchableOpacity style={styles.shoppingSingleCart_contentRigthButton} onPress={onPress}>
              <Text style={{color: 'red', fontWeight: '800'}}>x</Text>
            </TouchableOpacity>
            <Text style={{color: 'black'}}>{price}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ShoppingSingleCart

const styles = StyleSheet.create({
  shoppingSingleCart: {
    width: '98%',
    height: 132,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 3,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    elevation: 5
  },
  shoppingSingleCart_img: {
    backgroundColor: '#1B7BCC',
    width: 99,
    height: 101,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  shoppingSingleCart_content: {
    flex: 1,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shoppingSingleCart_contentRight: {
    height: 100,
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  shoppingSingleCart_contentRigthButton: {
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4

  }
})