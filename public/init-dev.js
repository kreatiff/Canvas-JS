const addStackleClass = () => {
  // Select all elements with [data-tool-id*='stackle.app']
  const stackleElements = document.querySelectorAll("[data-tool-id*='stackle.app']");

  // If we found any Stackle elements
  if (stackleElements.length > 0) {
    // Add 'stackle_inside' class to the body
    document.body.classList.add("stackle_inside");

    // For each Stackle element
    stackleElements.forEach(element => {
      // Add 'stackle_integration' class
      element.classList.add("stackle_integration");

      // Find and add 'stackle_iframe' class to all iframes inside this element
      const iframes = element.querySelectorAll("iframe");
      iframes.forEach(iframe => {
        iframe.classList.add("stackle_iframe");
      });
    });

    console.log("Stackle Detected... Added CSS classes");
  }
};
addStackleClass();
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
  });
}


loadCSS(`${hostUrl}/stackle_canvas.css`);