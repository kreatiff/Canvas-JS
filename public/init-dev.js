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

const desiredDomain = 'staging.stackle.app';

// Define the configuration for the MutationObserver
const observerConfig = {
    childList: true,
    subtree: true
};

// Define the callback function for the MutationObserver
const observerCallback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const addedNodes = mutation.addedNodes;
            for (let i = 0; i < addedNodes.length; i++) {
                const addedNode = addedNodes[i];
                if (addedNode.nodeName.toLowerCase() === 'iframe' && addedNode.contentWindow.location.hostname === desiredDomain) {
                    console.log('The iframe requested ' + desiredDomain);
                    observer.disconnect();
                    return;
                }
            }
        }
    }
};

// Create a new MutationObserver object
const observer = new MutationObserver(observerCallback);

// Start observing changes to the DOM
observer.observe(document.documentElement, observerConfig);



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