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
loadJS(`${hostUrl}/iframeResizer.min.js?v=${datestamp}`).then(function () {
  console.log("Resizer loaded");
  iFrameResize({
    log: true,
    heightCalculationMethod: "lowestElement",
  }).then(console.log("resize executed"));
});
