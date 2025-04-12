import React, {createRef, Component} from 'react';
import {KeyboardAvoidingView, RefreshControl, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import SlideBannerComponent from './components/slideBanner/SlideBannerComponent';
import NameProduct from './components/nameProduct/NameProduct';
import SoLuong from './components/soLuong/SoLuong';
import {ItemPrice, ItemToppingList, ItemOptionList, ITopping} from './components/item';

import CartBottom from 'views/home/components/cartBottom/CartBottom';
import {productDetailStyles, titleDetailProduct} from './style/ProductDetail.Style';

import MyNavigator from 'utils/MyNavigator';

import {MyView, MyViewShadow, MyText, MyButtonText, LoadingList, MyInput} from 'bases/components';

import {showFirstLoading, getDetail, reset, showRefresh} from './redux';
import {initCart} from 'views/app/reduxChooseCart';
import {IProDetailState} from './redux';
import {ICartModel, IProductModel} from 'models';
import Utilities from 'utils/Utilities';
import MyStaticLocal from 'utils/MyStaticLocal';

interface IProps extends IProDetailState {
  showFirstLoading: typeof showFirstLoading;
  getDetail: typeof getDetail;
  reset: typeof reset;
  showRefresh: typeof showRefresh;
  initCart: typeof initCart;

  route?: {
    params?: {
      id: number;
      product: IProductModel;
    };
  };
  navigation?: any;
}

class ProductDetail extends Component<IProps> {
  productId: number = -1;
  arrOption: IProductModel[] = [];
  arrTopping: IProductModel[] = [];
  note: string = '';

  sizeProduct: IProductModel | undefined = undefined;
  soLuongProduct: number = 1;
  mapProductOption = new Map<string, ICartModel>();

  listOptionRef: any = createRef();
  listTopingRef: any = createRef();
  scrollViewRef: any = createRef();

  isDestroyView: boolean = false;

  componentDidMount() {
    this.productId = this.props.route?.params?.id || -1;
    this.props.getDetail(this.productId);
    if (
      this.props.route?.params?.product &&
      this.props.route.params?.product.categories &&
      this.props.route.params?.product.categories?.length > 0
    ) {
      this.props.navigation.setOptions({
        title: this.props.route.params?.product.categories[0].name
      });
    }
  }

  shouldComponentUpdate() {
    return !this.isDestroyView;
  }

  componentWillUnmount() {
    this.isDestroyView = true;
    this.props.reset();
  }

  reload = () => {
    this.props.showFirstLoading(true);
    this.props.getDetail(this.productId);
  };

  refresh = () => {
    this.props.showRefresh(true);
    this.props.getDetail(this.productId);
  };

  pressCmt = () => {
    MyNavigator.navigate('ProductComment');
  };

  onDataOptionInit = (data: IProductModel[]) => {
    this.arrOption = data;
  };

  onDataToppingInit = (data: IProductModel[]) => {
    this.arrTopping = data;
  };

  pressAddCart = () => {
    try {
      if (!this.sizeProduct?.id) {
        Utilities.showToast(MyI18n.trans.please + ' ' + MyI18n.trans.choose_size, '', 'danger');
        this.scrollViewRef.current.scrollTo({x: 0, y: Utilities.getWidthScreen(), animated: true});
        return;
      }

      if (!this.soLuongProduct) {
        Utilities.showToast(MyI18n.trans.please_choose_quantity, '', 'danger');
        this.scrollViewRef.current.scrollTo({x: 0, y: Utilities.getWidthScreen(), animated: true});
        return;
      }
      let arrProductOption: ICartModel[] = [];
      for (const [, value] of this.mapProductOption) {
        if (value.total_quantity && value.total_quantity > 0) {
          arrProductOption.push(value);
        }
      }

      for (let i = 0; i < arrProductOption.length; i++) {
        let element = arrProductOption[i];
        if (element.option_name !== this.sizeProduct?.option_name) {
          let dataTmp: IProductModel[] = [];
          if (element.type === 'option') {
            dataTmp = this.arrOption;
          }
          if (element.type === 'topping') {
            dataTmp = this.arrTopping;
          }
          const productTmp = dataTmp.find(item => {
            return (
              item.parent_id === element.id && item.option_name === this.sizeProduct?.option_name
            );
          });
          arrProductOption[i] = {
            ...element,
            option_id: productTmp?.id,
            option_name: productTmp?.option_name,
            price: productTmp?.price
          };
        }
      }

      const {data} = this.props;
      let param: ICartModel = {
        id: data?.id,
        random_id: Utilities.randomNumber(true),
        option_id: this.sizeProduct?.id,
        option_name: this.sizeProduct?.name,
        total_quantity: this.soLuongProduct,
        product_options: arrProductOption,
        name: data?.name,
        price: this.sizeProduct?.price,
        categories: data?.categories,
        option_type: this.sizeProduct?.option_name,
        thumbnail_url: data?.thumbnail_url,
        note: this.note
      };

      MyStaticLocal.addListProductCart(param);
      this.props.initCart(MyStaticLocal.getListProductCart());
    } catch (error) {
      Utilities.logCrashlytics('ProductDetail - pressAddCart: ', error);
    }
  };

  /**
   * item: sản phẩm có size mà bạn chọn
   */
  chooseSize = (item: IProductModel) => {
    if (this.sizeProduct && this.sizeProduct?.id && this.sizeProduct?.id === item.id) {
      return;
    }
    this.listOptionRef.current.setTypeData(item.option_name);

    const arrTmp = [];
    for (const [, value] of this.mapProductOption) {
      if (value.type === 'topping') {
        arrTmp.push(value);
      }
    }
    this.listTopingRef.current.setDataInType(item.option_name, arrTmp);

    this.sizeProduct = item;
  };

  chooseSoLuong = (soLuong: number) => {
    this.soLuongProduct = soLuong;
  };

  chooseOption = (child: IProductModel) => {
    let param: ICartModel = {
      id: child.parent_id,
      name: child.parent_name,
      option_id: child.id,
      option_name: child.option_name,
      total_quantity: 1,
      price: child.price,
      type: 'option',
      sku: child.sku
    };
    this.mapProductOption.set(String(child.sku), param);
  };

  chooseTopping = (item: ITopping) => {
    let param: ICartModel = {
      id: item.topping.parent_id,
      name: item.topping.parent_name,
      option_id: item.topping.id,
      option_name: item.topping.option_name,
      total_quantity: item.soLuong,
      price: item.topping.price,
      type: 'topping',
      sku: item.topping.sku
    };
    this.mapProductOption.set(String(item.topping.parent_id), param);
  };

  renderContentChoose = () => {
    const {data} = this.props;
    const variations = data?.variations;
    let arrVar: string[] = [];
    if (variations) {
      for (let index = 0; index < variations.length; index++) {
        const element = variations[index];
        if (element.name === 'Size') {
          arrVar = element.values || [];
          break;
        }
      }
    }

    let prodOption = data?.products;
    let idSpConDaChon = -1;
    let typeDaChon = '';
    if (prodOption && prodOption.length > 0) {
      let viTriMacDinh = 0;
      prodOption.sort(function (a, b) {
        if (a.indexes && a.indexes.length > 0 && b.indexes && b.indexes.length > 0) {
          return a.indexes[0] - b.indexes[0];
        } else {
          return 1;
        }
      });
      this.sizeProduct = prodOption[viTriMacDinh];
      idSpConDaChon = prodOption[viTriMacDinh].id;
      typeDaChon = prodOption[viTriMacDinh].option_name || '';
    }

    return (
      <>
        <ItemPrice
          title={MyI18n.trans.choose_size}
          onChange={this.chooseSize}
          data={prodOption}
          tieuChiDaChonId={idSpConDaChon}
        />
        <ItemOptionList
          ref={this.listOptionRef}
          variations={arrVar}
          typeDaChon={typeDaChon}
          onChange={this.chooseOption}
          onDataInit={this.onDataOptionInit}
        />
        <ItemToppingList
          ref={this.listTopingRef}
          title={MyI18n.trans.choose_topping}
          onChange={this.chooseTopping}
          categories={data?.categories}
          variations={arrVar}
          typeDaChon={typeDaChon}
          onDataInit={this.onDataToppingInit}
        />
      </>
    );
  };

  render() {
    const {isFirstLoading, data, isRefresh} = this.props;
    const bottomCart = Utilities.isIphoneX() ? 100 : 78;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (data) {
        return (
          <KeyboardAvoidingView
            style={productDetailStyles.container}
            behavior={Utilities.isAndroid() ? undefined : 'padding'}>
            <FlatList
              data={[1]}
              keyExtractor={() => '1'}
              ref={this.scrollViewRef}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl onRefresh={this.refresh} refreshing={isRefresh || false} />
              }
              renderItem={() => (
                <MyViewShadow key="1" style={productDetailStyles.contentList}>
                  <SlideBannerComponent data={data} />
                  <NameProduct data={data} />

                  <MyView style={titleDetailProduct.container} transparent>
                    <MyText fontStyle="Bold">{MyI18n.trans.evaluate}</MyText>
                    <MyText
                      onPress={this.pressCmt}
                      style={productDetailStyles.titleSecond}
                      fontStyle="Regular">
                      {MyI18n.trans.see_reviews}
                    </MyText>
                  </MyView>

                  <MyView style={titleDetailProduct.container} transparent>
                    <MyText fontStyle="Bold">{MyI18n.trans.detail}</MyText>
                    <MyText fontStyle="Regular" style={titleDetailProduct.title}>
                      {data.description}
                    </MyText>
                  </MyView>

                  <MyView style={titleDetailProduct.container} transparent>
                    <MyText fontStyle="Bold">{MyI18n.trans.note}</MyText>
                    <MyInput
                      placeholder={MyI18n.trans.notes_for_the_store}
                      containerStyle={productDetailStyles.viewinput}
                      style={productDetailStyles.input}
                      returnKeyType="done"
                      keyboardType="default"
                      onChangeText={text => (this.note = text)}
                    />
                  </MyView>

                  <SoLuong
                    titleSoLuong={MyI18n.trans.amount}
                    onChange={this.chooseSoLuong}
                    soLuong={1}
                    isGiamXuong0={false}
                  />
                  {this.renderContentChoose()}
                </MyViewShadow>
              )}
            />
            <CartBottom style={{marginBottom: Utilities.getResolutionByHeight(bottomCart)}} />
            <SafeAreaView edges={['bottom']} style={productDetailStyles.safeView}>
              <MyButtonText
                title={MyI18n.trans.add_to_cart}
                style={productDetailStyles.bottomButton}
                titleProps={{fontStyle: 'SemiBold'}}
                onPress={this.pressAddCart}
              />
            </SafeAreaView>
          </KeyboardAvoidingView>
        );
      } else {
        return (
          <MyView style={productDetailStyles.containerError}>
            <MyText style={productDetailStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={productDetailStyles.btnAgain}
            />
          </MyView>
        );
      }
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {isFirstLoading, isRefresh, data} = state.ProDetailReducer;
  return {iso, isFirstLoading, isRefresh, data};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      showFirstLoading,
      getDetail,
      reset,
      showRefresh,
      initCart
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
