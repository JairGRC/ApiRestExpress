/*
  Warnings:

  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `Product` MODIFY `price` DECIMAL NOT NULL;
