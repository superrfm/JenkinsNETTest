
var check = require('syntax-error');
var path = require('path');

var walkSync = function (dir) {

    var error = false;

    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);

    files.forEach(function (file) {
        if (fs.statSync(dir + file).isDirectory()) {
            error = walkSync(dir + file + '/');
        }
        else {
            if (!file.endsWith(".js")) return;
            let fullPath = path.join(dir, file);
            var src = fs.readFileSync(fullPath);
            var err = check(src, file);
            if (err) {
                console.error(fullPath);
                error = true;
                console.error(err);
                console.error(Array(76).join('-'));
            }
        }
    });


    return error;
};

var error = walkSync('./JenkinsNETWeb3/app/');

if (error) process.exit(1);