function detectStackleIframe(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}
function stackleLTIResizer(event) {
  if ((event.origin.includes("stackle.app") || 
  event.origin.includes("stackle.test")) &&
  event.data == "Stackle iFrame Loaded"
  ) 
  {
    currentIframe = detectStackleIframe(event);
    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');
    
    // Check if parent iframe has stackle-mini class
    if (window.frameElement && window.frameElement.classList.contains('stackle-mini')) {
      currentIframe.contentWindow.postMessage("applyMiniCSS", "*");
      console.log("Applying mini CSS");
    }
  }
}
// event listener for message event
window.addEventListener("message", stackleLTIResizer, false);
