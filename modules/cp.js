import fs from 'fs';
import * as path from 'path';
import { FAILED_MESSAGE } from '../constants.js';
import cd from './cd.js';

const copy = async (curPath, pathToFile, pathToNewDir) => {
  try {
    const baseUrl = await cd(pathToFile, curPath);
    const copyDirPath = await cd(pathToNewDir, curPath);
    const newFilePath = path.resolve(copyDirPath, path.basename(pathToFile));

    const readable = fs.createReadStream(baseUrl, 'utf8');
    const writable = fs.createWriteStream(newFilePath);

    readable.pipe(writable);
  } catch {
    console.log(FAILED_MESSAGE);
  }
};

export default copy;
