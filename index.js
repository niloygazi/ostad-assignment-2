const http = require('http');
const fs = require('fs');
const url = require('url');
const multer = require('multer');

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;

  if (path === '/') 
  {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Home Page');
    res.end();
  } 
  
  else if (path === '/about') 
  {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is About Page');
    res.end();
  } 
  
  else if (path === '/contact') 
  {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Contact Page');
    res.end();
  } 
  else if (path === '/file-write') 
  {
    fs.writeFile('demo.txt', 'hello world', (err) => {
      if (err) 
      {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Something Went Wrong');
      } 
      else 
      {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('File created');
      }
      res.end();
    });
  } 
  
  else if (path === '/uploads') 
  {
    upload(req, res, function (error) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("File Upload Fail");
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("File Upload Success");
      }
    });
  } 
  
  else 
  {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, './uploads');
  },
  filename: function (req, file, callBack) {
    callBack(null, file.originalname);
  }
});

// Multer configuration for file uploads with renamed variables
const upload = multer({ storage }).single('myFile');

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
