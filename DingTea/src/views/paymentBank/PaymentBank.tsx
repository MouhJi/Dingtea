import {IOrderModel} from 'models';
import React, {PureComponent} from 'react';
import MyNavigator from 'utils/MyNavigator';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux';
import {MyButtonText, MyText, MyView} from 'bases/components';
import {bankStyle} from './style/PaymentBank.Style';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IBankModel} from 'models/IBankModel';
import CopyInputInfo from './components/CopyInputInfo';

interface IProps {
  route: any;
}

class PaymentBank extends PureComponent<IProps> {
  order: IOrderModel;
  bank: IBankModel;
  constructor(props: IProps) {
    super(props);
    this.order = this.props.route.params.orderDetail;
    this.bank = this.props.route.params.bank;
  }
  goHome = () => {
    MyNavigator.navigate('HomeRouter', {screen:'HomeTab'});
  };

  render() {
    return (
      <MyView style={bankStyle.container}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <MyText style={bankStyle.nameBank} fontStyle="Bold">
            {this.bank.name}
          </MyText>
          <CopyInputInfo title={MyI18n.trans.account_holder} content={'Nguyễn Văn A'} />
          <CopyInputInfo title={MyI18n.trans.account_number} content={'132587461135'} />
          <CopyInputInfo
            title={MyI18n.trans.transfer_content}
            content={'ORDER: ' + this.order.code}
          />
          <CopyInputInfo
            title={MyI18n.trans.amount_of_money}
            content={this.order.total_price || 0}
          />
        </ScrollView>
        <SafeAreaView edges={['bottom']} style={bankStyle.safeView}>
          <MyButtonText
            title={MyI18n.trans.bank_transfer}
            style={bankStyle.bottomButton}
            titleProps={{fontStyle: 'SemiBold'}}
            onPress={this.goHome}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

export default connect(mapStateToProps, null)(PaymentBank);
