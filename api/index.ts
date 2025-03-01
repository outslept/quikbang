import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const defaultSearch = 'https://www.google.com/search?q=';

let bangIndex = {};
try {
  const bangIndexPath = path.join(__dirname, '../data/bang-index.json');
  if (fs.existsSync(bangIndexPath)) {
    bangIndex = JSON.parse(fs.readFileSync(bangIndexPath, 'utf-8'));
  } else {
    console.error('Bang index file not found:', bangIndexPath);
  }
} catch (error) {
  console.error('Error loading bang index:', error);
}

function processBangSearch(query) {
  if (!query) return null;
  
  const bangRegex = /^!(\w+)(?:\s+(.+))?$/;
  const match = query.match(bangRegex);

  if (match) {
    const bangTag = match[1];
    const searchTerm = match[2] || '';
    
    const bang = bangIndex[bangTag];
    if (bang) {
      const url = bang.u.replace('{{{s}}}', encodeURIComponent(searchTerm));
      return url;
    }
  }

  return null;
}

app.use((req, res, next) => {
  const query = req.query.q;
  const queryString = typeof query === 'string' ? query : '';
  
  if (queryString) {
    const redirectUrl = processBangSearch(queryString);
    
    if (redirectUrl) {
      return res.redirect(redirectUrl);
    }
    
    return res.redirect(defaultSearch + encodeURIComponent(queryString));
  }
  
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/data', express.static(path.join(__dirname, '../data')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

export default function handler(req, res) {
  app(req, res);
}
