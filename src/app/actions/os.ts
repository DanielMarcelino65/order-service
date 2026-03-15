'use server';

import { prisma } from '@/lib/prisma';
import { OMFormData, type OSFormData } from '@/schemas/order-service';
import { revalidatePath } from 'next/cache';

export async function saveOS(formData: OSFormData) {
  try {
    const data = {
      equipmentId: parseInt(formData.equipmentId),
      requesterName: formData.requesterName,
      requestDate: new Date(formData.requestDate),
      failureDesc: formData.failureDesc,
      priority: formData.priority,
    };

    const order = await prisma.order.create({
      data,
    });

    // Revalida a página de listagem para atualizar os dados
    revalidatePath('/');

    return { success: true, data: order };
  } catch (error) {
    if (error) {
      return { success: false, errors: error };
    }
    console.error('Erro ao salvar OS:', error);
    return { success: false, message: 'Erro interno do servidor' };
  }
}

export async function getAllOS() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        equipment: true,
      },
      orderBy: {
        requestDate: 'desc',
      },
    });

    return { success: true, data: orders };
  } catch (error) {
    console.error('Erro ao buscar OS:', error);
    return { success: false, message: 'Erro ao carregar ordens' };
  }
}

export async function deleteOS(id: number) {
  try {
    await prisma.order.delete({
      where: { id },
    });
    revalidatePath('/');

    return { success: true, message: 'Ordem excluída com sucesso' };
  } catch (error) {
    console.error('Erro ao excluir OS:', error);
    return { success: false, message: 'Erro ao excluir ordem' };
  }
}

export async function updateOM(orderId: number, omData: OMFormData) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        cause: omData.cause,
        endTime: omData.endTime,
        maintenanceDate: new Date(omData.maintenanceDate as string),
        materials: omData.materials,
        responsible: omData.responsible,
        serviceDesc: omData.serviceDesc,
        startTime: omData.startTime,
        totalCost: omData.totalCost,
      },
    });

    return { success: true, data: updatedOrder };
  } catch (error) {
    console.error('Erro ao atualizar OM:', error);
    return { success: false, message: 'Erro ao atualizar ordem de manutenção' };
  }
}

export async function getOSById(id: number) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { equipment: true },
    });

    if (!order) {
      return { success: false, message: 'Ordem não encontrada' };
    }

    return { success: true, data: order };
  } catch (error) {
    console.error('Erro ao buscar OS:', error);
    return { success: false, message: 'Erro ao carregar ordem' };
  }
}
