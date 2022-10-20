import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Empresa} from './empresa.model';

@model({settings: {strict: false}})
export class Persona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;
  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Empresa)
  empresaId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
