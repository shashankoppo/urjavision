import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// ─────────────────────────────────────────────────────────────────────────────
// Pure-JS JSON Database — No native binaries. Works on every server.
// ─────────────────────────────────────────────────────────────────────────────

const DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function dbFile(name) { return path.join(DATA_DIR, `${name}.json`); }

function readTable(name) {
  const file = dbFile(name);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeTable(name, data) {
  fs.writeFileSync(dbFile(name), JSON.stringify(data, null, 2));
}

function nextId(rows) {
  return rows.length === 0 ? 1 : Math.max(...rows.map(r => r.id)) + 1;
}

function readSettings() {
  const file = dbFile('site_settings');
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeSettings(obj) {
  fs.writeFileSync(dbFile('site_settings'), JSON.stringify(obj, null, 2));
}

// ── Seed on first run ─────────────────────────────────────────────────────────
function seed() {
  if (readTable('products').length === 0) {
    console.log('🌱 Seeding products...');
    writeTable('products', [
      { id:1, name:'Adani 550W Mono PERC Panel', category:'Solar Panels', capacity:'550W', brand:'Adani Solar', description:'High-performance Mono PERC module with 21.5% efficiency.', specifications:['550W Output','21.5% Efficiency','12 Year Warranty','PID Resistant'], image:'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id:2, name:'Vikram Solar Somera 450W', category:'Solar Panels', capacity:'450W', brand:'Vikram Solar', description:'Reliable mono-crystalline panels for extreme Indian weather.', specifications:['450W Capacity','High Yield','Anti-reflective glass','27 Year Warranty'], image:'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id:3, name:'Tata Power Solaro 545W', category:'Solar Panels', capacity:'545W', brand:'Tata Power', description:'Trust of Tata with maximum power density for limited roof spaces.', specifications:['Tata Quality','High Reliability','IP68 Junction Box','Advanced Mono Tech'], image:'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id:4, name:'Growatt 5kW Hybrid Inverter', category:'Solar Inverters', capacity:'5kW', brand:'Growatt', description:'Smart hybrid inverter with dual MPPT.', specifications:['5kW Output','Dual MPPT','Wi-Fi Monitoring','5 Year Warranty'], image:'https://images.pexels.com/photos/9875427/pexels-photo-9875427.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id:5, name:'Microtek 10kW On-Grid', category:'Solar Inverters', capacity:'10kW', brand:'Microtek', description:'Heavy-duty industrial on-grid inverter.', specifications:['10kW Capacity','98.5% Efficiency','LCD Display','Made in India'], image:'https://images.pexels.com/photos/4297357/pexels-photo-4297357.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id:6, name:'Starter Home Bundle (3kW)', category:'Solar Combos', capacity:'3kW System', brand:'Urja Vision', description:'Complete 3kW solar system with panels, inverter, and structures.', specifications:['6 x 545W Panels','3.5kVA Inverter','2 Batteries','Full Installation'], image:'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id:7, name:'Agriculture Pumping Combo', category:'Solar Combos', capacity:'5HP Pump', brand:'Kirloskar/Urja', description:'5HP DC solar pump kit with 5kW panels.', specifications:['5HP DC Pump','8 x 450W Panels','Solar Tracking Frame','90% PM Kusum Subsidy'], image:'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id:8, name:'Premium Independence Suite', category:'Solar Combos', capacity:'10kW + Lithium', brand:'Executive Series', description:'10kW backup for large homes with 10kWh Lithium storage.', specifications:['20 x 550W Panels','10kW Hybrid Inverter','10kWh Lithium Stack','Smart APP Access'], image:'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id:9, name:'Solar Health Audit', category:'Solar Services', capacity:'Standard', brand:'Urja Engineering', description:'Thermal imaging, testing, cleaning for 40% efficiency boost.', specifications:['Thermal Imaging','Voc/Isc Testing','Cleaning & Polishing','Performance Report'], image:'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { id:10, name:'Expert Structural Installation', category:'Solar Services', capacity:'Premium', brand:'Urja Engineering', description:'HDGI structural mounting — wind-stable up to 150 kmph.', specifications:['Wind Load Calc','HDGI Materials','Anti-Corrosion Pile','Safety Anchors'], image:'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ]);
  }

  if (readTable('projects').length === 0) {
    console.log('🌱 Seeding projects...');
    writeTable('projects', [
      { id:1, title:'50kW Industrial Solar Plant', location:'Jabalpur Industrial Area', capacity:'50 kW', type:'Commercial', description:'Large-scale installation for manufacturing with annual savings of ₹8 lakhs', image:'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800', year:'2024' },
      { id:2, title:'Residential Rooftop Solar', location:'Napier Town, Jabalpur', capacity:'5 kW', type:'Residential', description:'Modern home solar solution reducing electricity bills by 90%', image:'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800', year:'2024' },
      { id:3, title:'Hospital Solar System', location:'Jabalpur', capacity:'30 kW', type:'Healthcare', description:'Reliable solar power for 24/7 hospital operations', image:'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800', year:'2023' },
    ]);
  }

  if (readTable('kusums').length === 0) {
    console.log('🌱 Seeding kusums...');
    writeTable('kusums', [
      { id:1, title:'Solar Irrigation Pumps', description:'Replace diesel pumps with solar-powered irrigation systems', benefits:['Zero electricity bills','No diesel expenses','Government subsidy up to 90%','25-year lifespan'], subsidyAvailable:true, image:'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ]);
  }

  if (readTable('reviews').length === 0) {
    console.log('🌱 Seeding reviews...');
    writeTable('reviews', [
      { id:1, name:'Ravi Sharma', rating:5, review:'Urja Vision installed a 5kW system at my home. Exceptional service!', status:'Approved', date:'Mar 10, 2024', source:'Google' },
      { id:2, name:'Priya Patel', rating:4, review:'Very professional team. The installation was smooth and savings are real.', status:'Approved', date:'Mar 12, 2024', source:'Website' },
    ]);
  }

  if (Object.keys(readSettings()).length === 0) {
    console.log('🌱 Seeding site settings...');
    writeSettings({
      hero_title: 'Powering Your Future with Solar Brilliance',
      hero_subtitle: 'Urja Vision delivers high-performance solar solutions for homes, industries, and farms across India.',
      hero_banner: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      site_tagline: 'Powering Your Future with Solar',
      contact_phone: '+91 72473 91595',
      contact_email: 'info@urjavision.com',
      whatsapp_number: '917247391595',
    });
  }

  if (readTable('enquiries').length === 0) writeTable('enquiries', []);
}

seed();

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API: Products ─────────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => res.json(readTable('products')));

app.post('/api/products', (req, res) => {
  const rows = readTable('products');
  const row = { id: nextId(rows), ...req.body };
  rows.push(row);
  writeTable('products', rows);
  res.json({ id: row.id });
});

app.delete('/api/products/:id', (req, res) => {
  const rows = readTable('products').filter(r => r.id !== Number(req.params.id));
  writeTable('products', rows);
  res.json({ deleted: 1 });
});

// ── API: Projects ─────────────────────────────────────────────────────────────
app.get('/api/projects', (req, res) => res.json(readTable('projects')));

app.post('/api/projects', (req, res) => {
  const rows = readTable('projects');
  const row = { id: nextId(rows), ...req.body };
  rows.push(row);
  writeTable('projects', rows);
  res.json({ id: row.id });
});

app.delete('/api/projects/:id', (req, res) => {
  const rows = readTable('projects').filter(r => r.id !== Number(req.params.id));
  writeTable('projects', rows);
  res.json({ deleted: 1 });
});

// ── API: Kusums ───────────────────────────────────────────────────────────────
app.get('/api/kusums', (req, res) => res.json(readTable('kusums')));

app.post('/api/kusums', (req, res) => {
  const rows = readTable('kusums');
  const row = { id: nextId(rows), ...req.body };
  rows.push(row);
  writeTable('kusums', rows);
  res.json({ id: row.id });
});

app.delete('/api/kusums/:id', (req, res) => {
  const rows = readTable('kusums').filter(r => r.id !== Number(req.params.id));
  writeTable('kusums', rows);
  res.json({ deleted: 1 });
});

// ── API: Enquiries ────────────────────────────────────────────────────────────
app.get('/api/enquiries', (req, res) => res.json(readTable('enquiries').reverse()));

app.post('/api/enquiries', (req, res) => {
  const rows = readTable('enquiries');
  const now = new Date();
  const row = {
    id: nextId(rows),
    ...req.body,
    status: 'New',
    date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
  };
  rows.push(row);
  writeTable('enquiries', rows);
  res.json({ id: row.id });
});

app.put('/api/enquiries/:id', (req, res) => {
  const rows = readTable('enquiries').map(r => r.id === Number(req.params.id) ? { ...r, status: req.body.status } : r);
  writeTable('enquiries', rows);
  res.json({ updated: 1 });
});

app.delete('/api/enquiries/:id', (req, res) => {
  const rows = readTable('enquiries').filter(r => r.id !== Number(req.params.id));
  writeTable('enquiries', rows);
  res.json({ deleted: 1 });
});

// ── API: Reviews ──────────────────────────────────────────────────────────────
app.get('/api/reviews', (req, res) => res.json(readTable('reviews').reverse()));

app.post('/api/reviews', (req, res) => {
  const rows = readTable('reviews');
  const row = {
    id: nextId(rows),
    ...req.body,
    status: 'Pending',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    source: 'Website',
  };
  rows.push(row);
  writeTable('reviews', rows);
  res.json({ id: row.id });
});

app.put('/api/reviews/:id', (req, res) => {
  const rows = readTable('reviews').map(r => r.id === Number(req.params.id) ? { ...r, status: req.body.status } : r);
  writeTable('reviews', rows);
  res.json({ updated: 1 });
});

app.delete('/api/reviews/:id', (req, res) => {
  const rows = readTable('reviews').filter(r => r.id !== Number(req.params.id));
  writeTable('reviews', rows);
  res.json({ deleted: 1 });
});

// ── API: Settings ─────────────────────────────────────────────────────────────
app.get('/api/settings', (req, res) => res.json(readSettings()));

app.post('/api/settings', (req, res) => {
  const current = readSettings();
  writeSettings({ ...current, ...req.body });
  res.json({ success: true });
});

// ── SPA Fallback — MUST be last ───────────────────────────────────────────────
// Using app.use() instead of app.get('*') to bypass path-to-regexp entirely
// This works with Express 4, Express 5, and any future version
app.use((req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send('Frontend not built. Run "npm run build" and try again.');
  }
});


// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log(`║  ☀️  URJA VISION IS LIVE ON PORT ${PORT}       ║`);
  console.log(`║  ✅  Data stored at: ${DATA_DIR}`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
});
