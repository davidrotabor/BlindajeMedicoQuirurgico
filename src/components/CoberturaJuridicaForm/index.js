import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useFormikContext } from 'formik';
import InputFormCoberturaJuridica from '../InputFormCoberturaJuridica';
import {
  Add,
  Book,
  Book1,
  Calendar,
  Clock,
  Hashtag,
  RecordCircle,
  RouteSquare,
  Scissor,
  User,
  VolumeHigh,
} from 'iconsax-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { REACT_APP_USERDATABASE } from '@env';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import InputFormModalAddDoctors from '../InputFormModalAddDoctors';

const CoberturaJuridicaForm = ({
  procedureTipe,
  setDoctorSelected,
  doctorSelected,
  setDoctorsSelectedId,
  doctorsSelectedId,
  proceduresSelected,
  setProceduresSelected,
}) => {
  const { submitForm, ...props } = useFormikContext();
  const bottomSheetModalRef = useRef(null);
  const snapModalPoint = ['74'];

  const [dateProFirst, setDateProFirst] = useState(new Date());
  const [timeProFirst, setTimeProFirst] = useState(
    new Date(new Date().getTime() + 5 * 60000)
  );

  const [dateProOpen, setDateProOpen] = useState(false);
  const [timeProOpen, setTimeProOpen] = useState(false);

  const [load, setLoad] = useState(false);

  const [valueDoctor, setValueDoctor] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (valueDoctor !== '') {
      setLoad(true);
      axios
        .get(`${REACT_APP_USERDATABASE}/cobertura/doctors`)
        .then(res => {
          const newFilter = res.data.doctors.filter(elem =>
            elem.name.toLowerCase().includes(valueDoctor.toLowerCase())
          );
          setFilter(valueDoctor === '' ? [] : newFilter);
          setLoad(false);
        })
        .catch(e => {
          setLoad(false);
          console.log(e);
        });
    } else {
      setFilter([]);
    }
  }, [valueDoctor]);

  const nameSelected = element => {
    setFilter([]);
    setValueDoctor('');
    if (doctorSelected.length === 2) {
      Alert.alert('Máximo de cirujanos', 'Puede agregar un máximo de dos cirujanos', [
        { text: 'Ok' },
      ]);
    } else {
      const doctorsAdd = {
        id: element.element.id,
        name: element.element.name,
      };
      setDoctorSelected([...doctorSelected, doctorsAdd]);
      setDoctorsSelectedId([...doctorsSelectedId, element.element.id]);
    }
  };

  const handlerModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const deleteDoctor = data => {
    const newDoctorSelected = doctorSelected.filter(d => d !== data);
    setDoctorSelected(newDoctorSelected);

    const newDoctorIdSelected = doctorsSelectedId.filter(id => id !== data.id);
    setDoctorsSelectedId(newDoctorIdSelected);
  };

  const addProcedure = () => {
    if (props.values.procedureNames?.trim()) {
      setProceduresSelected([...proceduresSelected, props.values.procedureNames.trim()]);
      props.setFieldValue('procedureNames', '');
    }
  };

  // Handlers Date/Time (community picker)
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') setDateProOpen(false);
    if (event.type === 'set' && selectedDate) {
      props.setFieldValue('datePro', selectedDate);
      setDateProFirst(selectedDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    if (Platform.OS === 'android') setTimeProOpen(false);
    if (event.type === 'set' && selectedTime) {
      // Validar mínimo +5 minutos
      const minTime = new Date();
      minTime.setMinutes(minTime.getMinutes() + 5);
      const finalTime = selectedTime < minTime ? minTime : selectedTime;

      props.setFieldValue('timePro', finalTime);
      setTimeProFirst(finalTime);
    }
  };

  return (
    <>
      <Text style={{ fontSize: 13, opacity: 0.5, marginTop: 6, color: 'black' }}>
        Agregar médico cirujano y Cirujanos plasticos involucrados en la
        operación
      </Text>
      {/**
       * <InputAddDoctors
       *   value={valueDoctor}
       *   load={load}
       *   onChangeText={text => setValueDoctor(text)}
       * />
       *
       * <View style={styles.inputDoctorsFilter_container}>
       *   {filter.length !== 0 && valueDoctor !== '' ? (
       *     <ScrollView
       *       nestedScrollEnabled={true}
       *       style={styles.inputDoctorsFilter}>
       *       {filter.map(element => {
       *         return (
       *           <TouchableOpacity
       *             style={styles.inputDoctorsFilter_button}
       *             key={element.id}
       *             onPress={() => nameSelected({element})}>
       *             <View style={styles.inputDoctorsFilter_button_}>
       *               <Text style={styles.inputDoctorsFilter_buttonText}>
       *                 {element.name}
       *               </Text>
       *               <View>
       *                 <Add size={20} color="black" />
       *               </View>
       *             </View>
       *           </TouchableOpacity>
       *         );
       *       })}
       *     </ScrollView>
       *   ) : filter.length === 0 && valueDoctor !== '' ? (
       *     <View style={styles.inputDoctorsFilter}>
       *       <TouchableOpacity
       *         style={styles.inputDoctorsFilter_buttonAdd}
       *         onPress={handlerModal}>
       *         <Text style={styles.inputDoctorsFilter_buttonAddText}>
       *           Agregar Médico Cirujano
       *         </Text>
       *       </TouchableOpacity>
       *       <BottomSheetModal
       *         ref={bottomSheetModalRef}
       *         index={0}
       *         snapPoints={snapModalPoint}
       *         backgroundStyle={{
       *           borderRadius: 30,
       *           shadowOffset: {height: -3},
       *           shadowColor: 'black',
       *           shadowOpacity: 0.4,
       *         }}>
       *         <InputFormModalAddDoctors
       *           valueDoctor={valueDoctor}
       *           bottomSheetModalRef={bottomSheetModalRef}
       *           doctorSelected={doctorSelected}
       *           setDoctorSelected={setDoctorSelected}
       *           setFilter={setFilter}
       *           setValueDoctor={setValueDoctor}
       *           setDoctorsSelectedId={setDoctorsSelectedId}
       *           doctorsSelectedId={doctorsSelectedId}
       *         />
       *       </BottomSheetModal>
       *     </View>
       *   ) : doctorSelected !== '' ? null : null}
       * </View>
       *
       * <View style={styles.doctorAddContainer}>
       *   {doctorSelected.length !== 0 && (
       *     <>
       *       {doctorSelected.map((data, index) => {
       *         return (
       *           <View key={index} style={styles.doctorAddContainer_}>
       *             <View style={styles.doctorAddContainer_elements}>
       *               <View style={styles.doctorAdd}>
       *                 <Text style={{color: 'black'}}>{data.name}</Text>
       *               </View>
       *               <View style={styles.doctorAdd_delete}>
       *                 <TouchableOpacity
       *                   style={styles.doctorAdd_deleteButton}
       *                   onPress={() => deleteDoctor(data)}>
       *                   <Text style={styles.doctorAdd_deleteButtonText}>
       *                     Eliminar
       *                   </Text>
       *                 </TouchableOpacity>
       *               </View>
       *             </View>
       *           </View>
       *         );
       *       })}
       *     </>
       *   )}
       * </View>
       */}

      <Text style={styles.formCoberturaJuridica_headerTitlesInfoPaciente}>
        Médico
      </Text>
      <InputFormCoberturaJuridica
        fieldName="fullNameMedico"
        title="Nombre"
        placeholder="Nombre Completo"
        icon={<User color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />

      <Text style={styles.formCoberturaJuridica_headerTitlesInfoPaciente}>
        Paciente
      </Text>
      <InputFormCoberturaJuridica
        fieldName="fullNameP"
        title="Nombre"
        placeholder="Nombre Completo"
        icon={<User color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />
      <InputFormCoberturaJuridica
        fieldName="identificationP"
        title="Identificación"
        placeholder="Número de Identificación"
        icon={<Hashtag color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />
      <InputFormCoberturaJuridica
        fieldName="directionP"
        title="Dirección"
        placeholder="Dirección"
        icon={<Book1 color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />
      <InputFormCoberturaJuridica
        fieldName="phoneP"
        title="Teléfono"
        placeholder="Número de Teléfono"
        icon={<Hashtag color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />

      <Text style={styles.formCoberturaJuridica_headerTitlesInfo}>
        Institución donde se realiza la investigación quirúrgica y/o tratamiento
        estético
      </Text>
      <InputFormCoberturaJuridica
        fieldName="nitC"
        title="Nit"
        placeholder="Nit"
        icon={<Hashtag color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />
      <InputFormCoberturaJuridica
        fieldName="directionC"
        title="Dirección"
        placeholder="Dirección"
        icon={<Book1 color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />
      <InputFormCoberturaJuridica
        fieldName="cityC"
        title="Ciudad"
        placeholder="Ciudad"
        icon={<Book color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />

      <Text style={styles.formCoberturaJuridica_headerTitlesInfo}>
        Procedimientos quirúrgicos y/o estéticos realizados
      </Text>
      <InputFormCoberturaJuridica
        fieldName="procedureNames"
        title={`Tipo de Procedimiento ${procedureTipe}`}
        placeholder=" Tipo de Procedimiento"
        icon={<Book color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
      />

      <TouchableOpacity style={styles.inputDoctorsFilter_buttonAdd} onPress={addProcedure}>
        <Text style={styles.inputDoctorsFilter_buttonAddText}>Agregar Procedimiento</Text>
      </TouchableOpacity>

      <View>
        {proceduresSelected.map((item, idx) => (
          <Text key={idx}>{item}</Text>
        ))}
      </View>

      {/* Fecha */}
      <InputFormCoberturaJuridica
        fieldName="datePro"
        title="Fecha Intervención"
        placeholder={dateProFirst.toLocaleDateString()}
        icon={<Calendar color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
        onPressIn={() => setDateProOpen(true)}
      />
      {dateProOpen && (
        <DateTimePicker
          value={props.values.datePro ? new Date(props.values.datePro) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      {/* Hora */}
      <InputFormCoberturaJuridica
        fieldName="timePro"
        title="Hora Intervención"
        placeholder={timeProFirst.toLocaleTimeString()}
        icon={<Clock color="black" variant="Linear" size={20} style={{ marginVertical: 8 }} />}
        onPressIn={() => setTimeProOpen(true)}
      />
      {timeProOpen && (
        <DateTimePicker
          value={props.values.timePro ? new Date(props.values.timePro) : new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeTime}
        />
      )}

      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity style={styles.formCoberturaJuridica_button} onPress={submitForm}>
          <Text style={styles.formCoberturaJuridica_buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CoberturaJuridicaForm;

const styles = StyleSheet.create({
  //inputDoctorsFilter
  inputDoctorsFilter_container: {
    width: '100%',
    alignItems: 'center',
    shadowOffset: { height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  inputDoctorsFilter: {
    width: '98%',
    maxHeight: 150,
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: 10,
    marginTop: -10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
  },
  inputDoctorsFilter_button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(27, 123, 204, .5)',
    height: 40,
  },
  inputDoctorsFilter_button_: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputDoctorsFilter_buttonText: {
    textTransform: 'capitalize',
    color: 'black',
  },
  inputDoctorsFilter_buttonAdd: {
    width: '100%',
    height: 40,
    backgroundColor: '#1B7BCC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  inputDoctorsFilter_buttonAddText: {
    color: 'white',
  },
  modalAddDoctors: {},

  doctorAddContainer: {
    width: '100%',
    maxHeight: 150,
    alignItems: 'center',
    backgroundColor: 'rgba(27, 123, 204, .1)',
    borderRadius: 10,
  },
  doctorAddContainer_: {
    width: '94%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorAddContainer_elements: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAdd: {
    width: '70%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  doctorAdd_delete: {
    width: '30%',
    alignItems: 'flex-end',
  },
  doctorAdd_deleteButton: {
    width: '80%',
    height: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOffset: { height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  doctorAdd_deleteButtonText: {
    color: 'red',
    fontWeight: '600',
    fontSize: 12,
  },

  formCoberturaJuridica_headerTitlesInfoPaciente: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: 'black',
  },
  formCoberturaJuridica_headerTitlesInfo: {
    marginVertical: 5,
    fontWeight: '600',
    color: 'black',
  },
  formCoberturaJuridica_button: {
    width: '80%',
    height: 60,
    backgroundColor: '#1B7BCC',
    marginTop: 20,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: { height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  formCoberturaJuridica_buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
