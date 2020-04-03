const Path = require("path");
const fse = require("fs-extra");

class htmlSplitWebpackPlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.compilation.tap("htmlSplitWebpackPlugin", compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync("htmlSplitWebpackPlugin", (data, cb) => {
          var filePath = Path.resolve(compiler.outputPath, Path.dirname(data.outputName));
          var reg = new RegExp("<#--\\s+build:([\\s\\S]*?)\\s+-->([\\s\\S]*?)<#--\\s+endbuild\\s+-->", "ig");
          var content = "";
          var fileName = "";

          data.html = data.html.replace(reg, function(str, a, b) {
            content = b;
            var arr = a.split(":");
            fileName = arr[0];
            if (!fileName) throw new Error("文件名未定义");
            return arr[1] || "";
          });

          if (fileName && content) {
            fse.outputFile(Path.join(filePath, fileName), content, err => {
              if (err) {
                console.error(err);
              }
            });
          }

          cb(null, data);
        }
      );
    });
  }
}

module.exports = htmlSplitWebpackPlugin;
