import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SaleItem,
  Sales,
} from '../models';
import {SaleItemRepository} from '../repositories';

export class SaleItemSalesController {
  constructor(
    @repository(SaleItemRepository)
    public saleItemRepository: SaleItemRepository,
  ) { }

  @get('/sale-items/{id}/sales', {
    responses: {
      '200': {
        description: 'Sales belonging to SaleItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sales)},
          },
        },
      },
    },
  })
  async getSales(
    @param.path.number('id') id: typeof SaleItem.prototype.id,
  ): Promise<Sales> {
    return this.saleItemRepository.sales(id);
  }
}
