const addStackleClass = () => {
  // Select all form elements with [data-tool-id*='stackle.app']
  const stackleForms = document.querySelectorAll(
    "form[data-tool-id*='stackle.app']"
  );
  console.log("Stackle Forms:", stackleForms.length);
  // If we found any Stackle forms
  if (stackleForms.length > 0) {
    // Add 'stackle_inside' class to the body
    document.body.classList.add("stackle_inside");
    console.log("Stackle Detected... Added CSS classes");
    // For each Stackle form
    stackleForms.forEach((form) => {
      // Add 'stackle_integration' class to the form
      form.classList.add("stackle_integration");

      // Find the closest parent with class 'tool_content_wrapper'
      const wrapper = form.closest(".tool_content_wrapper");

      if (wrapper) {
       // Find the iframe within this wrapper
         const iframe = wrapper.querySelector('iframe');

        if (iframe) {
           iframe.classList.add("stackle_iframe");
         }
       }
    });
  }
};
function getIFrameThatSentMessage(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}
function receiveMessage(event) {
  if (
    event.origin.includes("stackle.app") ||
    event.origin.includes("stacklehq.com") ||
    event.origin.includes("stackle.test")
  ) {
    currentIframe = getIFrameThatSentMessage(event);
    currentIframe.classList.add("stackle_iframe");
    currentIframe.closest.body.classList.add("stackle_inside");
    console.log(event.data);
  }
}
// event listener for message event
window.addEventListener("message", receiveMessage, false);

// Get the current URL
let currentURL = window.location.href;

loadCSS(`${hostUrl}/stackle_canvas.css`);
if(currentURL.includes("oneschool")) {
  loadCSS(`${hostUrl}/oneschoolglobal_stackle_canvas.css`);   
}

// Check if the URL contains "/edit" or "/speed_grader"
// if (currentURL.includes("/edit") || currentURL.includes("/speed_grader")) {
//   console.log("URL contains /edit or /speed_grader");
// } else {
//   loadJS(`${hostUrl}/iframeResizer.min.js`).then(function () {
//     console.log("Resizer loaded");
//       addStackleClass();
//       let counter = 0;
//       const intervalId = setInterval(() => {
//         iFrameResize(
//           {
//             log: false,
//             heightCalculationMethod: "bodyScroll",
//             checkOrigin: false,
//           },
//           ".stackle_iframe"
//         );
//         counter++;
//         if (counter === 10) {
//           clearInterval(intervalId);
//           console.log("Interval cleared");
//         }
//       }, 1000);
//     });
// }
loadCSS(`${hostUrl}/stackle_canvas.css`);
