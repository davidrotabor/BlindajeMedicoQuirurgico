import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useField } from 'formik'

const InputFormPaimentData = ({ fieldName, title, style, ...props }) => {
    const [field, meta] = useField(fieldName)
  return (
    <>
        <View style={style}>
            <Text style={styles.paimentData_infoCardText}>{title}</Text>
            <TextInput
                style={styles.paimentData_infoCardInputLarge}
                placeholder={field.placeholder}
                autoCapitalize='none'
                placeholderTextColor='black'
                value={field.value} 
                onChangeText={field.onChange(fieldName)}
                onBlur={field.onBlur(fieldName)}
                {...props}
            />
        </View>
        {meta.touched && meta.error ? (
            <View style={styles.inputFormPaimentData_error}>
                <Text style={styles.inputFormPaimentData_error_}>{meta.error}</Text>
            </View>
        ): null}
    </ >
  )
}

export default InputFormPaimentData

const styles = StyleSheet.create({
    paimentData_infoCardText: {
        width: '95%',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
    },
    paimentData_infoCardInputLarge: {
        width: '95%',
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: '200'
    },
    inputFormPaimentData_error: {
        width: '100%'
    },
    inputFormPaimentData_error_: {
        color: '#F64141',
        width: '100%',
        top: -5,
        fontSize: 12
    }
})