// types/index.ts
export interface Equipment {
  id: number;
  code: string;
  name: string;
  manufacturer?: string | null;
  model?: string | null;
}

export type Priority = 'URGENTE' | 'IMEDIATO' | 'SEM_URGENCIA';

export type OS = {
  equipment: {
    name: string;
    id: number;
    code: string;
    manufacturer: string | null;
    model: string | null;
  };
} & {
  id: number;
  equipmentId: number;
  requesterName: string;
  requestDate: Date;
  failureDesc: string;
  priority: Priority;
  maintenanceDate: Date | null;
  responsible: string | null;
  startTime: string | null;
  endTime: string | null;
  cause: string | null;
  serviceDesc: string | null;
  materials: string | null;
  totalCost: number | null;
  createdAt: Date;
  updatedAt: Date;
};
