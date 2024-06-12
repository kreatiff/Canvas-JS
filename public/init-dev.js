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

loadJS(
  `${hostUrl}/iframeResizer.min.js`
).then(function () {
  console.log("Resizer loaded");
  iFrameResize({
    log: true,
    heightCalculationMethod: "bodyScroll",
    checkOrigin: false,
  });
  addStackleClass();
});
loadCSS(`${hostUrl}/stackle_canvas.css`);