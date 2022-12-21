import fsPromises from 'fs/promises';

const list = async (curPath) => {
  try {
    const files = await fsPromises.readdir(curPath, { withFileTypes: true });
    if (files.length) {
      files.forEach((file, index) =>
        console.log(
          `| ${index} | ${file.name} |${
            file.isDirectory() ? ' directory ' : ' file '
          }|`
        )
      );
    } else {
      console.log('There are no files in current directory');
    }
  } catch (e) {
    console.log(e);
  }
};

export default list;
