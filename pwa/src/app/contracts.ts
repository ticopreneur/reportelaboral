export type Fogon = 'principal' | 'secundario' | 'miscelaneos';
export type Eisenhower = 'UI' | 'NI' | 'UU' | 'NU';
export interface LogPayload {
  usuario_wp: string;
  tarea_id: string;
  titulo: string;
  descripcion?: string;
  fogon: Fogon;
  eisenhower: Eisenhower;
  accion: 'start' | 'pause' | 'stop' | 'save';
  inicio_iso?: string;
  fin_iso?: string;
  minutos?: number;
  timestamp_iso: string;
}
