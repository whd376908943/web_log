
var Client = require('ssh2').Client;

var conn = new Client();

exports.ssh = function(){
  return new Promise((resolve,reject)=>{

conn.once('ready', function() {
  console.log('inner ssh')
  // tail命令无-f参数时会触发close,有则不会
  conn.exec('tail -20f /data/tomcat/logs/catalina.out', function(err, stream) {
    if (err) throw err;
    stream.on('close', function(code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', function(data) {
      resolve(data);
    }).stderr.on('data', function(data) {
      reject(data);
    });
  });
}).connect({
  host: '',
  port: ,
  username: '',
  password: ''
});

});
}
