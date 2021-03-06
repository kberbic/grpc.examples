import ServiceError from '../server/service.error.js';

export default class InternalError extends ServiceError {
  constructor(message) {
    super(ServiceError.GRPC_CODES.INTERNAL, message);
  }
}
