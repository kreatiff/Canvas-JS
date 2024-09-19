const addStackleClass = () => {
  // Get the container element with class "tool_content_wrapper"
  const container = document.querySelector(".tool_content_wrapper");

  // Check if the container has a child element with attribute "data-tool-id" equal to "staging.stackle.app"
  if (container !== null) {
    const hasStackleIntegration =
      container.querySelector("[data-tool-id*='stackle.app']") !== null;

    // If the container has a child element with attribute "data-tool-id" equal to "staging.stackle.app",
    // add a class "stackle_integration" to the container element
    if (hasStackleIntegration) {
      document.body.classList.add("stackle_inside");
      container.classList.add("stackle_integration");
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
    // Do something here
    console.log('URL contains /edit or /speed_grader');
    // Add your desired action here
} else {
  loadJS(
    `${hostUrl}/iframeResizer.min.js`
  ).then(function () {
    console.log("Resizer loaded");
    let counter = 0;
    const intervalId = setInterval(() => {
      //console.log("Running function...");
      iFrameResize({
        log: false,
        heightCalculationMethod: "bodyScroll",
        checkOrigin: false
      });
      counter++;
      if (counter === 10) {
        clearInterval(intervalId);
      }
    }, 1000);
    addStackleClass();
  });
}


loadCSS(`${hostUrl}/stackle_canvas.css`);