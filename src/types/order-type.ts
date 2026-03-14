// types/index.ts
export interface Equipment {
  id: number;
  code: string;
  name: string;
  manufacturer?: string | null;
  model?: string | null;
}

export interface Order {
  id: number;
  equipmentId: number;
  equipment?: Equipment;
  requesterName: string;
  requesterSignature?: string | null;
  requestDate: Date;
  failureDesc: string;
  priority: string;
  maintenanceDate?: Date | null;
  responsible?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  cause?: string | null;
  serviceDesc?: string | null;
  materials?: string | null;
  totalCost?: number | null;
  createdAt: Date;
  updatedAt: Date;
}
