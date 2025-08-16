import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CognitiveErrorScreen() {
  return (
    <View>
      <View style={styles.metaTabsRow}>
        <TouchableOpacity style={[styles.tabBtn, styles.tabBtnActive]}>
          <Text style={styles.tabBtnLabelActive}>강박상황</Text>
        </TouchableOpacity>
        <Text style={styles.metaTabValue}>지하철/버스 손잡이를 만졌을 때</Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.secTitle}>침투사고</Text>
        <Text style={styles.contentSmall}>
          당장 손을 씻지 않으면 병에 걸릴 것 같다는 생각이 듦
        </Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.secTitle}>그릇된 믿음</Text>
        <Text style={styles.contentSmall}>
          손을 씻지 않으면 걱정하는 일이 벌어질 것이라는 믿음
        </Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.secTitle}>인지적 오류</Text>
        <Text style={styles.errPointTitle}>과잉 일반화</Text>
        <Text style={styles.contentSmall}>
          ‘한 번 병에 걸릴 수도 있다’는 가능성을 ‘항상’ 그런 것이라 과도하게
          일반화한다.
        </Text>
        <Text style={styles.errPointTitle}>재확인</Text>
        <Text style={styles.contentSmall}>
          ‘손잡이를 잡는 행동’이 바로 병에 걸리는 결과로 이어질 것이라는 생각은
          실제 증거나 정보 없이 미래를 단정하는 오류이다.
        </Text>
        <Text style={styles.errPointTitle}>확률의 왜곡</Text>
        <Text style={styles.contentSmall}>
          병에 걸릴 가능성을 실제보다 높게 평가한다.
        </Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.secTitle}>현실적인 생각</Text>
        <Text style={styles.contentSmall}>
          손잡이를 만지면 불편한 느낌이 들 수는 있지만, 실제로 병에 걸릴 것은
          없다. 또한 불편함은 시간이 지나면서 사라지고, 나는 그걸 경험할 수
          있다.
        </Text>
      </View>

      <TouchableOpacity style={styles.chatBtn}>
        <Text style={styles.chatBtnLabel}>채팅 다시쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  metaTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  tabBtn: {
    backgroundColor: '#F7F9FD',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  tabBtnActive: { backgroundColor: '#EEF2FB' },
  tabBtnLabelActive: { color: '#3557D4', fontWeight: 'bold', fontSize: 15 },
  metaTabValue: {
    marginLeft: 12,
    color: '#25252C',
    fontWeight: '500',
    fontSize: 14,
  },

  sectionBox: { marginBottom: 18 },
  secTitle: {
    color: '#3557D4',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 4,
  },
  errPointTitle: {
    color: '#3557D4',
    fontWeight: 'bold',
    marginTop: 7,
    fontSize: 14,
  },
  contentSmall: {
    color: '#717780',
    fontSize: 14,
    marginTop: 2,
    lineHeight: 20,
  },

  chatBtn: {
    backgroundColor: '#E7EDF9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 26,
  },
  chatBtnLabel: { color: '#3557D4', fontWeight: 'bold', fontSize: 15 },
});
