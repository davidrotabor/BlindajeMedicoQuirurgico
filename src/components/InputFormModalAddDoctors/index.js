import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Hashtag, User } from 'iconsax-react-native'
import axios from 'axios'
import { REACT_APP_USERDATABASE } from '@env'

const InputFormModalAddDoctors = ({ valueDoctor, bottomSheetModalRef, doctorSelected, setDoctorSelected, setFilter, setValueDoctor, doctorsSelectedId, setDoctorsSelectedId }) => {

    const [nameAddDoctor, setNameAddDoctor] = useState(valueDoctor)
    const [identificationAddDoctor, setIdentificationAddDoctor] = useState('')

    const onPressAddDoctor = () => {
        if(nameAddDoctor !== '' && identificationAddDoctor !== '') {
            axios.post(`${REACT_APP_USERDATABASE}/cobertura/doctors/addDoctor`, {
                name: nameAddDoctor, identification: identificationAddDoctor
            }).then(res => {
                if(doctorSelected.length === 2){
                    Alert.alert(
                        "Máximo de cirujanos",
                        "Puede agregar un máximo de dos cirujanos",
                        [
                            {
                                text: 'Ok'
                            }
                        ]
                    )
                }else {
                    console.log('Cirujano agregado')
                    axios.get(`${REACT_APP_USERDATABASE}/get/cobertura/doctors/${res.data.identification}`)
                    .then(resNew => {
                        const doctorSelectedNew = {
                            id: resNew.data.doctor[0].id,
                            name: resNew.data.doctor[0].name
                        }
                        setDoctorSelected([...doctorSelected, doctorSelectedNew])
                        setDoctorsSelectedId([...doctorsSelectedId, resNew.data.doctor[0].id])
                        setFilter([])
                        setValueDoctor('')
                        bottomSheetModalRef.current.close()
                    })
                    .catch(e => {
                        console.log(e)
                    })
                }
            }).catch(err => {
                console.log('aqui es el error', err)
            })
        } else {
            Alert.alert(
                "Datos Incompletos",
                "Por favor complete todos los campos",
                [
                    {
                        text: 'Ok'
                    }
                ]
            )
        }
    }

  return (
    <View style={styles.inputModalAddDoctor}>
        <Text style={styles.inputModalAddDoctor_title}>Agregar Cirujano</Text>
        <View style={styles.inputModalAddDoctor_container}>
            <Text style={styles.inputModalAddDoctor_inputTitle}>Nombre</Text>
            <View style={styles.inputModalAddDoctor_}>
                <User color='black' variant='Linear' size={20} />
                <TextInput
                    style={styles.inputModalAddDoctor_input}
                    placeholder='Nombre Completo'
                    value={nameAddDoctor}
                    onChangeText={text => setNameAddDoctor(text)}
                    placeholderTextColor='black'
                    autoCapitalize='none'
                />
            </View>
        </View>
        <View style={styles.inputModalAddDoctor_container}>
            <Text style={styles.inputModalAddDoctor_inputTitle}>Identificación</Text>
            <View style={styles.inputModalAddDoctor_}>
                <Hashtag color='black' variant='Linear' size={20} />
                <TextInput
                    style={styles.inputModalAddDoctor_input}
                    placeholder='Número de Identificación'
                    value={identificationAddDoctor}
                    onChangeText={num => setIdentificationAddDoctor(num)}
                    placeholderTextColor='black'
                    autoCapitalize='none'
                />
            </View>
        </View>
        <TouchableOpacity style={styles.inputModalAddDoctor_button} onPress={onPressAddDoctor}>
            <Text style={styles.inputModalAddDoctor_buttonText}>Agregar</Text>
        </TouchableOpacity>
    </View>
  )
}

export default InputFormModalAddDoctors

const styles = StyleSheet.create({
    inputModalAddDoctor: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20
    },
    inputModalAddDoctor_title: {
        marginBottom: 15,
        fontSize: 16,
        fontWeight: '600'
    },
    inputModalAddDoctor_container: {
        width: '80%',
        marginVertical: 10
    },
    inputModalAddDoctor_inputTitle: {
        fontSize: 12,
        opacity: .5
    },
    inputModalAddDoctor_: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(27, 123, 204, .5)',
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    inputModalAddDoctor_input: {
        width: '90%'
    },
    inputModalAddDoctor_button: {
        width: '50%',
        height: 60,
        backgroundColor: '#1B7BCC',
        marginTop: 20,
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
    },
    inputModalAddDoctor_buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
})