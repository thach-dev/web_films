import {
  getAllStoriesModel,
  getStoryByIdModel,
  addStoryModel,
} from '../models/storyModel.js';

export async function getAllStories() {
  return await getAllStoriesModel();
}

export async function getStoryById(id) {
  return await getStoryByIdModel(id);
}

export async function addStory({ title, url, img }) {
  return await addStoryModel({ title, url, img });
}
