import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {removeTokenFromStorage} from '../Utils/TokenStorage';

const LogOutBtn = ({onPress}) => {
  return (
    <View style={styles.logOut}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const Header = ({navigation}) => {
  const [logOutVisible, setLogOutVisibility] = useState(false);

  const LogOutUser = async () => {
    await removeTokenFromStorage();
    navigation.navigate('Onboarding');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{padding: 1, paddingTop: 15}}>
          <Icon name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 40,
            fontFamily: 'JustMeAgainDownHere-Regular',
            color: 'black',
            marginLeft: 15,
          }}>
          QuickScan
        </Text>
      </View>
      <TouchableOpacity
        style={{padding: 1, paddingTop: 5}}
        onPress={() => {
          setLogOutVisibility(!logOutVisible);
        }}>
        <Icon name="dots-three-vertical" size={22} color="black" />
      </TouchableOpacity>
      {logOutVisible && <LogOutBtn onPress={() => {LogOutUser();}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  logOut: {
    position: 'absolute',
    top: 50,
    right: 15,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
  },
});

export default Header;
