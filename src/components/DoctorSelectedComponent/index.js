import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useField } from 'formik'

const DoctorSelectedComponent = ({ fieldName, onPressDelete }) => {
    const [field, meta] = useField(fieldName)
  return (
    <View style={styles.doctorAddContainer_elements}>
        <View style={styles.doctorAdd}>
            <Text>{field.value}</Text>
        </View>
        <View style={styles.doctorAdd_delete}>
            <TouchableOpacity style={styles.doctorAdd_deleteButton} onPress={onPressDelete}>
                <Text style={styles.doctorAdd_deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default DoctorSelectedComponent

const styles = StyleSheet.create({
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
        alignItems: 'flex-end'
    },
    doctorAdd_deleteButton: {
        width: '80%',
        height: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowOffset: {height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.4,
    },
    doctorAdd_deleteButtonText: {
        color: 'red',
        fontWeight: '600',
        fontSize: 12
    },
})