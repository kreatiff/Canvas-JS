function applyMiniCSS(event) {
  // Check if the data in the event matches "applyMiniCSS"
  if (event.data == "applyMiniCSS" && event.origin == "https://stackle.instructure.com") {
    console.log(event);
    document.body.classList.add("stackle-mini");
    
    // Wait for a short time to ensure CSS changes have been applied
    setTimeout(resizeIframe, 100);
  }
}

function resizeIframe() {
  var body = document.body, html = document.documentElement;
  var height = Math.max(
    body.scrollHeight, 
    body.offsetHeight, 
    html.clientHeight, 
    html.scrollHeight, 
    html.offsetHeight
  ) + 25; // Add 25px padding

  // Send a message to the parent window to resize the frame
  window.parent.postMessage(
    {
      subject: 'lti.frameResize',
      height: height
    },
    '*'
  );

  // Send the current frame URL to the parent window
  window.parent.postMessage({'frameUrl' : location.href}, '*');
}

// Add event listener for messages from other windows
window.addEventListener("message", applyMiniCSS, false);

// Event listener for when the DOM content is fully loaded
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    resizeIframe();
  }
}