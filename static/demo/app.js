// delete item from data/goodsLists.json
var rf = require("fs");
const path = require('path')

let skus = ['100015627006'];

let filePath = path.resolve(__dirname,'../data/goodsLists.json');

console.log (filePath);

rf.readFile("../data/goodsLists.json", 'utf-8', function (err, data) {
  if (err) {
      console.log("error");
  } else {
      let obj = JSON.parse(data);
      console.log ('length = ' +obj.length);
      let newArr = [];

      let index = 0;
      obj.forEach(element => {
        skus.forEach((item,ix) =>{
          let flag = 0;
          if (element['sku'] == item){
            index++;
            console.log ('delte sku = ' + item);
            console.log (element['商品名称']);
            flag = 1;
          }else if (ix === skus.length-1 && flag!= 1){
            newArr.push(element);
          }
        })
      });
      console.log (newArr.length);

      // console.log (newArr.length);

      rf.writeFile(filePath, JSON.stringify(newArr), {
          encoding: 'utf8'
      }, err => {})
  }
});

// console.log("READ FILE ASYNC END");