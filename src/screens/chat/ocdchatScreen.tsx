import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import ChatMessageList from '../../components/chatmessageList';
import ChatInput from '../../components/chatInput';
import { ocddummyMessages } from '../../data/ocddummyMessages';

import MainIcon from '../../assets/icon/mainIcon.png';

const OcdChatScreen = ({ navigation }) => {
  const handleMainPress = () => {
    navigation.navigate('main');
  };

  console.log('더미메시지:', ocddummyMessages);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>나의 강박에 대해 파악하기</Text>
        <TouchableOpacity onPress={handleMainPress}>
          <Image source={MainIcon} style={styles.mainIcon} />
        </TouchableOpacity>
      </View>
      <ChatMessageList messages={ocddummyMessages} />
      <ChatInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEFFE',
    justifyContent: 'flex-end',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 2,
  },
  headerText: {
    flex: 1,
    color: '#25252C',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '800',
  },
  mainIcon: {
    width: 26,
    height: 26,
    marginLeft: 8,
    resizeMode: 'contain',
  },
});

export default OcdChatScreen;
