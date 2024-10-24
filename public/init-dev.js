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
    
    // Check for class multiple times over a short period
    let checkCount = 0;
    const checkInterval = setInterval(() => {
      console.log("Checking for stackle-mini class...");
      if (currentIframe.classList.contains("stackle-mini")) {
        console.log("Found stackle-mini class!");
        currentIframe.contentWindow.postMessage("applyMiniCSS", "*");
        console.log("Applying mini CSS");
        clearInterval(checkInterval);
      } else {
        checkCount++;
        if (checkCount >= 10) { // Stop checking after 10 attempts
          console.log("Class check timed out");
          clearInterval(checkInterval);
        }
      }
    }, 100); // Check every 100ms
  }
}

window.addEventListener("message", stackleLTIResizer, false);