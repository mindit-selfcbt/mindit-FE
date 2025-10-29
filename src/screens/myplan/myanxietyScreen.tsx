import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
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
    { label: '강박 유형', value: '오염 강박' },
    {
      label: '불안을 유발하는 사고',
      value: '시간이나 위치를 당장 확인하지 않으면\n늦을 것이라는 생각',
    },
    { label: '불안을 줄이기 위한 주요 반복 행동', value: '반복적인 손 씻기' },
  ];

  const anxieties = [
    { desc: '지하철/버스 손잡이를 만졌을 때', score: 95 },
    { desc: '공공화장실 문 손잡이를 잡았을 때', score: 90 },
    { desc: '엘리베이터 버튼을 눌렀을 때', score: 85 },
    { desc: '다른 사람이 만진 물건을 만질 때', score: 75 },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <Text style={styles.title}>
          눈송이님의 강박 증상 요약과 불안 위계표
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
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 30,
    marginTop: 32,
    marginBottom: 20,
  },
  summaryBox: {
    width: '100%',
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#9298A2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryLabel: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'left',
  },
  summaryValue: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 25,
    textAlign: 'left',
  },
  hierarchyTitle: {
    color: '#25252C',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 29,
    marginBottom: 12,
    marginTop: 12,
  },
  hierarchyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F3F7FB',
    marginBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
  },
  rankBox: {
    width: 28,
    height: 28,
    borderRadius: 12,
    backgroundColor: '#3557D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  hierarchyDesc: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    flex: 1,
  },
  hierarchyScore: {
    color: '#3557D4',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
  },
  button: {
    width: 320,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: '#3557D4',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 60,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});
