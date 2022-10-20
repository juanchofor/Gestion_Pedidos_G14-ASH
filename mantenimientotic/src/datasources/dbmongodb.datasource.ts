import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dbmongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://juanchofor:Colombia22@cluster0.1xrrkeu.mongodb.net/mantenimientog02',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbmongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dbmongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dbmongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
