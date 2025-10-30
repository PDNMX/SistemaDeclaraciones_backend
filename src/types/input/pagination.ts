export interface PaginationInputOptions {
  page?: number;
  size?: number;
  // Nuevo: Campo por el cual se ordenarán los resultados (ej. 'updatedAt').
  sort?: string;
  // Nuevo: Dirección del ordenamiento, puede ser 'asc' (ascendente) o 'desc' (descendente).
  direction?: 'asc' | 'desc';
}