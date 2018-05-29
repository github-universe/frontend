const express = require('express')
const path = require('path')
const app = express()
var fs=require("fs");

app.use(express.static(path.join(__dirname, 'dist')))
app.get("*", function(request, response) {
  fs.readFile("./dist/index.html",function(err,data){
    // body
    console.log(data);
    if(err){
      console.log(err);
      //404：NOT FOUND
      response.writeHead(404,{"Content-Type":"text/html"});
    }
    else{
      //200：OK
      response.writeHead(200,{"Content-Type":"text/html"});
      response.write(data.toString());
    }
    response.end();
  });
});
app.listen(8080, () => {
  console.log(`App listening at port http://localhost:8080`)
})