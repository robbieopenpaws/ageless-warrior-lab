ALTER TABLE `episodes` DROP INDEX `episodes_slug_unique`;--> statement-breakpoint
ALTER TABLE `episodes` MODIFY COLUMN `slug` varchar(255);