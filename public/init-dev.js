function checkForStackleIntegration() {
    // Get the container element with class "tool_content_wrapper"
    const container = document.querySelector(".tool_content_wrapper");

    // Check if the container has a child element with attribute "data-tool-id" equal to "staging.stackle.app"
    const hasStackleIntegration = container.querySelector("[data-tool-id='staging.stackle.app']") !== null;

    // If the container has a child element with attribute "data-tool-id" equal to "staging.stackle.app",
    // add a class "stackle_integration" to the container element
    if (hasStackleIntegration) {
        container.classList.add("stackle_integration");
    }
}
// Call the function to run the code


loadJS(
    `https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js`
).then(function () {
    console.log("Resizer loaded");
    iFrameResize({
        log: false,
        heightCalculationMethod: "max",
        checkOrigin: false
    }).then(function () {
        checkForStackleIntegration();
    });
});

loadCSS(`${hostUrl}/stackle_canvas.css`);