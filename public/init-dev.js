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
    
    // Ensure currentIframe exists before proceeding
    if (!currentIframe) {
      console.log("No matching iframe found");
      return;
    }

    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');
    
    // Function to handle the mini CSS application
    const applyMiniCSS = () => {
      try {
        const hasFrameElementMini = window.frameElement && 
                                  window.frameElement.classList && 
                                  window.frameElement.classList.contains('stackle-mini');
        const hasCurrentIframeMini = currentIframe && 
                                   currentIframe.classList && 
                                   currentIframe.classList.contains('stackle-mini');

        if (hasFrameElementMini || hasCurrentIframeMini) {
          console.log("Found stackle-mini class");

          // Apply to frame element if it exists
          if (hasFrameElementMini && window.frameElement.contentWindow) {
            window.frameElement.contentWindow.postMessage("applyMiniCSS", "*");
            console.log("Applying mini CSS to parent iframe");
          }

          // Apply to current iframe
          if (currentIframe.contentWindow) {
            currentIframe.contentWindow.postMessage("applyMiniCSS", "*");
            console.log("Applying mini CSS to current iframe");
          }
        } else {
          console.log("No stackle-mini class found");
        }
      } catch (error) {
        console.error("Error applying mini CSS:", error);
      }
    };

    // If document is still loading, wait for it to complete
    if (document.readyState !== 'complete') {
      window.addEventListener('load', applyMiniCSS);
    } else {
      // Document is already loaded, execute immediately
      applyMiniCSS();
    }
  }
}

// Remove any existing listeners before adding a new one
window.removeEventListener("message", stackleLTIResizer, false);
// Add event listener
window.addEventListener("message", stackleLTIResizer, false);