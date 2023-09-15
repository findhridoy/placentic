// To convert dataUrl (which we get from our blob) to a a file object
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) u8arr[n] = bstr.charCodeAt(n);

  const randomNumber = Math.floor(Math.random() * (10000 - 500)) + 500;

  return new File([u8arr], filename + " " + randomNumber, { type: mime });
};
