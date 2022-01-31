require("dotenv").config()
process.env["NTBA_FIX_319"] = 1
// import fetch from "node-fetch";
const fetch = require("cross-fetch")
const express = require("express")
const TelegramBot = require("node-telegram-bot-api")
const fs = require("fs")

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })
const app = express()
const path = require("path")
app.use(express.static(path.join(__dirname, "public")))
// Matches "/echo [whatever]"
bot.onText(/\/(.+)/, async (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const chatId = msg.chat.id
    const resp = match[1] // the captured "whatever"
    // console.log(resp);
    // send back the matched "whatever" to the chat
    return bot.sendMessage(chatId, resp)
})

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
    const chatId = await msg.chat.id
    if (msg.text === "/start") {
        await bot.sendMessage(chatId, "Hi " + msg.chat.username)
    }
    const text = msg.text
    console.log(text)
    if (
        text.startsWith(
            "https://www.chegg.com/homework-help/questions-and-answers"
        )
    ) {
        console.log("greattt")
    }
    try {
        if (text.startsWith("http://companyofmarket.herokuapp.com")) {
            const response = await fetch(text)
            const movies = await response.text()
            // fs.writeFileSync("brainly.txt", "Mrityunjay")
            fs.writeFile("brainly.html", movies, function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log("The file was saved!")
            })
            console.log(movies)
        }
    } catch (e) {
        console.log(e)
    }
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, "Received your message")
})
