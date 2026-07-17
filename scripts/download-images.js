const fs = require('fs');
const path = require('path');
const https = require('https');

// Mappings of ID to Wikipedia page titles
const mappings = {
  // Pyramids (6)
  'khufu': 'Great Pyramid of Giza',
  'khafre': 'Pyramid of Khafre',
  'menkaure': 'Pyramid of Menkaure',
  'djoser': 'Step Pyramid of Djoser',
  'bent': 'Bent Pyramid',
  'red': 'Red Pyramid',

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
  'sneferu': 'Sneferu',
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
  'karnakLuxor': 'Karnak Temple',
  'valleyKings': 'Valley of the Kings',
  'abusimbel': 'Abu Simbel temples',
  'edfuPhilae': 'Philae',
  'dendera': 'Dendera Temple',
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

const outputDir = path.join(__dirname, '..', 'public', 'images', 'items');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'EgyptTourismWebsiteImageDownloader/1.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'EgyptTourismWebsiteImageDownloader/1.0' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get image: Status Code ${res.statusCode}`));
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

async function downloadImageFor(id, title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1000`;
  try {
    const res = await getJson(url);
    const pages = res.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1' || !pages[pageId].thumbnail) {
      console.warn(`[WARNING] No thumbnail found for ${id} (Title: ${title}). Trying fallback search...`);
      // Try search API as fallback
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(title)}&format=json`;
      const searchRes = await getJson(searchUrl);
      if (searchRes.query.search && searchRes.query.search.length > 0) {
        const topTitle = searchRes.query.search[0].title;
        console.log(`[INFO] Found search fallback title "${topTitle}" for "${title}"`);
        return downloadImageFor(id, topTitle);
      }
      throw new Error(`No image metadata found for page ${title}`);
    }

    const imgUrl = pages[pageId].thumbnail.source;
    const destPath = path.join(outputDir, `${id}.jpg`);
    console.log(`[DOWNLOADING] ${id} from: ${imgUrl}`);
    await downloadFile(imgUrl, destPath);
    console.log(`[SUCCESS] Saved ${id}.jpg`);
  } catch (err) {
    console.error(`[ERROR] Failed to download image for ${id} (${title}):`, err.message);
  }
}

async function run() {
  const entries = Object.entries(mappings);
  console.log(`Starting download of ${entries.length} images...`);
  
  // We process them sequentially to avoid hammering the Wikipedia API
  for (let i = 0; i < entries.length; i++) {
    const [id, title] = entries[i];
    console.log(`[Progress ${i + 1}/${entries.length}] Processing ${id}...`);
    await downloadImageFor(id, title);
    // Add small sleep to be nice to API
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  console.log('All image downloads complete!');
}

run();
