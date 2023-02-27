loadJS(
    `https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.3/dist/lazyload.min.js`
).then(function () {
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
    console.log("Lazy loaded");
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