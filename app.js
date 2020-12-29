// 先引用 express
const express = require('express')
const app = express()

// 按照官方 npm 文件引入 line chatbot
// https://www.npmjs.com/package/linebot
const linebot = require('linebot');


// 判別開發環境：如果不是 production 模式，就用 dotenv 讀取 .env 檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const linebotParser = bot.parser();

bot.on('message', function (event) {
  // console.log(event);
  // 這樣寫會重複別人的留言內容
  // event.reply(event.message.text)
  //   .then(function (data) {
  //     // success
  //   }).catch(function (error) {
  //     // error
  //   });
  switch (event.message.text) {
    case 'Hi':
      event.reply('別hi了，我都30好幾了，話要說重點！')
      break
    case '你好':
      event.reply('好什麼！老子都不老子了！')
      break
    case '30':
      event.reply('對啦我就30幾了還在想轉職啊，你不一定要很厲害才可以開始，但你不開始就不會很厲害啦！')
      break
  }
});

app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server start')
});