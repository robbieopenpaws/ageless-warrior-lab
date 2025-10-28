ALTER TABLE `episodes` MODIFY COLUMN `videoId` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `episodes` MODIFY COLUMN `title` text;--> statement-breakpoint
ALTER TABLE `episodes` ADD `slug` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `episodes` ADD CONSTRAINT `episodes_slug_unique` UNIQUE(`slug`);