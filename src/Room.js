/** The maximum amount of variables a single Room can contain. */
const MAX_VARIABLES = 10;
/** The maximum length of a variable's value. */
const MAX_VALUE_LENGTH = 1000;
/** The maximum length of a variable's name. */
const MAX_NAME_LENGTH = 100;
/** A required prefix that must appear at the beginning of all variable's names. */
const NAME_REQUIRED_PREFIX = '☁ ';

/**
 * @typedef {import('./Client')} Client
 */

/**
 * Determine whether a variable name is allowed to be used.
 * @param {string} name Name of the variable
 * @returns {boolean}
 */
function isValidVariableName(name) {
  return typeof name === 'string' && name.startsWith(NAME_REQUIRED_PREFIX) && name.length < MAX_NAME_LENGTH;
}

/**
 * Determine whether a value is allowed to be set.
 * @param {string} value The value of the variable
 */
function isValidValue(value) {
  return typeof value === 'string' && value.length < MAX_VALUE_LENGTH;
}

class Room {
  constructor() {
    /** @type {Map<string, string>} */
    this.variables = new Map();
    /** @type {Client[]} */
    this.clients = [];
  }

  /**
   * Add a new client.
   * @param {Client} client The client to add
   * @throws Will throw if client is already added.
   */
  addClient(client) {
    if (this.clients.includes(client)) {
      throw new Error('Client is already added to this Room.');
    }
    this.clients.push(client);
  }

  /**
   * Remove a client.
   * @param {Client} client The client to remove
   * @throws Will throw if the client does not belong to this room.
   */
  removeClient(client) {
    const index = this.clients.indexOf(client);
    if (index === -1) {
      throw new Error('Client does not belong to this Room');
    }
    this.clients.splice(index, 1);
  }

  /**
   * Get all connected clients.
   * @returns {Client[]} All connected clients.
   */
  getClients() {
    return this.clients;
  }

  /**
   * Get a map of all variables.
   * @returns {Map<string, string>} All variables, and their value.
   */
  getAllVariables() {
    return this.variables;
  }

  /**
   * Create a new variable.
   * This method does not inform clients of the change.
   * @param {string} name The name of the variable
   * @param {string} value The value of the variable
   * @throws Will throw if name or value are invalid, the variable already exists, or there are too many variables.
   */
  createVar(name, value) {
    if (!isValidVariableName(name)) {
      throw new Error('Invalid variable name');
    }
    if (!isValidValue(value)) {
      throw new Error('Invalid value');
    }
    if (this.variables.has(name)) {
      throw new Error('Variable already exists');
    }
    if (this.variables.size >= MAX_VARIABLES) {
      throw new Error('Too many variables');
    }
    this.variables.set(name, value);
  }

  /**
   * Set an existing variable to a new value.
   * This method does not inform clients of the change.
   * @param {string} name The name of the variable
   * @param {string} value The value of the variable
   * @throws Will throw if name or value are invalid, or the variable does not exist.
   */
  set(name, value) {
    if (!isValidVariableName(name)) {
      throw new Error('Invalid variable name');
    }
    if (!isValidValue(value)) {
      throw new Error('Invalid value');
    }
    if (!this.variables.has(name)) {
      throw new Error('Variable does not exist');
    }
    this.variables.set(name, value);
  }

  /**
   * Determine whether a username is already in use by a client connected to this room.
   * @param {string} username The username to search for
   * @returns {boolean}
   */
  hasClientWithUsername(username) {
    // usernames are compared case insensitively
    username = username.toLowerCase();
    return this.getClients().some((i) => i.username.toLowerCase() === username);
  }
}

module.exports = Room;
