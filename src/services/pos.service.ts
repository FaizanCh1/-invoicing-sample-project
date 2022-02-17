import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class PosService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  sum(a: any, b: any) {

    return a + b
  }
}
