import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BlindajeLogo from '../../Assets/Icons/BlindajeLogo.png'
import ViajesLogoBlack from '../../Assets/Icons/ViajesLogoBlack.png'
import SoatLogoBlack from '../../Assets/Icons/SoatLogoBlack.png'
import AutomovilLogoBlack from '../../Assets/Icons/AutomovilLogoBlack.png'
import SaludLogoBlack from '../../Assets/Icons/SaludLogoBlack.png'
import MotoLogoBlack from '../../Assets/Icons/MotoLogoBlack.png'
import CasaLogoBlack from '../../Assets/Icons/CasaLogoBlack.png'
import PolizasCard from './PolizasCard'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { REACT_APP_USERDATABASE } from '@env'

const Polizas = () => {
    const {userData} = useContext(AuthContext)
    const navigation = useNavigation()

    const [allCobertures, setAllCobertures] = useState([])

    useEffect(() => {
        axios.get(`${REACT_APP_USERDATABASE}/get/cobertura/${userData.id}`)
        .then(res => {
            setAllCobertures(res.data.cobertura)
        }).catch(e => {
            console.log(e)
        })
    }, [])

  return (
    <View style={styles.policies}>
        <View style={styles.policies_}>
            <View style={styles.policies_header}>
                <Text style={{color: 'black'}}>Mis Pólizas</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MyPolices')} style={styles.policies_headerButton}>
                    <Text style={styles.policies_headerButtonText}>Ver Todas</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.policies_cards}>
                <FlatList style={styles.policies_cards_} data={allCobertures} keyExtractor={(item) => item.id} renderItem={({ item }) => <PolizasCard name={item.fullNameP} procedureTipe={item.procedureTipe} />} showsVerticalScrollIndicator={false} />
            </View>
        </View>
    </View>
  )
}

export default Polizas

const styles = StyleSheet.create({
    policies: {
        width: '90%',
        height: 250,
        marginTop: 5,
    },
    policies_: {
        alignItems: 'center',
        marginBottom: 20
    },
    policies_header: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    policies_headerButton: {
        width: 100,
        height: 30,
        backgroundColor: '#1B7BCC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5
    },
    policies_headerButtonText: {
        color: 'white'
    },
    policies_cards: {
        width: '100%',
        alignItems: 'center'
    },
    policies_cards_: {
        width: '100%',
    }
})