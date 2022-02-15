import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {SaleItem} from '../models';
import {SaleItemRepository} from '../repositories';

export class SalesItemController {
  constructor(
    @repository(SaleItemRepository)
    public saleItemRepository : SaleItemRepository,
  ) {}

  @post('/sale-items')
  @response(200, {
    description: 'SaleItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(SaleItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaleItem, {
            title: 'NewSaleItem',
            exclude: ['id'],
          }),
        },
      },
    })
    saleItem: Omit<SaleItem, 'id'>,
  ): Promise<SaleItem> {
    return this.saleItemRepository.create(saleItem);
  }

  @get('/sale-items/count')
  @response(200, {
    description: 'SaleItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SaleItem) where?: Where<SaleItem>,
  ): Promise<Count> {
    return this.saleItemRepository.count(where);
  }

  @get('/sale-items')
  @response(200, {
    description: 'Array of SaleItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SaleItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SaleItem) filter?: Filter<SaleItem>,
  ): Promise<SaleItem[]> {
    return this.saleItemRepository.find(filter);
  }

  @patch('/sale-items')
  @response(200, {
    description: 'SaleItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaleItem, {partial: true}),
        },
      },
    })
    saleItem: SaleItem,
    @param.where(SaleItem) where?: Where<SaleItem>,
  ): Promise<Count> {
    return this.saleItemRepository.updateAll(saleItem, where);
  }

  @get('/sale-items/{id}')
  @response(200, {
    description: 'SaleItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SaleItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SaleItem, {exclude: 'where'}) filter?: FilterExcludingWhere<SaleItem>
  ): Promise<SaleItem> {
    return this.saleItemRepository.findById(id, filter);
  }

  @patch('/sale-items/{id}')
  @response(204, {
    description: 'SaleItem PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaleItem, {partial: true}),
        },
      },
    })
    saleItem: SaleItem,
  ): Promise<void> {
    await this.saleItemRepository.updateById(id, saleItem);
  }

  @put('/sale-items/{id}')
  @response(204, {
    description: 'SaleItem PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() saleItem: SaleItem,
  ): Promise<void> {
    await this.saleItemRepository.replaceById(id, saleItem);
  }

  @del('/sale-items/{id}')
  @response(204, {
    description: 'SaleItem DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.saleItemRepository.deleteById(id);
  }
}
