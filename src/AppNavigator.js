import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import EditTodoScreen from './screens/EditTodoScreen';
import DetailTodoScreen from './screens/DetailTodoScreen';
import OnboardingScreen from './screens/OnboardingScreen'; 

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ 
          headerShown: false 
        }} />
        <Stack.Screen name="Home"component={HomeScreen} options={{ 
          headerShown: false 
        }} />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ 
          headerShown: false 
        }} />
        <Stack.Screen name="EditTodo" component={EditTodoScreen} options={{
          headerShown: false 
        }} />
        <Stack.Screen name="DetailTodo" component={DetailTodoScreen} options={{ 
          headerShown: false 
        }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
