import fsPromises from 'fs/promises';
import * as path from 'path';
import { FAILED_MESSAGE } from '../constants.js';

const add = async (curPath, fileName, data = '') => {
  try {
    const filePath = path.resolve(curPath, fileName);
    await fsPromises.writeFile(filePath, data);
  } catch {
    console.log(FAILED_MESSAGE);
  }
};

export default add;
