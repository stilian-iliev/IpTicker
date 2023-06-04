const https = require('https');

function getExternalIP() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.ipify.org',
      path: '/?format=json',
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          const ipAddress = response.ip;
          resolve(ipAddress);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function main() {

  const ipAddress = await getExternalIP();

  console.log(ipAddress);
}

main();
