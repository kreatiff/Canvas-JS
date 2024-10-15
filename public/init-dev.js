const addStackleClass = () => {
  // Select all form elements with [data-tool-id*='stackle.app']
  const stackleForms = document.querySelectorAll("form[data-tool-id*='stackle.app']");
  console.log("Stackle Forms:",  stackleForms.length);
  // If we found any Stackle forms
  if (stackleForms.length > 0) {
    // Add 'stackle_inside' class to the body
    document.body.classList.add("stackle_inside");
    console.log("Stackle Detected... Added CSS classes");
    // For each Stackle form
    stackleForms.forEach(form => {
      // Add 'stackle_integration' class to the form
      form.classList.add("stackle_integration");

      // Find the closest parent with class 'tool_content_wrapper'
      const wrapper = form.closest('.tool_content_wrapper');
      
      // if (wrapper) {
      //   // Find the iframe within this wrapper
      //   const iframe = wrapper.querySelector('iframe');
        
      //   if (iframe) {
      //     iframe.classList.add("stackle_iframe");
      //   }
      // }
    });
  }
};
function getIFrameThatSentMessage(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  return allIFrames.find(
      iframe => iframe.contentWindow == message.source
  );
}
function receiveMessage(event) {
  if (event.origin.includes("stackle.app") || event.origin.includes("stacklehq.com")) { 
    currentIframe = getIFrameThatSentMessage(event);
    currentIframe.classList.add("stackle_iframe");
    console.log(getIFrameThatSentMessage(event));
      //console.log("event.origin: ", event.origin);
      //console.log("event.data: ", event.data);
      //console.log("event.source: ", event.source.postMessage);
  }
}
// event listener for message event
window.addEventListener("message", receiveMessage, false);

// Get the current URL
let currentURL = window.location.href;
document.addEventListener('DOMContentLoaded', (event) => {
// Check if the URL contains "/edit" or "/speed_grader"
if (currentURL.includes('/edit') || currentURL.includes('/speed_grader')) {
    console.log('URL contains /edit or /speed_grader');
} else {
  loadJS(
    `${hostUrl}/iframeResizer.min.js`
  ).then(function () {
    addStackleClass();
    let counter = 0;
    const intervalId = setInterval(() => {
      iFrameResize({
        log: false,
        heightCalculationMethod: "bodyScroll",
        checkOrigin: false
      }, '.stackle_iframe');
      counter++;
      if (counter === 10) {
        clearInterval(intervalId);
      }
    }, 1000);
  });
}


loadCSS(`${hostUrl}/stackle_canvas.css`);
});