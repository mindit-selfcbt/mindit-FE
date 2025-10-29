import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BarItem from './barItem';

const BAR_WIDTH = 60;
const GRAPH_BARLINE_WIDTH = 300;
const BARROW_HEIGHT = 100;
const YAXIS_HEIGHT = 110;

export default function MonthlyBarChart({
  months,
  values,
  isBarRowLeft,
  yLabelData = [100, 50, 0],
}) {
  return (
    <View style={styles.graphBox}>
      <View style={styles.graphArea}>
        <View style={styles.yAxisWrapper}>
          {yLabelData.map(value => (
            <View key={value} style={styles.yAxisRow}>
              <Text style={styles.yAxisText}>{value}</Text>
              <View style={styles.dotLineRow} />
            </View>
          ))}
        </View>

        <View style={styles.graphContent}>
          <View
            style={[
              styles.barRow,
              isBarRowLeft ? { justifyContent: 'flex-start' } : {},
            ]}
          >
            {months.map((month, i) => (
              <BarItem
                key={month}
                value={values?.[i] ?? 0}
                isCurrent={i === months.length - 1}
              />
            ))}
          </View>

          <View
            style={[
              styles.monthLabelRow,
              isBarRowLeft ? { justifyContent: 'flex-start' } : {},
            ]}
          >
            {months.map((month, i) => (
              <Text
                key={month}
                style={[
                  styles.monthLabel,
                  i === months.length - 1 && styles.monthLabelCurrent,
                ]}
              >
                {month}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphBox: {
    width: 360,
    height: 220,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D6E7F8',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 20,
  },
  graphArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  yAxisWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 90,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  yAxisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: YAXIS_HEIGHT / 2,
  },
  yAxisText: {
    width: 22,
    textAlign: 'center',
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
  },
  graphContent: {
    flex: 1,
    alignItems: 'flex-start',
    width: GRAPH_BARLINE_WIDTH,
    height: YAXIS_HEIGHT,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: BARROW_HEIGHT,
    width: GRAPH_BARLINE_WIDTH,
    marginTop: 20,
    marginBottom: 0,
    zIndex: 2,
  },
  monthLabelRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: GRAPH_BARLINE_WIDTH,
    marginTop: 24,
    marginRight: 100,
  },
  monthLabel: {
    width: 50,
    textAlign: 'center',
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '500',
  },
  monthLabelCurrent: {
    color: '#3557D4',
  },
});
