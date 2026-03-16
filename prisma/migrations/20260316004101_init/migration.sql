-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('URGENTE', 'IMEDIATO', 'SEM_URGENCIA');

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT,
    "model" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "requesterName" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "failureDesc" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "maintenanceDate" TIMESTAMP(3),
    "responsible" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "cause" TEXT,
    "serviceDesc" TEXT,
    "materials" TEXT,
    "totalCost" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_code_key" ON "Equipment"("code");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
