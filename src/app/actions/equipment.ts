'use server';
import { prisma } from '@/lib/prisma';

export async function getAllEquipments() {
  try {
    const equipments = await prisma.equipment.findMany();
    return { success: true, data: equipments };
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error);
    return { success: false, message: 'Erro ao carregar equipamentos' };
  }
}
