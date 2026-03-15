import { CreateOSDialog } from '@/components/molecules/create-os-dialog';
import { getAllOS } from './actions/os';
import OsCardsGrid from '@/components/molecules/os-cars-grid';
import { getAllEquipments } from './actions/equipment';

export default async function Home() {
  const osList = await getAllOS();
  const equipments = await getAllEquipments();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">
        Bem-vindo ao Sistema de Ordem de Serviço
      </h1>
      <CreateOSDialog equipments={equipments.data} />
      <OsCardsGrid osList={osList} />
    </main>
  );
}
