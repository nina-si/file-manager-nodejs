import { promises as fsPromises } from 'fs';
import cd from './cd.js';

const remove = async (curPath, pathToFile) => {
  try {
    const fileToRemove = await cd(pathToFile, curPath);
    await fsPromises.unlink(fileToRemove);
  } catch (err) {
    console.log(err);
  }
};

export default remove;
