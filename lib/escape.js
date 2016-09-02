/**
 * Contains function that escape stuff
 * @module escape
 */

// TODO: telegram-markdown-escape npm module
/**
 * Escapes Telegram's Markdown entries by placing backslashes in front of each
 * '*_`[' -> '\*\_\`\['
 * '*bold!*' -> '\*not bold.\*'
 * @param  {string} string Unescaped string that might contain Markdown
 * @return {string}        Escaped string
 */
exports.markdown = (string) => string.replace(/(?=[*_`\[])/g, '\\');
