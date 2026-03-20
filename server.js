import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── Static Files ────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Database Setup ───────────────────────────────────────────────────────────
const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'data', 'urja.db');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);
console.log('✅ Connected to SQLite database at:', dbPath);

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

// ── Schema ───────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, category TEXT, capacity TEXT, brand TEXT,
    description TEXT, specifications TEXT, image TEXT
  );
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT, location TEXT, capacity TEXT, type TEXT,
    description TEXT, image TEXT, year TEXT
  );
  CREATE TABLE IF NOT EXISTS kusums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT, description TEXT, benefits TEXT,
    subsidyAvailable INTEGER, image TEXT
  );
  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, email TEXT, phone TEXT, city TEXT,
    interest TEXT, message TEXT, status TEXT DEFAULT 'New',
    date TEXT, time TEXT
  );
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, rating INTEGER, review TEXT,
    status TEXT DEFAULT 'Pending', date TEXT, source TEXT DEFAULT 'Website'
  );
  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY, value TEXT
  );
`);

// ── Seed Data ────────────────────────────────────────────────────────────────
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (productCount.count < 5) {
  console.log('🌱 Seeding products...');
  const insertProduct = db.prepare(
    'INSERT INTO products (name, category, capacity, brand, description, specifications, image) VALUES (?,?,?,?,?,?,?)'
  );
  const products = [
    ['Adani 550W Mono PERC Panel', 'Solar Panels', '550W', 'Adani Solar', 'High-performance Mono PERC module with 21.5% efficiency.', JSON.stringify(['550W Output', '21.5% Efficiency', '12 Year Warranty', 'PID Resistant']), 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Vikram Solar Somera 450W', 'Solar Panels', '450W', 'Vikram Solar', 'Reliable mono-crystalline panels for extreme Indian weather.', JSON.stringify(['450W Capacity', 'High Yield', 'Anti-reflective glass', '27 Year Warranty']), 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Tata Power Solaro 545W', 'Solar Panels', '545W', 'Tata Power', 'Trust of Tata with maximum power density for limited roof spaces.', JSON.stringify(['Tata Quality', 'High Reliability', 'IP68 Junction Box', 'Advanced Mono Tech']), 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Growatt 5kW Hybrid Inverter', 'Solar Inverters', '5kW', 'Growatt', 'Smart hybrid inverter with dual MPPT.', JSON.stringify(['5kW Output', 'Dual MPPT', 'Wi-Fi Monitoring', '5 Year Warranty']), 'https://images.pexels.com/photos/9875427/pexels-photo-9875427.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Microtek 10kW On-Grid', 'Solar Inverters', '10kW', 'Microtek', 'Heavy-duty industrial on-grid inverter.', JSON.stringify(['10kW Capacity', '98.5% Efficiency', 'LCD Display', 'Made in India']), 'https://images.pexels.com/photos/4297357/pexels-photo-4297357.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Starter Home Bundle (3kW)', 'Solar Combos', '3kW System', 'Urja Vision', 'Complete 3kW solar system with panels, inverter, and structures.', JSON.stringify(['6 x 545W Panels', '3.5kVA Inverter', '2 Batteries', 'Full Installation']), 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Agriculture Pumping Combo', 'Solar Combos', '5HP Pump', 'Kirloskar/Urja', '5HP DC solar pump kit with tracking structures and 5kW panels.', JSON.stringify(['5HP DC Pump', '8 x 450W Panels', 'Solar Tracking Frame', '90% PM Kusum Subsidy']), 'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=600'],
    ['Premium Independence Suite', 'Solar Combos', '10kW + Lithium', 'Executive Series', '10kW backup for large homes with Lithium storage.', JSON.stringify(['20 x 550W Panels', '10kW Hybrid Inverter', '10kWh Lithium Stack', 'Smart APP Access']), 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Solar Health Audit', 'Solar Services', 'Standard', 'Urja Engineering', 'Thermal imaging, testing, cleaning for 40% efficiency boost.', JSON.stringify(['Thermal Imaging', 'Voc/Isc Testing', 'Cleaning & Polishing', 'Performance Report']), 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['Expert Structural Installation', 'Solar Services', 'Premium', 'Urja Engineering', 'HDGI structural mounting with concrete piling.', JSON.stringify(['Wind Load Calc', 'HDGI Materials', 'Anti-Corrosion Pile', 'Safety Anchors']), 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ];
  const insertMany = db.transaction((rows) => { for (const r of rows) insertProduct.run(r); });
  insertMany(products);
}

const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
if (projectCount.count < 3) {
  console.log('🌱 Seeding projects...');
  const insertProject = db.prepare('INSERT INTO projects (title, location, capacity, type, description, image, year) VALUES (?,?,?,?,?,?,?)');
  const projects = [
    ['50kW Industrial Solar Plant', 'Jabalpur Industrial Area', '50 kW', 'Commercial', 'Large-scale installation for manufacturing with annual savings of ₹8 lakhs', 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800', '2024'],
    ['Residential Rooftop Solar', 'Napier Town, Jabalpur', '5 kW', 'Residential', 'Modern home solar solution reducing electricity bills by 90%', 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800', '2024'],
    ['Hospital Solar System', 'Jabalpur', '30 kW', 'Healthcare', 'Reliable solar power for 24/7 hospital operations', 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800', '2023'],
  ];
  const insertMany = db.transaction((rows) => { for (const r of rows) insertProject.run(r); });
  insertMany(projects);
}

const kusumCount = db.prepare('SELECT COUNT(*) as count FROM kusums').get();
if (kusumCount.count === 0) {
  console.log('🌱 Seeding kusums...');
  db.prepare('INSERT INTO kusums (title, description, benefits, subsidyAvailable, image) VALUES (?,?,?,?,?)').run(
    'Solar Irrigation Pumps', 'Replace diesel pumps with solar-powered irrigation systems',
    JSON.stringify(['Zero electricity bills','No diesel expenses','Government subsidy up to 90%','25-year lifespan']),
    1, 'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=600'
  );
}

const reviewCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get();
if (reviewCount.count === 0) {
  console.log('🌱 Seeding reviews...');
  const insertReview = db.prepare('INSERT INTO reviews (name, rating, review, date, source) VALUES (?,?,?,?,?)');
  insertReview.run('Ravi Sharma', 5, 'Urja Vision installed a 5kW system at my home. Exceptional service!', 'Mar 10, 2024', 'Google');
  insertReview.run('Priya Patel', 4, 'Very professional team. The installation was smooth and savings are real.', 'Mar 12, 2024', 'Website');
}

const settingsCount = db.prepare('SELECT COUNT(*) as count FROM site_settings').get();
if (settingsCount.count === 0) {
  console.log('🌱 Seeding site settings...');
  const insertSetting = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?)');
  const settings = [
    ['hero_title', 'Powering Your Future with Solar Brilliance'],
    ['hero_subtitle', 'Urja Vision delivers high-performance solar solutions for homes, industries, and farms across India.'],
    ['hero_banner', 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    ['site_tagline', 'Powering Your Future with Solar'],
    ['contact_phone', '+91 72473 91595'],
    ['contact_email', 'info@urjavision.com'],
    ['whatsapp_number', '917247391595'],
  ];
  const insertMany = db.transaction((rows) => { for (const r of rows) insertSetting.run(r); });
  insertMany(settings);
}

// ── API: Products ─────────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM products').all();
    res.json(rows.map(r => ({ ...r, specifications: r.specifications ? JSON.parse(r.specifications) : [] })));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/products', (req, res) => {
  try {
    const { name, category, capacity, brand, description, specifications, image } = req.body;
    const result = db.prepare('INSERT INTO products (name, category, capacity, brand, description, specifications, image) VALUES (?,?,?,?,?,?,?)')
      .run(name, category, capacity, brand, description, JSON.stringify(specifications || []), image);
    res.json({ id: result.lastInsertRowid });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ deleted: result.changes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── API: Projects ─────────────────────────────────────────────────────────────
app.get('/api/projects', (req, res) => {
  try {
    res.json(db.prepare('SELECT * FROM projects').all());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/projects', (req, res) => {
  try {
    const { title, location, capacity, type, description, image, year } = req.body;
    const result = db.prepare('INSERT INTO projects (title, location, capacity, type, description, image, year) VALUES (?,?,?,?,?,?,?)')
      .run(title, location, capacity, type, description, image, year);
    res.json({ id: result.lastInsertRowid });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    res.json({ deleted: result.changes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── API: Kusums ───────────────────────────────────────────────────────────────
app.get('/api/kusums', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM kusums').all();
    res.json(rows.map(r => ({ ...r, benefits: r.benefits ? JSON.parse(r.benefits) : [], subsidyAvailable: r.subsidyAvailable === 1 })));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/kusums', (req, res) => {
  try {
    const { title, description, benefits, subsidyAvailable, image } = req.body;
    const result = db.prepare('INSERT INTO kusums (title, description, benefits, subsidyAvailable, image) VALUES (?,?,?,?,?)')
      .run(title, description, JSON.stringify(benefits || []), subsidyAvailable ? 1 : 0, image);
    res.json({ id: result.lastInsertRowid });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/kusums/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM kusums WHERE id = ?').run(req.params.id);
    res.json({ deleted: result.changes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── API: Enquiries ────────────────────────────────────────────────────────────
app.get('/api/enquiries', (req, res) => {
  try {
    res.json(db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/enquiries', (req, res) => {
  try {
    const { name, email, phone, city, interest, message } = req.body;
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const result = db.prepare('INSERT INTO enquiries (name, email, phone, city, interest, message, date, time) VALUES (?,?,?,?,?,?,?,?)')
      .run(name, email, phone, city, interest, message, date, time);
    res.json({ id: result.lastInsertRowid });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/enquiries/:id', (req, res) => {
  try {
    const result = db.prepare('UPDATE enquiries SET status = ? WHERE id = ?').run(req.body.status, req.params.id);
    res.json({ updated: result.changes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/enquiries/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM enquiries WHERE id = ?').run(req.params.id);
    res.json({ deleted: result.changes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── API: Reviews ──────────────────────────────────────────────────────────────
app.get('/api/reviews', (req, res) => {
  try {
    res.json(db.prepare('SELECT * FROM reviews ORDER BY id DESC').all());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/reviews', (req, res) => {
  try {
    const { name, rating, review } = req.body;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const result = db.prepare('INSERT INTO reviews (name, rating, review, date) VALUES (?,?,?,?)').run(name, rating, review, date);
    res.json({ id: result.lastInsertRowid });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/reviews/:id', (req, res) => {
  try {
    const result = db.prepare('UPDATE reviews SET status = ? WHERE id = ?').run(req.body.status, req.params.id);
    res.json({ updated: result.changes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/reviews/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM reviews WHERE id = ?').run(req.params.id);
    res.json({ deleted: result.changes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── API: Settings ─────────────────────────────────────────────────────────────
app.get('/api/settings', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM site_settings').all();
    const settings = {};
    rows.forEach(r => settings[r.key] = r.value);
    res.json(settings);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/settings', (req, res) => {
  try {
    const settings = req.body;
    const upsert = db.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)');
    const insertMany = db.transaction((obj) => { for (const [k, v] of Object.entries(obj)) upsert.run(k, v); });
    insertMany(settings);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── SPA Fallback (MUST be last) ───────────────────────────────────────────────
app.get('(.*)', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend build missing. The "dist" folder was not found.');
  }
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log(`║  ☀️  URJA VISION IS LIVE ON PORT ${PORT}       ║`);
  console.log('║  http://localhost:' + PORT + '                     ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
});
