const initVVA = function () {
  loadCSS(`${hostUrl}/stackle_assistant.css?v=${datestamp}`);
  loadJS(`${hostUrl}/stackle_assistant.js?v=${datestamp}`).then(function () {
    loadJS(`${hostUrl}/draggabilly.pkgd.js?v=${datestamp}`).then(function () {
      loadJS(`${hostUrl}/modal.js?v=${datestamp}`).then(function () {
        Modal.init();
      });
    });
  });
};
loadJS(
  `https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js`
).then(function () {
  console.log("Resizer loaded");
  iFrameResize({
    log: true,
    enablePublicMethods: true,
    heightCalculationMethod: "max",
  });
});
