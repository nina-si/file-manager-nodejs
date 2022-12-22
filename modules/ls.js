import fsPromises from 'fs/promises';
import { FAILED_MESSAGE } from '../constants.js';

const list = async (curPath) => {
  try {
    const files = await fsPromises.readdir(curPath, { withFileTypes: true });
    if (files.length) {
      const data = files
        .map((file) => {
          return {
            name: file.name,
            type: file.isFile() ? 'file' : 'directory',
          };
        })
        .sort((a, b) => a.type.localeCompare(b.type) || b.name - a.name);
      console.table(data);
    } else {
      console.log('There are no files in current directory\n');
    }
  } catch {
    console.log(FAILED_MESSAGE);
  }
};

export default list;
