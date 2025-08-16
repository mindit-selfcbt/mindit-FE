import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErpRecordScreen() {
  return (
    <View>
      <Text style={styles.descMain}>
        이번 반응 방지에서 평균 불안은{'\n'}
        <Text style={styles.descMainScore}>50점</Text>
        이었어요! 앞으로 반응 방지를{'\n'}
        이어나가며 불안을 줄일 수 있을 거예요
      </Text>
      <Text style={styles.meta}>10월 31일 금요일 · 오전 9시 30분</Text>

      {/* 강박상황 박스 */}
      <View style={styles.situationBox}>
        <Text style={styles.infoLabel}>강박 상황</Text>
        <Text style={styles.infoText}>
          지하철 손잡이를 잡고 손이 오염된 것 같다고 생각
        </Text>
      </View>

      {/* 이번 주 반응방지/시간 박스 */}
      <View style={styles.statBoxRow}>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>이번 주 반응 방지</Text>
          <View style={styles.statNumRow}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statUnit}>번째</Text>
          </View>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>반응 방지 시간</Text>
          <View style={styles.statNumRow}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statUnit}>분</Text>
            <Text style={styles.statNumber}>30</Text>
            <Text style={styles.statUnit}>초</Text>
          </View>
        </View>
      </View>

      {/* 불안 정도 */}
      <View style={styles.sectionBox}>
        <Text style={styles.secTitle}>불안 정도</Text>
        <View style={styles.chartRow}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.chartBarLabel}>반응 방지 시작</Text>
            <View style={[styles.chartBar, { height: 75 }]} />
            <Text style={styles.chartBarValue}>75</Text>
          </View>
          <View style={{ width: 20 }} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.chartBarLabel}>반응 방지 완료</Text>
            <View
              style={[
                styles.chartBar,
                { height: 30, backgroundColor: '#A8BFFB' },
              ]}
            />
            <Text style={styles.chartBarValue}>30</Text>
          </View>
        </View>
      </View>

      {/* 불안 정도 비교 */}
      <View style={styles.sectionBox}>
        <Text style={styles.secTitle}>불안 정도 비교</Text>
        <Text style={styles.chartBarCompareDesc}>
          이번 반응 방지 과정의 불안 정도를 비교해서 볼 수 있습니다.
        </Text>
        <View style={styles.comparisonGraphRow}>
          <View style={{ alignItems: 'center', marginRight: 30 }}>
            <View style={[styles.chartBarSmall, { height: 75 }]} />
            <Text style={styles.comparisonLabel}>10월 30일</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View
              style={[
                styles.chartBarSmall,
                { height: 30, backgroundColor: '#A8BFFB' },
              ]}
            />
            <Text style={styles.comparisonLabel}>이번 불안 정도</Text>
          </View>
        </View>
        <View style={styles.comparisonLegendRow}>
          <View style={styles.legendCircle} />
          <Text style={styles.legendLabel}>이전 불안 정도</Text>
          <View
            style={[
              styles.legendCircle,
              { backgroundColor: '#A8BFFB', marginLeft: 14 },
            ]}
          />
          <Text style={styles.legendLabel}>이번 불안 정도</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  descMain: {
    color: '#25252C',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 34,
    marginBottom: 36,
    marginTop: 12,
    fontFamily: 'Pretendard',
  },
  descMainScore: {
    color: '#3557D4',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 34,
    fontFamily: 'Pretendard',
  },
  meta: {
    color: '#9298A2',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    fontFamily: 'Pretendard',
  },
  situationBox: {
    width: 360,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  infoLabel: {
    color: '#717780',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'Pretendard',
  },
  infoText: {
    color: '#25252C',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Pretendard',
  },
  statBoxRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  statBox: {
    width: 170,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
  },
  statTitle: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: undefined,
    marginBottom: 10,
    textAlign: 'left',
  },
  statNumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statNumber: {
    color: '#3856C1',
    textAlign: 'center',
    fontFamily: 'Gmarket Sans',
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 57.6, // 160%
    letterSpacing: -0.72,
    marginRight: 2,
  },
  statUnit: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: undefined,
    marginRight: 10,
    textAlign: 'left',
  },

  sectionBox: { marginBottom: 18 },
  secTitle: {
    color: '#3557D4',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 4,
    fontFamily: 'Pretendard',
  },

  chartRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 6 },
  chartBar: { width: 28, backgroundColor: '#3557D4', borderRadius: 6 },
  chartBarValue: {
    marginTop: 2,
    color: '#3557D4',
    fontWeight: 'bold',
    fontFamily: 'Pretendard',
  },
  chartBarLabel: {
    fontSize: 12,
    color: '#9298A2',
    marginBottom: 4,
    fontFamily: 'Pretendard',
  },

  comparisonGraphRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-end',
  },
  chartBarSmall: { width: 16, backgroundColor: '#3557D4', borderRadius: 5 },
  comparisonLabel: {
    color: '#9298A2',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Pretendard',
  },
  chartBarCompareDesc: {
    color: '#9298A2',
    fontSize: 13,
    marginBottom: 4,
    marginTop: 1,
    fontFamily: 'Pretendard',
  },
  comparisonLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  legendCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3557D4',
    marginRight: 4,
  },
  legendLabel: {
    color: '#9298A2',
    fontSize: 12,
    marginRight: 8,
    fontFamily: 'Pretendard',
  },
});
