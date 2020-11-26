var COS = require('cos-nodejs-sdk-v5');
const join = require('path').join;
const fs = require('fs');
var cos = new COS({
  SecretId: 'AKIDwtibdPJTbwxjEXuKownNJzOXOTHopEaj',
  SecretKey: '0j05sIRr1uWrxX3WQUFjzxg5GAtQyGXX'
});

const upload = () => {
  getJsonFiles(join(process.cwd(), './dist'));
};
let jsonFiles = [];

function findJsonFile(path) {
  let files = fs.readdirSync(path);
  files.forEach(val => {
    let fPath = join(path, val);
    let stat = fs.statSync(fPath);
    console.log(stat)
    if (stat.isDirectory() === true) {
      findJsonFile(fPath);
    }
    if (stat.isFile() === true) {
      jsonFiles.push(fPath);
    }
  })
}

function getJsonFiles(path) {
  findJsonFile(path);
  console.log(jsonFiles)
  jsonFiles.forEach(item => {
    let name = item.replace(join(process.cwd(), './dist'), '');
    console.log(name)
    name = name.replace(/\\/g, '/');
    uploadFile(name, item, () => {

    })
  })

}
;

const uploadFile = (name, localFile, callback = () => {
}) => {
  cos.getObject({
    Bucket: 'croshhhc-1258803790', /* 必须 */
    Region: 'ap-shanghai',    /* 必须 */
    Key: name,              /* 必须 */
    Output: fs.createWriteStream(join(process.cwd(), './.cosCache')),
  }, function(err, data) {
    console.log(err || data);
    cos.putObject({
      Bucket: 'croshhhc-1258803790', /* 必须 */
      Region: 'ap-shanghai',    /* 必须 */
      Key: name,              /* 必须 */
      StorageClass: 'STANDARD',
      Body: fs.readFileSync(localFile), // 上传文件对象
      onProgress: function (progressData) {
      }
    }, function (err, data) {
      if (err) {
        console.log('eeeeee',err);
      }
      if (data) {
        callback();
      }
    });
  });
};


module.exports = upload;
