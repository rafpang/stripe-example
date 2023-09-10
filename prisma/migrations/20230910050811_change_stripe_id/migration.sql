/*
  Warnings:

  - The primary key for the `Audience` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audience" (
    "stripeId" TEXT NOT NULL PRIMARY KEY,
    "audienceName" TEXT NOT NULL,
    "seatType" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Audience" ("audienceName", "email", "seatType", "stripeId") SELECT "audienceName", "email", "seatType", "stripeId" FROM "Audience";
DROP TABLE "Audience";
ALTER TABLE "new_Audience" RENAME TO "Audience";
CREATE UNIQUE INDEX "Audience_email_key" ON "Audience"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
