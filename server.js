import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Enhanced CATEGORIES for Shop & Admin
const SHOP_CATEGORIES = [
  'Solar Panels', 
  'Solar Inverters', 
  'Solar Batteries', 
  'Solar Pumps', 
  'Solar Street Lights', 
  'Solar Monitoring Systems',
  'Solar Combos',
  'Solar Services'
];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes go here... (omitted for brevity in this task but they exist in the file)

// The catch-all handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Initialize SQLite database
const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'data/urja.db');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}




const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    capacity TEXT,
    brand TEXT,
    description TEXT,
    specifications TEXT,
    image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    location TEXT,
    capacity TEXT,
    type TEXT,
    description TEXT,
    image TEXT,
    year TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS kusums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    benefits TEXT,
    subsidyAvailable INTEGER,
    image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    interest TEXT,
    message TEXT,
    status TEXT DEFAULT 'New',
    date TEXT,
    time TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    rating INTEGER,
    review TEXT,
    status TEXT DEFAULT 'Pending',
    date TEXT,
    source TEXT DEFAULT 'Website'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )`);

  // Enhanced seed data for "Million Dollar Project"
  db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
    if (row && row.count < 5) {
      console.log('Seeding massive high-quality product/service/combo data...');
      const productsData = [
        // PANELS
        ['Adani 550W Mono PERC Panel', 'Solar Panels', '550W', 'Adani Solar', 'High-performance Mono PERC module with 21.5% efficiency and multi-busbar technology.', JSON.stringify(['550W Output', '21.5% Efficiency', '12 Year Warranty', 'PID Resistant']), 'https://www.adani.com/-/media/Project/Adani/Solar/Product-Images/Shunt-550W.png'],
        ['Vikram Solar Somera 450W', 'Solar Panels', '450W', 'Vikram Solar', 'Reliable mono-crystalline panels designed for extreme Indian weather conditions.', JSON.stringify(['450W Capacity', 'High Yield', 'Anti-reflective glass', '27 Year Linear Warranty']), 'https://www.vikramsolar.com/wp-content/uploads/2021/05/somera-grand.png'],
        ['Tata Power Solaro 545W', 'Solar Panels', '545W', 'Tata Power', 'Trust of Tata with maximum power density for limited roof spaces.', JSON.stringify(['Tata Quality', 'High Reliability', 'IP68 Junction Box', 'Advanced Mono Tech']), 'https://www.tatapowersolar.com/wp-content/uploads/2020/06/solar-panel-module.png'],

        // INVERTERS
        ['Growatt 5kW Hybrid Inverter', 'Solar Inverters', '5kW', 'Growatt', 'Smart hybrid inverter with dual MPPT and efficient battery charging logic.', JSON.stringify(['5kW Output', 'Dual MPPT', 'Wi-Fi Monitoring', '5 Year Global Warranty']), 'https://www.ginlong.com/uploads/2022/04/111536544528.png'],
        ['Microtek 10kW On-Grid', 'Solar Inverters', '10kW', 'Microtek', 'Heavy-duty industrial on-grid inverter with advanced protection features.', JSON.stringify(['10kW Capacity', '98.5% Efficiency', 'LCD Display', 'Made in India']), 'https://www.microtekdirect.com/media/catalog/product/o/g/og10kw.png'],

        // COMBOS (The "Logical" part)
        ['Starter Home Bundle (3kW)', 'Solar Combos', '3kW System', 'Urja Vision', 'Complete 3kW solar system with 545W Tata panels, Growatt inverter, and structures.', JSON.stringify(['6 Tata 545W Panels', '3.5kVA Inverter', '2 Tall Tubular Batteries', 'Full Installation included']), 'https://static.wixstatic.com/media/nsplsh_383758416d6c4d754f7341~mv2.jpg'],
        ['Agriculture Pumping Combo', 'Solar Combos', '5HP Pump', 'Kirloskar/Urja', 'High-discharge 5HP DC solar pump kit with tracking structures and 5kW panels.', JSON.stringify(['5HP DC Pump', '8 Vikram 450W Panels', 'Solar Tracking Frame', '90% PM Kusum Subsidy']), 'https://5.imimg.com/data5/YI/NB/MY-28269785/solar-irrigation-pump-500x500.jpg'],
        ['Premium Independence Suite', 'Solar Combos', '10kW + Lithium', 'Executive Series', 'Full 10kW backup for large homes. Includes 10kWh Lithium storage & remote monitoring.', JSON.stringify(['20 Adani 550W Panels', '10kW Hybrid Inverter', '10kWh Lithium Stack', 'Smart APP Access']), 'https://www.renogy.com/product_images/products/RNG-KIT-PREMIUM100D-BC/1.jpg'],

        // SERVICES
        ['Solar Health Audit', 'Solar Services', 'Standard', 'ELSxGlobal', 'Scientific testing of panels, thermal imaging, and rewiring for 40% efficiency boost.', JSON.stringify(['Thermal Imaging', 'Voc/Isc Testing', 'Cleaning & Polishing', 'Performance Report']), 'https://elsxglobal.com/wp-content/uploads/2023/10/solar-audit.jpg'],
        ['Expert Structural Installation', 'Solar Services', 'Premium', 'Urja Engineering', 'HDGI structural mounting with concrete piling for wind stability up to 150 kmph.', JSON.stringify(['Wind Load Calc', 'HDGI Materials', 'Anti-Corrosion Pile', 'Safety Anchors']), 'https://elsxglobal.com/wp-content/uploads/2023/10/solar-structure.jpg']
      ];
      const stmt = db.prepare('INSERT INTO products (name, category, capacity, brand, description, specifications, image) VALUES (?,?,?,?,?,?,?)');
      productsData.forEach(p => stmt.run(p));
      stmt.finalize();
    }
  });

  db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
    if (row && row.count < 3) {
      console.log('Seeding initial projects data...');
      const initProjects = [
        ['50kW Industrial Solar Plant', 'Jabalpur Industrial Area', '50 kW', 'Commercial', 'Large-scale solar installation for manufacturing unit with annual savings of ₹8 lakhs', 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800', '2024'],
        ['Residential Rooftop Solar', 'Napier Town, Jabalpur', '5 kW', 'Residential', 'Modern home with complete solar solution reducing electricity bills by 90%', 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800', '2024'],
        ['Hospital Solar System', 'Jabalpur', '30 kW', 'Healthcare', 'Reliable solar power solution for 24/7 hospital operations', 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800', '2023']
      ];
      const stmt = db.prepare('INSERT INTO projects (title, location, capacity, type, description, image, year) VALUES (?,?,?,?,?,?,?)');
      initProjects.forEach(p => stmt.run(p));
      stmt.finalize();
    }
  });

  db.get('SELECT COUNT(*) as count FROM kusums', (err, row) => {
    if (row && row.count === 0) {
      console.log('Seeding initial kusums data...');
      const initKusums = [
        ['Solar Irrigation Pumps', 'Replace diesel pumps with solar-powered irrigation systems and save lakhs on fuel costs', JSON.stringify(['Zero electricity bills','No diesel expenses','Government subsidy up to 90%','Pump anywhere, anytime','25-year lifespan']), 1, 'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=600']
      ];
      const stmt = db.prepare('INSERT INTO kusums (title, description, benefits, subsidyAvailable, image) VALUES (?,?,?,?,?)');
      initKusums.forEach(p => stmt.run(p));
      stmt.finalize();
    }
  });

  // Seed initial reviews
  db.get('SELECT COUNT(*) as count FROM reviews', (err, row) => {
    if (row && row.count === 0) {
      console.log('Seeding initial reviews...');
      const reviewsData = [
        ['Ravi Sharma', 5, 'Urja Vision installed a 5kW system at my home. Exceptional service and logical planning!', 'Mar 10, 2024', 'Google'],
        ['Priya Patel', 4, 'Very professional team. The installation was smooth and the savings are real.', 'Mar 12, 2024', 'Website']
      ];
      const stmt = db.prepare('INSERT INTO reviews (name, rating, review, date, source) VALUES (?,?,?,?,?)');
      reviewsData.forEach(r => stmt.run(r));
      stmt.finalize();
    }
  });

  // Seed initial site settings (Hero Banner)
  db.get('SELECT COUNT(*) as count FROM site_settings', (err, row) => {
    if (row && row.count === 0) {
      console.log('Seeding initial site settings...');
      const settings = [
        ['hero_title', 'Powering Your Future with Solar Brilliance'],
        ['hero_subtitle', 'Urja Vision delivers high-performance solar solutions for homes, industries, and farms across India.'],
        ['hero_banner', 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        ['site_tagline', 'Powering Your Future with Solar'],
        ['contact_phone', '+91 72473 91595'],
        ['contact_email', 'info@urjavision.com'],
        ['whatsapp_number', '917247391595']
      ];
      const stmt = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?)');
      settings.forEach(s => stmt.run(s));
      stmt.finalize();
    }
  });
});

// APIs for Products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Parse JSON specific fields
    const formatted = rows.map(r => ({...r, specifications: r.specifications ? JSON.parse(r.specifications) : []}));
    res.json(formatted);
  });
});

app.post('/api/products', (req, res) => {
  const { name, category, capacity, brand, description, specifications, image } = req.body;
  db.run('INSERT INTO products (name, category, capacity, brand, description, specifications, image) VALUES (?,?,?,?,?,?,?)', 
    [name, category, capacity, brand, description, JSON.stringify(specifications || []), image], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
  });
});

app.delete('/api/products/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', req.params.id, function(err) {
     if (err) return res.status(500).json({ error: err.message });
     res.json({ deleted: this.changes });
  });
});

// APIs for Projects
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/projects', (req, res) => {
  const { title, location, capacity, type, description, image, year } = req.body;
  db.run('INSERT INTO projects (title, location, capacity, type, description, image, year) VALUES (?,?,?,?,?,?,?)', 
    [title, location, capacity, type, description, image, year], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
  });
});

app.delete('/api/projects/:id', (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', req.params.id, function(err) {
     if (err) return res.status(500).json({ error: err.message });
     res.json({ deleted: this.changes });
  });
});

// APIs for Kusum
app.get('/api/kusums', (req, res) => {
  db.all('SELECT * FROM kusums', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map(r => ({...r, benefits: r.benefits ? JSON.parse(r.benefits) : [], subsidyAvailable: r.subsidyAvailable === 1}));
    res.json(formatted);
  });
});

app.post('/api/kusums', (req, res) => {
  const { title, description, benefits, subsidyAvailable, image } = req.body;
  db.run('INSERT INTO kusums (title, description, benefits, subsidyAvailable, image) VALUES (?,?,?,?,?)', 
    [title, description, JSON.stringify(benefits || []), subsidyAvailable ? 1 : 0, image], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
  });
});

app.delete('/api/kusums/:id', (req, res) => {
  db.run('DELETE FROM kusums WHERE id = ?', req.params.id, function(err) {
     if (err) return res.status(500).json({ error: err.message });
     res.json({ deleted: this.changes });
  });
});

// APIs for Enquiries
app.get('/api/enquiries', (req, res) => {
  db.all('SELECT * FROM enquiries ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/enquiries', (req, res) => {
  const { name, email, phone, city, interest, message } = req.body;
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  
  db.run('INSERT INTO enquiries (name, email, phone, city, interest, message, date, time) VALUES (?,?,?,?,?,?,?,?)', 
    [name, email, phone, city, interest, message, date, time], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
  });
});

app.put('/api/enquiries/:id', (req, res) => {
  const { status } = req.body;
  db.run('UPDATE enquiries SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

app.delete('/api/enquiries/:id', (req, res) => {
  db.run('DELETE FROM enquiries WHERE id = ?', req.params.id, function(err) {
     if (err) return res.status(500).json({ error: err.message });
     res.json({ deleted: this.changes });
  });
});

// APIs for Reviews
app.get('/api/reviews', (req, res) => {
  db.all('SELECT * FROM reviews ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/reviews', (req, res) => {
  const { name, rating, review } = req.body;
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  db.run('INSERT INTO reviews (name, rating, review, date) VALUES (?,?,?,?)', [name, rating, review, date], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

app.put('/api/reviews/:id', (req, res) => {
  const { status } = req.body;
  db.run('UPDATE reviews SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

app.delete('/api/reviews/:id', (req, res) => {
  db.run('DELETE FROM reviews WHERE id = ?', req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// APIs for Settings
app.get('/api/settings', (req, res) => {
  db.all('SELECT * FROM site_settings', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const settings = {};
    rows.forEach(r => settings[r.key] = r.value);
    res.json(settings);
  });
});

app.post('/api/settings', (req, res) => {
  const settings = req.body;
  const keys = Object.keys(settings);
  let count = 0;
  
  keys.forEach(key => {
    db.run('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)', [key, settings[key]], (err) => {
      count++;
      if (count === keys.length) {
        res.json({ success: true });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Express API Server running on http://localhost:${port}`);
});
