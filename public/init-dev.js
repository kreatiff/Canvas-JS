loadJS(
    `https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js`
).then(function () {
    lazySizes.init();
    console.log("LazySizes loaded");
});
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