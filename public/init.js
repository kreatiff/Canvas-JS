loadJS(
  `https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js`
).then(function () {
  console.log("Resizer loaded");
  iFrameResize({
    log: false,
    heightCalculationMethod: "max",
    checkOrigin: false
  });
});