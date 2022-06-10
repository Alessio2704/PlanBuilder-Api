const fs = require("fs");
const path = require("path");

const removeImage = function(directory,filename) {
  fs.unlink(path.join(directory, filename), err => {
    if (err) throw err;
  });
};

exports.removeImage = removeImage