-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_customerID_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_productID_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_transactionID_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_customerID_fkey`;

-- DropIndex
DROP INDEX `payments_customerID_fkey` ON `payments`;

-- DropIndex
DROP INDEX `payments_productID_fkey` ON `payments`;

-- DropIndex
DROP INDEX `payments_transactionID_fkey` ON `payments`;

-- DropIndex
DROP INDEX `transactions_customerID_fkey` ON `transactions`;

-- AlterTable
ALTER TABLE `admins` MODIFY `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE `customers` MODIFY `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE `payments` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Paid';

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_transactionID_fkey` FOREIGN KEY (`transactionID`) REFERENCES `transactions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
