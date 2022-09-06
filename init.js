loadJS(`${hostUrl}/iframeResizer.min.js`).then(
    function() {
        console.log('Resizer loaded');
        iFrameResize({ log: true }, '#myIframe');
    });