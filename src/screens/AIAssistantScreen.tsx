import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  Text,
} from 'react-native';
// import { VideoView, useVideoPlayer } from 'expo-video';
// import { Asset } from 'expo-asset';
import { theme } from '../theme/theme';
// import * as Speech from 'expo-speech';
// import * as SpeechRecognition from 'expo-speech-recognition';
import { askMe } from '../services/aiService';

const { width } = Dimensions.get('window');

export const AIAssistantScreen = () => {
  const [currentState, setCurrentState] = useState<
    'idle' | 'listening' | 'talking'
  >('idle');
  const [listeningUri, setListeningUri] = useState<string | null>(null);
  const [talkingUri, setTalkingUri] = useState<string | null>(null);
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');

  useEffect(() => {
    (async () => {
      // const listeningAsset = Asset.fromModule(
      //   require('../assets/aiAsistant/listening.mp4'),
      // );
      // const talkingAsset = Asset.fromModule(
      //   require('../assets/aiAsistant/talking.mp4'),
      // );
      // await Promise.all([
      //   listeningAsset.downloadAsync(),
      //   talkingAsset.downloadAsync(),
      // ]);
      // setListeningUri(listeningAsset.uri);
      // setTalkingUri(talkingAsset.uri);
    })();
  }, []);

  // const listeningPlayer = useVideoPlayer(listeningUri, player => {
  //   player.loop = true;
  //   currentState === 'listening' ? player.play() : player.pause();
  // });

  // const talkingPlayer = useVideoPlayer(talkingUri, player => {
  //   player.loop = true;
  //   currentState === 'talking' ? player.play() : player.pause();
  // });

  // useEffect(() => {
  //   if (listeningPlayer) {
  //     currentState === 'listening'
  //       ? listeningPlayer.play()
  //       : listeningPlayer.pause();
  //   }
  //   if (talkingPlayer) {
  //     currentState === 'talking' ? talkingPlayer.play() : talkingPlayer.pause();
  //   }
  // }, [currentState, listeningPlayer, talkingPlayer]);

  const startListening = async () => {
    try {
      setCurrentState('listening');
      setUserText('');

      //   const result = await SpeechRecognition.startAsync({
      //     language: 'tr-TR',
      //     interimResults: false,
      //   });

      //   if (result?.transcript) {
      //     setUserText(result.transcript);
      //     setCurrentState('idle');
      //     await handleAIResponse(result.transcript);
      //   } else {
      //     setCurrentState('idle');
      //   }
    } catch (err) {
      console.error('Speech recognition error', err);
      setCurrentState('idle');
    }
  };

  // const handleAIResponse = async (text: string) => {
  //   try {
  //     setCurrentState('talking');
  //     const aiResponse = await askMe(text);
  //     setAiText(aiResponse);
  //     //   Speech.speak(aiResponse, {
  //     //     language: 'tr-TR',
  //     //     onDone: () => setCurrentState('idle'),
  //     //   });
  //   } catch (err) {
  //     console.error('AI response error', err);
  //     setCurrentState('idle');
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* Static avatar */}
        <Image
          source={require('../assets/aiAsistant/aiAvatar.jpeg')}
          style={[styles.avatar, { opacity: currentState === 'idle' ? 1 : 0 }]}
          resizeMode="cover"
        />

        {/* Listening animation */}
        {listeningUri && (
          <View
            // player={listeningPlayer}
            style={[
              styles.avatar,
              { opacity: currentState === 'listening' ? 1 : 0 },
            ]}
            resizeMode="cover"
          />
        )}

        {/* Talking animation */}
        {talkingUri && (
          <View
            // player={talkingPlayer}
            style={[
              styles.avatar,
              { opacity: currentState === 'talking' ? 1 : 0 },
            ]}
            resizeMode="cover"
          />
        )}

        
      </View>

      <View style={styles.textContainer}>
        {userText ? <Text style={styles.userText}>👩: {userText}</Text> : null}
        {aiText ? <Text style={styles.aiText}>🤖: {aiText}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Konuşmaya Başla"
          onPress={startListening}
          disabled={currentState !== 'idle'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: width,
    height: width * 0.9,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.secondary,
  },
  avatar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '110%',
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  textContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  userText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  aiText: {
    fontSize: 16,
    color: theme.primary,
  },
});
