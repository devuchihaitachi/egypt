const fs = require('fs');
const path = require('path');
const https = require('https');

const fallbacks = {
  // Skipped from main script due to redirect or no default pageimage
  'pyramid_djoser': 'Pyramid of Djoser', // Prefixed pyramid
  'amun': 'Amun-Ra',
  'geb': 'Geb deity',
  'tefnut': 'Tefnut goddess',

  // Other fallbacks
  'abusimbel': 'Abu Simbel',
  'edfuPhilae': 'Philae Temple', // Specific search for Philae Temple
  'karnakLuxor': 'Karnak Temple', // Specific search for Karnak Temple
  'dendera': 'Dendera Temple',
  'hangingChurch': 'Hanging Church Cairo',
  'abuSerga': 'Church of Saints Sergius and Bacchus',
  'amrMosque': 'Mosque of Amr ibn al-As',
  'sinaiCastles': "Pharaoh's Island",
  'suezDam': 'Aswan High Dam',
  'aishaFahmy': 'Aisha Fahmy Palace',
  'oldCataract': 'Old Cataract Hotel',
  'whaleValley': 'Wadi al-Hitan',
  'oasisTombs': 'Temple of Hibis',
  'valleyKings': 'Valley of the Kings',
  'ghouri': 'Wekalet El Ghouri',
  'catherineNatrun': 'Saint Catherine\'s Monastery',
  'sultanHassanRifai': 'Mosque-Madrasa of Sultan Hasan',
  'tanis': 'Tanis',
  'amarna': 'Amarna',
  'suhaymi': 'Bayt al-Suhaymi'
};

const outputDir = path.join(__dirname, '..', 'public', 'images', 'items');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

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

async function searchAndDownload(id, queryText) {
  console.log(`[SEARCHING] Fallback for ${id} using query "${queryText}"...`);
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(queryText)}&format=json`;
  try {
    const searchRes = await getJson(searchUrl);
    if (!searchRes.query || !searchRes.query.search || searchRes.query.search.length === 0) {
      console.warn(`[WARNING] No search results for "${queryText}"`);
      return;
    }

    const topTitle = searchRes.query.search[0].title;
    console.log(`[INFO] Top search result for "${queryText}": "${topTitle}"`);

    const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(topTitle)}&prop=pageimages&format=json&pithumbsize=1000`;
    const pageRes = await getJson(pageUrl);
    const pages = pageRes.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === '-1' || !pages[pageId].thumbnail) {
      console.warn(`[WARNING] No thumbnail found for page "${topTitle}"`);
      return;
    }

    const imgUrl = pages[pageId].thumbnail.source;
    const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(imgUrl)}`;
    const destPath = path.join(outputDir, `${id}.jpg`);

    console.log(`[DOWNLOADING] ${id}.jpg via proxy...`);
    await downloadFile(proxyUrl, destPath);
    console.log(`[SUCCESS] Saved fallback ${id}.jpg`);
  } catch (err) {
    console.error(`[ERROR] Fallback failed for ${id}:`, err.message);
  }
}

async function run() {
  const entries = Object.entries(fallbacks);
  console.log(`Starting fallback download for ${entries.length} items...`);
  for (let i = 0; i < entries.length; i++) {
    const [id, queryText] = entries[i];
    await searchAndDownload(id, queryText);
    await new Promise(resolve => setTimeout(resolve, 800)); // sleep to be nice
  }
  console.log('Fallback downloads complete!');
}

run();
