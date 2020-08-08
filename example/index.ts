import Bot from '../src/index';
const bot = new Bot();
bot.startWithPassword('tester#****', '***');
bot.on('MESSAGE_CREATE', async (data) => {
  const channelId = data.d.channel_id;
  if (data.d.content === '/image') {
    try {
      await bot.api
        .route(`/channels/${channelId}/messages`)
        .post({ data: { content: 'abcd' }, files: ['./example/IMG_0348.png'] });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
});
