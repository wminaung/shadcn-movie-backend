export const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const target = e.target;
  const files = target.files;
  return files ? files[0] : files;
};

const fileTypes = ["image/jpeg", "image/png", "image/jpg"];

export const isValidFileType = (file: File): boolean => {
  return !!fileTypes.find((fileType) => fileType === file.type);
};
