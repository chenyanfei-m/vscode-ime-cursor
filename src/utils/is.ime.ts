const isIMEDarwin = (inputSource: string) =>
  !inputSource.includes('com.apple.keylayout.ABC');

const isIME = (inputSource: string) => {
  switch (process.platform) {
    case 'darwin':
      return isIMEDarwin(inputSource);

    case 'win32':
      return false;

    default:
      return false;
  }
};

export default isIME;
