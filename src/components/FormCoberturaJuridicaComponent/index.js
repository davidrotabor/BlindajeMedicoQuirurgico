import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CoberturaJuridicaForm from '../CoberturaJuridicaForm';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const FormCoberturaJuridicaComponent = ({
  id,
  plan,
  price,
  procedureTipe,
  nameC,
  logoIcon,
}) => {
  const navigation = useNavigation();
  const [ultil, setUltil] = useState('');

  const [doctorSelected, setDoctorSelected] = useState([]);
  const [proceduresSelected, setProceduresSelected] = useState([]);
  const [doctorsSelectedId, setDoctorsSelectedId] = useState([]);

  let date = new Date();

  //Calculo de la fecha "hasta"
  let localeDate = date.toLocaleDateString();

  function toDate(today, days) {
    today.setDate(today.getDate() + days);
    return today;
  }

  let isToDate = toDate(date, 3540);

  const buttonRegisterCoberturaJuridica = values => {
    if (doctorsSelectedId.length == 0) {
      Alert.alert('Debe agregar al menos 1 médico');
      return false;
    }
    navigation.navigate('PaimentMethod', {
      id,
      plan,
      price,
      procedureTipe,
      doctorSelected,
      doctorsSelectedId,
      values,
      nameC,
      logoIcon,
      car: true,
      proceduresSelected,
    });
  };

  useEffect(() => {
    setUltil(isToDate.toLocaleDateString());
  }, [isToDate]);

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={styles.formCoberturaJuridica_scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.formCoberturaJuridica_numberCoberture}>
          {/**<Text style={{color: 'black'}}>Cobertura Jurídica Nro</Text> */}
          <Text style={{color: 'black'}}></Text>
        </View>
        <Text style={{color: 'black'}}>Fecha de expedición - Vigencia</Text>
        <View style={styles.formCoberturaJuridica_headerdate}>
          <Text style={{color: 'black'}}>Desde</Text>
          <Text style={styles.formCoberturaJuridica_headerdate_}>
            {localeDate}
          </Text>
        </View>
        <View style={styles.formCoberturaJuridica_headerdate}>
          <Text style={{color: 'black'}}>Hasta</Text>
          <Text style={styles.formCoberturaJuridica_headerdate_}>{ultil}</Text>
        </View>
        <Text style={styles.formCoberturaJuridica_headerTitle}>
          Beneficiario
        </Text>
        <Formik
          initialValues={{
            fullNameP: null,
            identificationP: null,
            directionP: null,
            phoneP: null,
            nitC: null,
            directionC: null,
            cityC: null,
            datePro: new Date(),
            timePro: new Date(new Date().getTime() + 5 * 60000),
          }}
          validationSchema={Yup.object({
            fullNameP: Yup.string()
              .typeError('El campo es requerido')
              .required('El campo es requerido'),
            identificationP: Yup.number()
              .typeError('El campo debe ser de tipo numérico')
              .required('El campo es requerido'),
            directionP: Yup.string()
              .typeError('El campo es requerido')
              .required('El campo es requerido'),
            phoneP: Yup.number()
              .typeError('El campo debe ser de tipo numérico')
              .required('El campo es requerido'),
            nitC: Yup.number()
              .typeError('El campo debe ser de tipo numérico')
              .required('El campo es requerido'),
            directionC: Yup.string()
              .typeError('El campo es requerido')
              .required('El campo es requerido'),
            cityC: Yup.string()
              .typeError('El campo es requerido')
              .required('El campo es requerido'),
            datePro: Yup.string().typeError('El campo es requerido'),
            timePro: Yup.string().typeError('El campo es requerido'),
          })}
          onSubmit={(values, props, doctorSelected) =>
            buttonRegisterCoberturaJuridica(
              values,
              props,
              doctorSelected,
              proceduresSelected,
            )
          }>
          <CoberturaJuridicaForm
            procedureTipe={procedureTipe}
            setDoctorSelected={setDoctorSelected}
            doctorSelected={doctorSelected}
            doctorsSelectedId={doctorsSelectedId}
            setDoctorsSelectedId={setDoctorsSelectedId}
            proceduresSelected={proceduresSelected}
            setProceduresSelected={setProceduresSelected}
          />
        </Formik>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

export default FormCoberturaJuridicaComponent;

const styles = StyleSheet.create({
  formCoberturaJuridica_scrollView: {
    width: '85%',
    height: '100%',
    position: 'relative',
    marginTop: 40,
  },
  formCoberturaJuridica_numberCoberture: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formCoberturaJuridica_headerdate: {
    flexDirection: 'row',
  },
  formCoberturaJuridica_headerdate_: {
    marginLeft: 10,
    color: 'black',
  },
  formCoberturaJuridica_headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
    color: 'black',
  },

  //Inputs Date and time
});
