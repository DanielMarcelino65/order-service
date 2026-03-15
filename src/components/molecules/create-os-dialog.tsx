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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { osSchema, OSFormData } from '@/schemas/order-service';
import { Equipment } from '../../../generated/prisma/client';
import { saveOS } from '@/app/actions/os';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type CreateOSDialogProps = {
  equipments: Equipment[] | undefined;
};

export function CreateOSDialog({ equipments }: CreateOSDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OSFormData>({
    resolver: zodResolver(osSchema),
    defaultValues: {
      equipmentId: '',
      requesterName: '',
      requestDate: new Date().toISOString().slice(0, 16),
      failureDesc: '',
      priority: 'SEM_URGENCIA',
    },
  });

  const onSubmit = async (data: OSFormData) => {
    const result = await saveOS(data);
    if (result.success) {
      setOpen(false);
      toast.success('Ordem de Serviço criada com sucesso!');
      reset();
      router.refresh();
    } else {
      // Tratar erro (exibir toast ou mensagem)
      console.error('Erro ao salvar OS:', result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-5" asChild>
        <Button variant="outline">Nova Ordem de Serviço</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Nova Ordem de Serviço</DialogTitle>
            <DialogDescription>
              Preencha os dados da solicitação de manutenção. Após criar, você
              poderá adicionar as informações da execução (OM) em outro momento.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* Equipamento */}
            <Field className="md:col-span-2">
              <Label htmlFor="equipment">Equipamento *</Label>
              <Controller
                name="equipmentId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um equipamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipments &&
                        equipments.map((eq) => (
                          <SelectItem key={eq.id} value={String(eq.id)}>
                            {eq.code} - {eq.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{errors.equipmentId?.message}</FieldError>
            </Field>
            {/* Requisitante */}
            <Field>
              <Label htmlFor="requesterName">Nome do requisitante *</Label>
              <Input id="requesterName" {...register('requesterName')} />
              <FieldError>{errors.requesterName?.message}</FieldError>
            </Field>
            {/* Data/Hora da solicitação */}
            <Field>
              <Label htmlFor="requestDate">Data/Hora da solicitação *</Label>
              <Input
                id="requestDate"
                type="datetime-local"
                {...register('requestDate')}
              />
              <FieldError>{errors.requestDate?.message}</FieldError>
            </Field>

            {/* Prioridade */}
            <Field>
              <Label>Prioridade *</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="URGENTE" id="urgente" />
                      <Label htmlFor="urgente">Urgente (24h)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="IMEDIATO" id="imediato" />
                      <Label htmlFor="imediato">Imediato (1 semana)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="SEM_URGENCIA" id="sem_urgencia" />
                      <Label htmlFor="sem_urgencia">
                        Sem urgência (30 dias)
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
              <FieldError>{errors.priority?.message}</FieldError>
            </Field>

            {/* Descrição da falha */}
            <Field className="md:col-span-2">
              <Label htmlFor="failureDesc">
                Descrição da falha / serviço *
              </Label>
              <Textarea
                id="failureDesc"
                rows={4}
                {...register('failureDesc')}
              />
              <FieldError>{errors.failureDesc?.message}</FieldError>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Criar OS'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
