import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Profile as ProfileIcon, ShoppingCart} from 'iconsax-react-native';
import CoberturaLogoWhite from '../../Assets/Icons/CoberturaLogoWhite.png';
import SoatLogo from '../../Assets/Icons/SoatLogo.png';
import ViajesLogo from '../../Assets/Icons/ViajesLogo.png';
import ArriendoLogo from '../../Assets/Icons/ArriendoLogo.png';
//import MotoLogo from '../../Assets/Icons/MotoLogo.png'
import AutomovilLogo from '../../Assets/Icons/AutomovilLogo.png';
//import SegurosVoluntariosLogo from '../../Assets/Icons/SegurosVoluntariosLogo.png'
//import PlanComplementarioLogo from '../../Assets/Icons/PlanComplementarioLogo.png'
import CasaLogo from '../../Assets/Icons/CasaLogo.png';
import BackgroundCoberturasJ from '../../Assets/Icons/BackgroundCoberturasJ.jpg';
import CoberturaLogoBlue from '../../Assets/Icons/CoberturaLogoBlue.png';
import SoatLogoBlue from '../../Assets/Icons/SoatLogoBlue.png';
import ViajesLogoBlue from '../../Assets/Icons/ViajesLogoBlue.png';
import ArriendoLogoBlue from '../../Assets/Icons/ArriendoLogoBlue.png';
//import MotoLogoBlue from '../../Assets/Icons/MotoLogoBlue.png'
import AutomovilLogoBlue from '../../Assets/Icons/AutomovilLogoBlue.png';
//import SegurosVoluntariosLogoBlue from '../../Assets/Icons/SegurosVoluntariosLogoBlue.png'
import PetsLogo from '../../Assets/Icons/PetsLogo.png';
import PetsLogoBlue from '../../Assets/Icons/PetsLogoBlue.png';
//import PlanComplementarioLogoBlue from '../../Assets/Icons/PlanComplementarioLogoBlue.png'
import CasaLogoBlue from '../../Assets/Icons/CasaLogoBlue.png';
import ServicesCardScreen from '../../components/ServicesCardScreen';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Profile from '../Profile';
import {AuthContext} from '../../Context/AuthContext';
//import axios from 'axios'
// import {REACT_APP_USERDATABASE, REACT_APP_SERVER} from "@env"

const servicess = [
  {
    id: '1',
    name: 'Cobertura Jurídica',
    description:
      'Es una herramienta de protección jurídica y judicial diseñada para usted, con el fin de blindar su actuar...',
    price: '',
    logo: CoberturaLogoWhite,
    logoDetail: CoberturaLogoBlue,
    status: 'comprar',
    backgroundImg: BackgroundCoberturasJ,
    procedimientos: [
      {
        estetico: {
          planes: [
            {
              planId: '1',
              planName: 'Básico',
              planDescription: `Es una herramienta de protección jurídica y judicial diseñada para usted, con el fin de blindar su actuar profesional de manera previa a la realización de cualquier procedimiento quirúrgico o tratamiento estético y con posterioridad a su efectiva realización. Cubre de manera integral todos los procedimientos quirúrgicos realizados por el cirujano plástico y médico cirujano (en dupla o exclusivamente por cirujano plástico) y no quirúrgicos (tratamientos estéticos), realizados por el cirujano plástico o médico cirujano y/o estético. Igualmente, se cubre cualquier tipo de tratamientos posquirúrgicos (masajes, drenajes, utilización de equipos de laser, ultrasonido, carboxis o en general) y servicios de medicina estética. Sin embargo, con una atención personalizada podrá proteger de forma particular cada intervención y/o tratamiento a realizar por usted o su empresa.${'\n'}${'\n'} 1. Asesoría y Acompañamiento Jurídico en la Etapa Precontractual con su paciente.${'\n'}${'\n'} 2. Representación Judicial en proceso de responsabilidad civil médica y/o responsabilidad civil en el caso de empresas dedicadas a la prestación de servicios médicos quirúrgicos y estéticos.${'\n'}${'\n'} 3. Representación Judicial en proceso penal.${'\n'}${'\n'} 4. Representación Judicial en proceso de responsabilidad disciplinaria médica ante el Tribunal de Ética Médica.${'\n'}${'\n'} 5. Acompañamiento y Asesoría permanente en proceso posoperatorio y restablecimiento de relación médico-paciente.${'\n'}${'\n'} 6. Acompañamiento y Capacitación en diligenciamiento de Historia Clínica.`,
              planPrice: '100.000',
            },
            {
              planId: '2',
              planName: 'Plus',
              planDescription:
                'Incluye los servicios de la cobertura básica y adicionalmente archivo, contratos, documentación y capacitación para el médico o la empresa que aportan una mejor gestión de la historia clínica como base de cualquier proceso judicial.',
              planPrice: '150.000',
            },
          ],
        },
      },
      {
        quirurgico: {
          planes: [
            {
              planId: '1',
              planName: 'Básico',
              planDescription: `Es una herramienta de protección jurídica y judicial diseñada para usted, con el fin de blindar su actuar profesional de manera previa a la realización de cualquier procedimiento quirúrgico o tratamiento estético y con posterioridad a su efectiva realización. Cubre de manera integral todos los procedimientos quirúrgicos realizados por el cirujano plástico y médico cirujano (en dupla o exclusivamente por cirujano plástico) y no quirúrgicos (tratamientos estéticos), realizados por el cirujano plástico o médico cirujano y/o estético. Igualmente, se cubre cualquier tipo de tratamientos posquirúrgicos (masajes, drenajes, utilización de equipos de laser, ultrasonido, carboxis o en general) y servicios de medicina estética. Sin embargo, con una atención personalizada podrá proteger de forma particular cada intervención y/o tratamiento a realizar por usted o su empresa.${'\n'}${'\n'} 1. Asesoría y Acompañamiento Jurídico en la Etapa Precontractual con su paciente.${'\n'}${'\n'} 2. Representación Judicial en proceso de responsabilidad civil médica y/o responsabilidad civil en el caso de empresas dedicadas a la prestación de servicios médicos quirúrgicos y estéticos.${'\n'}${'\n'} 3. Representación Judicial en proceso penal.${'\n'}${'\n'} 4. Representación Judicial en proceso de responsabilidad disciplinaria médica ante el Tribunal de Ética Médica.${'\n'}${'\n'} 5. Acompañamiento y Asesoría permanente en proceso posoperatorio y restablecimiento de relación médico-paciente.${'\n'}${'\n'} 6. Acompañamiento y Capacitación en diligenciamiento de Historia Clínica.`,
              planPrice: '150.000',
            },
            {
              planId: '2',
              planName: 'Plus',
              planDescription:
                'Incluye los servicios de la cobertura básica y adicionalmente archivo, contratos, documentación y capacitación para el médico o la empresa que aportan una mejor gestión de la historia clínica como base de cualquier proceso judicial.',
              planPrice: '280.000',
            },
          ],
        },
      },
    ],
  },
  {
    id: '2',
    name: 'Complicaciones Postquirúrgicas',
    description:
      'Tiene como objeto Cubrir Los gastos médicos, de urgencias, hospitalarios y...',
    descriptionL: `Tiene como objeto Cubrir Los gastos médicos, de urgencias, hospitalarios y quirúrgicos que se deriven de una complicación de Cirugía Estética.${'\n'}${'\n'}Le permite al asegurado, al profesional de la salud o a la institución prestadora de servicios de salud IPS, contar con una protección en gastos médicos adicional en caso de que se presente alguna complicación médico-quirúrgica, enmarcado en la seguridad de la atención en salud del paciente asegurado.${'\n'}${'\n'}Cubre hasta el límite establecido en la caratula de la póliza (como máxima responsabilidad), de los gastos médicos, que se deriven de la atención de una complicación por un procedimiento quirúrgico cubierto por la póliza.${'\n'}${'\n'}Complicaciones cubiertas${'\n'}${'\n'}- Se cubren las complicaciones que puedan aparecer dentro de los 45 días calendario, contados a partir de la hora de inicio del procedimiento, En caso de presentarse la compañía indemnizará los gastos médicos de urgencias, hospitalarios y quirúrgicos hasta por trecientos sesenta y cinco días (365) días calendario contados a partir de la fecha del diagnóstico de la complicación o hasta el valor contratado.${'\n'}${'\n'}- Se da cobertura para el manejo quirúrgico de la Contractura Capsular como parte de la cobertura para mamoplastia.${'\n'}${'\n'}- Se autorizan dentro del mismo acto quirúrgico procedimientos funcionales relacionados con las siguientes especialidades: Dermatología, Otorrinolaringología, Ginecología, Cirugía General y Cirugía Oral. Siempre y cuando los mismos estén asociados a un procedimiento Estético cubierto y sean autorizados por la aseguradora.
    `,
    price: '100.000',
    logo: CoberturaLogoWhite,
    logoDetail: CoberturaLogoBlue,
    status: 'comprar',
    backgroundImg: BackgroundCoberturasJ,
    url: 'https://api.whatsapp.com/send?phone=573127813077&text=Hola,%20estoy%20interesado%20en%20adquirir%20un%20servicio%20de%20Complicaciones%20Postquirúrgicas',
  },
  /*{
    id: '3',
    name: 'Soat',
    description: 'Con el Seguro Obligat​orio de Accidentes de Tránsito manejas tranquilo porque sabes que estás...',
    descriptionL: `Con el Seguro Obligat​orio de Accidentes de Tránsito manejas tranquilo porque sabes que estás cumpliendo la ley y con la responsabilidad de garantizar una prestación para conductores, pa​sajeros o peatones que se vean afectados en caso de sufrir algún accidente. Cuenta con:${"\n"}${"\n"}- Indemnización por muerte y gastos funerarios: Si como producto de un accidente de tránsito llegas a perder la vida, el SOAT garantiza que a tus beneficiarios se les entregan 750 salarios mínimos diarios legales vigentes que incluyen gastos de funeral. Ten en cuenta que esta indemnización solo es posible si el fallecimiento de la víctima se da antes de cumplirse un año del accidente y como consecuencia de este, es decir, si una persona queda en estado de coma, pero muere después de doce meses, esta cobertura ya no sería válida dentro del seguro. Esta indemnización también se les da a los beneficiarios de las personas que vayan contigo o a los peatones que fallezcan por causa del accidente.${"\n"}${"\n"}- Servicios de salud: Si en un accidente tú, las personas que van contigo o un peatón que atropellaste necesitan atención médica, el SOAT les cubre gastos como cirugías, exámenes, terapias, medicamentos y todo lo necesario para su recuperación.${"\n"}${"\n"}- Incapacidad: Si luego de tener un accidente de tránsito, el médico determina alguna pérdida de capacidad laboral, tienes una indemnización de máximo 180 salarios mínimos diarios legales vigentes. Ten en cuenta que si es una incapacidad temporal​, el SOAT no te cubre, sino que debes acudir a tu EPS.${"\n"}${"\n"}- Gastos de transporte: El SOAT te cubre los gastos de transporte de cada una de las personas que se vean afectadas con el accidente, desde el sitio donde ocurra hasta un centro médico. Por cada uno son 10 salarios mínimos diarios legales vigentes.${"\n"}${"\n"}Los beneficiarios pueden contar con una indemnización de 750 salarios mínimos diarios legales vigentes en caso de que tú, tus acompañantes o un peatón mueran como producto de un accidente de tránsito.${"\n"}${"\n"}Se pagan tus servicios de salud, los de las personas que vayan contigo en el momento del accidente o los de un peatón, hasta máximo 800 salarios mínimos diarios legales vigentes.${"\n"}${"\n"}Puedes tener una indemnización hasta 180 salarios mínimos diarios legales vigentes si quedas con discapacidad.${"\n"}${"\n"}Cubre los gastos de transporte desde el sitio del accidente hasta un centro médico por 10 salarios mínimos diarios legales vigentes.`,
    price: '100.000',
    logo: SoatLogo,
    logoDetail: SoatLogoBlue,
    status: 'comprar',
    backgroundImg: BackgroundCoberturasJ,
    url: ''
  },*/
  {
    id: '4',
    name: 'Seguro de Viajes',
    description:
      'Si durante tu viaje tienes un accidente o una enfermedad, coordinando los servicios médicos que...',
    descriptionL: `Si durante tu viaje tienes un accidente o una enfermedad, coordinando los servicios médicos que requieras. Si no te sientes bien, recibe atención médica por medio de llamada telefónica desde donde estés para ser atendido por un experto y, de acuerdo con tu estado de salud, te orientamos de la mejor manera.${'\n'}${'\n'}Se te paga el valor asegurado si afrontas alguna de las siguientes situaciones: se te pierde o demora tu equipaje, te roban tus documentos o cancelas tu viaje.${'\n'}${'\n'}Líneas de atención gratuitas en cinco países y atención rápida por WhatsApp. Además, ​cubrimiento para enfermedades preexistentes por hasta diez mil dólares.${'\n'}${'\n'}Todas las personas que, como tú, planean disfrutar sin límites un viaje nacional o internacional, sea terrestre o aéreo, solo o en compañía de tus seres queridos.${'\n'}${'\n'}Las coberturas están disponibles para cualquier interesado que tenga entre 0 y 74 años para el seguro internacional y sin ningún límite para el nacional. No se requiere evaluación médica ni declaración de asegurabilidad.`,
    price: '250.000',
    logo: ViajesLogo,
    logoDetail: ViajesLogoBlue,
    status: 'comprar',
    backgroundImg: BackgroundCoberturasJ,
    url: 'https://www.suraenlinea.com/viajes/sura?codigoAsesor=94516',
  },
  {
    id: '5',
    name: 'Arrendamiento Digital',
    description:
      'Genera tranquilidad saber que cada mes cuentas con el dinero que te pagan los...',
    descriptionL: `Genera tranquilidad saber que cada mes cuentas con el dinero que te pagan los inquilinos de tu propiedad, pero cuando no sea así, ¡no te preocupes! Tenemos la solución para que nunca dejes de recibir tus ingresos.​​​​​​​​​​${'\n'}${'\n'}Según la modalidad y el plan que elijas:${'\n'}Coberturas básicas:${'\n'}- Pago del arriendo en caso de incumplimiento de tu inquilino${'\n'}- Pago de cuotas de administración.${'\n'}- Servicios públicos domiciliarios pendientes en la entrega del inmueble${'\n'}${'\n'}Coberturas opcionales:${'\n'}- Daños y faltantes al inventario${'\n'}- Asistencia domiciliaria (servicios de plomería, electricidad, cerrajería, reemplazo de vidrios, gastos de traslado y asistencia jurídica telefónica).${'\n'}${'\n'}En caso de reclamación, la cobertura se mantendrá hasta que se restituya el inmueble o hasta que el inquilino efectúe el pago de sus obligaciones, con un límite máximo de indemnización de 12 meses. El seguro debe estar vigente y a paz y salvo.`,
    price: '250.000',
    logo: ArriendoLogo,
    logoDetail: ArriendoLogoBlue,
    status: 'comprar',
    backgroundImg: BackgroundCoberturasJ,
    url: 'https://www.suraenlinea.com/arrendamiento-digital/sura/cotizacion/calculadora?asesor=94516',
  },

  // {
  //   id: '8',
  //   name: 'Seguros Voluntarios',
  //   description: 'Descripción corta de lo que contiene el plan de cobertura jurídica',
  //   descriptionL: 'Standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  //   price: '100.000',
  //   logo: SegurosVoluntariosLogo,
  //   logoDetail: SegurosVoluntariosLogoBlue,
  //   status: 'comprar',
  //   backgroundImg: BackgroundCoberturasJ,
  //   url: 'https://www.suraenlinea.com/home?asesor=XXXXX#motos'
  // },
  // {
  //   id: '9',
  //   name: 'Plan Complementario',
  //   description: 'El Plan Complementario es un conjunto de servicios al que puedes acceder...',
  //   descriptionL: `El Plan Complementario es un conjunto de servicios al que puedes acceder voluntariamente para complementar tu EPS o Plan de Beneficios de Salud (PBS), brindándote coberturas no incluidas en éste y que te permiten disfrutar de la atención en condiciones de comodidad.${"\n"}${"\n"}Puedes contar con la red médica y hospitalaria de tu Plan de Beneficios en Salud, pero con una amplia lista de servicios adicionales como atención médica y odontológica domiciliaria, habitación individual si te hospitalizan y acceso directo a especialistas.${"\n"}${"\n"}En cualquiera de los casos, es requisito estar afiliado al Plan de Beneficios en Salud en el régimen contributivo.${"\n"}${"\n"}Se cuenta con diferentes planes acorde con tus necesidades y capacidad económica, que brindan diferentes coberturas, estos son: Plan plus, plan preferencial y plan Básico.`,
  //   price: '100.000',
  //   logo: PlanComplementarioLogo,
  //   logoDetail: PlanComplementarioLogoBlue,
  //   status: 'comprar',
  //   backgroundImg: BackgroundCoberturasJ,
  //   url: 'https://www.suraenlinea.com/pac-digital/sura/cotizar/datos?asesor=XXXX'
  // },
];

const ServicesScreen = () => {
  const Navigation = useNavigation();
  const bottomSheetModalProfileRef = useRef(null);
  const snapModalPoint = ['100'];
  const {shopping} = useContext(AuthContext);

  // const [services, setServices] = useState([])

  const handlerModal = () => {
    bottomSheetModalProfileRef.current?.present();
  };

  useEffect(() => {
    // const getServices = async () => {
    //   await axios.get(`${REACT_APP_USERDATABASE}/trackingservice`).then((resp) => {
    //     setServices(resp.data)
    //   }).catch((err) => console.log(err))
    // }
    // getServices()

    Navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handlerModal}>
          <ProfileIcon
            color="black"
            variant="Linear"
            size={30}
            style={{marginLeft: 20}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => Navigation.navigate('ShoppingCart')}
          style={{position: 'relative'}}>
          <ShoppingCart
            color="black"
            variant="Linear"
            size={30}
            style={{marginRight: 20}}
          />
          {shopping.length > 0 ? (
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: -7,
                backgroundColor: '#1B7BCC',
                height: 22,
                width: 22,
                borderRadius: 50,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 12}}>
                {shopping.length}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ),
      headerTitle: 'Agregar Servicios',
      headerStyle: {
        borderBottomColor: 'white',
        shadowOpacity: 0,
      },
      //for android
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, [Navigation, shopping]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.servicesScreen}>
        <BottomSheetModal
          ref={bottomSheetModalProfileRef}
          index={0}
          snapPoints={snapModalPoint}>
          <Profile />
        </BottomSheetModal>
        <View style={styles.servicesScreen_}>
          <FlatList
            data={servicess}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ServicesCardScreen
                status={item.status}
                logo={item.logo}
                name={item.name}
                description={item.description}
                price={item.price}
                id={item.id}
                descriptionL={item.descriptionL}
                backgroundImg={item.backgroundImg}
                logoDetail={item.logoDetail}
                planes={item.planes}
                procedimientos={item.procedimientos}
                url={item.url}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  servicesScreen: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  servicesScreen_: {
    width: '90%',
  },
});
