import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ANXIETY_ICONS = [
  require('../assets/img/report/anxiety1.png'),
  require('../assets/img/report/anxiety2.png'),
  require('../assets/img/report/anxiety3.png'),
  require('../assets/img/report/anxiety4.png'),
  require('../assets/img/report/anxiety5.png'),
];

const weekTitles = ['월', '화', '수', '목', '금', '토', '일'];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export default function CalendarGrid({ year, month, anxietyList, onDayPress }) {
  const totalDays = getDaysInMonth(year, month);
  const firstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;

  let rows = [];
  let day = 1;

  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      if (w === 0 && d < firstDay) {
        week.push(<View style={styles.cell} key={`empty${w}_${d}`} />);
      } else if (day > totalDays) {
        week.push(<View style={styles.cell} key={`empty${w}_${d}`} />);
      } else {
        const currentDay = day;
        const level = anxietyList?.[currentDay - 1]?.level || 1;

        week.push(
          <TouchableOpacity
            style={styles.cell}
            key={`d${currentDay}`}
            onPress={() => onDayPress && onDayPress(currentDay, level)}
          >
            <Text style={styles.dayNumber}>{currentDay}</Text>
            <Image
              style={styles.anxietyIcon}
              source={ANXIETY_ICONS[level - 1]}
            />
            <View style={styles.imageBottomGap} />
          </TouchableOpacity>,
        );
        day++;
      }
    }
    rows.push(
      <View key={w} style={styles.row}>
        {week}
      </View>,
    );
    if (day > totalDays) break;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {weekTitles.map((v, i) => (
          <Text key={i} style={styles.weekTitle}>
            {v}
          </Text>
        ))}
      </View>
      {rows}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  weekTitle: {
    color: '#9298A2',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.42,
    flex: 1,
    marginVertical: 4,
  },
  cell: {
    flex: 1,
    aspectRatio: 0.95,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: 36,
    marginVertical: 32,
    paddingTop: 0,
    paddingBottom: 0,
  },
  dayNumber: {
    color: '#25252C',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
  },
  anxietyIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  imageBottomGap: {
    height: 8,
  },
});
