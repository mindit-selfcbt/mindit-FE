import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ToggleButton from '../../components/toggleButton';
const mainIcon = require('../../assets/icon/mainIcon.png');

const TOGGLE_OPTIONS = [
  { key: 'checking', label: '확인 강박' },
  { key: 'contamination', label: '오염 강박' },
];

const dummyRecords = [
  {
    date: '10월 31일',
    time: '오전 11시 20분',
    title: '지하철 손잡이를 잡은 후 손이 오염된 것 같다',
    extra1: '반응 방지',
    extra2: '4분 30초',
    extra3: '평균 불안 정도',
    extra4: '30',
  },
];

export default function ListRecordScreen({ navigation }) {
  const [toggle, setToggle] = useState('checking');
  const [filter1, setFilter1] = useState('1주일');
  const [filter2, setFilter2] = useState('불안 위계');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <ToggleButton
          options={TOGGLE_OPTIONS}
          value={toggle}
          onChange={setToggle}
        />
        <TouchableOpacity
          style={styles.mainIconWrap}
          onPress={() => navigation.replace('main')}
        >
          <Image source={mainIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.selectRow}>
        <TouchableOpacity style={styles.selectorBox} onPress={() => {}}>
          <Text style={styles.selectorText}>{filter1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectorBox} onPress={() => {}}>
          <Text style={styles.selectorText}>{filter2}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        {dummyRecords.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.recordCard}
            activeOpacity={0.85}
          >
            <View style={styles.titleRow}>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

            <Text style={styles.recordTitle}>{item.title}</Text>

            <View style={styles.infoBoxesRow}>
              <View style={styles.extraBox}>
                <Text style={styles.extraLabel}>{item.extra1}</Text>
                <Text style={styles.extraValue}>{item.extra2}</Text>
              </View>
              <View style={styles.extraBox}>
                <Text style={styles.extraLabel}>{item.extra3}</Text>
                <Text style={styles.extraValue}>{item.extra4}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 36,
    backgroundColor: '#F8FBFF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  mainIconWrap: { position: 'absolute', right: 0 },
  icon: { width: 20, height: 20, marginLeft: 4 },

  selectRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  selectorBox: {
    backgroundColor: '#F3F7FB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectorText: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.42,
    textAlign: 'center',
  },

  section: {
    alignItems: 'center',
    marginBottom: 8,
  },
  recordCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: 360,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    marginBottom: 16,
    shadowColor: '#D6E7F8',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  timeText: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
  },
  recordTitle: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
  },
  infoBoxesRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  extraBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: '#F7F9FD',
    flex: 1,
  },
  extraLabel: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
  extraValue: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
});
