import React , {useState,useEffect} from "react";
import {Text, View,FlatList,Image,Button,Alert} from 'react-native';
import frutas from "../styles/ListasFrutas";



export default function Frutas() {

    const [fruits,setfruits] = useState(null);
    var imageMap = { 
       'uvas.jpg' : require('../assets/img/uvas.jpg'),
       'pera.jpg' : require('../assets/img/pera.jpg'),
       'pinia.jpg' : require('../assets/img/pinia.jpg'),
       'manzana.jpg' : require('../assets/img/manzana.jpg'),
       'kiwi.jpg' : require('../assets/img/kiwi.jpg'),
       'naranja.jpg' : require('../assets/img/naranja.jpg'),
       'platano.jpg' : require('../assets/img/platano.jpg'),
      }
    useEffect(() => {
      
      fetch("http://192.168.137.1:8080/fruits")
      .then(response => response.json()) 
      .then((response) => {
        console.log("OBTENIENDO DATOS DE LA API FRUTA",response)
        setfruits(response);
      })
      .catch(error => console.log(error));
    }, [])

    function borrar_fruta(id){
      fetch("http://192.168.137.1:8080/fruits/"+ id, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .catch(e => console.log(e))
      alert('Deleted successfully')
    }

    const renderItem = ({ item }) => (
      <View style={frutas.contenedor_fruta}>
          <Image style={frutas.imagen_fruta} source={imageMap[item.name + '.jpg']}/>
          <Text style={frutas.texto_fruta}>Nombre: {item.name}</Text>
          <Text style={frutas.texto_fruta}>Precio: {item.price}</Text>
          <Button
            onPress={() => {
              borrar_fruta(item.id)
              Alert.alert("Elminada","Fruta eliminada correctamente", [
              {text: "OK",onPress:() => console.log("Alerta cerrada")}
            ])} }
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