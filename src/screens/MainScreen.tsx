import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>메인 화면</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
