function detectStackleIframe(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
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
    
    // Check if frameElement exists and document is ready
    if (window.frameElement) {
      if (document.readyState === 'complete') {
        processFrame();
      } else {
        window.addEventListener('load', processFrame);
      }
    } else {
      console.log("No frameElement found");
    }

    // Remove event listener after processing
    window.removeEventListener("message", stackleLTIResizer, false);
  }
}

function processFrame() {
  try {
    if (window.frameElement.classList && window.frameElement.classList.contains('stackle-mini')) {
      console.log(window.frameElement);
      
      // Check if contentWindow is accessible before sending message
      if (window.frameElement.contentWindow) {
        window.frameElement.contentWindow.postMessage("applyMiniCSS", "*");
        console.log("Applying mini CSS to parent iframe");
      }
      
      // Check if currentIframe exists and has contentWindow before sending message
      if (currentIframe && currentIframe.contentWindow) {
        currentIframe.contentWindow.postMessage("applyMiniCSS", "*");
        console.log("Applying mini CSS");
      }
    } else {
      console.log("No stackle-mini class found");
    }
  } catch (error) {
    console.log("Error processing frame:", error);
  }
}

// Add event listener
window.addEventListener("message", stackleLTIResizer, false);