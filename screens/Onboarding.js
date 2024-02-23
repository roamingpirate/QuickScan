import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Login from '../components/Login';
import {useIsFocused} from '@react-navigation/native';

const GetStartedBtn = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.GetStartedButton} onPress={onPress}>
        <Text style={styles.GetStartedText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const HeadingComp = ({isVisible}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.Title}>QuickScan</Text>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      {isVisible && <Text style={styles.Heading}>Scan, Mark, Done!</Text>}
    </View>
  );
};

const Onboarding = ({navigation}) => {
  const [getStartedVisiblility, setgetStartedVisibility] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setgetStartedVisibility(true);
  }, [isFocused]);
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        {!getStartedVisiblility && (
          <Icon
            name={'chevron-with-circle-left'}
            size={30}
            color="black"
            onPress={() => setgetStartedVisibility(true)}
            style={styles.backArrow}
          />
        )}
        <View style={styles.ViewBox}>
          <HeadingComp isVisible={getStartedVisiblility} />
          {getStartedVisiblility ? (
            <GetStartedBtn onPress={() => setgetStartedVisibility(false)} />
          ) : (
            <Login navigation={navigation} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontFamily: 'JustMeAgainDownHere-Regular',
    fontSize: 64,
    color: 'black',
  },

  Heading: {
    fontFamily: 'Jura-Light',
    fontSize: 32,
    color: 'black',
  },

  ViewBox: {
    flex: 1,
    justifyContent: 'center',
  },

  logo: {
    width: 128,
    height: 128,
  },
  GetStartedButton: {
    width: 250,
    alignSelf: 'center',
    marginTop: 20,
    height: 45,
    backgroundColor: 'black',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GetStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backArrow: {
    padding: 10,
  },
});

export default Onboarding;
