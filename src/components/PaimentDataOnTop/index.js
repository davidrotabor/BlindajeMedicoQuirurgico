import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LogoMastercard from '../../Assets/Icons/LogoMastercard.png'
import LogoVisa from '../../Assets/Icons/LogoVisa.png'
import LogoMastercardBlack from '../../Assets/Icons/LogoMastercardBlack.png'
import LogoVisaBlack from '../../Assets/Icons/LogoVisaBlack.png'

const PaimentDataOnTop = () => {

    const [firstNumCard, setFirstNumCard] = useState(null)
    const [numCard, setNumCard] = useState(null)
    const [nameCard, setNameCard] = useState(null)
    const [dateCard, setDateCard] = useState(null)
    const [cvc, setCvc] = useState(null)

    const [numInCard, setNumInCard] = useState('**** **** **** ****')
    const [nameInCard, setNameInCard] = useState('Nombre Apellido')
    const [dateInCard, setDateInCard] = useState('mm/aa')

  return (
    <View style={styles.paimentData_top}>
        <View style={styles.paimentData_topCard}>
            <View style={styles.paimentData_topCard_}>
                <View style={styles.paimentData_cardImgs}>
                    {firstNumCard === 4 ?
                        <Image source={LogoVisa} style={styles.paimentData_cardPrincipalImg} />
                        :
                        <Image source={LogoMastercard} style={styles.paimentData_cardPrincipalImg} />
                    }
                    {firstNumCard === 4 ?
                        <Image source={LogoVisaBlack} style={styles.paimentData_cardSecondaryImg} />
                        :
                        <Image source={LogoMastercardBlack} style={styles.paimentData_cardSecondaryImg} />
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
  )
}

export default PaimentDataOnTop

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
    }
})