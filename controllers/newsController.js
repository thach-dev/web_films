import { NewsModel } from "../models/newsModel.js";

export const NewsController = {

  async getNews(req, res) {
    try {
      const news = await NewsModel.getAll();
      return res.status(200).json(news);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async createNews(req, res) {
    try {
      const { title, description, image, hot } = req.body;

      const newNews = await NewsModel.create({
        title,
        description,
        image,
        hot,
        created_at: new Date()
      });

      return res.status(201).json(newNews);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

};