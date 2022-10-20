import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbmongodbDataSource} from '../datasources';
import {Directivo, DirectivoRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class DirectivoRepository extends DefaultCrudRepository<
  Directivo,
  typeof Directivo.prototype.id,
  DirectivoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Directivo.prototype.id>;

  constructor(
    @inject('datasources.dbmongodb') dataSource: DbmongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Directivo, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
