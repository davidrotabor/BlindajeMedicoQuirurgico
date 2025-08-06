import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Record, RecordCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TermsAndConditionsCobertura from '../../../components/TermsAndConditionsCobertura';

const CardPlans = ({
  titleDescription,
  description,
  planN,
  procedureTipeN,
  price,
  backgroundImgN,
  nameN,
  logoDetailN,
  logoIcon,
  idN,
}) => {
  const navigation = useNavigation();
  const bottomSheetModalTermRef = useRef(null);
  const snapModalPoint = ['65'];

  const [accept, setAccept] = useState(false);

  const onPressAdd = () => {
    accept === true
      ? navigation.navigate('FormCoberturaJuridica', {
          id: idN,
          plan: planN,
          procedureTipe: procedureTipeN,
          price: price,
          backgroundImg: backgroundImgN,
          name: nameN,
          logoDetail: logoDetailN,
          logoIcon: logoIcon,
        })
      : Alert.alert(
          'Acepta Términos y Condiciones',
          'Para continuar debe aceptar los terminos y condiciones',
          [
            {
              text: 'Ok',
            },
          ],
        );
  };

  const handlerModal = () => {
    bottomSheetModalTermRef.current?.present();
  };

  return (
    <>
      <Text style={styles.servicesDetail_containerTitleDescription}>
        {titleDescription}
      </Text>
      <View style={styles.servicesDetail_containerDescription}>
        <ScrollView style={{height: '39%'}}>
          <Text style={{color: 'black', fontSize: 12}}>{description}</Text>
        </ScrollView>
        <View style={{width: "100%", padding: 5}}>
          <View style={styles.servicesDetail_containerTermsAndConditions}>
            {accept === false ? (
              <TouchableOpacity onPress={() => setAccept(!accept)}>
                <Record size={22} color="#1B7BCC" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setAccept(!accept)}>
                <RecordCircle size={22} color="#1B7BCC" />
              </TouchableOpacity>
            )}
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginLeft: 5, fontSize: 12, color: 'black'}}>Acepto </Text>
              <TouchableOpacity
                onPress={handlerModal}
                style={styles.servicesDetail_containerTermsAndConditionsText}>
                <Text style={{fontSize: 12, color: 'black'}}>términos y condiciones</Text>
              </TouchableOpacity>
              <BottomSheetModal
                ref={bottomSheetModalTermRef}
                index={0}
                snapPoints={snapModalPoint}
                backgroundStyle={{
                  borderRadius: 30,
                  shadowOffset: {height: -3},
                  shadowColor: 'black',
                  shadowOpacity: 0.4,
                }}>
                <TermsAndConditionsCobertura
                  setAccept={setAccept}
                  bottomSheetModalTermRef={bottomSheetModalTermRef}
                />
              </BottomSheetModal>
            </View>
          </View>
          <View style={styles.servicesDetail_containerPrice}>
              <Text style={styles.servicesDetail_containerPriceText}>
                ${price}
              </Text>
              <TouchableOpacity
                // eslint-disable-next-line no-shadow
                onPress={accept => onPressAdd(accept)}
                style={styles.servicesDetail_containerPriceButton}>
                <Text style={styles.servicesDetail_containerPriceButtonText}>
                  Agregar
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </>
  );
};

export default CardPlans;

const styles = StyleSheet.create({
  servicesDetail_containerTitleDescription: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
    color: 'black'
  },
  servicesDetail_containerDescription: {
    marginBottom: 110 //Pendiente por revisar
  },
  servicesDetail_containerTermsAndConditions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicesDetail_containerTermsAndConditionsText: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  servicesDetail_containerPrice: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  servicesDetail_containerPriceText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#1B7BCC',
  },
  servicesDetail_containerPriceButton: {
    width: 100,
    height: 40,
    backgroundColor: '#1B7BCC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  servicesDetail_containerPriceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
  },
});
