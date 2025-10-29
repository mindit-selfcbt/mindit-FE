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

// 💡 카드 너비를 240px로 추가 축소하여 양옆 카드가 더 많이 보이도록 조정합니다.
const CARD_WIDTH = 250;
const CARD_HEIGHT = 180;
const CARD_SPACING = 4;
const SCREEN_WIDTH = Dimensions.get('window').width;

// 💡 sidePadding 재계산: 카드를 정확히 중앙에 배치하기 위한 패딩 (중앙 정렬 유지)
const sidePadding = (SCREEN_WIDTH - CARD_WIDTH) / 2;

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
        // snapToInterval은 여전히 한 카드의 너비 + 간격
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        pagingEnabled={false}
        // paddingHorizontal: 카드를 정확히 중앙에 오도록 하고, 양옆 카드의 노출 영역을 확보합니다.
        contentContainerStyle={{
          paddingHorizontal: sidePadding,
        }}
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
          // 스크롤 위치에 따라 크기를 1(현재 카드)에서 0.8(이전/다음 카드)로 조정
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });
          const isCurrent = index === currentIndex;
          const shadowStyle = isCurrent
            ? styles.cardShadow
            : styles.prevCardShadow;

          // 마지막 아이템을 제외하고 CARD_SPACING을 marginRight로 적용
          const itemMarginRight =
            index === cardContents.length - 1 ? 0 : CARD_SPACING;

          return (
            <Animated.View
              style={[
                styles.card,
                shadowStyle,
                {
                  transform: [{ scale }],
                  marginRight: itemMarginRight, // 간격 적용
                  width: CARD_WIDTH, // 💡 수정된 CARD_WIDTH 적용
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
    paddingTop: 80,
  },
  headerWrapper: {
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  guideText: {
    color: '#25252C',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 30,
    textAlign: 'left',
    top: 60,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    minHeight: 250,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: '#FFF',
    marginTop: 30,
    marginBottom: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    top: 30,
  },
  cardShadow: {
    shadowColor: '#9298A2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  prevCardShadow: {
    shadowColor: '#9298A2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    width: 50,
    height: 50,
    marginBottom: 4,

    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  cardTitle: {
    color: '#25252C',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 8,
    textAlign: 'left',
  },
  cardDesc: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'left',
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 210,
    width: '100%',
  },
  indicatorDot: {
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DFE7EF',
    marginHorizontal: 3,
  },
  indicatorDotActive: {
    backgroundColor: '#3557D4',
  },
});
