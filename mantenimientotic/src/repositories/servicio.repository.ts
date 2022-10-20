import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbmongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.dbmongodb') dataSource: DbmongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Servicio, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
