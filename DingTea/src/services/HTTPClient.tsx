import axios from 'axios';
import {API_URL} from 'common/Constants';
import {
  RESEND_CODE_DEVICE,
  RESEND_CODE_UPDATE_DEVICE,
  USER_DATA,
  USER_TOKEN
} from 'common/KeyStorages';
import {ITokenModel} from 'models';
import {Alert} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {IResponse} from 'services';
import MyNavigator from 'utils/MyNavigator';
import MyStaticLocal from 'utils/MyStaticLocal';
import MyStorage from 'utils/MyStorage';
import Utilities from 'utils/Utilities';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': deviceInfoModule.getUserAgentSync()
  }
});

let showPopupSession = false;

async function checkToken(header: any) {
  if (Object.keys(header).length > 0) {
    let access_token = MyStaticLocal.getUserToken()?.access_token;
    if (access_token) {
      const now = Date.now() / 1000;
      const access = MyStaticLocal.getUserToken()?.access_expired_at;
      const refresh = MyStaticLocal.getUserToken()?.refresh_expired_at;
      /* access token het han */
      if (now > access) {
        /* kiem tra refresh token */
        if (now <= refresh) {
          const lastUri = '/v1/auth/refresh-token/' + (Utilities.isAndroid() ? 'android' : 'ios');
          const res = await POST<IResponse<ITokenModel>>(lastUri, {
            token: MyStaticLocal.getUserToken()?.refresh_token
          });
          if (res) {
            if (res.code) {
              showPopupLogin();
              return {};
            } else {
              if (res?.data) {
                showPopupSession = false;
                access_token = res.data.access_token;
                MyStorage.create(USER_TOKEN, res.data);
                MyStaticLocal.setUserToken(res?.data);
              } else {
                showPopupLogin();
                return {};
              }
            }
          } else {
            showPopupLogin();
            return {};
          }
        } else {
          showPopupLogin();
          return {};
        }
      }
      return {
        Authorization: 'Bearer ' + access_token
      };
    }
  }
  return header;
}

function showPopupLogin() {
  if (showPopupSession) return;
  showPopupSession = true;
  MyStorage.multiDelete([RESEND_CODE_DEVICE, RESEND_CODE_UPDATE_DEVICE, USER_TOKEN, USER_DATA]);
  MyStaticLocal.setUser(undefined);
  MyStaticLocal.setUserToken(undefined);
  Alert.alert(
    'Thông báo',
    'Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập để tiếp tục trải nghiệm.',
    [
      {
        text: 'Đăng nhập',
        onPress: () => {
          showPopupSession = false;
          MyNavigator.navigate('Login');
        }
      },
      {
        text: 'Lúc khác',
        style: 'cancel',
        onPress: () => {
          showPopupSession = false;
          MyNavigator.reset();
        }
      }
    ],
    {cancelable: false}
  );
}

async function GET<T>(url: string, params?: object, headerParams: object = {}) {
  let header = await checkToken(headerParams);
  const response = await instance.get<T>(url, {
    params,
    headers: {...instance.defaults.headers, ...header}
  });
  return response.status === 200 ? response.data : null;
}

async function POST<T>(url: string, data?: object | any, headerParams: object = {}) {
  let header = await checkToken(headerParams);
  const response = await instance.post<T>(url, data, {
    headers: {...instance.defaults.headers, ...header}
  });
  return response.status === 200 ? response.data : null;
}

async function PUT<T>(url: string, data?: object, headerParams: object = {}) {
  let header = await checkToken(headerParams);
  const response = await instance.put<T>(url, data, {
    headers: {...instance.defaults.headers, ...header}
  });
  return response.status === 200 ? response.data : null;
}

async function DELETE<T>(url: string, headerParams: object = {}) {
  let header = await checkToken(headerParams);
  const response = await instance.delete<T>(url, {
    headers: {...instance.defaults.headers, ...header}
  });
  return response.status === 200 ? response.data : null;
}

export default {GET, POST, PUT, DELETE};
