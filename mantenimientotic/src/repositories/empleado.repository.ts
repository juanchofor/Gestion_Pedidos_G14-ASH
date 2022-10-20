import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbmongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations} from '../models';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {
  constructor(
    @inject('datasources.dbmongodb') dataSource: DbmongodbDataSource,
  ) {
    super(Empleado, dataSource);
  }
}
