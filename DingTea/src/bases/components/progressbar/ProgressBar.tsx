import {LAYOUT, RADIUS, setRadius} from 'bases/styles/Core';
import React, {Component} from 'react';
import {Animated, Easing, I18nManager, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import MyTheme from 'utils/MyTheme';
import {MyViewShadow} from '../view';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION = INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

interface IProps {
  progress: number;
  borderWidth: number;
  indeterminate?: boolean;
  width?: number;
  style?: StyleProp<ViewStyle>;
  height?: number;
  color: string;
  animationType?: 'decay' | 'timing' | 'spring';
  animationConfig?: any;
  animated?: boolean;
  onLayout?: (v: any) => void;
  children?: any;
}
interface IAppState {
  animationValue: Animated.Value;
  width: number;
  progress: Animated.Value;
}

export default class ProgressBar extends Component<IProps, IAppState> {
  constructor(props: any) {
    super(props);
    const progress = Math.min(Math.max(props.progress, 0), 1);
    this.state = {
      width: 0,
      progress: new Animated.Value(props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : progress),
      animationValue: new Animated.Value(BAR_WIDTH_ZERO_POSITION)
    };
  }
  public static defaultProps: Partial<IProps> = {
    animationType: 'spring',
    animationConfig: {bounciness: 0},
    animated: true
  };
  componentDidMount() {
    if (this.props.indeterminate) {
      this.animate();
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      if (this.props.indeterminate) {
        this.animate();
      } else {
        Animated.spring(this.state.animationValue, {
          toValue: BAR_WIDTH_ZERO_POSITION,
          useNativeDriver: false
        }).start();
      }
    }
    if (
      prevProps.indeterminate !== this.props.indeterminate ||
      prevProps.progress !== this.props.progress
    ) {
      const progress = this.props.indeterminate
        ? INDETERMINATE_WIDTH_FACTOR
        : Math.min(Math.max(this.props.progress, 0), 1);

      if (this.props.animated) {
        const {animationType, animationConfig} = this.props;
        if (animationType) {
          Animated[animationType](this.state.progress, {
            ...animationConfig,
            toValue: progress,
            useNativeDriver: false
          }).start();
        }
      } else {
        this.state.progress.setValue(progress);
      }
    }
  }

  handleLayout = (event: any) => {
    if (!this.props.width) {
      this.setState({width: event.nativeEvent.layout.width});
    }
    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  };

  animate() {
    this.state.animationValue.setValue(0);
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: false
    }).start((endState) => {
      if (endState.finished) {
        this.animate();
      }
    });
  }

  render() {
    const {borderWidth, children, color, style, width, height} = this.props;

    const innerWidth = Math.max(0, width || this.state.width) - borderWidth * 2;

    const progressStyle = {
      backgroundColor: color,
      height,
      transform: [
        {
          translateX: this.state.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [innerWidth * -INDETERMINATE_WIDTH_FACTOR, innerWidth]
          })
        },
        {
          translateX: this.state.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [innerWidth / (I18nManager.isRTL ? 2 : -2), 0]
          })
        },
        {
          // Interpolation a temp workaround for https://github.com/facebook/react-native/issues/6278
          scaleX: this.state.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.0001, 1]
          })
        }
      ]
    };

    return (
      <MyViewShadow style={[styles.container, style]} onLayout={this.handleLayout}>
        <Animated.View style={progressStyle} />
        {children}
      </MyViewShadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: LAYOUT.l_8,
    ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4),
    overflow: 'hidden',
    width: LAYOUT.l_213,
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    justifyContent: 'flex-start'
    // alignItems: ''
  }
});
