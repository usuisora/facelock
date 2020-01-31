const faceapi = require('face-api.js');
console.log(faceapi.nets);
await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models')
