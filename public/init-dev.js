function detectStackleIframe(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}
function stackleLTIResizer(event) {
  document.querySelectorAll("iframe").forEach(iframe => {
    if (iframe.classList.contains('stackle-mini')) {
      console.log("Found stackle-mini class!");
      iframe.contentWindow.postMessage("applyMiniCSS", "*");
    }
  });
  if ((event.origin.includes("stackle.app") || 
  event.origin.includes("stackle.test")) &&
  event.data == "Stackle iFrame Loaded"
  ) 
  {
    currentIframe = detectStackleIframe(event);
    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');
    window.removeEventListener("message", stackleLTIResizer, false);
  }
  window.removeEventListener("message", stackleLTIResizer, false);
}
// event listener for message event
window.addEventListener("message", stackleLTIResizer, false);
