import Bot from '../src/index';
const bot = new Bot();
bot.start('');
bot.on('DISPATCH', (data) => {
  console.log(data);
});
