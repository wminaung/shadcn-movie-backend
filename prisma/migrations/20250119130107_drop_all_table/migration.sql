/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieCategory" DROP CONSTRAINT "MovieCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MovieCategory" DROP CONSTRAINT "MovieCategory_movieId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "MovieCategory";
