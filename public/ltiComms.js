// Function to dynamically load a CSS file
const loadCSS = (filename) => {
  // Create a new link element
  var fileref = document.createElement("link");
  
  // Set attributes for the link element
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);

  // Append the link element to the head of the document
  document.getElementsByTagName("head")[0].appendChild(fileref);
};
const checkIframeSize = (wrapperElement) => {
  // Calculate the maximum height of the document
  if (wrapperElement == "") {
  var body = document.body, html = document.documentElement;
  var height = Math.max(
    body.scrollHeight, 
    body.offsetHeight, 
    html.clientHeight, 
    html.scrollHeight, 
    html.offsetHeight
  ) + 25; // Add 25px padding
  } else {
    wrapperElement = document.getElementById(wrapperElement);
    var height = wrapperElement.scrollHeight+25;
  }
  // Send a message to the parent window to resize the frame
  window.parent.postMessage(
    {
      subject: 'lti.frameResize',
      height: height
    },
    '*'
  );

// Define the host URL for loading resources
const hostUrl = "https://canvas-js.s3.ap-southeast-2.amazonaws.com/public";

// Function to apply mini CSS if the origin matches
function applyMiniCSS(event) {
  // Check if the data in the event matches "applyMiniCSS"
  if (event.data == "applyMiniCSS" && event.origin == "https://stackle.instructure.com") {
  //{
    console.log(event);
    // Load the CSS file from the specified URL
    document.body.classList.add("stackle-mini");
    //loadCSS(`${hostUrl}/osg_stackle_canvas.css`);
    checkIframeSize("embed-wrapper");
  }
}

// Add event listener for messages from other windows
window.addEventListener("message", applyMiniCSS, false);



  // Send the current frame URL to the parent window
  window.parent.postMessage({'frameUrl' : location.href}, '*');

}

document.addEventListener('DOMContentLoaded', checkIframeSize(""), false);