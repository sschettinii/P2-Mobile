import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import FormScreen from './src/screens/FormScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Receitas', headerStyle: { backgroundColor: '#343a40' }, headerTintColor: '#fff' }} 
        />
        <Stack.Screen 
          name="Form" 
          component={FormScreen} 
          options={{ title: 'Cadastro/Edição', headerStyle: { backgroundColor: '#343a40' }, headerTintColor: '#fff' }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Detalhes da Receita', headerStyle: { backgroundColor: '#343a40' }, headerTintColor: '#fff' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}