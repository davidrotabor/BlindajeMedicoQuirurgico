import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {REACT_APP_USERDATABASE} from "@env"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userToken, setUserToken] = useState(null)

    const [loadingScreen, setLoadingScreen] = useState(false)

    const [shopping, setShopping] = useState([])
    const [total, setTotal] = useState(0)
    console.log('Carrito de compraaa: ', shopping)

    // const [shopping, setShopping] = useState(() => {
    //     try {
    //         const productOnLocalStorage = AsyncStorage.getItem("cartProducts")
    //         return productOnLocalStorage ? JSON.parse(productOnLocalStorage) : []
    //     } catch (error) {
    //         return []
    //     }
    // })


    // useEffect(() => {
    //     AsyncStorage.setItem('cartProducts', JSON.stringify(shopping))
    //     console.log('shopping', shopping)
    // }, [shopping])

    // const addItemCart = (product) => {
    //     const inCart = shopping.find((productInCart) => productInCart.id === product.id)
    //     if(inCart){
    //         setShopping(
    //             shopping.map((productInCart) => {
    //                 if(productInCart.id === product.id){
    //                     return {...inCart, amount: inCart.amount + 1}
    //                 } else return productInCart
    //             })
    //         )
    //     } else {
    //         setShopping([...shopping, {...product, amount: 1}])
    //     }
    // }

    // const deleteItemCart = (product) => {
    //     const inCart = shopping.find((productInCart) => productInCart.id === product.id)
    //     if (inCart.amount === 1){
    //         setShopping(shopping.filter((productInCart) => productInCart.id !== product.id))
    //     } else {
    //         setShopping((productInCart) => {
    //             if(productInCart.id === product.id){
    //                 return {...inCart, amount: inCart.amount -1}
    //             } else return productInCart
    //         })
    //     }
    // }


    const login = (email, password) => {
        setIsLoading(true)
        setLoadingScreen(true)
        axios.post(`${REACT_APP_USERDATABASE}/login`, {
                email, 
                password
        }).then(res => {
            setIsLoading(true)
            let userData = res.data
            setUserData(userData["0"])
            setUserToken(userData.token)

            AsyncStorage.setItem('userData', JSON.stringify(userData))
            AsyncStorage.setItem('userToken', userData.token)
            setIsLoading(false)
            setLoadingScreen(false)
        }).catch(e => {
            console.log(e)
        })
        setIsLoading(false)
    }

    const register = (name, identification, email, password, password_confirmation) => {
        axios.post(`${REACT_APP_USERDATABASE}/register`, {
            name, identification, email, password, password_confirmation
        }).then(res => {
            console.log('usuario registrado')

            axios.post(`${REACT_APP_USERDATABASE}/login`, {
                email, password
            }). then(res => {
                let userData = res.data
                setUserData(userData["0"])
                setUserToken(userData.token)

                AsyncStorage.setItem('userData', JSON.stringify(userData))
                AsyncStorage.setItem('userToken', userData.token)

            }).catch(e => {
                console.log(e)
            })

            setLoadingScreen(false)
            
        }).catch(e => {
            console.log(e)
        })
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userData')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userData = await AsyncStorage.getItem('userData')
            let userToken = await AsyncStorage.getItem('userToken')

            userData = JSON.parse(userData)

            if(userData) {
                setUserToken(userToken)
                setUserData(userData["0"])
            }
            setIsLoading(false)
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    useEffect(() => {
        const sumatoria = shopping.reduce((sum, value) => (
            typeof value.price == "string" ?
            sum + parseFloat(value.price) : sum
        ), 0)
        setTotal(sumatoria)
    }, [shopping])

    return (
        <AuthContext.Provider value={{ login, register, logout, isLoading, userToken, userData, setShopping, shopping, total, setTotal, setLoadingScreen, loadingScreen }}>
            {children}
        </AuthContext.Provider>
    )
}