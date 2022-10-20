import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({settings: {strict: false}})
export class Servicio extends Entity {
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
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio_hora: number;

  @property({
    type: 'string',
    required: true,
  })
  idcliente: string;

  @belongsTo(() => Cliente)
  clienteId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
