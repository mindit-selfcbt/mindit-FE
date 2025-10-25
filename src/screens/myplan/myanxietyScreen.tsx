import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface nextButtonProps {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
}

const windowWidth = Dimensions.get('window').width;

const NextButton: React.FC<nextButtonProps> = ({ title = '다음', onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function MyAnxietyScreen() {
  const navigation = useNavigation();

  const symptomItems = [
    { label: '강박 유형', value: '확인 강박' },
    {
      label: '불안을 유발하는 사고',
      value: '시간이나 위치를 당장 확인하지 않으면 늦을 것이라는 생각',
    },
    { label: '불안을 줄이기 위한 주요 반복 행동', value: '반복적인 확인 행동' },
  ];

  const anxieties = [
    { desc: '이동 중에 내 위치를 확인하고 싶다', score: 95 },
    { desc: '도착지까지의 시간을 확인하고 싶다', score: 90 },
    { desc: '일정 사이의 시간을 확인하고 싶다', score: 85 },
    { desc: '이동 중 상황을 계속 확인하고 싶다', score: 75 },
    { desc: '외출 시 가방 속 물건을 확인한다', score: 60 },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <Text style={styles.title}>
          눈송이님의 강박 증상 요약과 {'\n'}불안 위계표입니다
        </Text>

        {symptomItems.map((item, i) => (
          <View key={i} style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
          </View>
        ))}

        <Text style={styles.hierarchyTitle}>눈송이님의 불안 위계</Text>

        {anxieties.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.hierarchyBox,
              idx === anxieties.length - 1 ? { marginBottom: 20 } : {},
            ]}
          >
            <View style={styles.rankBox}>
              <Text style={styles.rankText}>{idx + 1}</Text>
            </View>
            <Text style={styles.hierarchyDesc}>{item.desc}</Text>
            <Text style={styles.hierarchyScore}>{item.score}점</Text>
          </View>
        ))}

        <NextButton
          title="맞춤형 반응 방지 플랜 보기"
          onPress={() => navigation.navigate('myplan')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 0,
  },
  title: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    marginTop: 32,
    marginBottom: 32,
  },
  summaryBox: {
    width: '100%',
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  summaryLabel: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'left',
  },
  summaryValue: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 25,
    textAlign: 'left',
  },
  hierarchyTitle: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 29,
    marginBottom: 20,
    marginTop: 32,
  },
  hierarchyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F3F7FB',
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 18,
    width: '100%',
  },
  rankBox: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#3557D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#fff',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '700',
  },
  hierarchyDesc: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
    textAlign: 'left',
  },
  hierarchyScore: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  button: {
    width: 320,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: '#3557D4',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});
