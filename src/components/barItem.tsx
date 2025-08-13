import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BAR_WIDTH = 48;
const BAR_LINE_HEIGHT = 4;
const BARROW_HEIGHT = 100;

export default function BarItem({ value, isCurrent }) {
  const barHeight = (value / 100) * BARROW_HEIGHT;
  return (
    <View style={styles.barItem}>
      <View style={[styles.barValueBox, isCurrent && styles.barValueBoxLast]}>
        <Text
          style={[styles.barValueText, isCurrent && styles.barValueTextLast]}
        >
          {value}
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
        <View style={{ width: BAR_WIDTH, height: barHeight }}>
          <LinearGradient
            colors={['rgba(123,175,255,0.30)', 'rgba(123,175,255,0.00)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.barGradient}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barItem: { alignItems: 'center', width: BAR_WIDTH },
  barValueBox: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#E8F1FF',
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barValueBoxLast: { backgroundColor: '#3557D4' },
  barValueText: {
    color: '#9CC3FF',
    textAlign: 'center',
    fontFamily: 'Gmarket Sans',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
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
    marginBottom: 0,
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
});
