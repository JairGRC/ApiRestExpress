/*
  Warnings:

  - You are about to drop the column `update_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Orden` table. All the data in the column will be lost.
  - The primary key for the `Orden_Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Orden_Product` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Orden_Product` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Orden_Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `update_at` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `update_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `update_at`;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `update_at`;

-- AlterTable
ALTER TABLE `Orden` DROP COLUMN `update_at`;

-- AlterTable
ALTER TABLE `Orden_Product` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `update_at`,
    MODIFY `amount` DECIMAL NOT NULL,
    ADD PRIMARY KEY (`orderId`, `productId`);

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `update_at`,
    MODIFY `price` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `update_at`;
