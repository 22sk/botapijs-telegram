# Framework for the Telegram Bot API
see Telegram's [introduction](https://core.telegram.org/bots/) and
[documentation](https://core.telegram.org/bots/api) for Telegram Bots

[![npm](https://img.shields.io/npm/v/bot22api-telegram.svg?style=flat-square)](https://www.npmjs.com/package/bot22api-telegram)
[![npm](https://img.shields.io/npm/l/bot22api-telegram.svg?style=flat-square)](https://www.npmjs.com/package/bot22api-telegram)
[![npm](https://img.shields.io/npm/dt/bot22api-telegram.svg?style=flat-square)](https://www.npmjs.com/package/bot22api-telegram)
[![GitHub stars](https://img.shields.io/github/stars/22sk/botapijs-telegram.svg?style=social&label=Star)](https://github.com/22sk/botapijs-telegram)

Documentation: https://22sk.github.io/botapijs-telegram

### Core

This module is based on **[bot22api]**. If you want to create such bot for
another bot API, you should use that instead, since this module contains
Telegram-related features.

```javascript
const telegram22api = require('bot22api-telegram');
const { TelegramBot } = telegram22api;
const { Command } = telegram22api.handlers;
const { Manual } = telegram22api.manuals;

const bot = new TelegramBot({
  token: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
});

bot.register(new Command({
  name: 'echo',
  callable: (done, { data, processor, params }) => {
    console.log(data);
    processor.send('sendMessage', {
      text: params.command.args,
      chat_id: data.message.chat.id
    });
    done();
  },
  manual: new Manual({
    description: 'Parrot command. Pretty boring though.',
    explanation: 'Prints whatever you tell this command.',
    syntax: '<squee>'
  })
}));

bot.register(new Command('hello', (done, { processor, data }) => {
  processor.send('sendMessage', {
    text: 'Hey!',
    chat_id: data.chat.id
  })
}, new Manual({ description: 'Says hey' })));


bot.listen(3000, 'localhost');
```

## installation
```
npm install bot22api-telegram
```


## getting started

You should understand the module this Telegram-specified framework depends on,
so I suggest reading this first: [botapijs]
and its [Docs][botapijs-docs]

So to get started, firstly require the module and define the classes.
```javascript
const telegram22api = require('bot22api-telegram');
const { TelegramBot } = telegram22api;
const { Command } = telegram22api.handlers;
const { Manual } = telegram22api.manuals;
```

### TelegramBot <sub>**[/docs/][TelegramBot]**</sub>
extends **Bot** <sub>**[/docs/][Bot]**</sub>

To create a new Telegram bot, call its constructor.
```javascript
const bot = new TelegramBot({
  token: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
});
```

Now that you have a Bot object, you need to register so-called Handlers using
the Bot's register method. Each Callable (Handler or Requirement) must have a
unique name. Read more [here][botapijs].

#### Bot#register <sub>[/docs/][Bot#register]</sub>

```javascript
bot.register(handler);
```

### Command <sub>[/docs/][Command]</sub>
extends **Handler** <sub>**[/docs/][Handler]**</sub>

Command is a special Handler that was made to handle only a specific command.
It automatically requires preset Requirements that make sure the message's
command equals the Command Handler's command. It also seperates the message to
multiple pieces that can be accessed using `params.command`. Read more about
Requirement params
[here](https://22sk.github.io/botapijs/Requirement.html#~done).

```javascript
bot.register(new Command({
  name: 'echo',
  callable: (done, { data, processor, params }) => {
    console.log(data);
    processor.send('sendMessage', {
      text: params.command.args,
      chat_id: data.message.chat.id
    });
    done();
  },
  manual: new Manual({
    description: 'Parrot command. Pretty boring though.',
    explanation: 'Prints whatever you tell this command.',
    syntax: '<squee>'
  })
}));
```

### Manual <sub>[/docs/][Manual]</sub>

The Manual class was made to use with the Command class. Every Command has an
own documentation in terms of a Manual object. It is used to generate the help
page by the [default][defaults] command `/help`.

```javascript
Manual {
  command: string,     // e.g. 'echo'
  syntax: string,      // e.g. '<text>'
  description: string, // e.g. 'Echoes text'
  explanation: string, // a longer text that explains the Command
}
```

### Defaults <sub>[/docs/][defaults]</sub>

Different from the original [botapijs] module, there are some default Commands
registered to your TelegramBot object.

Note that both defaults have an options object so there are fully configurable.
To do so, edit the Commands' options.
```javascript
bot.handlers.helpCommand.options
```

You can also edit the defaults before creating a TelegramBot to edit them
globally.
```javascript
const { defaults } = telegram22api;
```
```javascript
defaults.handlers
```

#### `/help [<command>]`
Sends a list of all available Command Handlers registered to the bot,
or outputs all information (stated in the Command's Manual) about a Command.

#### `/start`
Welcomes the user and refers to `/help`.


### Finalization

Once everything is set up, you need to tell the bot's server to start listening.
To do that, simply call the Bot's `listen` method. If your server runs more
than one Bot, call the Server's `listen` method instead.

```javascript
bot.listen(3000, 'localhost');
```

Now to make HTTP requests, call your URL, which consists of your hostname,
port, an optional route followed by `?url=` and the set API URL. The data is
submit in the POST request's body.

So just give the full URL to your bot API.

```
https://yourbot.rhcloud.com/?url=https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/
```

## license
[MIT](LICENSE)

[bot22api]: https://www.npmjs.com/package/bot22api
[botapijs]: https://github.com/22sk/botapijs
[botapijs-docs]: https://22sk.github.io/botapijs
[Bot]: https://22sk.github.io/botapijs/Bot.html
[Handler]: https://22sk.github.io/botapijs/Handler.html

[TelegramBot]: https://22sk.github.io/botapijs-telegram/TelegramBot.html
[Bot#register]: https://22sk.github.io/botapijs/Bot.html#register
[Command]: https://22sk.github.io/botapijs-telegram/Command.html
[Manual]: https://22sk.github.io/botapijs-telegram/Manual.html
[defaults]: https://22sk.github.io/botapijs-telegram/defaults.html
