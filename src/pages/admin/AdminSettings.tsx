import { useState, useEffect } from 'react';
import { Mail, Settings, Server, Shield, CheckCircle, Activity, Globe, Bell, Eye, EyeOff, RefreshCw, Layout, Save, Terminal, ListStart } from 'lucide-react';

interface Props {
  currentTab: string;
}

const AdminSettings = ({ currentTab }: Props) => {
  const [activeTab, setActiveTab] = useState<'smtp' | 'general' | 'notifications' | 'hero'>( 
    currentTab.includes('mail') ? 'smtp' : 
    currentTab.includes('hero') ? 'hero' : 'general' 
  );
  const [showPassword, setShowPassword] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'fail' | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const [smtp, setSmtp] = useState({ host: 'smtp.hostinger.com', port: '465', secure: 'true', user: 'info@urjavision.com', password: '' });
  const [general, setGeneral] = useState({ siteName: 'Urja Vision', tagline: 'Powering Your Future with Solar', phone: '+91 72473 91595', email: 'info@urjavision.com', address: '390 Premnagar, Jabalpur, MP', whatsapp: '917247391595' });
  const [hero, setHero] = useState({ title: '', subtitle: '', banner: '' });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.site_tagline) {
          setGeneral(prev => ({
            ...prev,
            tagline: data.site_tagline,
            phone: data.contact_phone || prev.phone,
            email: data.contact_email || prev.email,
            whatsapp: data.whatsapp_number || prev.whatsapp
          }));
        }
        setHero({
          title: data.hero_title || '',
          subtitle: data.hero_subtitle || '',
          banner: data.hero_banner || ''
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const dataToSave: any = {};
    if (activeTab === 'general') {
        dataToSave.site_tagline = general.tagline;
        dataToSave.contact_phone = general.phone;
        dataToSave.contact_email = general.email;
        dataToSave.whatsapp_number = general.whatsapp;
    } else if (activeTab === 'hero') {
        dataToSave.hero_title = hero.title;
        dataToSave.hero_subtitle = hero.subtitle;
        dataToSave.hero_banner = hero.banner;
    }
    try {
        await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave)
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    } catch (err) {
        console.error('Save failed', err);
    } finally {
        setLoading(false);
    }
  };

  const TABS = [
    { id: 'general', icon: Globe, label: 'Standard' },
    { id: 'hero', icon: Layout, label: 'Hero Section' },
    { id: 'smtp', icon: Mail, label: 'Mail Server' },
    { id: 'notifications', icon: Bell, label: 'Alerts' },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-gray-300">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">Configure System Behavior</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">
            <Terminal size={12} className="text-emerald-500" />
            Control Plane Active
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-48 shrink-0 space-y-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === t.id 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <t.icon size={16} />
            <span>{t.label}</span>
          </button>
        ))}
        </div>

        <div className="flex-1 bg-[#111827] border border-white/5 rounded-2xl p-6 lg:p-8">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: 'Site Name', key: 'siteName', type: 'text', span: false },
                  { label: 'Tagline', key: 'tagline', type: 'text', span: true },
                  { label: 'Contact Phone', key: 'phone', type: 'text', span: false },
                  { label: 'Contact Email', key: 'email', type: 'email', span: false },
                  { label: 'WhatsApp Number', key: 'whatsapp', type: 'text', span: false },
                  { label: 'Business Address', key: 'address', type: 'text', span: true },
                ].map(field => (
                  <div key={field.key} className={field.span ? 'sm:col-span-2' : ''}>
                    <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">{field.label}</label>
                    <input
                      type={field.type}
                      value={(general as any)[field.key]}
                      onChange={e => setGeneral(g => ({ ...g, [field.key]: e.target.value }))}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4 border-t border-white/5">
                <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-500 text-black font-black px-8 py-3 rounded-xl transition-all hover:scale-105">
                  {saved ? <CheckCircle size={18} /> : <Save size={18} />}
                  <span className="text-xs uppercase tracking-widest">{saved ? 'Updated' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Primary Headline</label>
                  <input
                    type="text"
                    value={hero.title}
                    onChange={e => setHero(h => ({ ...h, title: e.target.value }))}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Supporting Narrative</label>
                  <textarea
                    rows={3}
                    value={hero.subtitle}
                    onChange={e => setHero(h => ({ ...h, subtitle: e.target.value }))}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Banner Image URL</label>
                  <input
                    type="text"
                    value={hero.banner}
                    onChange={e => setHero(h => ({ ...h, banner: e.target.value }))}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all"
                  />
                </div>
              </div>

              {hero.banner && (
                  <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video group">
                      <img src={hero.banner} alt="Preview" className="w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-center p-4">
                              <div className="text-white font-black text-xl mb-1">{hero.title}</div>
                              <div className="text-white/60 text-xs hidden sm:block">{hero.subtitle}</div>
                          </div>
                      </div>
                      <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-400">Live Preview</div>
                  </div>
              )}

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-500 text-black font-black px-8 py-3 rounded-xl transition-all hover:scale-105">
                  {saved ? <CheckCircle size={18} /> : <Save size={18} />}
                  <span className="text-xs uppercase tracking-widest">{saved ? 'Updated' : 'Sync Hero'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'smtp' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">SMTP Host</label>
                  <input type="text" value={smtp.host} onChange={e => setSmtp(s => ({ ...s, host: e.target.value }))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Port</label>
                  <input type="text" value={smtp.port} onChange={e => setSmtp(s => ({ ...s, port: e.target.value }))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Encryption</label>
                  <select value={smtp.secure} onChange={e => setSmtp(s => ({ ...s, secure: e.target.value }))} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none">
                    <option value="true">SSL/TLS</option>
                    <option value="false">None</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Mail Username</label>
                  <input type="email" value={smtp.user} onChange={e => setSmtp(s => ({ ...s, user: e.target.value }))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={smtp.password} onChange={e => setSmtp(s => ({ ...s, password: e.target.value }))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white font-bold focus:outline-none" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-white/5">
                <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-500 text-black font-black px-8 py-3 rounded-xl transition-all hover:scale-105">
                  {saved ? <CheckCircle size={18} /> : <Save size={18} />}
                  <span className="text-xs uppercase tracking-widest">Save Config</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-fade-in">
                <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-4">Email Alerts</h3>
                {[
                  { title: 'New Leads', desc: 'Instant email for new enquiries', enabled: true },
                  { title: 'New Reviews', desc: 'Notification on testimonial submission', enabled: true },
                  { title: 'Weekly Reports', desc: 'Performance summary every Monday', enabled: false },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all">
                    <div>
                      <div className="text-sm font-bold text-gray-200">{n.title}</div>
                      <div className="text-[10px] text-gray-500 font-medium">{n.desc}</div>
                    </div>
                    <div className={`w-10 h-5 rounded-full cursor-pointer transition-all relative ${n.enabled ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${n.enabled ? 'right-1' : 'left-1'}`} />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
