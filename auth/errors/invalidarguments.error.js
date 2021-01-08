import ArgumentsError from '../server/arguments.error.js';

export default class InvalidArgumentsError extends ArgumentsError {
    constructor(message, fields) {
        super(message, fields);
    }
}
