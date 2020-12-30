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
  console.log(event);
  // 這樣寫會重複別人的留言內容
  // event.reply(event.message.text)
  //   .then(function (data) {
  //     // success
  //   }).catch(function (error) {
  //     // error
  //   });
  switch (event.message.text) {
    case ('Hi' || 'hi' || 'hello'):
      event.reply('別hi了，我都30好幾了，話要說重點！')
      break
    case '你好':
      event.reply('好什麼！老子都不老子了！')
      break
    case '30':
      event.reply('30幾了就是要轉職啊，你不一定要很厲害才可以開始，但你不開始就不會變厲害啦！')
      break
    default:
      event.reply('欸說個秘密，你/妳打什麼我看不懂：）')
  }
  // 增加特殊形式的互動
});

bot.on('message', function (event) {
  console.log(event)
  // 增加對特定使用者的回覆
  const userId = event.source.userId
  if (userId = 'U35f8f5afe85fd30a7b262492f96c2f98') {
    setTimeout(() => {
      const autoMsg = '林瑋豪別再懶惰了！'
      bot.push(autoMsg)
      console.log('send:', autoMsg)
    }, 3000)
  }
})

app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server start')
});