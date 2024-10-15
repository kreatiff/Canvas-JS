const addStackleClass = () => {
  // Get the container element with class "tool_content_wrapper"
  const container = document.querySelector(".tool_content_wrapper");

  // Check if the container has a child element with attribute "data-tool-id" equal to "staging.stackle.app"
  if (container !== null) {
    hasStackleIntegration =
      container.querySelector("[data-tool-id*='stackle.app']") !== null;
    stackleIframe = hasStackleIntegration.querySelector("iframe") !== null;
    // If the container has a child element with attribute "data-tool-id" equal to "staging.stackle.app",
    // add a class "stackle_integration" to the container element
    if (hasStackleIntegration) {
      document.body.classList.add("stackle_inside");
      container.classList.add("stackle_integration");
      stackleIframe.classList.add("stackle_iframe");
      console.log("Stackle Detected... Adding CSS classes");
    }
  }
};

loadJS(`${hostUrl}/moduleWindowFix.js`).then(function () {
  console.log("Stackle Module Fix loaded");
});

// Get the current URL
let currentURL = window.location.href;

// Check if the URL contains "/edit" or "/speed_grader"
if (currentURL.includes('/edit') || currentURL.includes('/speed_grader')) {
    console.log('URL contains /edit or /speed_grader');
} else {
  loadJS(
    `${hostUrl}/iframeResizer.min.js`
  ).then(function () {
    console.log("Resizin only stackle iframes");
    let counter = 0;
    const intervalId = setInterval(() => {
      iFrameResize({
        log: false,
        heightCalculationMethod: "bodyScroll",
        checkOrigin: false
      }, '.stackle_iframe');
      counter++;
      if (counter === 10) {
        clearInterval(intervalId);
      }
    }, 1000);
    addStackleClass();
  });
}


loadCSS(`${hostUrl}/stackle_canvas.css`);