import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import InputFormPaimentData from '../InputFormPaimentData'
import { useFormikContext } from 'formik'
import LogoMastercard from '../../Assets/Icons/LogoMastercard.png'
import LogoVisa from '../../Assets/Icons/LogoVisa.png'
import LogoMastercardBlack from '../../Assets/Icons/LogoMastercardBlack.png'
import LogoVisaBlack from '../../Assets/Icons/LogoVisaBlack.png'
import { AuthContext } from '../../Context/AuthContext'

const FormPaimentData = ({ paimentVal }) => {
    const { submitForm, ...props } = useFormikContext()
  const {total} = useContext(AuthContext)


    const [numInCard, setNumInCard] = useState('')
    const [nameInCard, setNameInCard] = useState('')

    useEffect(() => {
        props.values.numCard === null ? setNumInCard('') : props.values.numCard === '' ? setNumInCard('') : setNumInCard(props.values.numCard)
    }, [props.values.numCard, props.values.numberPhone,  props.values.expCard])

    
  return (
    <>
        <View style={styles.paimentData_bottomCard}>
            <InputFormPaimentData title='Número Telefonico' fieldName='numberPhone' keyboardType={'numeric'} placeholder={nameInCard} style={styles.paimentData_bottomCardInputContainer} />
        </View>
        <TouchableOpacity style={styles.paimentData_paimentButton} onPress={submitForm}>
            <Text style={styles.paimentData_paimentButtonText}>Pagar ${total}.000</Text>
        </TouchableOpacity>
    </>
  )
}

export default FormPaimentData

const styles = StyleSheet.create({
    paimentData_top: {
        width: '100%',
        height: 355,
        backgroundColor: '#1B7BCC',
        alignItems: 'center'
    },
    paimentData_topCard: {
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paimentData_topCard_: {
        width: '85%',
        height: '95%',
    },
    paimentData_cardImgs: { //dsdf
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paimentData_cardPrincipalImg: {
        width: 98,
        height: 59
    },
    paimentData_cardSecondaryImg: {
        width: 151,
        height: 90
    },
    paimentData_cardNum: {
        fontSize: 22,
        letterSpacing: 4,
        fontWeight: '700',
        marginVertical: 17
    },
    paimentData_cardInfo: {
        flexDirection: 'row'
    },
    paimentData_cardInfoName: {
        fontSize: 18,
        fontWeight: '400',
        textTransform: 'capitalize'
    },
    paimentData_cardInfoDate: {
        marginLeft: 60,
        fontSize: 18,
        fontWeight: '400'
    },
    paimentData_bottomCard: {
        width: '80%',
        marginTop: 40
    },
    paimentData_bottomCardInputContainer: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(27, 123, 204, .5)',
        marginVertical: 10,
        alignItems: 'center',
    },
    paimentData_bottomCardInfo: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paimentData_bottomCardInfo_: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paimentData_bottomCardInputContainerOtherOne: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(27, 123, 204, .5)',
        marginVertical: 10,
        alignItems: 'center'
    },
    paimentData_bottomCardInputContainerOtherTwo: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(27, 123, 204, .5)',
        marginVertical: 10,
        alignItems: 'center'
    },
    paimentData_paimentButton: {
        marginTop: 30,
        width: '80%',
        height: 60,
        backgroundColor: '#1B7BCC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
    },
    paimentData_paimentButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
})