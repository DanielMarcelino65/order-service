import { z } from 'zod';

export const osSchema = z.object({
  // Dados da OS (solicitação)
  equipmentId: z.string().min(1, 'Selecione um equipamento'),
  requesterName: z.string().min(1, 'Nome do requisitante é obrigatório'),
  requesterSignature: z.string().optional(),
  requestDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data inválida',
  }),
  failureDesc: z
    .string()
    .min(5, 'Descreva a falha com pelo menos 5 caracteres'),
  priority: z.enum(['urgente', 'imediato', 'sem_urgencia']),

  maintenanceDate: z.string().optional(),
  responsible: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  cause: z.string().optional(),
  serviceDesc: z.string().optional(),
  materials: z.string().optional(),
  totalCost: z.number().optional(),
});

export type OSFormData = z.infer<typeof osSchema>;
