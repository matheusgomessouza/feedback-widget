import React from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { Copyright } from '../Copyright';

import successImg from '../../assets/success.png';

import { styles } from './styles';

interface Props {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={successImg}
      />
      <Text style={styles.title}>
        Thank you for the feedback!
      </Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={onSendAnotherFeedback}
      >
        <Text style={styles.buttonTitle}>
          Send another feedback
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}