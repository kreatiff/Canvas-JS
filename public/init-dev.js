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
  `https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js`
).then(function () {
  console.log("Resizer loaded");
  iFrameResize({
    log: false,
    heightCalculationMethod: "max",
    checkOrigin: false,
  });
  addStackleClass();
});
// DesignTools config as a function
// *****************************************

DT_variables = {
  iframeID: "",
  // Path to the hosted USU Design Tools
  path: "https://designtools.ciditools.com/",
  templateCourse: "154",
  // OPTIONAL: Button will be hidden from view until launched using shortcut keys
  hideButton: false,
  // OPTIONAL: Limit by course format
  limitByFormat: false, // Change to true to limit by format
  // adjust the formats as needed. Format must be set for the course and in this array for tools to load
  formatArray: ["online", "on-campus", "blended"],
  // OPTIONAL: Limit tools loading by users role
  limitByRole: false, // set to true to limit to roles in the roleArray
  // adjust roles as needed
  roleArray: ["student", "teacher", "admin"],
  // OPTIONAL: Limit tools to an array of Canvas user IDs
  limitByUser: false, // Change to true to limit by user
  // add users to array (Canvas user ID not SIS user ID)
  userArray: [],
  // OPTIONAL: Relocate Ally alternative formats dropdown and hide heading
  overrideAllyHeadings: false,
  // OPTIONAL: Make assignment rubrics sortable
  sortableRubrics: false,
  // OPTIONAL: Transform people page ina course to show student cards
  showStudentCards: false,
};

// DesignPLUS config as a function
// *****************************************

DpPrimary = {
  dbRequestUri: "https://apac.multitool.ciditools.com/dp/action.php",
  lms: "canvas",
  templateCourse: "18106",
  hideButton: false,
  hideLti: false,
  extendedCourse: "", // added in sub-account theme
  sharedCourse: "", // added from localStorage
  courseFormats: [],
  canvasRoles: [],
  canvasUsers: [],
  canvasCourseIds: [],
  plugins: [],
  excludedModules: [],
  includedModules: [],
  lang: "en",
  defaultToLegacy: false,
  enableVersionSwitching: true,
  hideSwitching: false,
};

// merge with extended/shared customizations config
DpConfig = { ...DpPrimary, ...(window.DpConfig ?? {}) };
$(function () {
  const uriPrefix = location.href.includes(".beta.") ? "beta." : "";
  const toolsUri = DpConfig.toolsUri
    ? DpConfig.toolsUri
    : `https://${uriPrefix}designplus.ciditools.com/`;
  $.getScript(`${toolsUri}js/controller.js`);
});

loadCSS(`${hostUrl}/stackle_canvas.css`);
loadCSS(`${hostUrl}/cdls.css`);
loadJS(`${hostUrl}/cdls_content.js?v=${datestamp}`);
loadJS(`${hostUrl}/cdls_controller.js?v=${datestamp}`);
loadJS(`${hostUrl}/cdls_138.js?v=${datestamp}`);
