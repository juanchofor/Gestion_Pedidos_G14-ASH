import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empresa,
  Persona,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaPersonaController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.empresaRepository.personas(id).find(filter);
  }

  @post('/empresas/{id}/personas', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.empresaRepository.personas(id).create(persona);
  }

  @patch('/empresas/{id}/personas', {
    responses: {
      '200': {
        description: 'Empresa.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.empresaRepository.personas(id).patch(persona, where);
  }

  @del('/empresas/{id}/personas', {
    responses: {
      '200': {
        description: 'Empresa.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.empresaRepository.personas(id).delete(where);
  }
}
