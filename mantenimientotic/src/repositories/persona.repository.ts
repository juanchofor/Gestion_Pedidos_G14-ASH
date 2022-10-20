import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbmongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Empleado, Empresa} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {EmpresaRepository} from './empresa.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly empleado: BelongsToAccessor<Empleado, typeof Persona.prototype.id>;

  public readonly empresa: BelongsToAccessor<Empresa, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.dbmongodb') dataSource: DbmongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Persona, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
