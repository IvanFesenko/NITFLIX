function screenSize() {
  const screenSize = document.body.clientWidth;

  if (screenSize < 768) {
    return 4;
  } else if (screenSize < 1024) {
    return 4;
  } else {
    return 5;
  }
}

export default screenSize;
