import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Empleado extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  sueldo_bruto: number;

  @property({
    type: 'string',
    required: true,
  })
  idpersona: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
