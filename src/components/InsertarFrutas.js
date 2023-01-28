import React , {useState} from "react";
import { Text, View,TextInput,Button} from 'react-native';
import estiloformulario from "../styles/InsertarFrutas";




export default function Formulario() {
    
    const [nombre,setNombre] =useState(null)
    const [precio,setPrecio] =useState(null)
    const [Validacion_nombre,setvalidacion_nombre] =useState(false)
    const [Validacion_precio,setvalidacion_Precio] =useState(false)
    
    return(
      <View style ={[estiloformulario.aplicacion]}>
          <Text style ={[estiloformulario.titulo]}>FORMULARIO</Text>
          <View style ={[estiloformulario.contenedor_datos]}>
            <Text>Nombre fruta:</Text>
              <TextInput style ={Validacion_nombre ? [estiloformulario.cuadrotexto_bien]:[estiloformulario.cuadrotexto_mal]}
              name="nombre"
              placeholder="Nombre" 
              onChangeText={nombre=>validacion_campo_nombre(nombre)}
            />
          </View>
          <View style ={[estiloformulario.contenedor_datos]}>
            <Text>Precio:</Text>
              <TextInput style ={Validacion_precio ? [estiloformulario.cuadrotexto_bien]:[estiloformulario.cuadrotexto_mal]}
              name="precio"
              placeholder="0" 
              onChangeText={precio=>Validacion_campo_precio(precio)}
            />
          </View>
          <View>
            <Button
              onPress={() => nombre != null || precio!=null ? introducir_fruta(): console.log("Datos no validos")}
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
      const solo_numero = /^[0-9]+([,][0-9]+)?$/
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
        console.log(nombre,precio);
        /**'http://192.168.137.1:8080/fruits' */
        /**'http://192.168.0.21:8080/fruits' */
        fetch('http://192.168.0.21:8080/fruits', {
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