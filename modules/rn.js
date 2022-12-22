import fs from 'fs';
import path from 'path';
import { FAILED_MESSAGE } from '../constants.js';
import cd from './cd.js';

const rename = async (curPath, pathToFile, newName) => {
  try {
    const oldPath = await cd(pathToFile, curPath);
    const newPath = path.resolve(path.dirname(oldPath), newName);
    fs.rename(oldPath, newPath, () => {});
  } catch {
    console.log(FAILED_MESSAGE);
  }
};

export default rename;
