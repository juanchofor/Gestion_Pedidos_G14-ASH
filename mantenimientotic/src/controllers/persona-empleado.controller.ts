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
  Empleado,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaEmpleadoController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Empleado> {
    return this.personaRepository.empleado(id);
  }
}
