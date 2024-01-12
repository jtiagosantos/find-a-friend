/*
  Warnings:

  - Added the required column `is_available` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "is_available" BOOLEAN NOT NULL;
