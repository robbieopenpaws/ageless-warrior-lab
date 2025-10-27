import { callDataApi } from "./server/_core/dataApi";
import { bulkUpsertEpisodes } from "./server/db";

async function syncEpisodes() {
  console.log("Starting episode sync from YouTube...");
  
  const channelId = "UCRObXaXZjKl6Pnys4f4ILNQ";
  const allVideos: any[] = [];
  
  let cursor: string | undefined = undefined;
  let pageCount = 0;
  
  // Fetch all videos from channel
  do {
    const queryParams: any = {
      id: channelId,
      filter: 'videos_latest',
      hl: 'en',
      gl: 'US'
    };
    
    if (cursor) {
      queryParams.cursor = cursor;
    }
    
    console.log(`Fetching page ${pageCount + 1}...`);
    const response = await callDataApi('Youtube/get_channel_videos', {
      query: queryParams
    }) as any;
    
    const contents = response.contents || [];
    for (const item of contents) {
      if (item.type === 'video') {
        const video = item.video;
        const thumbnails = video.thumbnails || [];
        const thumbnailUrl = thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url : null;
        
        allVideos.push({
          videoId: video.videoId,
          title: video.title,
          description: video.descriptionSnippet || '',
          publishedTimeText: video.publishedTimeText,
          lengthSeconds: video.lengthSeconds,
          views: video.stats?.views || 0,
          thumbnailUrl,
          isLiveNow: video.isLiveNow ? 1 : 0
        });
      }
    }
    
    cursor = response.cursorNext as string | undefined;
    pageCount++;
  } while (cursor && pageCount < 5);
  
  console.log(`Found ${allVideos.length} videos. Saving to database...`);
  
  // Save to database
  await bulkUpsertEpisodes(allVideos);
  
  console.log("Sync complete!");
  return { success: true, count: allVideos.length };
}

syncEpisodes()
  .then((result) => {
    console.log("Result:", result);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

