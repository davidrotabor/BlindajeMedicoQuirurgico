import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ServicesCardScreen = ({ status, logo, name, description, price, id, descriptionL, backgroundImg, logoDetail, planes, procedimientos, url }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.servicesCardScreen}>
            <View style={styles.servicesCardScreen_}>
                <View style={styles.servicesCardScreen_imgContent}>
                    <Image style={styles.servicesCardScreen_img} source={logo} />
                </View>
                <View style={styles.servicesCardScreen_text}>
                    <View style={styles.servicesCardScreen_text_}>
                        <Text style={styles.servicesCardScreen_textTitle}>{name}</Text>
                        <Text style={styles.servicesCardScreen_textDescripcion}>{description}</Text>
                            {id === '1' ?
                                <>
                                    <Text style={styles.servicesCardScreen_textDesde}>Desde</Text>
                                    <Text style={styles.servicesCardScreen_textPrice}>
                                        {price}
                                    </Text>
                                </>
                                :
                                null
                            }
                    </View>
                    {status === 'comprar' ? 
                        <TouchableOpacity onPress={() => navigation.navigate("DetailStack", { id: id, name: name, descriptionL: descriptionL, backgroundImg: backgroundImg, price: price, logo: logo, logoDetail: logoDetail, planes: planes, procedimientos: procedimientos, url: url })} style={styles.servicesCardCard_textActive}>
                            <Text style={styles.servicesCardCard_textButton} >Comprar</Text>                    
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => navigation.navigate("DetailStack", { name: name, descriptionL: descriptionL, backgroundImg: backgroundImg, price: price, procedimientos: procedimientos, logo: logo, logoDetail: logoDetail, planes: planes, url: url })} style={styles.servicesCardCard_textDisabled}>
                            <Text style={styles.servicesCardCard_textButton} >Renovar</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

export default ServicesCardScreen

const styles = StyleSheet.create({
    servicesCardScreen: {
        width: '98%',
        height: 130,
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 3,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 5
    },
    servicesCardScreen_: {
        width: '93%',
        flexDirection: 'row'
    },
    servicesCardScreen_imgContent: {
        backgroundColor: '#1B7BCC',
        width: 90,
        height: 95,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    servicesCardScreen_img: {
        width: 60,
        height: 60
    },
    servicesCardScreen_text: {
        flex: 1,
        marginLeft: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    servicesCardScreen_text_: {
        width: 145,
    },
    servicesCardScreen_textTitle: {
        fontSize: 15,
        fontWeight: '800',
        lineHeight: 16,
        color: 'black'
    },
    servicesCardScreen_textDescripcion: {
        fontSize: 11,
        fontWeight: '300',
        lineHeight: 11,
        color: 'black'
    },
    servicesCardScreen_textDesde: {
        fontSize: 13,
        fontWeight: '300',
        color: 'black'
    },
    servicesCardScreen_textPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black'
    },
    servicesCardCard_textActive: {
        backgroundColor: '#04CD00',
        width: 75,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 5
    },
    servicesCardCard_textDisabled: {
        backgroundColor: '#FFD600',
        width: 75,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowOffset: {height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 5
    },
    servicesCardCard_textButton: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800'
    }
})