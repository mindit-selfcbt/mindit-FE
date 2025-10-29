import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import retryImg from '../../assets/img/responseprevention/retryImg.png';
import cognitiveerrorImg from '../../assets/img/responseprevention/cognitiveerrorImg.png';
import mainIcon from '../../assets/icon/mainIcon.png';

const { width } = Dimensions.get('window');
const scaleFactor = width / 360;

const BAR_WIDTH = 120;
const BAR_ROW_HEIGHT = 120;
const BAR_LINE_HEIGHT = 5;

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

function ComparisonBarItem({ value, isCurrent }) {
  const BAR_WIDTH_COMPARE = 40;
  const BAR_ROW_HEIGHT_COMPARE = 80;
  const BAR_LINE_HEIGHT_COMPARE = 5;
  const safeValue = Math.max(0, Math.min(value, 100));
  const barHeight = (safeValue / 100) * BAR_ROW_HEIGHT_COMPARE;
  const valueLabelStyle = [
    styles.compareValueLabelBase,
    isCurrent ? styles.compareValueLabelCurrent : styles.compareValueLabelPrev,
  ];
  return (
    <View style={styles.compareBarItem}>
      <Text style={valueLabelStyle}>{safeValue}</Text>
      <View
        style={[
          styles.compareBarWrap,
          { height: barHeight + BAR_LINE_HEIGHT_COMPARE },
        ]}
      >
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
                ? ['rgba(56,86,193,0.3)', 'rgba(56,86,193,0)']
                : ['rgba(193,215,255,0.3)', 'rgba(193,215,255,0)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.barGradient}
          />
        </View>
      </View>
    </View>
  );
}

function ComparisonBarGraph() {
  return (
    <View style={styles.comparisonBarContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        }}
      >
        <ComparisonBarItem value={75} isCurrent={false} />
        <ComparisonBarItem value={30} isCurrent={true} />
      </View>
      <Text style={styles.comparisonCenterLabel}>10월 30일</Text>
    </View>
  );
}

export default function ErpRecordScreen() {
  const navigation = useNavigation();

  const goToMain = () => {
    navigation.navigate('main');
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.topRow}>
        <Text style={styles.pageTitle}>반응 방지 리포트</Text>
        <TouchableOpacity style={styles.mainIconWrap} onPress={goToMain}>
          <Image source={mainIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.meta}>10월 31일 금요일 · 오전 9시 30분</Text>

      <View style={styles.situationBox}>
        <Text style={styles.infoLabel}>강박 상황</Text>
        <Text style={styles.infoText}>이동 중에 내 위치를 확인하고 싶다</Text>
      </View>

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

      <AnxietySection />

      <View style={styles.anxietyBox}>
        <Text style={styles.anxietyTitle}>불안 정도 비교</Text>
        <Text style={styles.anxietyDesc}>
          이전 반응 방지 회차와 불안 정도를 비교해서 볼 수 있습니다.
        </Text>
        <ComparisonBarGraph />
        <View style={styles.comparisonLegendRow}>
          <View style={[styles.legendCircle, { backgroundColor: '#C1D7FF' }]} />
          <Text style={styles.comparisonLegendLabel}>이전 불안 정도</Text>
          <View
            style={[
              styles.legendCircle,
              { backgroundColor: '#3856C1', marginLeft: 14 },
            ]}
          />
          <Text style={styles.comparisonLegendLabel}>이번 불안 정도</Text>
        </View>
      </View>

      <View style={styles.thoughtBox}>
        <Text style={styles.obsessiveThoughtText}>강박 사고</Text>
        <Text style={styles.thoughtTitle}>
          반응 방지를 하면서 들었던 생각과 감정
        </Text>
        <Text style={styles.thoughtText}>
          뭔가 내가 지금 내릴 역을 지나쳤을 것 같다는 느낌이 들고, 당장 나의
          현재 위치를 확인하지 않으면 늦을 것 같다는 생각이 든다.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.navigate('responseprevention')}
          >
            <Image source={retryImg} style={styles.buttonIcon} />
            <Text style={styles.retryButtonText}>훈련 다시 하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.errorButton}>
            <Image source={cognitiveerrorImg} style={styles.buttonIcon} />
            <Text style={styles.errorButtonText}>인지적 오류 확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20 * scaleFactor,
    position: 'relative',
    width: '100%',
    paddingHorizontal: 16,
    marginLeft: -16,
    marginTop: 40,
  },
  pageTitle: {
    color: '#25252C',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 30,
  },
  mainIconWrap: {
    position: 'absolute',
    right: 0,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  meta: {
    color: '#9298A2',
    fontSize: 14,
    fontWeight: '800',
    marginTop: -6,
    marginBottom: 16,
  },
  situationBox: {
    width: 320,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#9298A2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  infoLabel: {
    color: '#717780',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
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
    width: 150,
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
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
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
    fontWeight: '400',
    lineHeight: 57.6,
    marginRight: 2,
  },
  statUnit: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '500',
    marginRight: 10,
  },
  anxietyBox: {
    width: 320,
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
  },
  barsArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: BAR_ROW_HEIGHT + 50,
    flex: 1,
    justifyContent: 'center',
  },
  barItem: {
    alignItems: 'center',
    width: BAR_WIDTH,
  },
  barValueBox: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E8F1FF',
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
  },
  barTopLinePrev: { backgroundColor: '#85B6FF' },
  barTopLineCurrent: { backgroundColor: '#3557D4' },
  barGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  barLabel: {
    marginTop: 12,
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
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
  },
  comparisonLegendLabel: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.42,
    marginLeft: 4,
    marginRight: 18,
  },
  comparisonBarContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: 100,
    marginBottom: 12,
    marginTop: 6,
  },
  comparisonCenterLabel: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 12,
    marginLeft: 12,
  },
  compareBarItem: {
    alignItems: 'center',
    width: 40,
  },
  compareBarWrap: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  compareBarLine: {
    height: 5,
  },
  compBarTopLinePrev: { backgroundColor: '#C1D7FF' },
  compBarTopLineCurrent: { backgroundColor: '#3856C1' },
  compareValueLabelBase: {
    textAlign: 'center',
    fontFamily: 'Gmarket Sans',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
  },
  compareValueLabelPrev: { color: '#5096FF' },
  compareValueLabelCurrent: { color: '#3856C1' },
  thoughtBox: {
    width: 320,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  obsessiveThoughtText: {
    color: '#25252C',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  thoughtTitle: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.42,
    marginBottom: 8,
  },
  thoughtText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    width: 320,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  retryButton: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#92A9FF',
    backgroundColor: '#E8F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  retryButtonText: {
    color: '#3856C1',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  errorButton: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#3856C1',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  errorButtonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
