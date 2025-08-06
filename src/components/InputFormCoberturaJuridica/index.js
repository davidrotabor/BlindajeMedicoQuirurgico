import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useField } from 'formik'

const InputFormCoberturaJuridica = ({ fieldName, title, icon, ...props }) => {
    const [field, meta] = useField(fieldName)
  return (
    <View style={styles.formCoberturaJuridica_container}>
        <Text style={styles.formCoberturaJuridica_containerText}>{title}</Text>
        <View style={styles.formCoberturaJuridica_inputContainer}>
            {icon}
            <TextInput
                style={styles.formCoberturaJuridica_input}
                placeholder={field.placeholder}
                placeholderTextColor='black'
                value={field.value}
                onChangeText={field.onChange(fieldName)}
                onBlur={field.onBlur(fieldName)}
                autoCapitalize='none'
                {...props} />
        </View>
        {meta.touched && meta.error ? (
            <Text style={styles.InputFormCoberturaJuridica_error}>{meta.error}</Text>
        ): null}
    </View>
  )
}

export default InputFormCoberturaJuridica

const styles = StyleSheet.create({
    formCoberturaJuridica_container: {
        marginVertical: 6
    },
    formCoberturaJuridica_containerText: {
        fontSize: 12,
        opacity: .5,
        color: 'black'
    },
    formCoberturaJuridica_inputContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(27, 123, 204, .5)',
        // paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    formCoberturaJuridica_input: {
        width: '90%'
    },
    InputFormCoberturaJuridica_error: {
        marginTop: 10,
        color: '#F64141'
    }
})