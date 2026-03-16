'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OMFormData, omSchema } from '@/schemas/order-service'; // ajuste o path
import { toast } from 'sonner';
import { updateOM } from '@/app/actions/os';

interface UpdateOMDialogProps {
  orderId: number;
  initialData?: OMFormData;
  children?: React.ReactNode;
}

export function UpdateOMDialog({
  orderId,
  initialData,
  children,
}: UpdateOMDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OMFormData>({
    resolver: zodResolver(omSchema),
    defaultValues:
      initialData?.responsible !== undefined &&
      initialData?.responsible !== '' &&
      initialData?.responsible !== null
        ? initialData
        : {
            maintenanceDate: new Date().toISOString().slice(0, 16),
            startTime: '',
            endTime: '',
            responsible: '',
            cause: '',
            serviceDesc: '',
            materials: '',
            totalCost: undefined,
          },
  });

  const onSubmit = async (data: OMFormData) => {
    try {
      await updateOM(orderId, data).then((result) => {
        if (result.success) {
          toast.success('Ordem de Manutenção atualizada com sucesso!');
          setOpen(false);
          reset();
        } else {
          toast.error('Erro ao atualizar OM: ' + (result.message || ''));
        }
      });
    } catch (error) {
      console.error('Erro ao salvar OM:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            {initialData?.responsible !== undefined &&
            initialData?.responsible !== '' &&
            initialData?.responsible !== null
              ? 'Editar OM'
              : 'Registrar Execução da Manutenção'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Dados da Ordem de Manutenção (OM)</DialogTitle>
            <DialogDescription>
              Preencha as informações da execução da manutenção para a OS #
              {orderId}.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* Data da Manutenção */}
            <Field>
              <Label htmlFor="maintenanceDate">Data da Manutenção</Label>
              <Input
                id="maintenanceDate"
                type="date"
                {...register('maintenanceDate')}
              />
              <FieldError>{errors.maintenanceDate?.message}</FieldError>
            </Field>

            {/* Responsável (mecânico) */}
            <Field>
              <Label htmlFor="responsible">Responsável (mecânico)</Label>
              <Input id="responsible" {...register('responsible')} />
              <FieldError>{errors.responsible?.message}</FieldError>
            </Field>

            {/* Hora Inicial */}
            <Field>
              <Label htmlFor="startTime">Hora Inicial</Label>
              <Input id="startTime" type="time" {...register('startTime')} />
              <FieldError>{errors.startTime?.message}</FieldError>
            </Field>

            {/* Hora Final */}
            <Field>
              <Label htmlFor="endTime">Hora Final</Label>
              <Input id="endTime" type="time" {...register('endTime')} />
              <FieldError>{errors.endTime?.message}</FieldError>
            </Field>

            {/* Causa do Problema */}
            <Field className="md:col-span-2">
              <Label htmlFor="cause">Causa do Problema</Label>
              <Input
                id="cause"
                {...register('cause')}
                placeholder="Ex: Desgaste natural, falha elétrica, etc."
              />
              <FieldError>{errors.cause?.message}</FieldError>
            </Field>

            {/* Descrição do Serviço Realizado */}
            <Field className="md:col-span-2">
              <Label htmlFor="serviceDesc">
                Descrição do Serviço Realizado
              </Label>
              <Textarea
                id="serviceDesc"
                {...register('serviceDesc')}
                rows={3}
              />
              <FieldError>{errors.serviceDesc?.message}</FieldError>
            </Field>

            {/* Materiais Utilizados */}
            <Field className="md:col-span-2">
              <Label htmlFor="materials">Materiais Utilizados</Label>
              <Textarea
                id="materials"
                {...register('materials')}
                rows={2}
                placeholder="Ex: Rolamento 6204 - 2 un - R$15,00 cada"
              />
              <FieldError>{errors.materials?.message}</FieldError>
            </Field>

            {/* Custo Total */}
            <Field>
              <Label htmlFor="totalCost">Custo Total (R$)</Label>
              <Input
                id="totalCost"
                type="number"
                step="0.01"
                {...register('totalCost', { valueAsNumber: true })}
              />
              <FieldError>{errors.totalCost?.message}</FieldError>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar OM'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
