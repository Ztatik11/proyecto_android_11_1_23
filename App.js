/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React , {useState,useEffect} from "react";
 import { Text, View,FlatList,StyleSheet, TextInput,Image,Button,SafeAreaView} from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
 //import Ionicons from 'react-native-vector-icons/Ionicons';
 const Tab = createBottomTabNavigator();

 export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'pantallas') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'informacion') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }
  
              // You can return any component that you like here!
              //return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Frutas" component={Frutas} />
          <Tab.Screen name="Insertar_fruta" component={Formulario} />
        </Tab.Navigator>
      </NavigationContainer>
    );
           
  }
  function Frutas() {
    const [fruits,setfruits] = useState(null);
    var imageMap = { 
       'uvas.jpg' : require('./assets/uvas.jpg'),
       'pera.jpg' : require('./assets/pera.jpg'),
       'pinia.jpg' : require('./assets/pinia.jpg'),
       'manzana.jpg' : require('./assets/manzana.jpg'),
       'kiwi.jpg' : require('./assets/kiwi.jpg'),
       'naranja.jpg' : require('./assets/naranja.jpg'),
       'platano.jpg' : require('./assets/platano.jpg'),
      }
    useEffect(() => {
      
      fetch("http://192.168.0.21:8080/fruits")
      .then(response => response.json()) 
      .then((response) => {
        console.log("OBTENIENDO DATOS DE LA API FRUTA",response)
        setfruits(response);
      })
      .catch(error => console.log(error));
    }, [])
    const renderItem = ({ item }) => (
      <View style={frutas.contenedor_fruta}>
          <Image style={frutas.imagen_fruta} source={imageMap[item.name + '.jpg']}/>
          <Text style={frutas.texto_fruta}>Nombre: {item.name}</Text>
          <Text style={frutas.texto_fruta}>Precio: {item.price}</Text>
          <Button
            onPress={console.log("Borra_frutonsia")}
            title={"Borrar frutonsia"}
          />
      </View>
    )
      return (
        
      <FlatList
        data={fruits}
        renderItem={renderItem} 
        keyExtractor={item=>item.id}/>
      )
     
  }
  const frutas = StyleSheet.create({
    contenedor_fruta:{
      flex: 1,
      justifyContent: 'center' ,
      padding: 20, margin: 10,
      backgroundColor: 'white',
      borderWidth: 5,
    },
    texto_fruta:{
      flex: 1,
      textAlign:'center',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'black',
      float: "right" 
    },
    imagen_fruta:{
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign:'center',
      borderWidth: 3,
      borderColor: "red",
      float: "left"
    }
});

 function Formulario() {
  const styles = StyleSheet.create({

    titulo:{
      fontSize:50,
      color:'white',
    },
  
    aplicacion:{
      alignItems:"center",
      flex:1,
      backgroundColor:"black",
    },
    contenedor_datos:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      padding:20,
    },
    contenedor_genero:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      padding:20,
      borderWidth:10,
      borderColor:"#FA0505",
      borderRadius:50,
    },
  
    cuadrotexto_bien:{
      backgroundColor:"white",
      color:'white',
      borderColor:'grey',
      borderWidth:1,
      width:200,
    },
  
    cuadrotexto_mal:{
      backgroundColor:"white",
      color:'white',
      borderColor:'red',
      borderWidth:1,
      width:200,
    },
  
    imagen: {
      width: 100,
      height: 100,
      opacity: 1,
    },
  });
  const [nombre,setNombre] =useState(null)
  const [precio,setPrecio] =useState(null)
  const [Validacion_nombre,setvalidacion_nombre] =useState(false)
  const [Validacion_precio,setvalidacion_Precio] =useState(false)
  
  return(
    <View style ={[styles.aplicacion]}>
        <Text style ={[styles.titulo]}>FORMULARIO</Text>
        <View style ={[styles.contenedor_datos]}>
          <Text>Nombre fruta:</Text>
            <TextInput style ={Validacion_nombre ? [styles.cuadrotexto_bien]:[styles.cuadrotexto_mal]}
            name="nombre"
            placeholder="Nombre" 
            onChangeText={nombre=>validacion_campo_nombre(nombre)}
          />
        </View>
        <View style ={[styles.contenedor_datos]}>
          <Text>Precio:</Text>
            <TextInput style ={Validacion_precio ? [styles.cuadrotexto_bien]:[styles.cuadrotexto_mal]}
            name="precio"
            placeholder="0" 
            onChangeText={precio=>Validacion_campo_precio(precio)}
          />
        </View>
        <View>
          <Button
            onPress={nombre != null && precio!=null ? introducir_fruta(): console.log("Datos no validos")}
            title={"Insertar"}
          />
        </View>
    </View>
  )
  
  function validacion_campo_nombre(nombre){
    const solo_texto = /[a-zA-ZÁ-ÿ\s]+$/
    if (solo_texto.test(nombre)) {
      console.log("Validacion 1")
      setvalidacion_nombre(true)
      setNombre(nombre)
    } else {
      setvalidacion_nombre(false)
      setNombre(nombre)
    }
  }
  
  function Validacion_campo_precio(precio){
    const solo_numero = /[0-9\s]+$/
      if (solo_numero.test(precio)) {
        console.log("Validacion 3")
        setvalidacion_Precio(true)
        setPrecio(precio)
      } else {
        setvalidacion_Precio(false)
        setNombre(nombre)
      }
    }

    function introducir_fruta() {
      /**'http://192.168.137.1:8080/fruits' */
      /**'http://192.168.0.21:8080/fruits' */
      fetch('192.168.0.21:8080/fruits', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        name: nombre,
        price: precio,
        }),
      })
      
      .then((response) => response.json())
      .then((responseData) => {
          console.log(
              "POST Response",
              "Response Body -> " + JSON.stringify(responseData)
          )
      }).catch();
      
  }
  
}