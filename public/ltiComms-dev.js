function applyMiniCSS(event) {
  if (
    event.data == "applyMiniCSS" &&
    event.origin == "https://stackle.instructure.com"
  ) {
    console.log(event);
    document.body.classList.add("stackle-mini");

    // Wait for a short time to ensure CSS changes have been applied
    setTimeout(resizeIframe, 100);
  }
}

function resizeIframe() {
  // Find the main content container
  const contentContainer = document.querySelector("#embed-wrapper");

  if (contentContainer) {
    // Get the height of the content container
    const height = contentContainer.offsetHeight + 25; // Add 25px padding

    // Send a message to the parent window to resize the frame
    window.parent.postMessage(
      {
        subject: "lti.frameResize",
        height: height,
      },
      "*"
    );
  }
}

// Add event listener for messages from other windows
window.addEventListener("message", applyMiniCSS, false);

// Event listener for when the DOM content is fully loaded
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    resizeIframe();
    // Send the current frame URL to the parent window
    window.parent.postMessage({ frameUrl: location.href }, "*");
  }
};

// Additional resize listener to handle dynamic content changes
//window.addEventListener("resize", resizeIframe);
