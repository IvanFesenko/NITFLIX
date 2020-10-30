function screenSize() {
  const screenSize = document.body.clientWidth;

  if (screenSize < 768) {
    return 4;
  } else if (screenSize < 1024) {
    return 5;
  } else {
    return 6;
  }
}

export default screenSize;
