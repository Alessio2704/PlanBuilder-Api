const fs = require("fs");
const path = require("path");

const removeImages = function(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      });
};

exports.removeImages = removeImages