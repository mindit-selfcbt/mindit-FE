import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ToggleButton from '../../components/toggleButton';
import ErpRecordScreen from './erprecordScreen';
import CognitiveErrorScreen from './cognitiveerrorScreen';

const mainIcon = require('../../assets/icon/mainIcon.png');

const TOGGLE_OPTIONS = [
  { key: 'report', label: '반응 방지 리포트' },
  { key: 'error', label: '인지적 오류' },
];

export default function RecordScreen({ route, navigation }) {
  const [toggle, setToggle] = useState<'report' | 'error'>('report');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {/* 상단: 토글 & 메인 버튼 */}
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

      {/* 토글된 화면 */}
      {toggle === 'report' ? <ErpRecordScreen /> : <CognitiveErrorScreen />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#F8FBFF' },
  container: {
    paddingHorizontal: 18,
    paddingTop: 48,
    paddingBottom: 28,
    backgroundColor: '#F8FBFF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  mainIconWrap: { position: 'absolute', right: 0 },
  icon: { width: 20, height: 20, marginLeft: 4 },
});
