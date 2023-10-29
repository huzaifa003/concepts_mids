import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Movies from './Movies';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}

      />

      <Stack.Screen
        name="Movies"
        component={Movies}

      />


      



    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>

      <MyStack />

    </NavigationContainer>
  );
}