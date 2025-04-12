import Utilities from 'utils/Utilities';
import ClientAPI from './HTTPClient';

const UPLOAD_IMAGE_URL = '/v1/images/upload-single?group=products';

async function uploadImage<T>(paramsImage: any) {
  var body = new FormData();
  body.append('file', {
    name: Utilities.randomNumber() + Date.now().toString(),
    type: paramsImage.mime,
    uri: paramsImage.path
  });

  const response = await ClientAPI.POST<T>(UPLOAD_IMAGE_URL, body);
  return response;
}
export {uploadImage};
