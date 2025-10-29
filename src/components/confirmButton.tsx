import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';

interface nextButtonProps {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
}

const windowWidth = Dimensions.get('window').width;

const nextButton: React.FC<nextButtonProps> = ({ title = '확인', onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 60,
    width: 320,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: '#3557D4',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});

export default nextButton;
