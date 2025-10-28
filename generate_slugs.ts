import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { episodes } from "./drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

async function generateSlugs() {
  console.log("Fetching all episodes...");
  const allEpisodes = await db.select().from(episodes);
  
  console.log(`Found ${allEpisodes.length} episodes`);
  
  for (const episode of allEpisodes) {
    if (!episode.title) {
      console.log(`Skipping episode ${episode.id} - no title`);
      continue;
    }
    
    const slug = slugify(episode.title);
    console.log(`Updating episode ${episode.id}: "${episode.title}" -> "${slug}"`);
    
    await db.update(episodes)
      .set({ slug })
      .where(eq(episodes.id, episode.id));
  }
  
  console.log("Done!");
  process.exit(0);
}

generateSlugs().catch(console.error);

