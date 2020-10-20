CREATE TABLE "music_library" (
	"id" SERIAL PRIMARY KEY,
	"rank" INTEGER,
	"artist" VARCHAR(80) NOT NULL,
	"track" VARCHAR(120) NOT NULL,
	"published" DATE
);

INSERT INTO "music_library" ("rank", "artist", "track", "published")
VALUES (356, 'Gene Autry', 'Rudolph, the Red-Nosed Reindeer', '1/1/1949'),
(357, 'Oasis', 'Wonderwall', '1/1/1996');