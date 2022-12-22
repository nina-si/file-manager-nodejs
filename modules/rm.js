import { promises as fsPromises } from 'fs';
import { FAILED_MESSAGE } from '../constants.js';
import cd from './cd.js';

const remove = async (curPath, pathToFile) => {
  try {
    const fileToRemove = await cd(pathToFile, curPath);
    await fsPromises.unlink(fileToRemove);
  } catch {
    console.log(FAILED_MESSAGE);
  }
};

export default remove;
