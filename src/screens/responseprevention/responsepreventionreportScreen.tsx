import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// 상수 정의 (스타일과 값 재사용을 위해 상단에 정의)
const COLORS = {
  BG_LIGHT: '#F8FBFF',
  BG_WHITE: '#FFFFFF',
  PRIMARY_BLUE: '#3856C1', // 주 사용색 (이번 불안 정도, 숫자)
  PRIMARY_DARK: '#3557D4', // 버튼 활성화색
  TEXT_DARK: '#25252C',
  TEXT_GRAY: '#717780',
  TEXT_LIGHT_GRAY: '#9298A2', // 날짜, 설명 텍스트
  PREV_BAR: '#C1D7FF', // 이전 불안 정도 (바)
  PREV_LABEL: '#5096FF', // 이전 불안 정도 (숫자)
  BORDER_GRAY: '#E0E0E0',
};

const BAR_ROW_HEIGHT = 120;
const BAR_LINE_HEIGHT = 5;

// 불안 정도 비교 차트 상수
const BAR_WIDTH_COMPARE = 40;
const BAR_ROW_HEIGHT_COMPARE = 80;
const BAR_LINE_HEIGHT_COMPARE = 5;

// =================================================================
// 차트 컴포넌트: 불안 정도 (시작 vs 완료)
// =================================================================
function BarItem({ value, label, isCurrent }) {
  const safeValue = Math.max(0, Math.min(value, 100));
  const barHeight = (safeValue / 100) * BAR_ROW_HEIGHT;

  // 바의 너비를 중앙 정렬에 맞게 조정
  const dynamicBarWidth = 100;

  return (
    <View style={[styles.barItem, { width: dynamicBarWidth }]}>
      <View
        style={[
          styles.barValueBox,
          isCurrent ? styles.barValueBoxCurrent : styles.barValueBoxPrev,
        ]}
      >
        <Text
          style={[
            styles.barValueText,
            isCurrent ? styles.barValueTextCurrent : styles.barValueTextPrev,
          ]}
        >
          {safeValue}
        </Text>
      </View>

      <View style={{ height: 8 }} />

      <View style={[styles.barWrap, { height: BAR_ROW_HEIGHT }]}>
        <View
          style={[
            styles.barTopLine,
            isCurrent ? styles.barTopLineCurrent : styles.barTopLinePrev,
            { width: dynamicBarWidth },
          ]}
        />
        <View
          style={{
            width: dynamicBarWidth,
            height: barHeight,
            position: 'relative',
          }}
        >
          <LinearGradient
            colors={
              isCurrent
                ? ['rgba(56,86,193,0.30)', 'rgba(56,86,193,0.00)']
                : ['rgba(123,175,255,0.30)', 'rgba(123,175,255,0.00)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.barGradient}
          />
        </View>
        {/* 배경 Bar (100% 높이) */}
        <View style={styles.barBackground} />
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

// =================================================================
// 차트 컴포넌트: 불안 정도 비교
// =================================================================
function ComparisonBarItem({ value, isCurrent }) {
  const safeValue = Math.max(0, Math.min(value, 100));
  const barHeight = (safeValue / 100) * BAR_ROW_HEIGHT_COMPARE;

  const valueLabelStyle = [
    styles.compareValueLabelBase,
    isCurrent ? styles.compareValueLabelCurrent : styles.compareValueLabelPrev,
  ];

  return (
    <View style={[styles.compareBarItem, { width: BAR_WIDTH_COMPARE }]}>
      <Text style={valueLabelStyle}>{safeValue}</Text>
      <View style={[styles.compareBarWrap, { height: BAR_ROW_HEIGHT_COMPARE }]}>
        <View
          style={[
            styles.compareBarLine,
            isCurrent
              ? styles.compBarTopLineCurrent
              : styles.compBarTopLinePrev,
            { width: BAR_WIDTH_COMPARE },
          ]}
        />
        <View
          style={{
            width: BAR_WIDTH_COMPARE,
            height: barHeight,
            position: 'relative',
          }}
        >
          <LinearGradient
            colors={
              isCurrent
                ? ['rgba(56,86,193,0.3)', 'rgba(56,86,193,0)'] // Primary Blue Gradient
                : ['rgba(193,215,255,0.3)', 'rgba(193,215,255,0)'] // Prev Blue Gradient
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.barGradient}
          />
        </View>
        {/* 배경 Bar (100% 높이) */}
        <View style={styles.compareBarBackground} />
      </View>
    </View>
  );
}

function ComparisonSection() {
  return (
    <View style={[styles.anxietyBox, { height: 260, paddingBottom: 10 }]}>
      <Text style={styles.anxietyTitle}>불안 정도 비교</Text>
      <Text style={styles.anxietyDesc}>
        이전 반응 방지 회차와 불안 정도를 비교해서 볼 수 있습니다.
      </Text>

      <View style={styles.comparisonBarContainer}>
        <View style={styles.comparisonChartRow}>
          <ComparisonBarItem value={75} isCurrent={false} />
          <ComparisonBarItem value={30} isCurrent={true} />
        </View>
      </View>

      <Text style={styles.comparisonDateLabel}>10월 30일</Text>

      <View style={styles.comparisonLegendRow}>
        <View
          style={[styles.legendCircle, { backgroundColor: COLORS.PREV_BAR }]}
        />
        <Text style={styles.comparisonLegendLabel}>이전 불안 정도</Text>
        <View
          style={[
            styles.legendCircle,
            { backgroundColor: COLORS.PRIMARY_BLUE, marginLeft: 14 },
          ]}
        />
        <Text style={styles.comparisonLegendLabel}>이번 불안 정도</Text>
      </View>
    </View>
  );
}

export default function ResponsePreventionReport() {
  const handleCognitiveErrorCheck = () => console.log('인지적 오류 확인');
  const handleRetry = () => console.log('훈련 다시 하기');

  const obsessiveThought =
    '뭔가 내가 지금 지날 영역을 지나쳤을 것 같다는 느낌이 들고, 당장 나의 현재 위치를 확인하지 않으면 늦을 것 같다는 생각이 든다.';
  const situationText = '이동 중에 내 위치를 확인하고 싶다';

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 및 날짜 정보 */}
        <Text style={styles.headerTitle}>반응 방지 리포트</Text>
        <Text style={styles.meta}>10월 31일 금요일 · 오전 9시 36분</Text>

        {/* 강박 상황 칩 */}
        <View style={styles.situationChip}>
          <Text style={styles.situationChipLabel}>강박상황</Text>
          <Text style={styles.situationChipText}>{situationText}</Text>
        </View>

        {/* 통계 박스 (이번 주 반응 방지 / 반응 방지 시간) */}
        <View style={styles.statBoxRow}>
          {/* 이번 주 반응 방지 */}
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>이번 주 반응 방지</Text>
            <View style={styles.statNumRow}>
              <Text
                style={[styles.statNumber, { fontSize: 36, fontWeight: '700' }]}
              >
                1
              </Text>
              <Text style={styles.statUnit}>번째</Text>
            </View>
          </View>

          {/* 반응 방지 시간 */}
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
        <ComparisonSection />

        {/* 강박 사고 섹션 */}
        <View style={[styles.situationBox, styles.obsessiveThoughtBox]}>
          <Text style={styles.obsessiveThoughtTitle}>강박 사고</Text>
          <Text style={styles.obsessiveThoughtDesc}>
            반응 방지를 하면서 들었던 생각과 감정
          </Text>
          <Text style={styles.obsessiveThoughtText}>{obsessiveThought}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonIcon}>↻</Text>
            <Text style={styles.retryButtonText}>훈련 다시 하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkButton}
            onPress={handleCognitiveErrorCheck}
          >
            <Text style={styles.checkButtonIcon}>↔</Text>
            <Text style={styles.checkButtonText}>인지적 오류 확인</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  headerTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  meta: {
    color: COLORS.TEXT_LIGHT_GRAY,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  situationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.BG_WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  situationChipLabel: {
    color: COLORS.TEXT_GRAY,
    fontSize: 14,
    fontWeight: '700',
    marginRight: 8,
  },
  situationChipText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: '400',
  },
  statBoxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    height: 120,
    borderRadius: 10,
    backgroundColor: COLORS.BG_WHITE,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statTitle: {
    color: COLORS.TEXT_GRAY,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  statNumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statNumber: {
    color: COLORS.PRIMARY_BLUE,
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 57.6,
    marginRight: 2,
  },
  statUnit: {
    color: COLORS.TEXT_GRAY,
    fontSize: 20,
    fontWeight: '500',
    marginRight: 10,
  },
  anxietyBox: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    backgroundColor: COLORS.BG_WHITE,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  anxietyTitle: {
    color: COLORS.TEXT_GRAY,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  anxietyDesc: {
    color: COLORS.TEXT_LIGHT_GRAY,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
    letterSpacing: -0.42,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 140,
  },
  yAxis: {
    width: 20,
    height: BAR_ROW_HEIGHT + 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: 10,
    paddingTop: 10,
  },
  axisLabel: {
    color: COLORS.TEXT_LIGHT_GRAY,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },
  barsArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: BAR_ROW_HEIGHT + 50,
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  barItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    position: 'relative',
  },
  barWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
  },
  barBackground: {
    position: 'absolute',
    width: '100%',
    height: BAR_ROW_HEIGHT,
    backgroundColor: COLORS.BORDER_GRAY,
    bottom: 0,
    opacity: 0.2,
  },
  barValueBox: {
    paddingHorizontal: 10,
    borderRadius: 8,
    position: 'absolute',
    top: -28,
    zIndex: 10,
    minHeight: 28,
    justifyContent: 'center',
  },
  barValueBoxPrev: { backgroundColor: '#E8F1FF' },
  barValueBoxCurrent: { backgroundColor: COLORS.PRIMARY_DARK },
  barValueText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  barValueTextPrev: { color: COLORS.PRIMARY_DARK },
  barValueTextCurrent: { color: COLORS.BG_WHITE },
  barTopLine: {
    height: BAR_LINE_HEIGHT,
    position: 'absolute',
    top: -BAR_LINE_HEIGHT,
    zIndex: 5,
  },
  barTopLinePrev: { backgroundColor: '#85B6FF' },
  barTopLineCurrent: { backgroundColor: COLORS.PRIMARY_DARK },
  barGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  barLabel: {
    marginTop: 12,
    color: COLORS.TEXT_GRAY,
    fontSize: 12,
    fontWeight: '600',
  },
  comparisonBarContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
  },
  comparisonChartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  comparisonDateLabel: {
    color: COLORS.TEXT_LIGHT_GRAY,
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 8,
  },
  comparisonLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'center',
  },
  legendCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  comparisonLegendLabel: {
    color: COLORS.TEXT_GRAY,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 4,
  },
  compareBarItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  compareBarWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    position: 'relative',
  },
  compareBarBackground: {
    position: 'absolute',
    width: '100%',
    height: BAR_ROW_HEIGHT_COMPARE,
    backgroundColor: COLORS.BORDER_GRAY,
    bottom: 0,
    opacity: 0.2,
  },
  compareBarLine: {
    height: BAR_LINE_HEIGHT_COMPARE,
    borderRadius: 0,
    position: 'absolute',
    top: -BAR_LINE_HEIGHT_COMPARE,
    zIndex: 5,
  },
  compBarTopLinePrev: { backgroundColor: COLORS.PREV_BAR },
  compBarTopLineCurrent: { backgroundColor: COLORS.PRIMARY_BLUE },
  compareValueLabelBase: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginBottom: 4,
  },
  compareValueLabelPrev: {
    color: COLORS.PREV_LABEL,
  },
  compareValueLabelCurrent: {
    color: COLORS.PRIMARY_BLUE,
  },
  obsessiveThoughtBox: {
    minHeight: 180,
    height: 'auto',
    padding: 20,
  },
  obsessiveThoughtTitle: {
    color: COLORS.TEXT_GRAY,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  obsessiveThoughtDesc: {
    color: COLORS.TEXT_LIGHT_GRAY,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  obsessiveThoughtText: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25.6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 20,
    marginTop: 10,
  },
  retryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 8,
    backgroundColor: COLORS.BG_WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
    marginRight: 10,
  },
  retryButtonIcon: {
    color: COLORS.TEXT_GRAY,
    fontSize: 18,
    marginRight: 6,
    fontWeight: '700',
  },
  retryButtonText: {
    color: COLORS.TEXT_GRAY,
    fontSize: 16,
    fontWeight: '700',
  },
  checkButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY_BLUE,
  },
  checkButtonIcon: {
    color: COLORS.BG_WHITE,
    fontSize: 18,
    marginRight: 6,
    fontWeight: '700',
    transform: [{ rotate: '90deg' }],
  },
  checkButtonText: {
    color: COLORS.BG_WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});
