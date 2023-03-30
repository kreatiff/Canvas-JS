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


document.addEventListener('DOMContentLoaded', () => {
    // Define the function to check for Stackle in the iframe
    const checkForStackleInIframe = (iframe) => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeElements = iframeDocument.querySelectorAll('*');
        for (let i = 0; i < iframeElements.length; i++) {
            if (iframeElements[i].textContent.toLowerCase().includes('stackle')) {
                iframe.closest('.ui-dialog').classList.add('stackle_module');
                break;
            }
        }
    }

    // Define the observer and configure it to watch for the resource_selection_iframe element
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const iframe = document.getElementById('resource_selection_iframe');
                if (iframe) {
                    observer.disconnect();
                    const iframeObserver = new MutationObserver((iframeMutationsList) => {
                        for (let iframeMutation of iframeMutationsList) {
                            if (iframeMutation.type === 'childList') {
                                checkForStackleInIframe(iframe);
                            }
                        }
                    });
                    iframeObserver.observe(iframe.contentDocument || iframe.contentWindow.document.body, {
                        childList: true,
                        subtree: true
                    });
                    break;
                }
            }
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
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