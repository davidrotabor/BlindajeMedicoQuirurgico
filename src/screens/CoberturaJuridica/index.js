import React, { useContext, useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Profile as ProfileIcon, ShoppingCart } from 'iconsax-react-native';
import axios from 'axios';
import { REACT_APP_USERDATABASE } from '@env';

import { AuthContext } from '../../Context/AuthContext';
import PolizasCard from '../../components/Polizas/PolizasCard';
import Profile from '../Profile';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const CoberturaJuridica = () => {
  const { userData, shopping } = useContext(AuthContext);
  const navigation = useNavigation();
  const modalRef = useRef(null);

  const [allCobertures, setAllCobertures] = useState([]);

  const snapPoints = useMemo(() => ['100%'], []);

  const openProfile = useCallback(() => modalRef.current?.present(), []);
  const closeProfile = useCallback(() => modalRef.current?.dismiss?.(), []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={openProfile}>
          <ProfileIcon color="black" variant="Linear" size={30} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')} style={{ position: 'relative' }}>
          <ShoppingCart color="black" variant="Linear" size={30} style={{ marginRight: 20 }} />
          {shopping.length > 0 ? (
            <View style={styles.badge}>
              <Text style={{ color: 'white', fontSize: 12 }}>{shopping.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ),
      headerTitle: 'Coberturas',
      headerStyle: { borderBottomColor: 'white', shadowOpacity: 0 },
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 16 },
    });
  }, [navigation, shopping.length, openProfile]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_USERDATABASE}/get/cobertura/${userData.id}`)
      .then(res => setAllCobertures(res.data.cobertura))
      .catch(e => console.log(e));
  }, [userData?.id]);

  useFocusEffect(
    useCallback(() => {
      return () => closeProfile();
    }, [closeProfile])
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
      >
        <BottomSheetView style={styles.modalContent}>
          <Profile />
        </BottomSheetView>
      </BottomSheetModal>

      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <FlatList
            data={allCobertures}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PolizasCard name={item.fullNameP} procedureTipe={item.procedureTipe} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

export default CoberturaJuridica;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10,
  },
  listWrapper: {
    width: '90%',
    flex: 1,
  },
  modalContent: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  badge: {
    position: 'absolute',
    right: 10,
    top: -7,
    backgroundColor: '#1B7BCC',
    height: 22,
    width: 22,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
