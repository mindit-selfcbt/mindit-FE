import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  ViewStyle,
} from 'react-native';

interface ToggleOption {
  key: string;
  label: string;
}
interface ToggleButtonProps {
  options: ToggleOption[];
  value: string;
  onChange: (key: string) => void;
  style?: ViewStyle;
}

export default function ToggleButton({
  options,
  value,
  onChange,
  style,
}: ToggleButtonProps) {
  const [btnWidths, setBtnWidths] = useState<number[]>([]);
  const selectedIdx = options.findIndex(opt => opt.key === value);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 12,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 20 && selectedIdx > 0)
          onChange(options[selectedIdx - 1].key);
        else if (gesture.dx < -20 && selectedIdx < options.length - 1)
          onChange(options[selectedIdx + 1].key);
      },
    }),
  ).current;

  return (
    <View style={[styles.track, style]} {...panResponder.panHandlers}>
      {btnWidths.length === options.length && (
        <View
          style={[
            styles.thumb,
            {
              width: btnWidths[selectedIdx],
              left: btnWidths.slice(0, selectedIdx).reduce((a, b) => a + b, 0),
            },
          ]}
        />
      )}
      {options.map((opt, idx) => {
        const isActive = value === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={styles.itemWrap}
            onLayout={e => {
              const { width } = e.nativeEvent.layout;
              setBtnWidths(prev => {
                const newWidths = [...prev];
                newWidths[idx] = width;
                return newWidths;
              });
            }}
            onPress={() => onChange(opt.key)}
            activeOpacity={0.85}
            {...panResponder.panHandlers}
          >
            <Text style={isActive ? styles.activeText : styles.inactiveText}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#F3F7FB',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F7FB',
    alignSelf: 'center',
  },
  thumb: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    zIndex: 1,
  },
  itemWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 18,
    zIndex: 2,
  },
  activeText: {
    color: '#3D3D44',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  inactiveText: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
});
