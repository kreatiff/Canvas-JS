function detectStackleIframe(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}
function stackleLTIResizer(event) {
  if (
    event.origin.includes("stackle.app") ||
    event.origin.includes("stacklehq.com") ||
    event.origin.includes("stackle.test")
  ) {
    currentIframe = detectStackleIframe(event);
    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');
  }
}
// event listener for message event
window.addEventListener("message", stackleLTIResizer, false);