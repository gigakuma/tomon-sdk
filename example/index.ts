import Client from '../src/index';
const client = new Client();
client.start('');
client.on('DISPATCH', (data) => {
  console.log(data);
});
