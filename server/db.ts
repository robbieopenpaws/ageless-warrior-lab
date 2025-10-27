import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, episodes, InsertEpisode, contactSubmissions, InsertContactSubmission } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Episode queries
 */
export async function getAllEpisodes() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get episodes: database not available");
    return [];
  }
  
  const result = await db.select().from(episodes);
  return result;
}

export async function getEpisodeByVideoId(videoId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get episode: database not available");
    return undefined;
  }
  
  const result = await db.select().from(episodes).where(eq(episodes.videoId, videoId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertEpisode(episode: InsertEpisode) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert episode: database not available");
    return;
  }
  
  try {
    await db.insert(episodes).values(episode).onDuplicateKeyUpdate({
      set: {
        title: episode.title,
        description: episode.description,
        publishedTimeText: episode.publishedTimeText,
        lengthSeconds: episode.lengthSeconds,
        views: episode.views,
        thumbnailUrl: episode.thumbnailUrl,
        isLiveNow: episode.isLiveNow,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert episode:", error);
    throw error;
  }
}

export async function bulkUpsertEpisodes(episodesList: InsertEpisode[]) {
  for (const episode of episodesList) {
    await upsertEpisode(episode);
  }
}

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create contact submission: database not available");
    return null;
  }

  try {
    const result = await db.insert(contactSubmissions).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create contact submission:", error);
    throw error;
  }
}
