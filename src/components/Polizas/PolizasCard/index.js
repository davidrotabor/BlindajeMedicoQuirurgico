import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BlindajeLogo from '../../../Assets/Icons/BlindajeLogo.png'

const PolizasCard = ({ name, procedureTipe }) => {
  return (
    <View style={styles.polizasCard}>
        <View style={styles.polizasCard_}>
            <View style={styles.polizasCard_imgActive}>
                <Image style={styles.polizasCard_img} source={BlindajeLogo} />
            </View>
            <View style={styles.polizasCard_text}>
                <View>
                    <Text style={{color: 'black'}}>{name}</Text>
                    <Text style={{color: 'rgba(0, 0, 0, .7)'}}>{procedureTipe}</Text>
                </View>
                <View>
                    <View style={styles.polizasCard_textOptions_}>
                        <View style={styles.polizasCard_textActive} />
                        <Text style={styles.polizasCard_textActive_} >Activa</Text>                    
                    </View>
                </View>
            </View>
        </View>
    </View>
  )
}

export default PolizasCard

const styles = StyleSheet.create({
    polizasCard: {
        width: '98%',
        height: 81,
        backgroundColor: 'white',
        borderRadius: 20,
        marginVertical: 6,
        marginLeft: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 5
    },
    polizasCard_: {
        width: '90%',
        flexDirection: 'row'
    },
    polizasCard_imgActive: {
        backgroundColor: 'rgba(4, 205, 0, .2)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    polizasCard_imgDisabled: {
        backgroundColor: 'rgba(210, 0, 0, .2)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    polizasCard_img: {
        width: 35,
        height: 35
    },
    polizasCard_text: {
        flex: 1,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    polizasCard_textOptions_: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    polizasCard_textActive: {
        width: 15,
        height: 15,
        borderRadius: 20,
        backgroundColor: '#04CD00',
        marginRight: 5
    },
    polizasCard_textActive_: {
        color: '#04CD00'
    },
    polizasCard_textDisabled: {
        width: 15,
        height: 15,
        borderRadius: 20,
        backgroundColor: '#D20000',
        marginRight: 5
    },
    polizasCard_textDisabled_: {
        color: '#D20000'
    }
})