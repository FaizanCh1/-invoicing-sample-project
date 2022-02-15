import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PosDbDataSource} from '../datasources';
import {SaleItem, SaleItemRelations, Product, Sales} from '../models';
import {ProductRepository} from './product.repository';
import {SalesRepository} from './sales.repository';

export class SaleItemRepository extends DefaultCrudRepository<
  SaleItem,
  typeof SaleItem.prototype.id,
  SaleItemRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof SaleItem.prototype.id>;

  public readonly sales: BelongsToAccessor<Sales, typeof SaleItem.prototype.id>;

  constructor(
    @inject('datasources.posDb') dataSource: PosDbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('SalesRepository') protected salesRepositoryGetter: Getter<SalesRepository>,
  ) {
    super(SaleItem, dataSource);
    this.sales = this.createBelongsToAccessorFor('sales', salesRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
