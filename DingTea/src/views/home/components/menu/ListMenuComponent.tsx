import React, {PureComponent} from 'react';

import {listMenuComponent} from 'views/home/style/Home.Style';
import {ItemMenu} from 'views/app/components/ItemMenu';

import MyNavigator from 'utils/MyNavigator';

import {ISettingState} from 'views/setting/redux';
import {MyView, MyButton, MyIcon, MyText} from 'bases/components';
import {getListCategories} from 'services';
import {ICategoryModel} from 'models';
import MyI18n from 'utils/MyI18n';

interface defaultProps extends ISettingState {}

interface IStates {
  arrCate: ICategoryModel[] | undefined;
}

export default class ListMenuComponent extends PureComponent<defaultProps, IStates> {
  state = {arrCate: []};

  showAll = () => {
    MyNavigator.navigate('Menu');
  };

  componentDidMount() {
    getListCategories<ICategoryModel>({is_home_visible: true, skip: 0, limit: 7})
      .then(res => {
        if (!res?.code) {
          this.setState({
            arrCate: res?.data
          });
        }
      })
      .catch(() => {});
  }

  render() {
    const {arrCate} = this.state;

    if (arrCate.length === 0) {
      return null;
      //   return (
      //     <MyView style={listMenuComponent.container}>
      //       <MyView style={listMenuComponent.content}>
      //         <ItemMenu data={arrCate[0]} />
      //         <ItemMenu data={arrCate[1]} />
      //         <ItemMenu data={arrCate[2]} />
      //         <ItemMenu data={arrCate[3]} />
      //       </MyView>
      //     </MyView>
      //   );
    }

    if (arrCate.length <= 3) {
      let _viewCate: any[] = [];
      for (let i = 0; i < arrCate.length; i++) {
        const element = arrCate[i];
        _viewCate.push(<ItemMenu data={element} key={i} />);
      }

      let _viewCateEmpty: any[] = [];
      for (let i = 0; i < 3 - arrCate.length; i++) {
        _viewCateEmpty.push(<ItemMenu isEmpty key={i} />);
      }
      return (
        <MyView style={listMenuComponent.container}>
          <MyView style={listMenuComponent.content}>
            {_viewCate}

            <MyButton style={listMenuComponent.containerBtnAll} onPress={this.showAll}>
              <MyView style={listMenuComponent.containerBtn}>
                <MyView style={listMenuComponent.contentBtn}>
                  <MyIcon
                    iconFontType="AntDesign"
                    name="arrowright"
                    size={listMenuComponent.icon.fontSize}
                    color={listMenuComponent.icon.color}
                    style={listMenuComponent.icon}
                  />
                </MyView>
              </MyView>
              <MyText style={listMenuComponent.textAll} fontStyle="Bold" numberOfLines={1}>
                {MyI18n.trans.all}
              </MyText>
            </MyButton>

            {_viewCateEmpty}
          </MyView>
        </MyView>
      );
    }

    let _viewCate: any[] = [];
    for (let i = 4; i < arrCate.length; i++) {
      const element = arrCate[i];
      _viewCate.push(<ItemMenu data={element} key={i} />);
    }

    let _viewCateEmpty: any[] = [];
    for (let i = 0; i < 7 - arrCate.length; i++) {
      _viewCateEmpty.push(<ItemMenu isEmpty key={i} />);
    }

    return (
      <MyView style={listMenuComponent.container}>
        <MyView style={listMenuComponent.content}>
          {arrCate[0] ? <ItemMenu data={arrCate[0]} /> : null}
          {arrCate[1] ? <ItemMenu data={arrCate[1]} /> : null}
          {arrCate[2] ? <ItemMenu data={arrCate[2]} /> : null}
          {arrCate[3] ? <ItemMenu data={arrCate[3]} /> : null}
        </MyView>
        <MyView style={listMenuComponent.content2}>
          {_viewCate}
          <MyButton style={listMenuComponent.containerBtnAll} onPress={this.showAll}>
            <MyView style={listMenuComponent.containerBtn}>
              <MyView style={listMenuComponent.contentBtn}>
                <MyIcon
                  iconFontType="AntDesign"
                  name="arrowright"
                  size={listMenuComponent.icon.fontSize}
                  color={listMenuComponent.icon.color}
                  style={listMenuComponent.icon}
                />
              </MyView>
            </MyView>
            <MyText style={listMenuComponent.textAll} fontStyle="Bold" numberOfLines={1}>
              {MyI18n.trans.all}
            </MyText>
          </MyButton>

          {_viewCateEmpty}
        </MyView>
      </MyView>
    );
  }
}
