/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Training` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Training_title_key" ON "public"."Training"("title");
