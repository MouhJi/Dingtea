import {ICartShipModel, ICategoryModel} from 'models';

export const API_URL = 'https://api-dingtea.csell.com.vn';

export const MESSAGE_ERROR = 'MESSAGE_ERROR_500';

export const PRICE_MASK = {
  VND: {
    precision: 0,
    separator: ' ',
    delimiter: ',',
    unit: '',
    suffixUnit: '₫'
  },
  USD: {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: '$ ',
    suffixUnit: ''
  }
};

export const TIMEOUT = {
  MAX: 86400000, // 1 day => milliseconds
  MIN: 3600000 // 1 hour => milliseconds
};

export const RESEND_CODE = {
  SO_LAN_GUI_MAX: 5,
  THOI_GIAN_MIN: 10800000 // 3 hour => milliseconds
};

export const STATUS_ORDER = {
  DRAFT: 'draft',
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export type StatusOrder =
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'cancelled'
  | 'completed'
  | 'failed';

export const SHIPPING_METHOD: ICartShipModel[] = [
  {
    id: 5,
    method: 5,
    type: 'Giao tận nơi',
    name: 'Dingtea Express',
    logo: 'https://dingtea.vn/images/logospare.png',
    price: 0
  },
  {
    id: 6,
    method: 6,
    type: 'Tự đến lấy',
    name: 'Tự đến lấy',
    logo: '',
    price: 0
  },
  {
    id: 1,
    method: 1,
    type: 'Giao tận nơi',
    name: 'Viettel Post',
    logo: 'https://chuyenphatnhanhanphu.vn/wp-content/uploads/2019/10/logo-viettel-1.png',
    price: 0
  },
  {
    id: 2,
    method: 2,
    type: 'Giao tận nơi',
    name: 'Việt Nam Post',
    logo: 'https://cdn1.vieclam24h.vn/images/employer_avatar/2024/07/05/logo%20vnp_172015268438.png',
    price: 0
  },
  {
    id: 3,
    method: 3,
    type: 'Giao tận nơi',
    name: 'Giao Hàng Nhanh',
    logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Icon-GHN.png',
    price: 0
  },
  {
    id: 4,
    method: 4,
    type: 'Giao tận nơi',
    name: 'Giao Hàng Tiết Kiệm',
    logo:
      'https://sanvieclamcantho.com/upload/imagelogo/cong-ty-co-phan-giao-hang-tiet-kiem1575178807.png',
    price: 0
  }
];

export const CATEGORY_DEFAULT: ICategoryModel = {
  id: 1003,
  name: 'Tuỳ chọn'
};

export const STATUS_TICH_DIEM = {
  VOUCHER: 'voucher',
  GIFT: 'gift',
  EARN_POINTS: 'earn_points'
};

export const PAYMENT_METHOD_LIST = [
  {
    id: 1,
    method: 1,
    type: 'tienmat',
    name: 'Tiền mặt',
    logo:
      'https://www.pngfind.com/pngs/m/415-4153126_png-file-easy-money-icon-png-transparent-png.png'
  },
  {
    id: 2,
    method: 2,
    type: 'chuyenkhoan',
    name: 'Chuyển khoản',
    logo: 'https://png.pngtree.com/element_our/png_detail/20190103/money-transfer-line-black-icon-png_309218.jpg'
  },
  {
    id: 3,
    method: 3,
    type: 'visa',
    name: 'Visa',
    logo: 'https://www.freepnglogos.com/uploads/visa-inc-png-18.png'
  },
  {
    id: 4,
    method: 4,
    type: 'mastercart',
    name: 'Master Cart',
    logo:
      'https://w7.pngwing.com/pngs/949/951/png-transparent-wire-transfer-bank-electronic-funds-transfer-money-transfer-bank-text-service-trademark-thumbnail.png'
  },
  {
    id: 5,
    method: 5,
    type: 'momo',
    name: 'MoMo',
    logo: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png'
  },
  {
    id: 8,
    method: 8,
    type: 'airpay',
    name: 'Air Pay',
    logo: 'https://cdn.tgdd.vn/2020/03/GameApp/image(15)-200x200-1.png'
  },
  {
    id: 9,
    method: 9,
    type: 'vnpay',
    name: 'VN Pay',
    logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png'
  }
];
