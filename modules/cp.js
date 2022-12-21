import fs from 'fs';
import * as path from 'path';
import cd from './cd.js';

const copy = async (curPath, pathToFile, pathToNewDir) => {
  try {
    const baseUrl = await cd(pathToFile, curPath);
    const copyDirPath = await cd(pathToNewDir, curPath);
    const newFilePath = path.resolve(copyDirPath, path.basename(pathToFile));

    const readable = fs.createReadStream(baseUrl, 'utf8');
    const writable = fs.createWriteStream(newFilePath);

    readable.pipe(writable);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

export default copy;
