import React, { useState } from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import * as FileSystem from 'expo-file-system';

import { theme } from '../../theme';
import { FeedbackType } from '../Widget';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { api } from '../../libs/api';

import { styles } from './styles';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ 
  feedbackType, 
  onFeedbackCanceled,
  onFeedbackSent
}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreeshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  
  function handleScreeshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreeshot(uri))
      .catch(error => console.log(error));
  }

  function handleScreeshotRemove() {
    setScreeshot(null);
  }

  async function hanleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);
    const screenshotBase64 = 
      screenshot && 
        await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

    try { 
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      });
      onFeedbackSent();

    } catch (error) { 
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft 
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image 
            style={styles.image} 
            source={feedbackTypeInfo.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        style={styles.input}
        multiline
        placeholder=" 
          Algo não está funcionando bem? 
          Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton 
          onTakeShot={handleScreeshot}
          onRemoveShot={handleScreeshotRemove}
          screenshot={screenshot}
        />
        <Button 
          onPress={hanleSendFeedback}
          isLoading={isSendingFeedback} 
        />
      </View>
    </View>
  );
}