import fsPromises from 'fs/promises';
import * as path from 'path';

const add = async (curPath, fileName, data = '') => {
  try {
    const filePath = path.resolve(curPath, fileName);
    await fsPromises.writeFile(filePath, data);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

export default add;
