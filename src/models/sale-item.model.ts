import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {Sales} from './sales.model';

@model()
export class SaleItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;
  @belongsTo(() => Product)
  productId: number;

  @belongsTo(() => Sales)
  salesId: number;

  constructor(data?: Partial<SaleItem>) {
    super(data);
  }
}

export interface SaleItemRelations {
  // describe navigational properties here
}

export type SaleItemWithRelations = SaleItem & SaleItemRelations;
