import { faker } from '@faker-js/faker';
import { VALID_PLATFORMS } from '../utils/constants';
import { posts } from './store';


// Represents a post in the social media monitoring tool.
interface Post {
  post_id: number;
  platform: string;
  timestamp: string;
  content: string;
  user_id: string;
}

// Generates a new post with a unique ID and random data.
function generatePost(id: number): Post {
  return {
    post_id: id,
    platform: faker.helpers.arrayElement(VALID_PLATFORMS),
    timestamp: new Date().toISOString(),
    content: faker.lorem.sentence(),
    user_id: faker.string.uuid(),
  };
}

// Starts a process that generates new posts every second and adds them to the posts array.
function startGeneratingPosts() {
  let id = 1;
  setInterval(() => {
    const post: Post = generatePost(id++);
    posts.push(post)
  }, 1000);
}

export { startGeneratingPosts, Post };

