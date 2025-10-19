import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'; // ImageBackground import 추가
import ChatMessageList from '../../components/chatmessageList';
import ChatInput from '../../components/chatInput';
import { ocddummyMessages } from '../../data/ocddummyMessages';

import MainIcon from '../../assets/icon/mainIcon.png';
import BackgroundImage from '../../assets/img/chat/bg.png';

const OcdChatScreen = ({ navigation }) => {
  const handleMainPress = () => {
    navigation.navigate('main');
  };

  console.log('더미메시지:', ocddummyMessages);

  return (
    // View 대신 ImageBackground 사용
    <ImageBackground source={BackgroundImage} style={styles.container}>
      {/* 배경색 스타일은 ImageBackground로 대체되므로, style.container에서 backgroundColor 삭제 */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>나의 강박에 대해 파악하기</Text>
        <TouchableOpacity onPress={handleMainPress}>
          <Image source={MainIcon} style={styles.mainIcon} />
        </TouchableOpacity>
      </View>
      <ChatMessageList messages={ocddummyMessages} />
      {/* ChatInput은 여전히 절대 위치를 사용하여 목록 위에 겹쳐집니다. */}
      <ChatInput />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // [수정]: 기존 배경색을 제거하고 ImageBackground 스타일로 사용
    // backgroundColor: '#EBEFFE',
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
