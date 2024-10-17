function getIFrameThatSentMessage(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}
function receiveMessage(event) {
  if (
    event.origin.includes("stackle.app") ||
    event.origin.includes("stacklehq.com") ||
    event.origin.includes("stackle.test")
  ) {
    currentIframe = getIFrameThatSentMessage(event);

    currentIframe.classList.add("stackle_iframe");
    body.classList.add("stackle_inside");
    console.log(currentIframe);
  }
}
// event listener for message event
window.addEventListener("message", receiveMessage, false);