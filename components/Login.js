import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import InputBox from './InputBox';
import ComboBox from './ComboBox';
import Icon from 'react-native-vector-icons/Entypo';
import DeviceInfo from 'react-native-device-info';
import getapiClient from '../api/apiClient';
import {saveTokenToStorage, getTokenFromStorage} from '../Utils/TokenStorage';
import CheckBox from 'react-native-check-box';
import {Screen} from 'react-native-screens';

const Btn = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const LinkText = ({text1, text2, onPress}) => (
  <View style={styles.linkTextContainer}>
    <Text style={styles.linkText}>{text1}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.linkText, styles.link]}>{text2}</Text>
    </TouchableOpacity>
  </View>
);

const SignIn = ({onSwitchForm, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signInHandler = async () => {
    setLoading(true);
    if (!email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }
    if (!isEmailValid(email.trim())) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      setLoading(false);
      return;
    }
    if (password.trim().length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    setError('');

    try {
      const apiClient = await getapiClient();
      const response = await apiClient.post('/user/login', {
        email: email,
        password: password,
      });
      console.log(response.data.token);
      await saveTokenToStorage(response.data.token);
      navigation.navigate('Welcome');
      setLoading(false);
    } catch (error) {
      const em = error.response.data.message;
      setError(em);
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.heading}>Sign In to your account</Text>
      <InputBox iconLeft="mail" placeholder="Email" onChangeText={setEmail} />
      <InputBox
        iconLeft="lock"
        placeholder="Password"
        isPassword
        onChangeText={setPassword}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <Icon name="circle-with-cross" size={20} color="#DB1F2D" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      {loading && <ActivityIndicator size="large" color="#6635BF" />}
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
      <Btn text="Sign In" onPress={signInHandler} />
      <LinkText
        text1="Don't have an account?"
        text2="Sign Up"
        onPress={onSwitchForm}
      />
    </View>
  );
};

const SignUp = ({onSwitchForm, navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institute, setInstitute] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const signUpHandler = async () => {
    setLoading(true);
    if (!username.trim()) {
      setError('Please enter your username');
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }
    if (!isEmailValid(email.trim())) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      setLoading(false);
      return;
    }
    if (password.trim().length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    if (!institute.trim()) {
      setError('Please enter your institute name');
      setLoading(false);
      return;
    }

    setError('');

    const deviceId = await DeviceInfo.getAndroidId();
    const accountType = isTeacher ? 'teacher' : 'student';

    const Data = {
      email,
      password,
      name: username,
      instituteName: institute,
      deviceId,
      accountType,
    };

    try {
      const apiClient = await getapiClient();
      const response = await apiClient.post('/user/register', Data);
      console.log(response.data.token);
      await saveTokenToStorage(response.data.token);
      navigation.navigate('Welcome');
      setLoading(false);
    } catch (error) {
      setError(error.response);
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Sign Up</Text>
      <InputBox
        iconLeft="user"
        placeholder="Username"
        onChangeText={setUsername}
      />
      <InputBox iconLeft="mail" placeholder="Email" onChangeText={setEmail} />
      <InputBox
        iconLeft="lock"
        placeholder="Password"
        isPassword
        onChangeText={setPassword}
      />
      <ComboBox onChangeData={setInstitute} />

      {error ? (
        <View style={styles.errorContainer}>
          <Icon name="circle-with-cross" size={20} color="#DB1F2D" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {loading && <ActivityIndicator size="large" color="#6635BF" />}
      <View style={{flexDirection: 'row', padding: 5}}>
        <CheckBox
          onClick={() => setIsTeacher(!isTeacher)}
          isChecked={isTeacher}
        />
        <Text
          style={{
            color: 'grey',
            fontFamily: 'AbrilFatface-Regular',
            marginLeft: 5,
          }}>
          Sign Up as Faculty
        </Text>
      </View>
      <Btn text="Sign Up" onPress={signUpHandler} />
      <LinkText
        text1="Already have an account?"
        text2="Sign In"
        onPress={onSwitchForm}
      />
    </View>
  );
};


const Login = ({navigation}) => {
  const [isSignIn, setSignIn] = useState(true);
  const [loading, setLoading] = useState(true);

  const CheckisLoggedIn = async navigation => {
    const d = await getTokenFromStorage();
    console.log('lol');
    console.log(d);
    setLoading(false);
    if (d) {
      navigation.navigate('Welcome');
    }
  };

  const switchForm = () => {
    setSignIn(!isSignIn);
  };

  useEffect(() => {
    CheckisLoggedIn(navigation);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6635BF" />
      ) : (
        <View>
          {isSignIn ? (
            <SignIn onSwitchForm={switchForm} navigation={navigation} />
          ) : (
            <SignUp onSwitchForm={switchForm} navigation={navigation} />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  welcome: {
    fontFamily: 'AbrilFatface-Regular',
    fontSize: 24,
    color: 'black',
    paddingVertical: 5,
  },
  heading: {
    fontFamily: 'AbrilFatface-Regular',
    fontSize: 16,
    color: '#52504F',
    paddingVertical: 5,
  },
  inputBox: {
    paddingVertical: 5,
    marginRight: 15,
  },
  forgotPassword: {
    color: '#6635BF',
    alignSelf: 'flex-end',
    marginRight: 15,
    padding: 5,
    fontFamily: 'AbrilFatface-Regular',
  },
  button: {
    alignSelf: 'center',
    width: '95%',
    height: 45,
    marginRight: 15,
    marginTop: 10,
    backgroundColor: '#6635BF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'AbrilFatface-Regular',
  },
  linkTextContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontFamily: 'AbrilFatface-Regular',
    color: 'grey',
  },
  link: {
    marginLeft: 5,
    color: '#6635BF',
  },
  errorText: {
    color: '#DB1F2D',
    marginBottom: 0,
    marginLeft: 10,
    fontFamily: 'AbrilFatface-Regular',
    fontWeight: 'bold',
  },
  errorContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 10,
  },
});

const isEmailValid = email => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export default Login;
