import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbmongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.dbmongodb') dataSource: DbmongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Cliente, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
