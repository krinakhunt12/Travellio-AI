import axios from "axios";

const unsplash = {
  async getPhoto(query) {
    try {
      const url = "https://api.unsplash.com/search/photos";
      const resp = await axios.get(url, {
        params: { query, per_page: 1 },
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
      });

      return resp.data.results?.[0]?.urls?.small || null;
    } catch {
      return null;
    }
  }
};

export default unsplash;
