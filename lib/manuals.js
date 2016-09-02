class Manuals extends Array {
  /**
   * Returns elements whose field's value matches with given value
   *
   * @param  {String} field      Field's name
   * @param  {object} value      Value the manual's field should have
   * @return {object} containing 'manuals' and 'keys'
   */
  findBy(field, value) {
    const result = { manuals: [], keys: [] };
    for (let i = 0; i < this.length; i++) {
      const manual = this[i];
      if (manual[field] === value) {
        result.manuals.push(manual);
        result.keys.push(i);
      }
    }
    return result;
  }
}

/**
 * Manual, used for Commands with the /help command
 */
class Manual {
  /**
   * @param {object} data             Contains all information
   * @param {string} data.command     A Command's command
   * @param {string} data.syntax      A Command's syntax
   * @param {string} data.description A short description of the feature
   * @param {string} data.explanation A longer explanation of the feature
   */
  constructor(data = {}) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}

module.exports = { Manual, Manuals };
