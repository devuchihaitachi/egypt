const fs = require('fs');
const path = require('path');
const https = require('https');

// Mappings of ID to Wikipedia page titles
const mappings = {
  // Pyramids (6) - Prefixed to prevent collision with rulers
  'pyramid_khufu': 'Great Pyramid of Giza',
  'pyramid_khafre': 'Pyramid of Khafre',
  'pyramid_menkaure': 'Pyramid of Menkaure',
  'pyramid_djoser': 'Step Pyramid of Djoser',
  'pyramid_bent': 'Bent Pyramid',
  'pyramid_red': 'Red Pyramid',

  // Gods / Deities (20)
  'ra': 'Ra',
  'osiris': 'Osiris',
  'isis': 'Isis',
  'horus': 'Horus',
  'set': 'Set (deity)',
  'anubis': 'Anubis',
  'thoth': 'Thoth',
  'amun': 'Amun',
  'hathor': 'Hathor',
  'bastet': 'Bastet',
  'sekhmet': 'Sekhmet',
  'maat': 'Maat',
  'ptah': 'Ptah',
  'nut': 'Nut (goddess)',
  'geb': 'Geb',
  'khnum': 'Khnum',
  'sobek': 'Sobek',
  'tefnut': 'Tefnut',
  'nephthys': 'Nephthys',
  'aten': 'Aten',

  // Rulers (20)
  'narmer': 'Narmer',
  'djoser': 'Djoser', // Ruler statue
  'sneferu': 'Sneferu',
  'khufu': 'Khufu', // Ruler tiny ivory statue
  'khafre': 'Khafre', // Ruler diorite statue
  'pepi2': 'Pepi II Neferkare',
  'mentuhotep2': 'Mentuhotep II',
  'ahmose1': 'Ahmose I',
  'thutmose1': 'Thutmose I',
  'hatshepsut': 'Hatshepsut',
  'thutmose3': 'Thutmose III',
  'amenhotep3': 'Amenhotep III',
  'akhenaten': 'Akhenaten',
  'tutankhamun': 'Tutankhamun',
  'seti1': 'Seti I',
  'ramesses2': 'Ramesses II',
  'merneptah': 'Merneptah',
  'ramesses3': 'Ramesses III',
  'ptolemy1': 'Ptolemy I Soter',
  'cleopatra7': 'Cleopatra',

  // Monuments (31)
  'sphinx': 'Great Sphinx of Giza',
  'karnakLuxor': 'Karnak', // Point to Karnak temple complex
  'valleyKings': 'Valley of the Kings',
  'abusimbel': 'Abu Simbel temples',
  'edfuPhilae': 'Temple of Edfu', // Point to Edfu temple specifically
  'dendera': 'Dendera Temple Complex',
  'komOmbo': 'Temple of Kom Ombo',
  'tanis': 'Tanis',
  'amarna': 'Amarna',
  'qaitbayPompey': 'Citadel of Qaitbay',
  'komShoqafa': 'Catacombs of Kom El Shoqafa',
  'hangingChurch': 'The Hanging Church',
  'abuSerga': 'Church of Saints Sergius and Bacchus',
  'babylonFort': 'Babylon Fortress',
  'catherineNatrun': 'Saint Catherine\'s Monastery',
  'amrMosque': 'Mosque of Amr ibn al-As',
  'azharMoizz': 'Al-Azhar Mosque',
  'citadelSaladin': 'Cairo Citadel',
  'ibnTulun': 'Mosque of Ibn Tulun',
  'sinaiCastles': 'Pharaoh\'s Island',
  'suhaymi': 'Bayt al-Suhaymi',
  'sultanHassanRifai': 'Mosque-Madrasa of Sultan Hasan',
  'ghouri': 'Wekalet El Ghouri',
  'abdeenManial': 'Abdeen Palace',
  'baronPalace': 'Baron Empain Palace',
  'suezDam': 'Aswan Dam',
  'montazah': 'Montaza Palace',
  'aishaFahmy': 'Aisha Fahmy Palace',
  'oldCataract': 'Sofitel Legend Old Cataract Aswan',
  'whaleValley': 'Wadi al-Hitan',
  'oasisTombs': 'Temple of Hibis'
};

// Create a reverse mapping of Wikipedia Title -> ID
const reverseMappings = {};
for (const [id, title] of Object.entries(mappings)) {
  reverseMappings[title.toLowerCase()] = id;
}

const outputDir = path.join(__dirname, '..', 'public', 'images', 'items');

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'EgyptHistoryMuseumProject/1.0 (https://github.com/my-project; admin@example.com) NodeJsClient/1.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${data.substring(0, 100)}`));
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: Status ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  // Clean output directory to remove all previously downloaded images
  console.log(`Cleaning output directory: ${outputDir}`);
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const titles = Object.values(mappings);
  const batchSize = 40;
  const imageRequests = []; // Array of { id, url } to download

  console.log(`Querying Wikipedia API in batches for ${titles.length} pages...`);

  for (let i = 0; i < titles.length; i += batchSize) {
    const batch = titles.slice(i, i + batchSize);
    const titlesString = batch.map(t => encodeURIComponent(t)).join('|');
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${titlesString}&prop=pageimages&format=json&pithumbsize=1000`;

    console.log(`Querying batch ${Math.floor(i / batchSize) + 1}...`);
    try {
      const res = await getJson(apiUrl);
      if (!res.query || !res.query.pages) {
        console.warn('Invalid query response for batch', batch);
        continue;
      }

      // Build mapping normalization lookup
      const normalizations = {};
      if (res.query.normalized) {
        for (const item of res.query.normalized) {
          normalizations[item.to.toLowerCase()] = item.from.toLowerCase();
        }
      }

      // Build redirects lookup
      const redirects = {};
      if (res.query.redirects) {
        for (const item of res.query.redirects) {
          redirects[item.to.toLowerCase()] = item.from.toLowerCase();
        }
      }

      const pages = res.query.pages;
      for (const pageId of Object.keys(pages)) {
        const page = pages[pageId];
        if (pageId === '-1' || !page.thumbnail) {
          console.warn(`[WARNING] No thumbnail found for: "${page.title}"`);
          continue;
        }

        // Trace back the title to match our mappings ID
        let matchedTitle = page.title.toLowerCase();
        
        // Apply redirects if any
        if (redirects[matchedTitle]) {
          matchedTitle = redirects[matchedTitle];
        }
        
        // Apply normalizations if any
        if (normalizations[matchedTitle]) {
          matchedTitle = normalizations[matchedTitle];
        }

        const id = reverseMappings[matchedTitle];
        if (id) {
          imageRequests.push({ id, url: page.thumbnail.source, title: page.title });
        } else {
          console.warn(`[WARNING] Could not strictly map page title "${page.title}" (matched: "${matchedTitle}") to any ID.`);
        }
      }
    } catch (err) {
      console.error('Error fetching batch:', err.message);
    }

    // Small delay between API requests
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  console.log(`Starting download of ${imageRequests.length} strictly resolved images via proxy...`);
  for (let i = 0; i < imageRequests.length; i++) {
    const { id, url, title } = imageRequests[i];
    const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
    const destPath = path.join(outputDir, `${id}.jpg`);

    console.log(`[${i + 1}/${imageRequests.length}] Downloading ${id}.jpg ("${title}") via proxy...`);
    try {
      await downloadFile(proxyUrl, destPath);
      console.log(`[SUCCESS] Saved ${id}.jpg`);
    } catch (err) {
      console.error(`[ERROR] Failed downloading ${id}.jpg:`, err.message);
    }
    // Rate limit delay to be nice to proxy
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('All exact image downloads complete!');
}

run();
