import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import QRCodeScanner from '../components/QrCodeScanner';

const QRScanScreen = ({route}) => {
    const studentID = route.params.studentID;
  return (
      <QRCodeScanner studentID={studentID}/>
  );
};

export default QRScanScreen;
