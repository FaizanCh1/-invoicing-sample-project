import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PosDbDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
  > {
  constructor(
    @inject('datasources.posDb') dataSource: PosDbDataSource
  ) {
    super(Product, dataSource);
  }
}
