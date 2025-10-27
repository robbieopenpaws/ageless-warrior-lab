CREATE TABLE `episodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`videoId` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`publishedTimeText` varchar(64),
	`lengthSeconds` int,
	`views` int,
	`thumbnailUrl` text,
	`isLiveNow` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `episodes_id` PRIMARY KEY(`id`),
	CONSTRAINT `episodes_videoId_unique` UNIQUE(`videoId`)
);
