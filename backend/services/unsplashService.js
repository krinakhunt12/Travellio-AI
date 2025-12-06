import axios from "axios";

const unsplash = {
  async getPhoto(query) {
    try {
      const resp = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, per_page: 1 },
          headers: { Authorization: `Client-ID ${process.env.UNSPLASH_KEY}` }
        }
      );

      return resp.data.results?.[0]?.urls?.small || null;
    } catch {
      return null;
    }
  }
};

export default unsplash;
