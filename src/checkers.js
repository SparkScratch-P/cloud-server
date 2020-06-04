/**
 * @param {unknown} username
 * @returns {boolean}
 */
module.exports.isValidUsername = function(username) {
  return typeof username === 'string' && username.length > 0 && username.length < 30 && /^[a-z0-9_-]+$/i.test(username);
};

/**
 * @param {unknown} id
 * @returns {boolean}
 */
module.exports.isValidRoomID = function(id) {
  return typeof id === 'string' && id.length > 0 && /^\d+$/.test(id);
};

/**
 * @param {unknown} object
 * @returns {boolean}
 */
module.exports.isValidVariableMap = function(object) {
  return !!object && typeof object === 'object';
};
