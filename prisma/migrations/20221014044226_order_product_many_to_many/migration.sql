/*
  Warnings:

  - You are about to alter the column `amount` on the `Orden_Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `Orden_Product` MODIFY `amount` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `price` DECIMAL NOT NULL;
