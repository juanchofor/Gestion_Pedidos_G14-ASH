import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbmongodbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Persona, Cliente} from '../models';
import {PersonaRepository} from './persona.repository';
import {ClienteRepository} from './cliente.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly personas: HasManyRepositoryFactory<Persona, typeof Empresa.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.dbmongodb') dataSource: DbmongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Empresa, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.personas = this.createHasManyRepositoryFactoryFor('personas', personaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
