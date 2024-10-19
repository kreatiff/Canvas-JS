let isResizing = false;
let miniApplied = false;

function applyMiniCSS(event) {
  if (event.data == "applyMiniCSS" && event.origin == "https://stackle.instructure.com" && !miniApplied) {
    console.log(event);
    document.body.classList.add("stackle-mini");
    miniApplied = true;
    
    // Wait for a short time to ensure CSS changes have been applied
    setTimeout(resizeIframe, 100);
  }
}

function resizeIframe() {
  if (isResizing) return;
  isResizing = true;

  var body = document.body, html = document.documentElement;
  var height = Math.max(
    body.scrollHeight, 
    body.offsetHeight, 
    html.clientHeight, 
    html.scrollHeight, 
    html.offsetHeight
  ) + 25; // Add 25px padding

  // Send a message to the parent window to resize the frame
  window.parent.postMessage(
    {
      subject: 'lti.frameResize',
      height: height
    },
    '*'
  );

  // Send the current frame URL to the parent window
  window.parent.postMessage({'frameUrl' : location.href}, '*');

  setTimeout(() => { isResizing = false; }, 50);
}

// Add event listener for messages from other windows
window.addEventListener("message", applyMiniCSS, false);

// Event listener for when the DOM content is fully loaded
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    resizeIframe();
  }
}

// Add a mutation observer to detect changes in the DOM
const observer = new MutationObserver(debounce(resizeIframe, 250));
observer.observe(document.body, { 
  childList: true, 
  subtree: true, 
  attributes: true, 
  characterData: true 
});

// Debounce function to limit how often resizeIframe is called
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}