const os = require('os');

function getLocalIP() {
  // os.networkInterfaces()方法返回一个对象,包含只有被赋予网络地址的网络接口.
  const networkInterfaces = os.networkInterfaces();
  let ip = '127.0.0.1';

  for (const networkKey in networkInterfaces) {
      const network = networkInterfaces[networkKey];
      // 每个网络地址是一个包含了ipv4和ipv6地址的数组
      network.forEach(item => {
          if (item.family === 'IPv4' && item.address !== '127.0.0.1' && !item.internal) {
              ip = item.address;
          }
      });
  }

  return ip;
}

module.exports = {
  getLocalIP
}