// const { assert } = require('chai');
const TelegramBot = require('..');
const { Command } = TelegramBot.handlers;
let bot;

describe('TelegramBot', () => {
  it('can be constructed', (done) => {
    bot = new TelegramBot({ token: process.env.TGBOT_TESTBOT, log: null });
    done();
  });

  it('can register handlers', (done) => {
    bot.register(new Command('start', (data) => console.log(data.text)));
    done();
  });

  it('can handle a fake http body', (done) => {
    bot.handle('{ "text": "Hello there!" }', bot.apiUrl, bot.route, {
      end: () => {}
    });
    done();
  });
});
