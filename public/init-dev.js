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
    let checkCount = 0;
    const checkInterval = setInterval(() => {
      console.log("Checking for stackle-mini class...");
      document.onreadystatechange = function () {
        if (document.readyState == "complete") {
          console.log("Parent iframe ready");
          if (window.frameElement && window.frameElement.classList.contains('stackle-mini') &&) {
            console.log(window.frameElement);
            window.frameElement.contentWindow.postMessage("applyMiniCSS", "*");
            console.log("Applying mini CSS to parent iframe");
            currentIframe.contentWindow.postMessage("applyMiniCSS", "*");
            console.log("Applying mini CSS");
            clearInterval(checkInterval);
          }else{
            checkCount++;
            if (checkCount >= 10) { // Stop checking after 10 attempts
              console.log("Class check timed out");
              clearInterval(checkInterval);
            }
          }
        }
      };
    }, 200); // Check every 200ms
  }
}
// event listener for message event
window.addEventListener("message", stackleLTIResizer, false);
