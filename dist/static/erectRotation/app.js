const fs = require('fs');
const path = require('path');
const url = path.join(__dirname);

console.log(url);

fs.readdir(url, 'utf8', (err, fileList) => {
  if (err) throw err;
  fileList.forEach((item, index) => {
    let length = item.split('.').length;
    //获取文件后缀名
    let type = '.' + item.split('.')[length - 1];
    if (type != '.js') {
      let oldName = '\\' + item;
      //新名称,根据需求修改名称，可以使用正则等等
      let newName = index + type;
      fs.rename(url + oldName, url + newName, (err) => {
        throw err;
      });
    }
  })
})
