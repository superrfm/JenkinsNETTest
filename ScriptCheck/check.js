
var check = require('syntax-error');
var path = require('path');

var error = false;

async function checkfiles (dir) {

    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);

    await Promise.all(files.map(async (file) => {
        if (fs.statSync(dir + file).isDirectory()) {
            checkfiles(dir + file + '/');
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

    }));

};


async function processar() {
    await process.argv.forEach(async (val, index) => {
        if (index > 1)
            await checkfiles(val);
    });
}

var result = processar();
result.then(() => {
    if (error) process.exit(1);
});


