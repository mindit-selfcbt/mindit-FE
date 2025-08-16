import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// 바와 레이블 고정값
const BAR_WIDTH = 120;
const BAR_LINE_HEIGHT = 5;
const BAR_ROW_HEIGHT = 120;

// 단일 Bar Item (첨부 이미지 레이아웃 반영)
function BarItem({ value, label, isCurrent }) {
  const safeValue = Math.max(0, Math.min(value, 100));
  const barHeight = (safeValue / 100) * BAR_ROW_HEIGHT;

  return (
    <View style={styles.barItem}>
      <View style={[styles.barValueBox, isCurrent && styles.barValueBoxLast]}>
        <Text
          style={[styles.barValueText, isCurrent && styles.barValueTextLast]}
        >
          {safeValue}
        </Text>
      </View>
      <View style={{ height: 8 }} />
      <View style={[styles.barWrap, { height: barHeight + BAR_LINE_HEIGHT }]}>
        <View
          style={[
            styles.barTopLine,
            isCurrent ? styles.barTopLineCurrent : styles.barTopLinePrev,
          ]}
        />
        <View
          style={{ width: BAR_WIDTH, height: barHeight, position: 'relative' }}
        >
          <LinearGradient
            colors={['rgba(123,175,255,0.30)', 'rgba(123,175,255,0.00)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.barGradient}
          />
        </View>
      </View>
      <Text style={styles.barLabel}>{label}</Text>
    </View>
  );
}

function AnxietySection() {
  return (
    <View style={styles.anxietyBox}>
      <Text style={styles.anxietyTitle}>불안 정도</Text>
      <Text style={styles.anxietyDesc}>
        반응 방지를 하며 기록한 불안의 변화
      </Text>
      <View style={styles.chartArea}>
        <View style={styles.yAxis}>
          <Text style={styles.axisLabel}>100</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.axisLabel}>0</Text>
        </View>
        <View style={styles.barsArea}>
          <BarItem value={75} label="반응 방지 시작" isCurrent={false} />
          <BarItem value={30} label="반응 방지 완료" isCurrent={true} />
        </View>
      </View>
    </View>
  );
}

export default function ErpRecordScreen() {
  return (
    <View>
      {/* 상단 설명 */}
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
          지하철 손잡이를 잡고 손이 오염된 것 같다고 생각한다
        </Text>
      </View>

      {/* 반응방지/시간 박스 */}
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

      {/* 불안 정도 섹션 */}
      <AnxietySection />

      {/* 불안 정도 비교 섹션 */}
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
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'Pretendard',
  },
  infoText: {
    color: '#25252C',
    fontSize: 14,
    fontWeight: '700',
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
    fontFamily: 'Pretendard',
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 57.6,
    letterSpacing: -0.72,
    marginRight: 2,
  },
  statUnit: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    marginRight: 10,
    textAlign: 'left',
  },
  anxietyBox: {
    width: 360,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  anxietyTitle: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  anxietyDesc: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 40,
    letterSpacing: -0.42,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 120,
  },
  yAxis: {
    width: 24,
    height: 140,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  axisLabel: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },
  barsArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: BAR_ROW_HEIGHT + 50,
    flex: 1,
    justifyContent: 'center',
    gap: 0,
  },
  barItem: {
    alignItems: 'center',
    width: BAR_WIDTH,
    marginHorizontal: 0,
  },
  barValueBox: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E8F1FF',
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 28,
    minWidth: 40,
    marginTop: -6,
  },
  barValueBoxLast: { backgroundColor: '#3557D4' },
  barValueText: {
    color: '#3557D4',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  barValueTextLast: { color: '#FFF' },
  barWrap: {
    width: BAR_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  barTopLine: {
    width: BAR_WIDTH,
    height: BAR_LINE_HEIGHT,
    borderRadius: 0,
  },
  barTopLinePrev: { backgroundColor: '#85B6FF' },
  barTopLineCurrent: { backgroundColor: '#3557D4' },
  barGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 0,
  },
  barLabel: {
    marginTop: 12,
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionBox: {
    width: 360,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginBottom: 22,
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  secTitle: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  chartBarCompareDesc: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 16,
    letterSpacing: -0.42,
  },
  comparisonGraphRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: 18,
    marginTop: 6,
  },
  chartBarSmall: {
    width: 40,
    borderRadius: 10,
    backgroundColor: '#85B6FF',
    marginBottom: 8,
  },
  comparisonLabel: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
  comparisonLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  legendCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#85B6FF',
  },
  legendLabel: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
    marginRight: 18,
  },
});
