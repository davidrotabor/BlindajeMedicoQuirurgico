import React, {useEffect, useState, useContext}  from 'react';
import { StyleSheet,Text,  View, TouchableOpacity, StatusBar, Image, ActivityIndicator, ScrollView} from 'react-native';

import axios from 'axios'
import { REACT_APP_COBERTURA, TOKEN_WOMPI, API_WOMPI } from '@env'
import { AuthContext } from '../../Context/AuthContext'
function Index(props){

    const {userData, shopping, setShopping} = useContext(AuthContext)

    const [requesting , setRequesting ]  = useState(false)
    const [requestingNequi , setRequestingNequi ]  = useState(false)
    const [PaySuccess, setPaySuccess]  = useState(false)
    const [PayDeclined, setPayDeclined]  = useState(false)
    const [MessageError, setMessageError]  = useState(false)

    const [IdTransaction, setIdTransaction]  = useState()
 
    const [RefferedPay, setRefferedPay] = useState();
      
    const { navigation } = props


    let randomCode 
    if(props){
        randomCode = props.route.params.randomCode
        //randomCode = Math.random()
    }else{
        randomCode = Math.random()
    }



    function goToScreen(screen)
    {   
      setPayDeclined(false)
       navigation.navigate(screen, {randomCode : Math.random()})
    }




    useEffect(()=>{

      setRequesting(false)
      setRequestingNequi(false)
      setPaySuccess(false)
      setPayDeclined(false)
      setMessageError(false)
      setRefferedPay(`${props.route.params.payment_concept}-${ Math.floor(Math.random() * 999999999) }`)


      console.log(props.route.params.id_fee, "FEE")

    }, [randomCode])



    function GotoPay() { 
       // console.log(userData, "USER DETAILS")

      // return false
        const data = {
          "acceptance_token" : props.route.params.acceptance_token,
          "amount_in_cents"  : props.route.params.amount_in_cents * 100,
          //"amount_in_cents"  : 15883100,
          "currency"         : "COP",
          "customer_email"   : userData.email,
          "payment_method"   : props.route.params.payment_method,
          "reference"        : RefferedPay
        }


        const config = {
            headers: {
              "Authorization": `Bearer ${TOKEN_WOMPI}`,
            }
        }


        if(props.route.params.payment_method.type == "NEQUI"){
          setRequestingNequi(true)
        }else{
          setRequesting(true)
        }
        

        axios.post(`${API_WOMPI}/transactions`, data, config).then(function (response) {
          console.log(response.data.data, "PAGO EXISTOSO")
          console.log(response.data.data.id, "ID DE TRANSACCION")
          setIdTransaction(response.data.data.id)

        }).catch(function (error) {
            setRequestingNequi(false)
            setRequesting(false)
            console.log('Error al enviar formulario2')
          //console.log(error);
            console.log(error.response, "EL ERROR2");
            setMessageError("Error en al transaccion")
              
          }).then(function () {
          
        });

        // console.log(data, "DATA PAY")
    }




    function verifyTransaction(){

      console.log("EJECUTANDO VERIFICACION")
      console.log(`${API_WOMPI}transactions/${IdTransaction}`)
      axios.get(`${API_WOMPI}transactions/${IdTransaction}`).then(function (response) {


        console.log(response.data.data.status, "STATUS")

        if(response.data.data.status == "PENDING"){
          verifyTransaction()
        }else{
            if(response.data.data.status == "APPROVED"){
              console.log(response.data.data.status, "STATUS DE TRANSAACCION")

                shopping.map((data, index) => {
                return (axios.post(`${REACT_APP_COBERTURA}/register`, {
                  plan: data.plan, price: data.price, procedureTipe: data.procedureTipe, doctor_id: data.doctorsSelectedId, fullNameP: data.values.fullNameP, identificationP: data.values.identificationP, directionP: data.values.directionP, phoneP: data.values.phoneP, nitC: data.values.nitC, directionC: data.values.directionC, cityC: data.values.cityC, datePro: data.values.datePro.toLocaleDateString(), timePro: data.values.timePro.toLocaleTimeString()
                }).then(res => {
                    console.log('Paciente Registrado Con Éxito')
                    setShopping([])
                }).catch(e => {
                    console.log('Error!', e.response)
                })
              )})

              setPaySuccess(true)
              setRequesting(false)
              setRequestingNequi(false)
            }else{
              setPayDeclined(true)
              setRequesting(false)
              setRequestingNequi(false)
              setMessageError(response.data.data.status_message)
            }
        }
        
        

      }).catch(function (error) {
            console.log('Error al enviar formulariossssssssssssss')
            console.log(error);
            console.log(error.response, "EL ERRORsssssss");
            
        }).then(function () {
  
      });

    }

      


    useEffect(()=>{
      verifyTransaction()
    }, [IdTransaction])


    if(requestingNequi){

      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1
        }}>

            <ActivityIndicator size="large" color="#0093d9" />
            <Text style={{
              width : "80%",
              lineHeight : 25,
              fontSize: 19,
              textAlign: "center"
            }}>Por favor confirma la transacción en tu celular cuando te llege la <Text style={{fontWeight : "bold", color: 'black'}}>Notificacion</Text>. Si no te ha llegado, verifica que tengas Nequi instalado en tu celular y que ya estés registrado</Text>
        </View>)
    }

    if(requesting){
      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1
        }}>

            <ActivityIndicator size="large" color="#0093d9" />
            <Text style={{
              color: 'black'
            }}>Estamos procesando tu pago . . .</Text>
        </View>)
    }


    if(PaySuccess){

      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1,
            backgroundColor: "white"
        }}>


            <Text style={styles.title_succesfull } >Transacción APROBADA</Text>

            <Text style={styles.title } >Información de la transacción</Text>
            <Text style={styles.item_succesfull }>Transacción # <Text style={styles.item_succesfull_bold}>{IdTransaction}</Text></Text>
            <Text style={styles.item_succesfull }>Referencia <Text style={styles.item_succesfull_bold}>{RefferedPay}</Text></Text>
            <Text style={styles.item_succesfull }>Email <Text style={styles.item_succesfull_bold}>{userData.email}</Text> </Text>


            <Text style={styles.title } >Información del pagador</Text>
            <Text style={styles.item_succesfull }>Nombre <Text style={styles.item_succesfull_bold}>{userData.name}</Text></Text>
            
            {
              props.route.params.payment_concept == "Estudio de Credito" || props.route.params.payment_concept == "Estudio de Credito + Valoracion" &&
                <TouchableOpacity style={styles.loginBtn} onPress={()=>goToScreen("Homee")}   >
                  <Text style={styles.loginText}>Finalizar</Text>
                </TouchableOpacity>
            }

            {
              props.route.params.payment_concept != "Estudio de Credito" && props.route.params.payment_concept != "Estudio de Credito + Valoracion" &&
                <TouchableOpacity style={styles.loginBtn} onPress={()=>goToScreen("Homee")}   >
                  <Text style={styles.loginText}>Finalizar</Text>
                </TouchableOpacity>
            }
        </View>)

    }



    if(PayDeclined){
      return(
        <View style={{
            justifyContent : 'center',
            alignItems : 'center',
            flex : 1,
            backgroundColor: "white"
        }}>

            <Text style={styles.title_succesfull } >Transacción DECLINADA</Text>


            {MessageError &&
                <Text>{MessageError}</Text>
            }

            <Text style={styles.title } >Información de la transacción</Text>
            <Text style={styles.item_succesfull }>Transacción # <Text style={styles.item_succesfull_bold}>{IdTransaction}</Text></Text>
            <Text style={styles.item_succesfull }>Referencia <Text style={styles.item_succesfull_bold}>{RefferedPay}</Text></Text>
            <Text style={styles.item_succesfull }>Email <Text style={styles.item_succesfull_bold}>{userData.email}</Text> </Text>


            <Text style={styles.title } >Información del pagador</Text>
            <Text style={styles.item_succesfull }>Nombre <Text style={styles.item_succesfull_bold}>{userData.nombres}</Text></Text>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>goToScreen("Dashboard")}   >
                <Text style={styles.loginText}>Finalizar</Text>
            </TouchableOpacity>
            
        </View>)
    }



    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


      return(
            <View style={styles.container}>
              <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
              <View style={styles.header}>

                  <View  style={styles.ItemsHeaderFlex}>
                      <View>
                          <Image
                              style={styles.profile}
                              source={{
                              uri: 'https://image.flaticon.com/icons/png/512/306/306473.png',
                              }}/>
                      </View>
                  </View>


                  <View><Text style={styles.tittleHeader}>Resumen del pago</Text></View>
                  <View><Text style={styles.SubtittleHeader}>Confirma y procesa tu pago de {props.route.params.payment_concept}.</Text></View>
                  <View><Text style={styles.SubtittlePrice}>COP <Text style={styles.Price}>{props.route.params.amount_in_cents}</Text></Text></View>
              </View>
            

              <ScrollView style={styles.scrollView}>
                    
                  <View style={styles.card}>

                              
                        {
                          MessageError &&
                          <Text>{MessageError}</Text>
                        }
                      
                      <Text style={styles.card_item}><Text style={styles.card_item_bold}>Concepto</Text>: {props.route.params.payment_concept}</Text>
                      <Text style={styles.card_item}><Text style={styles.card_item_bold}>Referencia: </Text> {RefferedPay}</Text>
                      <Text style={styles.card_item}><Text style={styles.card_item_bold}>Monto: </Text> {currencyFormat(props.route.params.amount_in_cents)}</Text>


                      <TouchableOpacity style={styles.loginBtn} onPress={()=>GotoPay()}   >
                        <Text style={styles.loginText}>Pagar</Text>
                      </TouchableOpacity>

                  </View>
              </ScrollView>
            </View>
    )


    
}

export default Index;



const styles = StyleSheet.create({

    header: {
        paddingHorizontal: 30,
        backgroundColor: 'white',
        paddingBottom: 10,
        width: "100%",
        alignItems: 'center'
    },

    menu: {
        padding        : 10,
        width: "100%",
        backgroundColor: 'white',
        flexDirection  : "row",
        justifyContent : "space-evenly",
        position: "absolute",
        bottom: 0,
        borderTopColor: "#ddd",
        borderTopWidth: 1
    },

    itemMenu : {
        alignItems: "center"
    },
    

    texMenu : {
        color : "#777"
    },

    texMenuActive : {
        color : "#0093d9"
    },



    ItemsHeaderFlex: {
        flexDirection  : "row",
        justifyContent : "space-between",
       
    },

    container: {
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%",
    },

    icon: {
      width: 80,
      height: 80,
      marginTop: -20
    },
    profile: {
        width: 50,
        height: 50,
        marginTop: -10
    },

    tittleHeader:{
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
        color: 'black'
    },

    SubtittleHeader:{
        color: 'black'
    },

    SubtittlePrice : {
        color: '#1B7BCC',
        fontSize: 20,
        marginTop: 10
    },

    Price : {
        fontWeight : "bold"
    },

    scrollView: {
        marginTop : 1,
        marginHorizontal: 90,
        marginBottom: 80,
        width : "90%",
        height : "100%"
      },
      
    card:{
        color: '#777',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 30,
        width: "100%",
        alignItems: 'center'
    },

    card_item : {
      padding : 7,
      color: 'black'
    },  

    card_item_bold : {
      fontWeight : "bold",
      color: 'black'
    },

    card_content_title : {
        width : "80%",
        justifyContent : "space-evenly"
    },



      loginBtn:{
        width:"80%",
        backgroundColor:"#1B7BCC",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
      },

    

    

      loginText:{
        color:"white"
      },


      btnQuote:{
        width:"100%",
        backgroundColor:"#0093d9",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:15,
      },

      form : {
          width : "100%"
      },
      card_image_content : {
        marginRight: 10,
        borderRightWidth: 1,
        borderRightColor : "#eee",
        paddingRight : 10
      },

      selects_row : {
        flexDirection  : "row",
        
      } ,


      select_month_content : {
        width : 60,
        borderBottomWidth: 1,
        borderBottomColor : "#0093d9",
        backgroundColor: "#eee",
        marginRight : 20
      },
      select_month: {
        height: 40,
        color: "#777",
        
      },

      

      select_year_content : {
        width : 60,
        borderBottomWidth: 1,
        borderBottomColor : "#0093d9",
        backgroundColor: "#eee"
      },
      select_year: {
        width : 100,
        height: 40,
        color: "#777",
      },

      Instrucciones : {
        padding: 10,
        marginTop: 15,  
        backgroundColor: "#f2f9ff",
        borderRadius: 5,
        borderColor: "#bfe1ff",
        borderWidth: 1,
          
      },
      TextInstrucciones : {
          marginBottom: 10,
          color: "#3f4a56",
          lineHeight: 18
      },
      bold : {
          fontWeight : "bold"
      },
      contentImageCard : {
          flexDirection : "row",
          justifyContent : "space-between"
      },

      ImageCard : {
        resizeMode: "contain",
        width : 120
      },



      contentAcceptCard  :{
        flexDirection : "row",
        justifyContent : "space-between",
        backgroundColor : "#f7f9fa",
        borderColor : "#dfe6ee",
        borderWidth : 1,
        borderRadius : 5,
        padding : 10,
        marginBottom : 20,
        alignItems: "center",
      },

      contentAcceptCardText : {
        color : "#777",
        fontSize : 12
      },

      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop : 20
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
        color : "#777",
        lineHeight : 20 
      },

      title_succesfull :{
        fontSize: 20,
        fontWeight : "bold",
        padding: 10,
        color: 'black'
      },
      title : {
        fontWeight: "bold",
        color : "#1B7BCC",
        padding: 5
      },
      item_succesfull : {
        padding: 5,
        color: 'black'
      },
      item_succesfull_bold : {
        fontWeight :  "bold"
      }



  
  });

