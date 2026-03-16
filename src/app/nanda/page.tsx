'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function OSOMVisualPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Nova Ordem de Serviço
        </h1>
        <p className="text-muted-foreground">
          Preencha os dados da solicitação e da execução da manutenção.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card da OS */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Ordem de Serviço (OS)</CardTitle>
            <CardDescription>
              Informações preenchidas pelo solicitante.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Equipamento */}
            <div className="space-y-2">
              <Label htmlFor="equipment">Equipamento *</Label>
              <Select defaultValue="1">
                <SelectTrigger id="equipment">
                  <SelectValue placeholder="Selecione um equipamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    EQ-001 - Misturador Industrial
                  </SelectItem>
                  <SelectItem value="2">
                    EQ-002 - Esteira Transportadora
                  </SelectItem>
                  <SelectItem value="3">EQ-003 - Embaladeira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Requisitante e assinatura */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requesterName">Nome do requisitante *</Label>
                <Input id="requesterName" defaultValue="João Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requesterSignature">
                  Assinatura (opcional)
                </Label>
                <Input id="requesterSignature" defaultValue="João S." />
              </div>
            </div>

            {/* Data e prioridade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requestDate">Data/Hora da solicitação *</Label>
                <Input
                  id="requestDate"
                  type="datetime-local"
                  defaultValue="2025-03-15T14:30"
                />
              </div>
              <div className="space-y-2">
                <Label>Prioridade *</Label>
                <RadioGroup
                  defaultValue="SEM_URGENCIA"
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="URGENTE" id="urgente" />
                    <Label htmlFor="urgente">Urgente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="IMEDIATO" id="imediato" />
                    <Label htmlFor="imediato">Imediato</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="SEM_URGENCIA" id="sem_urgencia" />
                    <Label htmlFor="sem_urgencia">Sem urgência</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Descrição da falha */}
            <div className="space-y-2">
              <Label htmlFor="failureDesc">
                Descrição da falha / serviço *
              </Label>
              <Textarea
                id="failureDesc"
                rows={4}
                defaultValue="Misturador apresenta ruído anormal durante o funcionamento. Possível problema no rolamento do motor."
              />
            </div>
          </CardContent>
        </Card>

        {/* Card da OM */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Ordem de Manutenção (OM)</CardTitle>
            <CardDescription>
              Informações preenchidas pela equipe de manutenção.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Data e responsável */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceDate">Data da manutenção</Label>
                <Input
                  id="maintenanceDate"
                  type="date"
                  defaultValue="2025-03-16"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsible">Responsável</Label>
                <Input id="responsible" defaultValue="Carlos Souza" />
              </div>
            </div>

            {/* Horas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Hora inicial</Label>
                <Input id="startTime" type="time" defaultValue="09:15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Hora final</Label>
                <Input id="endTime" type="time" defaultValue="11:30" />
              </div>
            </div>

            {/* Causa */}
            <div className="space-y-2">
              <Label htmlFor="cause">Causa do problema</Label>
              <Input id="cause" defaultValue="Rolamento do motor desgastado" />
            </div>

            {/* Descrição do serviço */}
            <div className="space-y-2">
              <Label htmlFor="serviceDesc">
                Descrição do serviço realizado
              </Label>
              <Textarea
                id="serviceDesc"
                rows={3}
                defaultValue="Substituído rolamento do motor. Realizada limpeza e lubrificação geral."
              />
            </div>

            {/* Materiais */}
            <div className="space-y-2">
              <Label htmlFor="materials">Materiais utilizados</Label>
              <Textarea
                id="materials"
                rows={2}
                defaultValue="Rolamento SKF 6204 (1 un) - R$ 45,00"
              />
            </div>

            {/* Custo total */}
            <div className="space-y-2">
              <Label htmlFor="totalCost">Custo total (R$)</Label>
              <Input
                id="totalCost"
                type="number"
                step="0.01"
                defaultValue="45.00"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar OS</Button>
      </div>
    </div>
  );
}
