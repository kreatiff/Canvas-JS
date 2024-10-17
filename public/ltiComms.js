document.addEventListener('DOMContentLoaded', (event) => {
	var body = document.body, html = document.documentElement;
	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )+25;
	window.parent.postMessage(
  {
    subject: 'lti.frameResize',
    height: height
  },
  '*'
);
	window.parent.postMessage({'frameUrl' : location.href}, '*');
  //console.log(location.href);
});
function stackleLTIResizer(event) {
  if (event.origin.includes("stackle.app")) 
  {
    currentIframe = detectStackleIframe(event);
    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');
  }
}
if(loadCSS){ 
  loadCSS(`${hostUrl}/osg_stackle_canvas.css`);
};