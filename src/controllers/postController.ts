import { Request, Response } from 'express';
import { matchesKeyword, sendResponse } from '../utils/helpers';
import { keywordsSet, posts } from '../data/store';
import { VALID_PLATFORMS } from '../utils/constants';

// GET /api/posts?platform={platform}&startDate={startDate}&endDate={endDate}
export const listPosts = (req: Request, res: Response) => {
  // Get query parameters
  const { platform, startDate, endDate } = req.query as {
    platform?: string;
    startDate?: string;
    endDate?: string;
  };

  // Validate platform
  if (platform && !VALID_PLATFORMS.includes(platform)) {
    return sendResponse(res, 400, { message: "Invalid platform" });
  }

  // Validate startDate and endDate
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && isNaN(start.getTime())) {
    return sendResponse(res, 400, { message: "Invalid startDate" });
  }

  if (end && isNaN(end.getTime())) {
    return sendResponse(res, 400, { message: "Invalid endDate" });
  }

  // Validate endDate is after startDate
  if (start && end && end < start) {
    return sendResponse(res, 400, { message: "endDate cannot be earlier than startDate" });
  }

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const postDate = new Date(post.timestamp);
    return (
      (!platform || post.platform === platform) &&
      (!start || postDate >= start) &&
      (!end || postDate <= end) &&
      matchesKeyword(post.content, keywordsSet)
    );
  });

  sendResponse(res, 200, filteredPosts);
};

// GET /api/updates
let lastCheckedIndex = 0;

export const listUpdates = (req: Request, res: Response) => {
  const newPostIndex = posts.findIndex((post, index) => index >= lastCheckedIndex);

  if (newPostIndex !== -1) {
    // Get new posts since the last check
    const newPosts = posts.slice(newPostIndex);
    // Filter posts by keywords
    const keywordFilteredPosts = newPosts.filter(post => matchesKeyword(post.content, keywordsSet));
    // Update lastCheckedIndex
    lastCheckedIndex = posts.length;
    sendResponse(res, 200, keywordFilteredPosts);
  } else {
    sendResponse(res, 200, []);
  }
};

export { posts };
