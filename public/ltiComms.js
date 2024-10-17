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