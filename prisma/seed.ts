import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('🌱 Iniciando seed...');

  await prisma.order.deleteMany({});
  await prisma.equipment.deleteMany({});

  const equipamentos = await Promise.all([
    prisma.equipment.create({
      data: {
        code: 'EMP-001',
        name: 'Empacotadeira Automática',
        manufacturer: 'Hualong',
        model: 'HL-5000',
      },
    }),
    prisma.equipment.create({
      data: {
        code: 'MIST-002',
        name: 'Misturador Industrial',
        manufacturer: 'WorldMix',
        model: 'WM-200',
      },
    }),
    prisma.equipment.create({
      data: {
        code: 'FORN-003',
        name: 'Forno Contínuo',
        manufacturer: 'FornoFort',
        model: 'FF-1000',
      },
    }),
    prisma.equipment.create({
      data: {
        code: 'TRANS-004',
        name: 'Transportador de Correia',
        manufacturer: 'ConveyAll',
        model: 'CA-300',
      },
    }),
  ]);

  console.log(`✅ Criados ${equipamentos.length} equipamentos.`);

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const ordens = await Promise.all([
    prisma.order.create({
      data: {
        equipmentId: equipamentos[0].id,
        requesterName: 'João Silva',
        requestDate: lastWeek,
        failureDesc: 'Sensores de solda apresentando falha intermitente',
        priority: 'URGENTE',
        maintenanceDate: lastWeek,
        responsible: 'Carlos Mecânico',
        startTime: '08:30',
        endTime: '10:45',
        cause: 'Sensor desalinhado e sujo',
        serviceDesc:
          'Limpeza e realinhamento dos sensores; substituição de um conector oxidado',
        materials: 'Conector elétrico - 1 un - R$ 12,50',
        totalCost: 12.5,
      },
    }),
    prisma.order.create({
      data: {
        equipmentId: equipamentos[1].id,
        requesterName: 'Maria Souza',
        requestDate: yesterday,
        failureDesc: 'Ruído excessivo na caixa de engrenagens',
        priority: 'IMEDIATO',
      },
    }),
    prisma.order.create({
      data: {
        equipmentId: equipamentos[2].id,
        requesterName: 'Pedro Lima',
        requestDate: now,
        failureDesc: 'Temperatura irregular, possíveis resistências queimadas',
        priority: 'SEM_URGENCIA',
      },
    }),
  ]);

  console.log(`✅ Criadas ${ordens.length} ordens de serviço.`);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
