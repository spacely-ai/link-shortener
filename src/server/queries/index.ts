import { cache } from "react";
import { auth } from "@/auth";
import { db } from "@/server/db";

/**
 * Get links with tags by user.
 * Authentication required.
 */
export const getLinksAndTagsByUser = cache(async () => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  try {
    const linkData = await db.links.findMany({
      where: {
        creatorId: currentUser.user?.id,
      },
      include: {
        tags: true,
      },
    });

    const tagsData = await db.tags.findMany({
      where: {
        creatorId: currentUser.user?.id,
      },
    });

    return {
      links: linkData,
      tags: tagsData,
    };
  } catch (error) {
    console.error("🚧 Error while fetching links and tags:", error);
    throw error; // Propaga el error para que el componente que llama pueda manejarlo adecuadamente
  }
});

export const getLinksAndTags = cache(async () => {
  const [tagsData, linkData] = await Promise.all([
    db.tags.findMany(),
    db.links.findMany({
      include: {
        tags: true,
      },
    }),
  ]);

  return {
    links: linkData,
    tags: tagsData,
  };
});

export const getTags = cache(async () => {
  const tagsData = await db.tags.findMany();

  return tagsData;
});

/**
 * Get only tags by user.
 * Authentication required.
 */
export const getTagsByUser = cache(async () => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const tagsData = await db.tags.findMany({
    where: {
      creatorId: currentUser.user?.id,
    },
  });

  return tagsData;
});
