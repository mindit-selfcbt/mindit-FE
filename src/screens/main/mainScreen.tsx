import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const icons = {
  imagine: require('../../assets/icon/imagineIcon.png'),
  aiar: require('../../assets/icon/xrIcon.png'),
  record: require('../../assets/icon/recordIcon.png'),
  report: require('../../assets/icon/reportIcon.png'),
  plan: require('../../assets/icon/planIcon.png'),
  mic: require('../../assets/icon/micIcon.png'),
};

const menuData = [
  { key: 'imagine', label: '상상노출', icon: icons.imagine },
  { key: 'aiar', label: 'AIㆍAR 노출', icon: icons.aiar },
  { key: 'record', label: '반응 방지 기록', icon: icons.record },
  { key: 'report', label: '리포트', icon: icons.report },
  { key: 'plan', label: '마이플랜', icon: icons.plan },
];

const BUTTON_HEIGHT = 40;
const CHATBAR_HEIGHT = 60;
const BUTTON_HORIZONTAL_PADDING = 12;

const MainScreen = ({ navigation }) => {
  const handleMenuPress = key => {
    if (key === 'record') {
      navigation.navigate('recordcatalog');
    }
    if (key === 'report') {
      navigation.navigate('monthlyreport');
    }
  };
  const handleMicPress = () => {
    // 마이크 버튼 클릭 시 처리
  };
  const handleScreenPress = () => {
    navigation.replace('responseprevention');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.overlayTouchable}
        activeOpacity={1}
        onPress={handleScreenPress}
      />
      <View style={styles.headerWrap} pointerEvents="box-none">
        <Text style={styles.headerText}>눈송이님 안녕하세요</Text>
        <Text style={styles.headerText}>무엇을 하시겠어요?</Text>
      </View>

      <View style={styles.menuZone} pointerEvents="box-none">
        <View style={styles.menuRow}>
          {menuData.slice(0, 2).map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuButton}
              activeOpacity={0.85}
              onPress={() => handleMenuPress(item.key)}
              pointerEvents="auto"
            >
              <Image source={item.icon} style={styles.menuIcon} />
              <Text
                style={styles.menuLabel}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.menuRow}>
          {menuData.slice(2, 5).map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuButton}
              activeOpacity={0.85}
              onPress={() => handleMenuPress(item.key)}
              pointerEvents="auto"
            >
              <Image source={item.icon} style={styles.menuIcon} />
              <Text
                style={styles.menuLabel}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.centerGuideAbsoluteWrap} pointerEvents="box-none">
        <View style={styles.centerGuideInner}>
          <Text style={styles.centerGuide}>
            지금 불안이 느껴진다면{'\n'}빈 곳을 눌러 반응 방지를 시작하세요
          </Text>
        </View>
      </View>

      <View style={styles.chatBar} pointerEvents="box-none">
        <TouchableOpacity onPress={handleMicPress} activeOpacity={0.75}>
          <Image source={icons.mic} style={styles.micIcon} />
        </TouchableOpacity>
        <Text style={styles.chatPlaceholder}>
          당신의 불안에 대해 무엇이든 말씀해주세요
        </Text>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    alignItems: 'flex-start',
    width: '100%',
    minHeight: '100%',
    position: 'relative',
  },
  overlayTouchable: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  headerWrap: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 60,
    marginBottom: 40,
    zIndex: 2,
  },
  headerText: {
    color: '#3D3D44',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 30,
  },
  menuZone: {
    marginLeft: 24,
    marginBottom: 12,
    alignSelf: 'flex-start',
    zIndex: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
    justifyContent: 'flex-start',
  },
  menuButton: {
    paddingHorizontal: BUTTON_HORIZONTAL_PADDING,
    height: BUTTON_HEIGHT,
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    zIndex: 3,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
    resizeMode: 'contain',
  },
  menuLabel: {
    color: '#3D3D44',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
  },
  centerGuideAbsoluteWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -38 }],
    pointerEvents: 'box-none',
  },
  centerGuideInner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  centerGuide: {
    color: '#9298A2',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 30,
    marginTop: 40,
  },
  chatBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 20,
    left: 16,
    width: windowWidth - 32,
    maxWidth: 380,
    height: CHATBAR_HEIGHT,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    gap: 8,
    zIndex: 2,
  },
  micIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  chatPlaceholder: {
    color: '#9DA4B0',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    flex: 1,
    textAlign: 'left',
  },
});
