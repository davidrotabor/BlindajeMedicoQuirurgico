import React, { useContext } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { Home as HomeIcon, ClipboardText, Profile as ProfileIcon, AddCircle, More as MoreIcon } from 'iconsax-react-native';

import BlindajeLogo from './src/Assets/Icons/BlindajeLogo.png'

//screens
import Home from './src/screens/Home'
import MyPolicies from './src/screens/MyPolicies'
import ServicesScreen from "./src/screens/ServicesScreen";
import CoberturaJuridica from "./src/screens/CoberturaJuridica";
import ServicesDetail from "./src/screens/ServicesDetail";
import FormCoberturaJuridica from "./src/screens/FormCoberturaJuridica";
import FormPolicies from "./src/screens/FormPolicies";
import Login from "./src/screens/Login";
import ShoppingCartCobertura from "./src/screens/PaimentMethod";
import Register from "./src/screens/Register";
import OnBoarding from "./src/screens/OnBoarding";
import { AuthContext } from "./src/Context/AuthContext";
import PaimentData from "./src/screens/PaimentData";
import PaymentNequi from "./src/screens/PaymentNequi";
import PaymentSummary from "./src/screens/PaymentSummary";
import More from './src/screens/More'
import ShoppingCart from "./src/screens/ShoppingCart";
import LoadingScreen from "./src/screens/LoadingScreen";

//staks
const ServicesScreenStack = createNativeStackNavigator()
//Stack Cobertura Jurídica
function Stacks() {
    return (
        <ServicesScreenStack.Navigator >
            <ServicesScreenStack.Screen name="AgregarServiciosStack" component={ServicesScreen} />
            <ServicesScreenStack.Screen name="DetailStack" component={ServicesDetail} />
            <ServicesScreenStack.Screen name="FormCoberturaJuridica" component={FormCoberturaJuridica} />
            <ServicesScreenStack.Screen name="FormPolicies" component={FormPolicies} />
            <ServicesScreenStack.Screen name="PaimentMethod" component={ShoppingCartCobertura} />
            <ServicesScreenStack.Screen name='PaimentData' component={PaimentData} />
            <ServicesScreenStack.Screen name='PaymentNequi' component={PaymentNequi} />
            <ServicesScreenStack.Screen name='PaymentSummary' component={PaymentSummary} options={() => ({
                headerTitle: 'Resumen de pago',
                //for android
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 16
                },
            })} />
            <StackShppingCard.Screen name="ShoppingCart" component={ShoppingCart} />
        </ServicesScreenStack.Navigator>
    )
}
//Stack Shopping Cart Home
const StackShppingCard = createNativeStackNavigator()
function StackShoppingCart() {
    return (
        <StackShppingCard.Navigator>
            <StackShppingCard.Screen name="Home" component={Home} />
            <StackShppingCard.Screen name="ShoppingCart" component={ShoppingCart} />
        </StackShppingCard.Navigator>
    )
}

//Stack Shopping Cart Coberturas
const StackShppingCardCobertura = createNativeStackNavigator()
function StackShoppingCartCobertura() {
    return (
        <StackShppingCardCobertura.Navigator>
            <StackShppingCardCobertura.Screen name="CoberturaJuridica" component={CoberturaJuridica} />
            <StackShppingCardCobertura.Screen name="ShoppingCart" component={ShoppingCart} />
        </StackShppingCardCobertura.Navigator>
    )
}

//Stack Shopping Cart Mis Pólizas
const StackShppingCardMisP = createNativeStackNavigator()
function StackShoppingCartMisP() {
    return (
        <StackShppingCardMisP.Navigator>
            <StackShppingCardMisP.Screen name="MyPolices" component={MyPolicies} />
            <StackShppingCardMisP.Screen name="ShoppingCart" component={ShoppingCart} />
        </StackShppingCardMisP.Navigator>
    )
}

//Stack Shopping Cart Mas
const StackShppingCardMas = createNativeStackNavigator()
function StackShoppingCartMas() {
    return (
        <StackShppingCardMas.Navigator>
            <StackShppingCardMas.Screen name="More" component={More} />
            <StackShppingCardMas.Screen name="ShoppingCart" component={ShoppingCart} />
        </StackShppingCardMas.Navigator>
    )
}

//onBoarding
const Stack = createNativeStackNavigator()
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='OnBoarding' component={OnBoarding} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator()
function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName='Homee'
            screenOptions={{
                tabBarActiveTintColor: '#1B7BCC',
                tabBarInactiveTintColor: 'rgba(27, 123, 204, .3)',
                unmountOnBlur: true,
                tabBarLabelStyle: {
                    paddingBottom: 20
                },
                tabBarStyle: {
                    borderTopColor: 'white',
                    shadowOffset: {height: -3,},
                    shadowColor: 'black',
                    shadowOpacity: 0.3,
                    elevation: 8,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 80,
                    paddingBottom: -40
                }
            }}
        >
            <Tab.Screen name="Homee" component={StackShoppingCart} options={({ route }) => ({
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ color }) => (
                  <HomeIcon color={color} variant="Linear" size={35} style={{ marginTop: 10 }} />
                ),
                headerShown: false,
                tabBarStyle: {
                     display: getTabBarVisibility(route),
                     borderTopColor: 'white',
                     shadowOffset: {height: -3,},
                     shadowColor: 'black',
                     shadowOpacity: 0.3,
                     elevation: 8,
                     borderTopLeftRadius: 30,
                     borderTopRightRadius: 30,
                     height: 80,
                     paddingBottom: -40
                },
            })} />
            <Tab.Screen name="CoberturaJuridicaStack" component={StackShoppingCartCobertura} options={({ route }) => ({
                tabBarLabel: 'Coberturas',
                tabBarIcon: ({ focused }) => (
                  focused ? 
                  <Image source={BlindajeLogo} style={{ width: 35, height: 35, marginTop: 10, opacity: 1 }} />
                  :
                  <Image source={BlindajeLogo} style={{ width: 35, height: 35, marginTop: 10, opacity: .3 }} />
                ),
                headerShown: false,
                tabBarStyle: {
                    display: getTabBarVisibility(route),
                    borderTopColor: 'white',
                    shadowOffset: {height: -3,},
                    shadowColor: 'black',
                    shadowOpacity: 0.3,
                    elevation: 8,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 80,
                    paddingBottom: -40
               },
            })} />
            <Tab.Screen name="AgregarServicios" component={Stacks} options={({ route }) => ({
                tabBarStyle: {
                    display: getTabBarVisibility(route),
                    borderTopColor: 'white',
                    shadowOffset: {height: -3,},
                    shadowColor: 'black',
                    shadowOpacity: 0.3,
                    elevation: 8,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 80,
                    paddingBottom: -40
               },
                tabBarLabel: 'Agregar',
                tabBarIcon: () => (
                  <AddCircle color='#1B7BCC' variant="Bold" size={65} style={{ marginTop: -15, shadowOffset: {height: 10}, shadowColor: 'rgba(0, 0, 0, .8)', shadowOpacity: .3 }} />
                ),
                headerShown: false
            })} />
            <Tab.Screen name="MyPolicess" component={StackShoppingCartMisP} options={({ route }) => ({
                tabBarLabel: 'Mis Pólizas',
                tabBarIcon: ({ color }) => (
                  <ClipboardText color={color} variant="Linear" size={35} style={{ marginTop: 10 }} />
                ),
                tabBarStyle: {
                    display: getTabBarVisibility(route),
                    borderTopColor: 'white',
                    shadowOffset: {height: -3,},
                    shadowColor: 'black',
                    shadowOpacity: 0.3,
                    elevation: 8,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 80,
                    paddingBottom: -40
               },
                headerShown: false
            })} />
            <Tab.Screen name="Máss" component={StackShoppingCartMas} options={({ route }) => ({
                tabBarLabel: 'Más',
                tabBarIcon: ({ color }) => (
                  <MoreIcon color={color} variant="Linear" size={35} style={{ marginTop: 10 }} />
                ),
                tabBarStyle: {
                    display: getTabBarVisibility(route),
                    borderTopColor: 'white',
                    shadowOffset: {height: -3,},
                    shadowColor: 'black',
                    shadowOpacity: 0.3,
                    elevation: 8,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 80,
                    paddingBottom: -40
               },
                headerShown: false
            })} />
        </Tab.Navigator>
    )
}

//ocultar y mostrar tabBar
const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'
    switch (routeName) {
        case 'DetailStack':
            return 'none';
            break
        case 'FormCoberturaJuridica':
            return 'none';
            break
        case 'FormPolicies':
            return 'none';
            break
        case 'PaimentMethod':
            return 'none';
            break
        case 'PaimentData':
            return 'none';
            break
        case 'PaymentSummary':
            return 'none';
            break
        case 'PaymentNequi':
        return 'none';
        break
        case 'ShoppingCart':
            return 'none';
            break;
        default: 'flex'
    }
}


export default function Navigation() {

    //Context
    const {isLoading, userToken} = useContext(AuthContext)

    if (isLoading) {
        return (
            // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            //     <ActivityIndicator size={'large'} />
            // </View>
            <>
                <LoadingScreen />
            </>
        )
    }

    return (
        <NavigationContainer>
            {userToken !== null ?
                <Tabs />
                :
                <AuthStack />
            }
        </NavigationContainer>
    )
}