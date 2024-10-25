(() => {
function detectStackleIframe(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  // Return the matching iframe
  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}

function stackleLTIResizer(event) {
  if ((event.origin.includes("stackle.app") || 
      event.origin.includes("stackle.test")) &&
      event.data == "Stackle iFrame Loaded"
  ) {
    currentIframe = detectStackleIframe(event);
    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');

    stackleMinifier(document.querySelectorAll("iframe"));

  }
}
function stackleMinifier(iFrames) {
    // Handle stackle-mini iframes
    iFrames.forEach(iframe => {
      if (iframe.classList.contains('stackle-mini')) {
        console.log("Found stackle-mini class!");
        iframe.contentWindow.postMessage("applyMiniCSS", "*");
      }
    });
}
// Add the event listener
window.addEventListener("message", stackleLTIResizer, false);
})();