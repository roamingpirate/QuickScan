import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import getapiClient from '../api/apiClient';
import {useIsFocused} from '@react-navigation/native';

const Btn = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const QRCodeScanner = ({studentID}) => {
  const [scanned, setScanned] = useState(false);
  const [isOpened, setOpened] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    setScanned(false);
  }, [isFocused]);

  const handleQRCodeScanned = async ({data}) => {
    console.log('Scanned!');
    console.log(data);
    setScanned(true);
    setOpened(false);
    setLoading(true);
    const unixTimeInSeconds = Math.floor(Date.now() / 1000);
    const qrData = {
      studentID: studentID,
      scannedTimeStamp: unixTimeInSeconds,
      qrCodeData: data,
    };
    console.log(qrData);
    try {
      const apiClient = await getapiClient();
      const response = await apiClient.post('/attendence/markAttendence', qrData);
      setLoading(false);
      console.log(response.data);
      setMessage(response.data.message);

      if (response.status === 200) {
        setIsSuccess(true);
        console.log('Kauaa');
        console.log(response.data.classData);
        setClassName(response.data.classData.className);
        setClassCode(response.data.classData.classCode);
      } else {
        setScanned(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={scanned ? undefined : handleQRCodeScanned}
        captureAudio={false}>
        <View style={styles.border} />
      </RNCamera>
      <View style={styles.DetailBox}>
        <Text
          style={{
            fontSize: 18,
            color: '#116f8c',
            fontFamily: 'AbrilFatface-Regular',
          }}>
          Scan the QR CODE to mark attendence
        </Text>
        {isOpened ? (
          <Image
            source={require('../assets/images/qr-code.png')}
            style={styles.logo}
          />
        ) : (
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={styles.Text}>{message}</Text>
            {isSuccess && (
              <View style={{alignItems: 'center'}}>
                <Text style={styles.Text}>{className}</Text>
                <Text style={styles.Text}>{classCode}</Text>
                <Btn text="Done" />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  camera: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  border: {
    width: 220,
    height: 220,
    marginTop: '30%',
    borderColor: '#2D9DAC',
    borderWidth: 3,
    borderRadius: 5,
  },
  DetailBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: 260,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  Text: {
    fontSize: 20,
    color: '#116f8c',
    fontFamily: 'AbrilFatface-Regular',
  },
  logo: {
    width: 128,
    marginTop: 30,
    height: 128,
  },
  button: {
    alignSelf: 'center',
    width: 150,
    height: 45,
    marginRight: 15,
    marginTop: 15,
    backgroundColor: '#116f8c',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AbrilFatface-Regular',
  },
});

export default QRCodeScanner;
