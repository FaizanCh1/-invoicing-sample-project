import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'posDb',
  connector: 'postgresql',
  url: 'postgres://postgres:physics@localhost/pos',
  host: 'localhost',
  port: '5432',
  database: 'pos',
  user: 'postgres',
  password: 'physics',
  schema: "pos"
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PosDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'posDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.posDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
