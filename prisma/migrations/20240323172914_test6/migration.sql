/*
  Warnings:

  - The primary key for the `Favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AlbumToFavorites" DROP CONSTRAINT "_AlbumToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToTrack" DROP CONSTRAINT "_FavoritesToTrack_A_fkey";

-- AlterTable
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_AlbumToFavorites" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ArtistToFavorites" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_FavoritesToTrack" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_ArtistToFavorites" ADD CONSTRAINT "_ArtistToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFavorites" ADD CONSTRAINT "_AlbumToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToTrack" ADD CONSTRAINT "_FavoritesToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
