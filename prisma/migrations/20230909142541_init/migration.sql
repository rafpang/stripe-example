-- CreateTable
CREATE TABLE "Audience" (
    "stripeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "audienceName" TEXT NOT NULL,
    "seatType" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Audience_email_key" ON "Audience"("email");
