const http = require('http');
const foprmidable = require('formidable');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = http.createServer((req, res) => {
  if (req.url == '/fileupload') {
    var form = new foprmidable.IncomingForm();
    form.uploadDir = 'sorce/'
    form.parse(req, function (err, fields, files) {
      const oldpath = files.filetoupload.path;
      const newpath = 'sorce/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
})

app.listen(port, () => {
    console.log(`sarver raunning at port ${port}`)
})