import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CognitiveErrorScreen() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* 강박 상황 */}
        <View style={styles.situationBox}>
          <Text style={styles.infoLabel}>강박 상황</Text>
          <Text style={styles.infoText}>
            지하철 손잡이를 잡고 손이 오염된 것 같다고 생각한다
          </Text>
        </View>

        {/* 침투사고 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>침투사고</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>
              당장 손을 씻지 않으면 병에 걸릴 것 같다는 생각이 든다
            </Text>
          </View>
        </View>

        {/* 그릇된 믿음 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>그릇된 믿음</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>
              손을 씻지 않으면 걱정하는 일이 벌어질 것이라는 믿음
            </Text>
          </View>
        </View>

        {/* 인지적 오류 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>인지적 오류</Text>
          <View style={styles.contentBox}>
            <Text style={styles.cogErrorTitle}>과잉 일반화{'\n'}</Text>
            <Text style={styles.contentTextLeft}>
              ‘한 번 병에 걸릴 수도 있다’는 가능성을 ‘항상 그럴 것이다’로
              과도하게 일반화한다.{'\n\n'}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.cogErrorTitle}>재앙화{'\n'}</Text>
            <Text style={styles.contentTextLeft}>
              ‘손잡이를 잡는 행동’이 바로 병에 걸리는 심각한 결과로 이어질
              것이라는 생각은 실제 증거나 정보 없이 미래를 단정하는 경향이다.
              지금은 단지 그런 느낌이 들었을 뿐이지만, 마치 사실인 것처럼
              느껴지게 한다.{'\n\n'}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.cogErrorTitle}>확률의 왜곡{'\n'}</Text>
            <Text style={styles.contentTextLeft}>
              병에 걸릴 가능성을 실제보다 높게 평가한다.
            </Text>
          </View>
        </View>

        {/* 현실적인 생각 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>현실적인 생각</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>
              손잡이를 만지면 불편한 느낌이 들 수는 있지만, 실제로 병에 걸릴
              일은 거의 없다. 또한 그 불편함은 시간이 지나면서 사라지고, 나는
              그걸 감당할 수 있다.
            </Text>
          </View>
        </View>

        {/* 버튼 */}
        <TouchableOpacity style={styles.chatBtn}>
          <Text style={styles.chatBtnLabel}>채팅 다시 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  situationBox: {
    width: 320,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F8FBFF',
    marginBottom: 28,
    alignSelf: 'center',
    shadowColor: '#9298A2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  infoLabel: {
    color: '#717780',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'left',
  },
  infoText: {
    color: '#25252C',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    textAlign: 'left',
  },
  section: {
    width: 320,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    color: '#25252C',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'left',
  },
  contentBox: {
    width: 320,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F3F7FB',
  },
  contentText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25.6,
    textAlign: 'left',
  },
  contentTextLeft: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25.6,
    textAlign: 'left',
  },
  cogErrorTitle: {
    color: '#3557D4',
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#BDC5D3',
    alignSelf: 'center',
    marginBottom: 16,
  },
  chatBtn: {
    width: 320,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#92A9FF',
    backgroundColor: '#E8F1FF',
    marginTop: 14,
    marginBottom: 30,
  },
  chatBtnLabel: {
    color: '#3856C1',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    textAlign: 'center',
  },
});
