import { HttpStatus } from '@nestjs/common';

export class ApiResponse<DataModel = object> {
  statusCode?: HttpStatus = HttpStatus.OK;
  message?: string = '';
  error?: string;
  data?: DataModel;

  constructor(obj: ApiResponse) {
    Object.assign(this, obj);
  }
}
