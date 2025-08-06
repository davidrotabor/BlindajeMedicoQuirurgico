import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import Publicity from '../../components/Publicity';
import Services from '../../components/Services';
import Polizas from '../../components/Polizas';
import {useNavigation} from '@react-navigation/native';
import {Profile as ProfileIcon, ShoppingCart} from 'iconsax-react-native';
import {AuthContext} from '../../Context/AuthContext';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Profile from '../Profile';
import LoadingScreen from '../LoadingScreen';

const Home = () => {
  const {userData, shopping, loadingScreen} = useContext(AuthContext);
  const Navigation = useNavigation();
  const bottomSheetModalProfileRef = useRef(null);
  const snapModalPoint = ['100'];

  const handlerModal = () => {
    bottomSheetModalProfileRef.current?.present();
  };

  useEffect(() => {
    Navigation.setOptions({
      headerTitle: `Hola, ${userData.name}`,
      headerLeft: () => (
        <TouchableOpacity onPress={handlerModal}>
          <ProfileIcon
            color="black"
            variant="Linear"
            size={30}
            style={{marginLeft: 20}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => Navigation.navigate('ShoppingCart')}
          style={{position: 'relative'}}>
          <ShoppingCart
            color="black"
            variant="Linear"
            size={30}
            style={{marginRight: 20}}
          />
          {shopping.length > 0 ? (
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: -7,
                backgroundColor: '#1B7BCC',
                height: 22,
                width: 22,
                borderRadius: 50,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 12}}>
                {shopping.length}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ),
      headerStyle: {
        borderBottomColor: 'white',
        shadowOpacity: 0,
      },
      //for android
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, [Navigation, shopping]);

  return (
    <>
      {loadingScreen === true ? (
        <LoadingScreen />
      ) : (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalProfileRef}
            index={0}
            snapPoints={snapModalPoint}>
            <Profile />
          </BottomSheetModal>
          <View style={styles.home}>
            <Publicity />
            {/**<Services /> */}
            <Polizas />
          </View>
        </BottomSheetModalProvider>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoutButton: {
    width: '70%',
    height: 60,
    backgroundColor: '#1B7BCC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
});
