import path from 'node:path'

export const getCurrentDirectoryPath = () => {
  return path.resolve(__dirname);
};