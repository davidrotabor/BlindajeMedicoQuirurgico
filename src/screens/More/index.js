import React, { useContext, useEffect, useMemo, useRef, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Profile as ProfileIcon, ShoppingCart } from 'iconsax-react-native';
import { AuthContext } from '../../Context/AuthContext';

import Profile from '../Profile';

import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const More = () => {
  const { userData, shopping } = useContext(AuthContext);
  const navigation = useNavigation();

  const modalRef = useRef(null);

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
              <Text style={styles.badgeText}>{shopping.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ),
      headerStyle: { borderBottomColor: 'white', shadowOpacity: 0 },
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 16 },
      headerTitle: 'Más',
    });
  }, [navigation, shopping.length, openProfile]);

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

      <View style={styles.more}>
        <View style={{ alignItems: 'center', marginTop: 100 }}>
          <Text style={{ color: 'black' }}>Publicidades y contenido adicional</Text>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

export default More;

const styles = StyleSheet.create({
  more: {
    flex: 1,
    backgroundColor: 'white',
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
  badgeText: { color: 'white', fontSize: 12 },
});
