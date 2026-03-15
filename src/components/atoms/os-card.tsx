'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Priority } from '../../../generated/prisma/client';
import { OS } from '@/types/order-type';
import { UpdateOMDialog } from '../molecules/update-om-dialog';

type BadgeVariant = 'destructive' | 'positive' | 'alert';

const badgeVariants: Record<Priority, BadgeVariant> = {
  URGENTE: 'destructive',
  SEM_URGENCIA: 'positive',
  IMEDIATO: 'alert',
};

type OsCardProps = {
  serviceOrder: OS;
};

export function OsCard({ serviceOrder }: OsCardProps) {
  const { equipment, requesterName, failureDesc, priority, requestDate } =
    serviceOrder;

  console.log(serviceOrder.maintenanceDate?.toISOString());

  return (
    <Card size="default" className="mx-auto relative w-full max-w-sm">
      <Badge variant={'default'} className="absolute  right-2">
        {requestDate ? new Date(requestDate).toLocaleDateString('pt-BR') : ''}
      </Badge>
      <Badge
        variant={badgeVariants[priority]}
        className="absolute mt-8 right-2"
      >
        {priority.replace('_', ' ')}
      </Badge>
      <CardHeader>
        <CardTitle>{equipment?.code}</CardTitle>
        <CardDescription>{equipment?.name}</CardDescription>
        <CardDescription>Criado por {requesterName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{failureDesc}</p>
      </CardContent>
      <CardFooter>
        <UpdateOMDialog
          orderId={serviceOrder.id}
          initialData={{
            cause: serviceOrder.cause as string | undefined,
            endTime: serviceOrder.endTime as string | undefined,
            maintenanceDate: serviceOrder.maintenanceDate
              ?.toISOString()
              .split('T')[0] as string | undefined,
            materials: serviceOrder.materials as string | undefined,
            responsible: serviceOrder.responsible as string | undefined,
            serviceDesc: serviceOrder.serviceDesc as string | undefined,
            startTime: serviceOrder.startTime as string | undefined,
            totalCost: serviceOrder.totalCost as number | undefined,
          }}
        />
      </CardFooter>
    </Card>
  );
}
