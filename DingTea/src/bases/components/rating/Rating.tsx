import React, {Component} from 'react';
import {View, TouchableOpacity, Animated, Easing, StyleSheet, ViewProps} from 'react-native';

import {MyIcon} from '../icon';
import {MARGIN, setMargin} from '../../styles/Core';
import MyTheme from 'utils/MyTheme';

interface IRatingProps extends ViewProps {
  rating: number;
  numStars?: number;
  starColor?: string;
  disable?: boolean;
  animate?: boolean;

  onChange: (star: number) => void;
}

interface IRatingStates {
  rating: number;
  animation?: any;
  numStars?: number;
}

class Rating extends Component<IRatingProps, IRatingStates> {
  state = {
    rating: this.props.rating - 1,
    animation: new Animated.Value(1),
    numStars: this.props.numStars || 5
  };

  rate = (star: number) => {
    this.setState({rating: star}, () => {
      this.props.onChange(star + 1);
    });
  };

  animate = () => {
    const {animation} = this.state;

    Animated.timing(animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
      animation.setValue(1);
    });
  };

  render() {
    const {animation, numStars, rating} = this.state;

    let stars = [];
    const animateScale = animation.interpolate({
      inputRange: [1, 1.5, 2],
      outputRange: [1, 1.4, 1]
    });
    const animatedWoblle = animation.interpolate({
      inputRange: [1, 1.25, 1.75, 2],
      outputRange: ['0deg', '-3deg', '3deg', '0deg']
    });
    const animatedOpacity = animation.interpolate({
      inputRange: [1, 1.2, 2],
      outputRange: [1, 0.6, 1]
    });
    const animatedStyle = {
      transform: [{scale: animateScale}, {rotate: animatedWoblle}],
      opacity: animatedOpacity
    };

    const {starColor, disable, animate} = this.props;

    for (let i = 0; i < numStars; i++) {
      stars.push(
        <TouchableOpacity
          disabled={disable}
          key={i}
          onPress={() => {
            this.rate(i);
            if (animate) {
              this.animate();
            }
          }}>
          <Animated.View style={i <= rating ? animatedStyle : {}}>
            <Star filled={i <= rating ? true : false} color={starColor} />
          </Animated.View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={[styles.listStar]} {...this.props}>
        {stars}
      </View>
    );
  }
}

interface IStarProps {
  filled?: boolean;
  color?: string;
  size?: number;
}

class Star extends Component<IStarProps, any> {
  render() {
    const {filled, color, size} = this.props;

    return (
      <MyIcon
        name={filled ? 'star' : 'star-o'}
        color={color ? color : MyTheme.themes.TEXT.RED}
        size={size ? size : 20}
        style={styles.star}
        iconFontType="FontAwesome"
      />
    );
  }
}

const styles = StyleSheet.create({
  listStar: {
    flexDirection: 'row'
  },
  star: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_4, MARGIN.m_4)
  }
});

export default Rating;
