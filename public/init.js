const initVVA = function() {
	loadCSS(`${hostUrl}/stackle_assistant.css`);
	loadJS(`${hostUrl}/stackle_assistant.js`).then(function(){
	loadJS(`${hostUrl}/draggabilly.pkgd.js`).then(
		function() {
			loadJS(`${hostUrl}/modal.js`).then(
		function(){
        Modal.init();
	  });
	});
	});
}
loadJS(`${hostUrl}/iframeResizer.min.js`).then(
    function() {
        console.log('Resizer loaded');
        if (document.readyState !== 'loading') {
            iFrameResize({ log: true }).then(console.log('resize executed'));
        };
    });