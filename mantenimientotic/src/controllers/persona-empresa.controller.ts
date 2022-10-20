import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Empresa,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaEmpresaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Empresa> {
    return this.personaRepository.empresa(id);
  }
}
