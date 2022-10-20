import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Directivo,
  Persona,
} from '../models';
import {DirectivoRepository} from '../repositories';

export class DirectivoPersonaController {
  constructor(
    @repository(DirectivoRepository)
    public directivoRepository: DirectivoRepository,
  ) { }

  @get('/directivos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Directivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Directivo.prototype.id,
  ): Promise<Persona> {
    return this.directivoRepository.persona(id);
  }
}
