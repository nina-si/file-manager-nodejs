import fsPromises from 'fs/promises';
import * as path from 'path';

const cd = async (newPath, currentDir) => {
  const updatedPath = !path.isAbsolute(newPath)
    ? path.resolve(currentDir, newPath)
    : path.resolve(newPath);

  return await new Promise(async (resolve, reject) => {
    try {
      await fsPromises.access(updatedPath);
      resolve(updatedPath);
    } catch {
      reject('Error');
    }
  });
};

export default cd;
