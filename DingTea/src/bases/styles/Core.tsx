/**
 * Color
 * @public
 */
const COLOR = {
  BG: {
    PRIMARY: '#F5F5F5',
    SECONDARY: '#F2F2F2',
    SECONDARY1: '#F1F1F1',
    WHITE: '#FFFFFF',
    WHITE_80: 'rgba(255,255,255,0.8)',

    BLACK: '#000000',
    BLACK_10: 'rgba(0,0,0,0.1)',
    BLACK_30: 'rgba(0,0,0,0.3)',
    BLACK_50: 'rgba(0,0,0,0.5)',

    RED: '#FF4646',
    PINK: '#F7C86F'
  },
  TEXT: {
    PRIMARY: '#211616',
    SECONDARY: '#B4B4B4',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    DA_CAM: '#FF8B36',
    RED: '#FF4646',
    BLUE: '#3383F0',
    GREEN: '#0ABC3A',
    XAM: '#706C64',
    SECONDARY1: '#7B7B7B',
    POSITIVE_BTN: '#007ff9',
    NEGATIVE_BTN: '#ff3b30',
    PLACEHOLDER: '#EBEBEB'
  },
  TAB: {
    RED: '#FF4646',
    INACTIVE: '#CFCFCF'
  },
  BUTTON: {
    RED: '#FF4646',
    WHITE: '#FFFFFF'
  }
};

/**
 * Font size
 * @public
 */
const FONT_SIZE = {
  s_8: 8,
  s_9: 9,
  s_10: 10,
  s_11: 11,
  s_12: 12,
  s_14: 14,
  s_16: 16,
  s_18: 18,
  s_20: 20,
  s_22: 22,
  s_24: 24,
  s_26: 26,
  s_28: 28,
  s_30: 30
};

/**
 * Font family
 * @public
 */
const FONT_FAMILY = {
  Bold: 'Montserrat-Bold',
  Medium: 'Montserrat-Medium',
  Regular: 'Montserrat-Regular',
  SemiBold: 'Montserrat-SemiBold'
};

/**
 * Padding
 * @public
 */
const PADDING = {
  p_0: 0,
  p_2: 2,
  p_4: 4,
  p_5: 5,
  p_6: 6,
  p_8: 8,
  p_10: 10,
  p_11: 11,
  p_12: 12,
  p_14: 14,
  p_15: 15,
  p_16: 16,
  p_18: 18,
  p_20: 20,
  p_22: 22,
  p_24: 24,
  p_26: 26,
  p_30: 30,
  p_32: 32,
  p_48: 48,
  p_64: 64
};

/**
 * Margin
 * @public
 */
const MARGIN = {
  m_0: 0,
  m_1: 1,
  m_2: 2,
  m_4: 4,
  m_5: 5,
  m_6: 6,
  m_8: 8,
  m_10: 10,
  m_12: 12,
  m_14: 14,
  m_16: 16,
  m_20: 20,
  m_22: 22,
  m_24: 24,
  m_25: 25,
  m_26: 26,
  m_28: 28,
  m_30: 30,
  m_32: 32,
  m_40: 40,
  m_48: 48,
  m_50: 50,
  m_52: 52,
  m_60: 60,
  m_64: 64
};

/**
 * Border radius
 * @public
 */
const RADIUS = {
  r_0: 0,
  r_2: 2,
  r_4: 4,
  r_6: 6,
  r_8: 8,
  r_10: 10,
  r_12: 12,
  r_15: 15,
  r_16: 16,
  r_20: 20,
  r_24: 24,
  r_32: 32,
  r_50: 50
};

/**
 * Line height
 * @public
 */
const LINE_HEIGHT = {
  l_1: 1,
  l_10: 10,
  l_20: 20,
  l_30: 30,
  l_40: 40,
  l_50: 50
};

/**
 * Width Height size
 * @public
 */
const LAYOUT = {
  l_1: 1,
  l_2: 2,
  l_4: 4,
  l_5: 5,
  l_8: 8,
  l_10: 10,
  l_14: 14,
  l_15: 15,
  l_16: 16,
  l_18: 18,
  l_20: 20,
  l_24: 24,
  l_29: 29,
  l_30: 30,
  l_32: 32,
  l_35: 35,
  l_38: 38,
  l_40: 40,
  l_44: 44,
  l_45: 45,
  l_46: 46,
  l_48: 48,
  l_50: 50,
  l_52: 52,
  l_54: 54,
  l_56: 56,
  l_60: 60,
  l_64: 64,
  l_70: 70,
  l_75: 75,
  l_86: 86,
  l_114: 114,
  l_135: 135,
  l_140: 140,
  l_150: 150,
  l_174: 174,
  l_184: 184,
  l_213: 213,
  l_248: 248,
  l_250: 250,
  l_255: 255,
  l_270: 270
};

export const setPosition = (top = 0, bottom = 0, left = 0, right = 0) => {
  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right
  };
};

export const setMargin = (top = 0, bottom = 0, left = 0, right = 0) => {
  return {
    marginTop: top,
    marginBottom: bottom,
    marginLeft: left,
    marginRight: right
  };
};

export const setPadding = (top = 0, bottom = 0, left = 0, right = 0) => {
  return {
    paddingTop: top,
    paddingBottom: bottom,
    paddingLeft: left,
    paddingRight: right
  };
};

export const setRadius = (topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0) => {
  return {
    borderTopLeftRadius: topLeft,
    borderTopStartRadius: topLeft,

    borderTopRightRadius: topRight,
    borderTopEndRadius: topRight,

    borderBottomLeftRadius: bottomLeft,
    borderBottomStartRadius: bottomLeft,

    borderBottomRightRadius: bottomRight,
    borderBottomEndRadius: bottomRight
  };
};

export const setShadow = () => {
  return {
    shadowColor: COLOR.BG.BLACK_50,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 100
  };
};

export {COLOR, MARGIN, PADDING, FONT_SIZE, FONT_FAMILY, LINE_HEIGHT, RADIUS, LAYOUT};
