import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Welcome from './screens/WelcomeScreen';
import StudentDashboard from './screens/StudentDashboard';
import TeacherDashboard from './screens/TeacherDashboard';
import CreateClass from './screens/CreateClass';
import Header from './components/Header';
import ClassScreen from './screens/ClassScreen';
import AttendenceScreen from './screens/AttendenceScreen';
import QRScanScreen from './screens/QRScanScreen';
import JoinClass from './screens/JoinClass';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="teacher"
          component={TeacherDashboard}
          options={({navigation}) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="student"
          component={StudentDashboard}
          options={({navigation}) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateClass"
          component={CreateClass}
          options={({navigation}) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="JoinClass"
          component={JoinClass}
          options={({navigation}) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Class"
          component={ClassScreen}
          options={({navigation}) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Attendence"
          component={AttendenceScreen}
          options={({navigation}) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="QRScan"
          component={QRScanScreen}
          options={({navigation}) => ({
            header: () => <Header navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
