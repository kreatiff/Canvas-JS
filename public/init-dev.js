function detectStackleIframe(message) {
  const allIFrames = Array.from(document.querySelectorAll("iframe"));
  const iframe = allIFrames.find((iframe) => iframe.contentWindow == message.source);
  
  if (!iframe) {
    console.warn("Could not find matching iframe for message", message);
  }
  return iframe;
}

function stackleLTIResizer(event) {
  if ((event.origin.includes("stackle.app") || 
      event.origin.includes("stackle.test")) &&
      event.data == "Stackle iFrame Loaded"
  ) {
    currentIframe = detectStackleIframe(event);
    if (!currentIframe) {
      console.log("No iframe found");
      return;
    }

    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');
    
    // Add debugging logs
    console.log("Iframe classes:", currentIframe.className);
    console.log("Has stackle-mini class:", currentIframe.classList.contains("stackle-mini"));

    if (currentIframe.classList.contains("stackle-mini")) {
      console.log("Attempting to send applyMiniCSS message");
      try {
        currentIframe.contentWindow.postMessage("applyMiniCSS", "*");
        console.log("ApplyMiniCSS message sent");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }
}

window.addEventListener("message", stackleLTIResizer, false);