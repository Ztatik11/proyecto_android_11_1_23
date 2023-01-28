import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons'
import Frutas from "./ListaFrutas";
import Formulario from "./InsertarFrutas";



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
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'green',
          })}
        >
          <Tab.Screen name="Frutas" component={Frutas} />
          <Tab.Screen name="Insertar fruta" component={Formulario} />
        </Tab.Navigator>
      </NavigationContainer>
    );
           
}