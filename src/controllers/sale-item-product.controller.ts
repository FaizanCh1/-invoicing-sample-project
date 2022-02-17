import {service} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Product, SaleItem
} from '../models';
import {SaleItemRepository} from '../repositories';
import {PosService} from '../services';
export class SaleItemProductController {
  constructor(
    @repository(SaleItemRepository)
    public saleItemRepository: SaleItemRepository,
    @service(PosService) public posservice: PosService
  ) { }

  @get('/sale-items/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to SaleItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async getProduct(

    @param.path.number('id') id: typeof SaleItem.prototype.id,
  ): Promise<Product> {
    const total = this.posservice.sum(1, 4)
    return this.saleItemRepository.product(id);
  }
}
