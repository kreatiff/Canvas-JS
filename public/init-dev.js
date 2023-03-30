const addStackleClass = () => {
    // Get the container element with class "tool_content_wrapper"
    const container = document.querySelector(".tool_content_wrapper");

    // Check if the container has a child element with attribute "data-tool-id" equal to "staging.stackle.app"
    const hasStackleIntegration = container.querySelector("[data-tool-id*='stackle.app']") !== null;

    // If the container has a child element with attribute "data-tool-id" equal to "staging.stackle.app",
    // add a class "stackle_integration" to the container element
    if (hasStackleIntegration) {
        container.classList.add("stackle_integration");
        console.log("Stackle Detected... Adding CSS class");
    }
};
// Call the function to run the code
const detectStackleModule = () => {
    const dialogContainers = document.querySelectorAll('.ui-dialog');
    for (let i = 0; i < dialogContainers.length; i++) {
        const childElements = dialogContainers[i].querySelectorAll('*');
        for (let j = 0; j < childElements.length; j++) {
            if (childElements[j].textContent.toLowerCase().includes('stackle')) {
                dialogContainers[i].classList.add('stackle_module');
                console.log("Stackle Module Detected... Adding CSS class to dialog");
                break;
            }
        }
    }
};
// Call the function to run the code

// Define the observer and configure it to watch for child element additions to the document body
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log("Dialog window openning!")
            checkForStackleInDialogs();
        }
    }
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

loadJS(
    `https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js`
).then(function () {
    console.log("Resizer loaded");
    iFrameResize({
        log: false,
        heightCalculationMethod: "max",
        checkOrigin: false
    });
    addStackleClass();
});

loadCSS(`${hostUrl}/stackle_canvas.css`);