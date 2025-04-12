import {StyleSheet} from 'react-native';

import {COLOR, LAYOUT, PADDING, setPadding} from 'bases/styles/Core';

const notifyStyles = StyleSheet.create({
  list: {
    backgroundColor: COLOR.BG.PRIMARY
  },
  contentList: {
    backgroundColor: COLOR.BG.PRIMARY,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_10
  }
});

export {notifyStyles};
