import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { Profile as ProfileIcon, ShoppingCart } from 'iconsax-react-native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import Profile from '../Profile'

const More = () => {
    const {userData, shopping} = useContext(AuthContext)
    const Navigation = useNavigation()
    const bottomSheetModalProfileRef = useRef(null)
    const snapModalPoint = ["100"]

    const handlerModal = () => {
        bottomSheetModalProfileRef.current?.present()
    }

    useEffect(() => {
        Navigation.setOptions({
          headerLeft: () => (
              <TouchableOpacity onPress={handlerModal}>
                <ProfileIcon color="black" variant="Linear" size={30} style={{ marginLeft: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => Navigation.navigate("ShoppingCart")} style={{position: 'relative'}}>
              <ShoppingCart color="black" variant="Linear" size={30} style={{ marginRight: 20 }} />
                {shopping.length > 0 ?
                  <View style={{position: 'absolute', right: 10, top: -7, backgroundColor: '#1B7BCC', height: 22, width: 22, borderRadius: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 12}}>{shopping.length}</Text>
                  </View>
                  :
                  null
                }
              </TouchableOpacity>
            ),
          headerStyle: {
              borderBottomColor: 'white',
              shadowOpacity: 0,
          },
          //for android
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 16
          },
        })
    }, [Navigation, shopping])
    
  return (
    <BottomSheetModalProvider>
      <View style={styles.more}>
        <BottomSheetModal ref={bottomSheetModalProfileRef} index={0} snapPoints={snapModalPoint}>
            <Profile />
        </BottomSheetModal>
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Text style={{color: 'black'}}>Publicidades y contenido adicional</Text>
        </View>
      </View>
    </BottomSheetModalProvider>
  )
}

export default More

const styles = StyleSheet.create({
  more: {
    height: Dimensions.get('window').height,
    backgroundColor: 'white'
  }
})