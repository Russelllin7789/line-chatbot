// 先引用 express
const express = require('express')
const app = express()

// 引入get-json套件以解析資料
const getJSON = require('get-json')

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
app.post('/', linebotParser);

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
    case ('Hi'):
      event.reply('別嗨了，我都30好幾了，很難嗨！')
      break
    case ('hi'):
      event.reply('別嗨了，我都30好幾了，很難嗨！')
      break
    case ('hello'):
      event.reply('別嗨了，我都30好幾了，很難嗨！')
      break
    case ('Hello'):
      event.reply('別嗨了，我都30好幾了，很難嗨！')
      break
    case '你好':
      event.reply('好什麼！老子都不老子了！')
      break
    case '30':
      event.reply('30幾了就是要轉職啊，你不一定要很厲害才可以開始，但你不開始就不會變厲害啦！')
      break
    // default:
    //   event.reply('欸說個秘密，你/妳打什麼我看不懂：）')
  }
});

// 增加對特定使用者的回覆
bot.on('message', function (event) {
  console.log(event)
  let userId = event.source.userId
  if (userId = 'U35f8f5afe85fd30a7b262492f96c2f98') {
    setTimeout(() => {
      const autoMsg = '記得勸林瑋豪別再耍廢了！'
      bot.push(userId, autoMsg)
      console.log('send:', autoMsg)
    }, 3000)
  }
})

// 增加功能性的互動
let timer = ''
let pm = []
// 引入開放資料庫的資料，並每半小時 update data
getPmData()

function getPmData() {
  clearTimeout(timer)
  getJSON('https://data.epa.gov.tw/api/v1/aqx_p_02?offset=0&limit=1000&api_key=5a9eada2-2c36-45cc-834b-1d9235d672b8', function (error, response) {
    if (response) {
      const { records } = response
      pm = [...records]
      console.log(pm)
    }
    return console.log('error:', error)
  })
  timer = setInterval(getPmData, 1800000)
}

bot.on('message', function (event) {
  if (event.message.type === 'text') {
    console.log(event)
    let msg = event.message.text
    let reply = ''

    pm.forEach(item => {
      if (item.Site === msg) {
        reply = `現在${msg}的 PM 2.5 約為 ${item.PM25} 喔～ `
      }
    })
    if (reply === '') {
      reply = '沒這個地方的資料喔QAQ"'
    }
    event.reply(reply)
      .then(() => {
        console.log(reply)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return
})

// 增加特殊形式（圖文/按鈕）的互動
bot.on('sticker', function (event) {
  if (event.message.type === 'sticker') {
    console.log(event)
  }
  let reply = {
    type: sticker,
    packageId: 11539,
    stickerId: 52114136
  }
  event.reply(JSON.stringify(reply))
    .then(() => {
      console.log(reply)
    })
    .catch((error) => {
      console.log('error:', error)
    })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Express server start')
});