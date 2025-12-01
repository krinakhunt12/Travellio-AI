// Simple rule-based enrichment to avoid paid LLM usage.
// For dev and free usage, this provides basic amenities and descriptions from OSM tags.
const llm = {
  async enrichHotels(hotels) {
    try {
      return hotels.map((h) => {
        const tags = (h.raw && h.raw.tags) || {};
        // Build amenities list from tags
        const amenities = [];
        if (tags.wifi || /wifi|internet/i.test(JSON.stringify(tags))) amenities.push('Wi‑Fi');
        if (tags.parking) amenities.push('Parking');
        if (tags.breakfast || /breakfast/i.test(JSON.stringify(tags))) amenities.push('Breakfast');
        if (tags.pool || /pool/i.test(JSON.stringify(tags))) amenities.push('Pool');
        if (tags.restaurant) amenities.push('Restaurant');
        if (amenities.length === 0) amenities.push('Basic amenities');

        // Short description template
        const distKm = h.dist ? Math.round((h.dist/100))/10 : null; // one decimal km
        const descParts = [];
        if (tags.stars) descParts.push(`${tags.stars}-star`);
        if (tags['building'] || tags['brand']) descParts.push(tags['brand'] || tags['building']);
        if (distKm) descParts.push(`~${distKm} km from center`);
        const short_description = `${h.name}${descParts.length ? ' — ' + descParts.join(', ') : ''}. Great for travelers.`;

        const nightlife = tags['leisure'] || tags['amenity'] ? 'Nearby local spots and cafes.' : 'Quiet area.';
        const family_friendly = (tags['family'] || /family|children/i.test(JSON.stringify(tags))) ? 'Yes' : 'Yes';

        return {
          amenities: amenities.join(', '),
          short_description,
          nightlife,
          family_friendly
        };
      });
    } catch (err) {
      console.warn('LLM (fallback) enrich error', err?.message || err);
      return hotels.map(() => ({}));
    }
  }
};

module.exports = llm;
