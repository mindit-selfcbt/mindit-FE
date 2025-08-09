import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import NextButton from '../../components/nextButton';

const CARD_WIDTH = 300;
const CARD_HEIGHT = 280;
const CARD_SPACING = 16;

const cardContents = [
  {
    step: '1단계',
    title: '나의 강박에 대해 파악하기',
    desc: '본인의 강박이 어떤 유형인지 파악하고 내가 하고 있는 강박 사고와 강박 행동에 대해 알아봅니다.',
    image: require('../../assets/img/onboarding/step1Img.png'),
  },
  {
    step: '2단계',
    title: '불안 위계 만들기',
    desc: '앞의 내용을 바탕으로 내가 강박 상황에 놓였을 때 얼마나 불안한지 0~100으로 숫자를 매겨봅니다.',
    image: require('../../assets/img/onboarding/step2Img.png'),
  },
  {
    step: '3단계',
    title: '노출 및 반응 방지 계획하기',
    desc: '불안 점수를 참고해 단계별로 설정된 노출 과제를 계획합니다.',
    image: require('../../assets/img/onboarding/step3Img.png'),
  },
  {
    step: '4단계',
    title: '노출 및 반응 방지 실천하기',
    desc: '실제 생활에서 노출 및 반응 방지 과제를 실천하며 변화를 체크합니다.',
    image: require('../../assets/img/onboarding/step4Img.png'),
  },
];

const OnboardingPracticeOrderScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < cardContents.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace('onboardingstart');
    }
  };

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const sidePadding = (SCREEN_WIDTH - CARD_WIDTH) / 2;

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.guideText}>
          다음과 같은 순서로{'\n'}노출 및 반응 방지 실천을{'\n'}도와드릴게요
        </Text>
      </View>
      <Animated.FlatList
        data={cardContents}
        ref={flatListRef}
        keyExtractor={(_, i) => String(i)}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        pagingEnabled={false}
        contentContainerStyle={{ paddingHorizontal: sidePadding }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        onMomentumScrollEnd={ev => {
          const idx = Math.round(
            ev.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_SPACING),
          );
          setCurrentIndex(idx);
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + CARD_SPACING),
            index * (CARD_WIDTH + CARD_SPACING),
            (index + 1) * (CARD_WIDTH + CARD_SPACING),
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0.95],
            extrapolate: 'clamp',
          });
          const isCurrent = index === currentIndex;
          const shadowStyle = isCurrent
            ? styles.cardShadow
            : styles.prevCardShadow;
          return (
            <Animated.View
              style={[
                styles.card,
                shadowStyle,
                {
                  transform: [{ scale }],
                  marginRight: CARD_SPACING,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  opacity: 1,
                  backgroundColor: '#FFF',
                },
              ]}
            >
              <View style={styles.cardStep}>
                <Text style={styles.cardStepLabel}>{item.step}</Text>
              </View>
              <Image source={item.image} style={styles.cardImg} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </Animated.View>
          );
        }}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + CARD_SPACING,
          offset: (CARD_WIDTH + CARD_SPACING) * index,
          index,
        })}
      />
      <View style={styles.indicatorWrapper}>
        {cardContents.map((_, i) => (
          <View
            key={i}
            style={[
              styles.indicatorDot,
              currentIndex === i && styles.indicatorDotActive,
            ]}
          />
        ))}
      </View>
      <NextButton title="다음" onPress={handleNext} />
    </View>
  );
};

export default OnboardingPracticeOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    alignItems: 'center',
    paddingTop: 64,
  },
  headerWrapper: {
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  guideText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 30,
    textAlign: 'left',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    minHeight: 212,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: '#FFF',
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  prevCardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  cardStep: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 50,
    backgroundColor: '#E8F1FF',
    marginBottom: 8,
  },
  cardStepLabel: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
  },
  cardImg: {
    width: 80,
    height: 80,
    marginBottom: 4,

    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  cardTitle: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 8,
    textAlign: 'left',
  },
  cardDesc: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'left',
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginBottom: 250,
    width: '100%',
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DFE7EF',
    marginHorizontal: 4,
  },
  indicatorDotActive: {
    backgroundColor: '#3557D4',
  },
});
