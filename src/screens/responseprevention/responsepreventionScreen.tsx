import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const exitIcon = require('../../assets/icon/exitIcon.png');

const ResponsePreventionScreen = ({ navigation }) => {
  const handleClose = () => {
    navigation.replace('main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerAbsolute}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>00:00</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.exitBtn}
        onPress={handleClose}
        activeOpacity={0.8}
      >
        <Image source={exitIcon} style={styles.exitIcon} />
      </TouchableOpacity>

      <View style={styles.circlePlaceholder} />
    </View>
  );
};

export default ResponsePreventionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  timerAbsolute: {
    position: 'absolute',
    top: 54,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  timerBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.60)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 40,
  },
  timerText: {
    color: '#3557D4',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28.8,
    letterSpacing: 1,
  },
  exitBtn: {
    position: 'absolute',
    top: 54,
    right: 24,
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.60)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  exitIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  circlePlaceholder: {
    marginTop: 120,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(220, 231, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
