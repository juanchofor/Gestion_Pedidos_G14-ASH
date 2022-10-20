import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';

@model({settings: {strict: false}})
export class Directivo extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @property({
    type: 'string',
    required: true,
  })
  idpersona: string;

  @belongsTo(() => Persona)
  personaId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Directivo>) {
    super(data);
  }
}

export interface DirectivoRelations {
  // describe navigational properties here
}

export type DirectivoWithRelations = Directivo & DirectivoRelations;
