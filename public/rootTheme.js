////////////////////////////////////////////////////
// Javascript Loader                              //
////////////////////////////////////////////////////

const loadJS = (FILE_URL, async = true, type = "text/javascript") => {
  return new Promise((resolve, reject) => {
    try {
      const scriptEle = document.createElement("script");
      scriptEle.type = type;
      scriptEle.async = async;
      scriptEle.src = FILE_URL;

      scriptEle.addEventListener("load", (ev) => {
        resolve({ status: true });
      });

      scriptEle.addEventListener("error", (ev) => {
        reject({
          status: false,
          message: `Failed to load the script ${FILE_URL}`,
        });
      });

      document.head.appendChild(scriptEle);
    } catch (error) {
      reject(error);
    }
  });
};

////////////////////////////////////////////////////
// END Javascript Loader                          //
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// CSS Loader                                     //
////////////////////////////////////////////////////

const loadCSS = (filename) => {
  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);

  document.getElementsByTagName("head")[0].appendChild(fileref);
};

const hostUrl = "https://cdn.jsdelivr.net/gh/kreatiff/Canvas-JS@dev";
const datestamp = Date.now();

////////////////////////////////////////////////////
// END CSS Loader                                 //
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// Load External Files                            //
////////////////////////////////////////////////////

loadJS(`${hostUrl}/init.js?v=${datestamp}`).then(
  console.log("Initializer loaded!")
);

////////////////////////////////////////////////////
// END Load External Files                        //
////////////////////////////////////////////////////
