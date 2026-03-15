import { z } from 'zod';

export const osSchema = z.object({
  // Dados da OS (solicitação)
  equipmentId: z.string().min(1, 'Selecione um equipamento'),
  requesterName: z.string().min(1, 'Nome do requisitante é obrigatório'),
  requestDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data inválida',
  }),
  failureDesc: z
    .string()
    .min(5, 'Descreva a falha com pelo menos 30 caracteres'),
  priority: z.enum(['URGENTE', 'IMEDIATO', 'SEM_URGENCIA']),
});

export const omSchema = z
  .object({
    maintenanceDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Data inválida',
    }),
    responsible: z.string().min(1, 'Responsável é obrigatório'),
    startTime: z
      .string()
      .refine((time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: 'Hora inicial inválida',
      }),
    endTime: z
      .string()
      .refine((time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: 'Hora final inválida',
      }),
    cause: z
      .string()
      .min(5, 'Causa do problema deve ter pelo menos 5 caracteres'),
    serviceDesc: z
      .string()
      .min(10, 'Descrição do serviço deve ter pelo menos 10 caracteres'),
    materials: z.string().optional(),
    totalCost: z.number().min(0, 'Custo total deve ser um valor positivo'),
  })
  .partial();

export type OSFormData = z.infer<typeof osSchema>;
export type OMFormData = z.infer<typeof omSchema>;
