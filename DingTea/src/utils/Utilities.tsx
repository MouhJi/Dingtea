import {Platform, Dimensions, PixelRatio, StatusBar} from 'react-native';

import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import {LAYOUT} from 'bases/styles/Core';
import MyStaticLocal from './MyStaticLocal';

const {width, height} = Dimensions.get('screen');
const sizeOfWidth = 375;
const sizeOfHeight = 812;
let rootLoadingContext: any = null;

const imageDefault = require('../assets/images/logo_dingtea.png');

export default class Utilities {
  static showToast(
    title: string,
    message?: string,
    type: 'none' | 'default' | 'info' | 'success' | 'danger' | 'warning' = 'default',
    duration = 1850
  ) {
    showMessage({
      message: title,
      description: message,
      type: type,
      duration: duration
    });
  }

  static convertLinkImage = (
    url?: string,
    size: 'REAL' | 'MAX' | 'EPIC' | 'HIGH' | 'MEDIUM' | 'LOW' | 'MIN' = 'MEDIUM'
  ) => {
    try {
      const SIZE_MODE = {
        REAL: '.',
        MAX: '-600x600',
        EPIC: '-500x500',
        HIGH: '-400x400',
        MEDIUM: '-300x300',
        LOW: '-200x200',
        MIN: '-100x100'
      };

      if (!url) return imageDefault;
      if (url.startsWith('http://cdn-thumb-image') || url.startsWith('https://cdn-thumb-image')) {
        if (
          url.endsWith('.png') ||
          url.endsWith('.PNG') ||
          url.endsWith('.jpg') ||
          url.endsWith('.JPG') ||
          url.endsWith('.jpeg') ||
          url.endsWith('.JPEG')
          // url.endsWith('.gif') ||
          // url.endsWith('.GIF')
        ) {
          const arrUrls = String(url).split('.');
          let urlMix = '';

          urlMix = arrUrls.slice(0, arrUrls.length - 1).join('.');
          urlMix += SIZE_MODE[size] + arrUrls[arrUrls.length - 1];

          return {uri: urlMix};
        }
        return {uri: url};
      }
      return {uri: url};
    } catch (error) {
      return imageDefault;
    }
  };

  /* 
    sizeOfItemDesign - kich thuoc chieu rong cua view can tinh toan
    sizeOfWidth - kich thuoc man hinh theo thiet ke theo chieu rong (Width)
  */
  static getResolutionByWidth = (sizeOfItemDesign: any) =>
    (sizeOfItemDesign / sizeOfWidth) * Utilities.getWidthScreen();

  /* 
    sizeOfItemDesign - kich thuoc chieu cao cua view can tinh toan
    sizeOfHeight - kich thuoc man hinh thiet ke theo chieu cao (Height)
  */
  static getResolutionByHeight = (sizeOfItemDesign: any) =>
    (sizeOfItemDesign / sizeOfHeight) * Utilities.getHeightScreen();

  static isAndroid = () => {
    return Platform.OS === 'android';
  };

  static isIphoneX() {
    const dim = Dimensions.get('window');

    return (
      Platform.OS === 'ios' &&
      (dim.height === 812 || dim.width === 812 || dim.height === 896 || dim.width === 896)
    );
  }

  static getStatusBarHeight(): number {
    if (Platform.OS === 'android') {
      return StatusBar.currentHeight || LAYOUT.l_30;
    } else {
      return LAYOUT.l_30;
    }
  }

  static log(log: any) {
    if (__DEV__) {
      console.log(log)
    }
  }

  static logAnalytics(_eventName: string) {
    if (__DEV__) {
      Utilities.log(_eventName);
    }
  }

  static logCrashlytics(nameComponent: any, error: any) {
    if (__DEV__) {
      Utilities.log(` | ${nameComponent}.js | ${String(error)} | ${String(JSON.stringify(error))}`);
    }
  }

  static getWidthScreen(isPixel?: any) {
    if (width < height) {
      if (isPixel) return PixelRatio.getPixelSizeForLayoutSize(width);
      return width;
    }
    if (isPixel) return PixelRatio.getPixelSizeForLayoutSize(height);
    return height;
  }

  static getHeightScreen(isPixel?: any) {
    if (width < height) {
      if (isPixel) return PixelRatio.getPixelSizeForLayoutSize(height);
      return height;
    }
    if (isPixel) return PixelRatio.getPixelSizeForLayoutSize(width);
    return width;
  }

  static getKeyboardType(type: any) {
    switch (type) {
      case 'text':
        return 'default';

      case 'int':
        return 'number-pad';

      case 'float':
        return 'numeric';

      default:
        return 'default';
    }
  }

  /**
   ** isInt: tạo ra số hay không
   ** maxInt: số lớn nhất có thể được tạo
   *
   */
  static randomNumber(isInt?: boolean, maxInt?: number): number | string {
    if (isInt) {
      if (maxInt) {
        return Math.floor(Math.random() * Math.floor(maxInt));
      } else {
        return Math.floor(Math.random() * Math.floor(10000));
      }
    } else {
      return Math.random().toString(16).substring(2, 10);
    }
  }

  static convertTimeByFormat(date: any, format?: string) {
    const formartTmp = format || 'DD/MM/YYYY HH:mm';

    try {
      if (!date) return '';

      if (String(date).toLowerCase().includes('invalid')) {
        return '';
      }

      if (typeof date === 'number') {
        if (date < 0) {
          return moment.unix(date).format(formartTmp);
        }
        return moment(new Date(date * 1000)).format(formartTmp);
      }
      return moment(new Date(date)).format(formartTmp);
    } catch (error) {
      return '';
    }
  }

  static setHideRootLoading(context: any) {
    rootLoadingContext = context;
  }

  static showHideRootLoading(isShow: boolean, textBody?: string) {
    try {
      if (rootLoadingContext && isShow === false && rootLoadingContext.state.isShow === false)
        return;
      if (rootLoadingContext && isShow === true && rootLoadingContext.state.isShow === true) return;

      rootLoadingContext.setState({
        isShow,
        textBody: textBody || '...'
      });
    } catch (error) {
      this.logCrashlytics(rootLoadingContext, error);
    }
  }

  static getSvgBackground = (widthSvg?: number, heightSvg?: number) => {
    const svgBackgroundGradient = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${
      widthSvg || 375
    }" height="${heightSvg || 301}" viewBox="0 0 ${widthSvg || 375} ${heightSvg || 301}">
    <defs>
      <linearGradient id="linear-gradient" x1="0.5" y1="0.904" x2="0.5" y2="0.473" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#F5F5F5"/>
        <stop offset="1" stop-color="#85d0c8"/>
      </linearGradient>
    </defs>
    <rect id="Rectangle_6252" data-name="Rectangle 6252" width="${widthSvg || 375}" height="${
      heightSvg || 301
    }" fill="url(#linear-gradient)"/>
    </svg>
    `;
    return svgBackgroundGradient;
  };

  static getSvgTrangChu = (color?: string) => {
    const svgTrangChu = `<svg xmlns="http://www.w3.org/2000/svg" width="19.28" height="19.282" viewBox="0 0 19.28 19.282">
      <path id="home" d="M19.262,8.387h0L11.395.52a1.775,1.775,0,0,0-2.51,0L1.023,8.381l-.008.008A1.774,1.774,0,0,0,2.2,11.414l.055,0h.313V17.2a2.08,2.08,0,0,0,2.078,2.078H7.719a.565.565,0,0,0,.565-.565V14.179a.949.949,0,0,1,.948-.948h1.815a.949.949,0,0,1,.948.948v4.538a.565.565,0,0,0,.565.565h3.077A2.08,2.08,0,0,0,17.715,17.2V11.416h.291a1.775,1.775,0,0,0,1.256-3.03Zm-.8,1.711a.641.641,0,0,1-.456.189H17.15a.565.565,0,0,0-.565.565V17.2a.949.949,0,0,1-.948.948H13.125V14.179A2.08,2.08,0,0,0,11.047,12.1H9.232a2.08,2.08,0,0,0-2.078,2.078v3.973H4.642a.949.949,0,0,1-.948-.948V10.852a.565.565,0,0,0-.565-.565H2.262a.645.645,0,0,1-.444-1.1h0L9.684,1.319a.645.645,0,0,1,.912,0L18.46,9.182l0,0A.647.647,0,0,1,18.462,10.1Zm0,0" transform="translate(-0.499)" fill=${
        color || '#7b7b7b'
      }/>
      </svg>
      `;
    return svgTrangChu;
  };

  static getSvgDoUong = (color?: string) => {
    const svgDoUong = `<svg xmlns="http://www.w3.org/2000/svg" width="17.429" height="23.685" viewBox="0 0 17.429 23.685">
      <g id="bubble-tea" transform="translate(-96 -16)">
        <path id="Path_16280" data-name="Path 16280" d="M112.122,21.526h-5.665V16.395a.417.417,0,0,0-.436-.395h-2.614a.417.417,0,0,0-.436.395v5.132H97.307A1.252,1.252,0,0,0,96,22.711V23.5a.417.417,0,0,0,.436.395h.893l.727,13.165a2.933,2.933,0,0,0,3.046,2.625h7.227a2.933,2.933,0,0,0,3.046-2.625l.727-13.165h.893a.417.417,0,0,0,.436-.395v-.789A1.252,1.252,0,0,0,112.122,21.526Zm-8.279-4.737h1.743v4.737h-1.743Zm0,9.474V23.895h1.743v2.368Zm-.871,0h-4.64L98.2,23.895h4.771ZM110.5,37.02a2.1,2.1,0,0,1-2.176,1.875H101.1a2.1,2.1,0,0,1-2.176-1.875l-.55-9.967h12.679Zm.594-10.757h-4.64V23.895h4.771Zm1.46-3.158H96.871v-.395a.417.417,0,0,1,.436-.395h14.815a.417.417,0,0,1,.436.395Z" transform="translate(0)" fill=${
          color || '#7b7b7b'
        }/>
        <path id="Path_16281" data-name="Path 16281" d="M169.184,416a1.184,1.184,0,1,0,1.184,1.184A1.184,1.184,0,0,0,169.184,416Zm0,1.579a.395.395,0,1,1,.395-.395A.395.395,0,0,1,169.184,417.579Z" transform="translate(-68.013 -380.263)" fill=${
          color || '#7b7b7b'
        }/>
        <path id="Path_16282" data-name="Path 16282" d="M194.368,361.184a1.184,1.184,0,1,0-1.184,1.184A1.184,1.184,0,0,0,194.368,361.184Zm-1.184.395a.395.395,0,1,1,.395-.395A.395.395,0,0,1,193.184,361.579Z" transform="translate(-90.684 -327.026)" fill=${
          color || '#7b7b7b'
        }/>
        <path id="Path_16283" data-name="Path 16283" d="M273.184,362.368A1.184,1.184,0,1,0,272,361.184,1.184,1.184,0,0,0,273.184,362.368Zm0-1.579a.395.395,0,1,1-.395.395A.395.395,0,0,1,273.184,360.789Z" transform="translate(-166.255 -327.026)" fill=${
          color || '#7b7b7b'
        }/>
        <path id="Path_16284" data-name="Path 16284" d="M233.184,416a1.184,1.184,0,1,0,1.184,1.184A1.184,1.184,0,0,0,233.184,416Zm0,1.579a.395.395,0,1,1,.395-.395A.395.395,0,0,1,233.184,417.579Z" transform="translate(-128.469 -380.263)" fill=${
          color || '#7b7b7b'
        }/>
        <path id="Path_16285" data-name="Path 16285" d="M297.184,416a1.184,1.184,0,1,0,1.184,1.184A1.184,1.184,0,0,0,297.184,416Zm0,1.579a.395.395,0,1,1,.395-.395A.395.395,0,0,1,297.184,417.579Z" transform="translate(-188.926 -380.263)" fill=${
          color || '#7b7b7b'
        }/>
      </g>
      </svg>
      `;
    return svgDoUong;
  };

  static getSvgStore = (color?: string) => {
    const svgDoUong = `<svg xmlns="http://www.w3.org/2000/svg" width="19.28" height="19.28" viewBox="0 0 19.28 19.28">
    <g id="Group_8707" data-name="Group 8707" transform="translate(278.438 -390.235)">
      <path id="Path_16314" data-name="Path 16314" d="M-155.894,392.676a5,5,0,0,0-4.387-2.441h0a4.607,4.607,0,0,0-1.947.55,4.762,4.762,0,0,0-2.351,2.891,4.674,4.674,0,0,0,.446,3.63c.893,1.567,1.831,3.143,2.738,4.667q.488.821.975,1.642c.13.219.263.326.407.326h0c.147,0,.284-.111.419-.339q.518-.874,1.041-1.745c.9-1.5,1.824-3.051,2.7-4.6A4.562,4.562,0,0,0-155.894,392.676Zm-.556,4.105c-.036.072-.079.144-.122.216l-3.436,5.812-.566-.954c-.492-.829-.97-1.634-1.447-2.44q-.19-.321-.381-.64c-.344-.576-.7-1.173-1.033-1.767a3.823,3.823,0,0,1,0-4.026A3.782,3.782,0,0,1-159.965,391h.075a3.882,3.882,0,0,1,3.272,1.9A3.981,3.981,0,0,1-156.45,396.781Z" transform="translate(-103.899)" fill=${
        color || '#7b7b7b'
      }/>
      <path id="Path_16315" data-name="Path 16315" d="M-166.878,542.293a.511.511,0,0,0-.392-.125c-.364,0-.735,0-1.093,0h-.892c-.347,0-.706,0-1.058,0a.523.523,0,0,0-.394.125.518.518,0,0,0-.126.391c.01.918.01,1.684,0,2.409a.525.525,0,0,0,.126.394.518.518,0,0,0,.387.129h3.048a.531.531,0,0,0,.4-.132.515.515,0,0,0,.125-.387c-.009-.726-.01-1.492,0-2.41A.522.522,0,0,0-166.878,542.293Zm-.663.676v1.859h-2.5v-1.859Z" transform="translate(-98.4 -138.932)" fill=${
        color || '#7b7b7b'
      }/>
      <path id="Path_16316" data-name="Path 16316" d="M-140.04,412.046a2.852,2.852,0,0,0-2.031.846,2.87,2.87,0,0,0-.827,2.053,2.865,2.865,0,0,0,2.932,2.9h.01a2.841,2.841,0,0,0,2.03-.85,2.887,2.887,0,0,0,.829-2.052,2.9,2.9,0,0,0-.846-2.078A2.949,2.949,0,0,0-140.04,412.046Zm2.182,2.919A2.116,2.116,0,0,1-140,417.082h-.016a2.093,2.093,0,0,1-2.117-2.156,2.115,2.115,0,0,1,.628-1.512,2.162,2.162,0,0,1,1.53-.607,2.122,2.122,0,0,1,1.512.625A2.139,2.139,0,0,1-137.858,414.965Z" transform="translate(-123.912 -19.963)" fill=${
        color || '#7b7b7b'
      }/>
      <path id="Path_16317" data-name="Path 16317" d="M-124.244,429.232a1.446,1.446,0,0,0-1.418,1.443,1.426,1.426,0,0,0,.427,1.022,1.436,1.436,0,0,0,1.016.417h.019a1.442,1.442,0,0,0,1.417-1.44,1.433,1.433,0,0,0-.43-1.027A1.431,1.431,0,0,0-124.244,429.232Zm-.655,1.438a.679.679,0,0,1,.672-.67h.005a.678.678,0,0,1,.674.662.668.668,0,0,1-.2.489.67.67,0,0,1-.49.2A.7.7,0,0,1-124.9,430.67Z" transform="translate(-139.716 -35.667)" fill=${
        color || '#7b7b7b'
      }/>
      <circle id="Ellipse_27" data-name="Ellipse 27" cx="0.337" cy="0.337" r="0.337" transform="translate(-272.302 406.196)" fill=${
        color || '#7b7b7b'
      }/>
      <path id="Path_16318" data-name="Path 16318" d="M-249.016,522.219a.386.386,0,0,0-.386.386v3.952h-6.039c.023-.929.015-3.692,0-4.215a2.079,2.079,0,0,0-1.921-2.05,2.021,2.021,0,0,0-2.289,1.831c-.075,1.109-.052,2.645-.034,3.88,0,.191.006.377.008.553h-1.563v-2.218c0-1.557,0-3.113,0-4.678,0-.211,0-.531-.372-.551a.365.365,0,0,0-.281.084.551.551,0,0,0-.108.417v.031q0,1.017,0,2.033c0,1.666,0,3.389,0,5.083a.6.6,0,0,0,.134.451.587.587,0,0,0,.437.135h0c3.925-.009,8.03-.009,12.2,0h.22a.386.386,0,0,0,.386-.386V522.6A.386.386,0,0,0-249.016,522.219Zm-7.183,4.338h-2.731c0-.283,0-.607,0-.952,0-1.1,0-2.347,0-3.167a1.417,1.417,0,0,1,.412-1.026,1.367,1.367,0,0,1,1-.36,1.318,1.318,0,0,1,1.3,1.333c.012.816.01,1.968.009,2.985C-256.2,525.794-256.2,526.2-256.2,526.557Z" transform="translate(-15.034 -117.828)" fill=${
        color || '#7b7b7b'
      }/>
      <path id="Path_16319" data-name="Path 16319" d="M-275.878,453.59a1.488,1.488,0,0,0,2.211,0,1.67,1.67,0,0,0,1.045.5,2.253,2.253,0,0,0,1.167-.477,1.489,1.489,0,0,0,2.16.024c.078.037.155.075.231.113a3.67,3.67,0,0,0,.671.281c.352.1.5-.057.563-.2a.318.318,0,0,0,.014-.254c-.058-.14-.224-.205-.371-.262a.811.811,0,0,1-.649-.845q-.024-.271-.046-.543c-.03-.364-.062-.741-.1-1.115-.014-.141-.051-.517-.43-.479-.346.033-.329.351-.32.522s.019.335.029.5c.024.388.049.79.051,1.184a.79.79,0,0,1-.227.575.677.677,0,0,1-.493.2.717.717,0,0,1-.5-.223.725.725,0,0,1-.2-.529c.029-.86.078-1.709.129-2.607q.028-.487.055-.987h.669a.4.4,0,0,0,.394-.394.4.4,0,0,0-.394-.394c-.049,0-4.87,0-5.23,0a1.708,1.708,0,0,0-1.723,1.138c-.116.283-.228.573-.337.853-.247.637-.5,1.295-.811,1.911a1.3,1.3,0,0,0,.042,1.167,1.459,1.459,0,0,0,1.015.8A1.565,1.565,0,0,0-275.878,453.59Zm-.936-.327a1.158,1.158,0,0,1-.7-.227c-.2-.155-.224-.384-.069-.741.217-.5.423-1.01.623-1.505.153-.379.311-.771.473-1.154.241-.571.39-.664,1.232-.671-.184.641-.369,1.295-.552,1.942l-.221.78c-.089.313-.174.644-.252.984C-276.364,453.053-276.545,453.253-276.814,453.263Zm1.375-.871c.3-1.035.618-2.143.959-3.24l.007-.021c.02-.065.033-.106.054-.166h1.013l-.137.748c-.156.852-.307,1.679-.457,2.507-.014.077-.023.154-.031.23a2.671,2.671,0,0,1-.04.27.746.746,0,0,1-.33.476.677.677,0,0,1-.517.091.712.712,0,0,1-.463-.325A.72.72,0,0,1-275.439,452.393Zm3.744-2.673c-.035.715-.069,1.419-.105,2.124l-.006.128c-.011.22-.022.447-.049.667a.723.723,0,0,1-.78.661.769.769,0,0,1-.518-.29.594.594,0,0,1-.119-.46c.14-.874.3-1.761.463-2.618q.089-.483.178-.967h.974Z" transform="translate(0 -52.982)" fill=${
        color || '#7b7b7b'
      }/>
    </g>
    </svg>
      `;
    return svgDoUong;
  };

  static getSvgTichDiem = (color?: string) => {
    const svgTichDiem = `<svg xmlns="http://www.w3.org/2000/svg" width="19.654" height="19.653" viewBox="0 0 19.654 19.653">
    <g id="tickets" transform="translate(0 -0.007)">
      <path id="Path_16289" data-name="Path 16289" d="M18.824,13.33a1.311,1.311,0,0,0,.83-1.217V9.634A1.334,1.334,0,0,0,18.321,8.3h-.136a1.334,1.334,0,0,0-.113-1.756L16.319,4.792a1.311,1.311,0,0,0-1.447-.274.7.7,0,0,1-.92-.92,1.311,1.311,0,0,0-.274-1.447L11.925.4A1.334,1.334,0,0,0,10.04.4l-7.9,7.9h-.8A1.334,1.334,0,0,0,0,9.634v2.479A1.311,1.311,0,0,0,.83,13.33a.7.7,0,0,1,0,1.3A1.312,1.312,0,0,0,0,15.849v2.479a1.334,1.334,0,0,0,1.333,1.333H18.321a1.334,1.334,0,0,0,1.333-1.333V15.849a1.312,1.312,0,0,0-.83-1.217.7.7,0,0,1,0-1.3ZM10.857,1.215a.177.177,0,0,1,.25,0L12.86,2.968a.148.148,0,0,1,.034.163,1.854,1.854,0,0,0,2.445,2.445.148.148,0,0,1,.163.034l1.753,1.753a.177.177,0,0,1,0,.25l-.689.689H13.554L8.662,3.41ZM7.845,4.227,11.919,8.3H3.771Zm-6.689,14.1V15.849a.148.148,0,0,1,.091-.139,1.854,1.854,0,0,0,0-3.458.148.148,0,0,1-.091-.139V9.634a.177.177,0,0,1,.177-.177H14.451V18.5H1.333a.177.177,0,0,1-.177-.177ZM18.5,12.113a.148.148,0,0,1-.091.139,1.854,1.854,0,0,0,0,3.458.148.148,0,0,1,.091.139v2.479a.177.177,0,0,1-.177.177H15.607V9.457h2.714a.177.177,0,0,1,.177.177Z" transform="translate(0 0)" fill=${
        color || '#7b7b7b'
      }/>
      <path id="Path_16290" data-name="Path 16290" d="M105,284.991h8.671v1.156H105Z" transform="translate(-100.954 -274.001)" fill=${
        color || '#7b7b7b'
      }/>
      <path id="Path_16291" data-name="Path 16291" d="M105,344.991h8.671v1.156H105Z" transform="translate(-100.954 -331.689)" fill=${
        color || '#7b7b7b'
      }/>
      <path id="Path_16292" data-name="Path 16292" d="M105,404.991h8.671v1.156H105Z" transform="translate(-100.954 -389.377)" fill=${
        color || '#7b7b7b'
      }/>
    </g>
    </svg>
    `;
    return svgTichDiem;
  };

  static getSvgTaiKhoan = (color?: string) => {
    const svgTaiKhoan = `<svg id="menu" xmlns="http://www.w3.org/2000/svg" width="19.282" height="19.282" viewBox="0 0 19.282 19.282">
    <path id="Path_16309" data-name="Path 16309" d="M6.553,9.039H2.486A2.488,2.488,0,0,1,0,6.553V2.486A2.488,2.488,0,0,1,2.486,0H6.553A2.488,2.488,0,0,1,9.039,2.486V6.553A2.488,2.488,0,0,1,6.553,9.039ZM2.486,1.205a1.282,1.282,0,0,0-1.28,1.28V6.553a1.282,1.282,0,0,0,1.28,1.28H6.553a1.282,1.282,0,0,0,1.28-1.28V2.486a1.282,1.282,0,0,0-1.28-1.28Z" fill=${
      color || '#7b7b7b'
    }/>
    <path id="Path_16310" data-name="Path 16310" d="M278.553,9.039h-4.067A2.488,2.488,0,0,1,272,6.553V2.486A2.488,2.488,0,0,1,274.486,0h4.067a2.488,2.488,0,0,1,2.486,2.486V6.553A2.488,2.488,0,0,1,278.553,9.039Zm-4.067-7.833a1.282,1.282,0,0,0-1.281,1.28V6.553a1.282,1.282,0,0,0,1.281,1.28h4.067a1.282,1.282,0,0,0,1.28-1.28V2.486a1.282,1.282,0,0,0-1.28-1.28Z" transform="translate(-261.756)" fill=${
      color || '#7b7b7b'
    }/>
    <path id="Path_16311" data-name="Path 16311" d="M276.519,281.039a4.519,4.519,0,1,1,4.519-4.519A4.524,4.524,0,0,1,276.519,281.039Zm0-7.834a3.314,3.314,0,1,0,3.314,3.314A3.318,3.318,0,0,0,276.519,273.205Z" transform="translate(-261.756 -261.756)" fill=${
      color || '#7b7b7b'
    }/>
    <path id="Path_16312" data-name="Path 16312" d="M6.553,281.039H2.486A2.488,2.488,0,0,1,0,278.553v-4.067A2.488,2.488,0,0,1,2.486,272H6.553a2.488,2.488,0,0,1,2.486,2.486v4.067A2.488,2.488,0,0,1,6.553,281.039Zm-4.067-7.834a1.282,1.282,0,0,0-1.28,1.281v4.067a1.282,1.282,0,0,0,1.28,1.28H6.553a1.282,1.282,0,0,0,1.28-1.28v-4.067a1.282,1.282,0,0,0-1.28-1.281Z" transform="translate(0 -261.756)" fill=${
      color || '#7b7b7b'
    }/>
    </svg>
    `;
    return svgTaiKhoan;
  };

  static getHeaderRequest = () => {
    let access_token = MyStaticLocal.getUserToken()?.access_token;
    if (access_token)
      return {
        Authorization: 'Bearer ' + access_token || ''
      };
    return {};
  };
  
  static formatPhoneNumber(phoneNumber: string): string {
    const removedZeroFirstPosition =
      phoneNumber.charAt(0) === '0' ? phoneNumber : '0' + phoneNumber;
    return removedZeroFirstPosition;
  }
}
