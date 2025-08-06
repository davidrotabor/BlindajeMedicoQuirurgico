import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import InputFormPaimentData from '../InputFormPaimentData'
import { useFormikContext } from 'formik'
import LogoMastercard from '../../Assets/Icons/LogoMastercard.png'
import LogoVisa from '../../Assets/Icons/LogoVisa.png'
import LogoMastercardBlack from '../../Assets/Icons/LogoMastercardBlack.png'
import LogoVisaBlack from '../../Assets/Icons/LogoVisaBlack.png'
import { AuthContext } from '../../Context/AuthContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const FormPaimentData = ({ paimentVal }) => {
    const { submitForm, ...props } = useFormikContext()
  const {total} = useContext(AuthContext)


    const [numInCard, setNumInCard] = useState('**** **** **** ****')
    const [nameInCard, setNameInCard] = useState('Nombre Apellido')
    const [dateInCard, setDateInCard] = useState('mm/aa')

    useEffect(() => {
        props.values.numCard === null ? setNumInCard('**** **** **** ****') : props.values.numCard === '' ? setNumInCard('**** **** **** ****') : setNumInCard(props.values.numCard)

        props.values.nameCard === null ? setNameInCard('Nombre Apellido') : props.values.nameCard === '' ? setNameInCard('Nombre Apellido') : setNameInCard(props.values.nameCard)

        props.values.expCard === null ? setDateInCard('mm/aa') : props.values.expCard === '' ? setDateInCard('mm/aa') : setDateInCard(props.values.expCard)

    }, [props.values.numCard, props.values.nameCard,  props.values.expCard])


    let logoCard
    if(props.values.numCard === null || props.values.numCard === ''){
        logoCard = <Image source={LogoMastercard} style={styles.paimentData_cardPrincipalImg} />
    } else {
        if(numInCard.charAt(0) === '4'){
            logoCard = <Image source={LogoVisa} style={styles.paimentData_cardPrincipalImg} />

        } else {
            logoCard = <Image source={LogoMastercard} style={styles.paimentData_cardPrincipalImg} />
        }
    }

    let logoCardBlack
    if(props.values.numCard === null || props.values.numCard === ''){
        logoCardBlack = <Image source={LogoMastercardBlack} style={styles.paimentData_cardSecondaryImg} />
    } else {
        if(numInCard.charAt(0) === '4'){
            logoCardBlack = <Image source={LogoVisaBlack} style={styles.paimentData_cardSecondaryImg} />
        } else {
            logoCardBlack = <Image source={LogoMastercardBlack} style={styles.paimentData_cardSecondaryImg} />
        }
    }
    
  return (
    <KeyboardAwareScrollView style={styles.keyboardAwareScrollView_style}>
        <View style={styles.paimentData_top}>
            <View style={styles.paimentData_topCard}>
                <View style={styles.paimentData_topCard_}>
                    <View style={styles.paimentData_cardImgs}>
                    {
                        logoCard
                    }
                    {
                        logoCardBlack
                    }
                    </View>
                    <Text style={styles.paimentData_cardNum}>{numInCard}</Text>
                    <View style={styles.paimentData_cardInfo}>
                        <Text style={styles.paimentData_cardInfoName}>{nameInCard}</Text>
                        <Text style={styles.paimentData_cardInfoDate}>{dateInCard}</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={{width: '100%', height: '55%', alignItems: 'center'}}>
            <View style={styles.paimentData_bottomCard} >
                <InputFormPaimentData title='Nombre en tarjeta' fieldName='nameCard' placeholder={nameInCard} style={styles.paimentData_bottomCardInputContainer} />
                <InputFormPaimentData title='Número de la Tarjeta'  keyboardType={'numeric'}  fieldName='numCard' placeholder={numInCard} style={styles.paimentData_bottomCardInputContainer} />
                <View style={styles.paimentData_bottomCardInfo}>
                    <View style={styles.paimentData_bottomCardInfo_}>
                        <View style={{ width: '40%' }}>
                            <InputFormPaimentData title='Fecha Vencimiento' fieldName='expCard' placeholder={dateInCard}style={styles.paimentData_bottomCardInputContainerOtherOne} />
                        </View>
                        <View style={{ width: '40%' }}>
                            <InputFormPaimentData title='CVC' fieldName='cvcCard' keyboardType={'numeric'} placeholder='XXX' style={styles.paimentData_bottomCardInputContainerOtherTwo} />
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.paimentData_paimentButton} onPress={submitForm}>
                        <Text style={styles.paimentData_paimentButtonText}>pagar ${total}.000</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </KeyboardAwareScrollView>
  )
}

export default FormPaimentData

const styles = StyleSheet.create({
    keyboardAwareScrollView_style: {
        width: '100%',
        height: '100%'
    },
    paimentData_top: {
        width: '100%',
        height: '45%',
        backgroundColor: '#1B7BCC',
        alignItems: 'center',
    },
    paimentData_topCard: {
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 70,
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
        height: '100%',
        marginTop: 10,
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
        justifyContent: 'space-between',
        alignItems: 'flex-end'
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
        marginTop: 20,
        marginBottom: 50,
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