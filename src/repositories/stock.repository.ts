import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PosDbDataSource} from '../datasources';
import {Stock, StockRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class StockRepository extends DefaultCrudRepository<
  Stock,
  typeof Stock.prototype.id,
  StockRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof Stock.prototype.id>;

  constructor(
    @inject('datasources.posDb') dataSource: PosDbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Stock, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
