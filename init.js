loadJS(`${hostUrl}/iframeResizer.min.js`).then(
    function() {
        console.log('Resizer loaded');
        if (document.readyState !== 'loading') {
            iFrameResize({ log: true }).then(console.log('resize executed'));
        };
    });