import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Frame, 
  Layers, 
  MessageSquare, 
  Mail, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  Check, 
  LogOut, 
  Sparkles,
  Upload,
  Image as ImageIcon,
  Settings,
  KeyRound,
  ShieldCheck,
  User,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function AdminDashboard() {
  const { isAuthenticated, logout, user, updateAuthData, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');

  // Settings state
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [settingsStatus, setSettingsStatus] = useState({ type: '', message: '' });
  const [settingsLoading, setSettingsLoading] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setSettingsForm((prev) => ({ ...prev, newUsername: user.username }));
    }
  }, [user]);

  // Data states
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form states
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: 'Framing',
    shortDescription: '',
    price: '',
    iconName: 'Frame',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800'
  });

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Family Frames',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    description: ''
  });

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    customerName: '',
    review: '',
    rating: 5,
    customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/sachinphotoframeadmin');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [sRes, gRes, tRes, mRes] = await Promise.all([
        api.get('/services'),
        api.get('/gallery'),
        api.get('/testimonials'),
        api.get('/contact')
      ]);
      setServices(sRes.data || []);
      setGallery(gRes.data || []);
      setTestimonials(tRes.data || []);
      setMessages(mRes.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // SERVICE CRUD HANDLERS
  const handleOpenServiceModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setServiceForm({
        name: service.name,
        category: service.category || 'Framing',
        shortDescription: service.shortDescription || '',
        price: service.price || '',
        iconName: service.iconName || 'Frame',
        image: service.image || ''
      });
    } else {
      setEditingService(null);
      setServiceForm({
        name: '',
        category: 'Framing',
        shortDescription: '',
        price: '',
        iconName: 'Frame',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800'
      });
    }
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await api.put(`/services/${editingService.id}`, serviceForm);
      } else {
        await api.post('/services', serviceForm);
      }
      setIsServiceModalOpen(false);
      fetchAllData();
    } catch (err) {
      alert('Error saving service');
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchAllData();
      } catch (err) {
        alert('Error deleting service');
      }
    }
  };

  // GALLERY CRUD HANDLERS
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    try {
      await api.post('/gallery', galleryForm);
      setIsGalleryModalOpen(false);
      setGalleryForm({
        title: '',
        category: 'Family Frames',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
        description: ''
      });
      fetchAllData();
    } catch (err) {
      alert('Error adding gallery item');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm('Delete this image from gallery?')) {
      try {
        await api.delete(`/gallery/${id}`);
        fetchAllData();
      } catch (err) {
        alert('Error deleting gallery item');
      }
    }
  };

  // TESTIMONIAL CRUD HANDLERS
  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    try {
      await api.post('/testimonials', testimonialForm);
      setIsTestimonialModalOpen(false);
      setTestimonialForm({
        customerName: '',
        review: '',
        rating: 5,
        customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
      });
      fetchAllData();
    } catch (err) {
      alert('Error adding review');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        fetchAllData();
      } catch (err) {
        alert('Error deleting testimonial');
      }
    }
  };

  // MESSAGE DELETE HANDLER
  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await api.delete(`/contact/${id}`);
        fetchAllData();
      } catch (err) {
        alert('Error deleting message');
      }
    }
  };

  // UPDATE SETTINGS HANDLER
  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSettingsStatus({ type: '', message: '' });

    if (!settingsForm.currentPassword) {
      setSettingsStatus({ type: 'error', message: 'Current password is required to save changes.' });
      return;
    }

    if (settingsForm.newPassword && settingsForm.newPassword !== settingsForm.confirmPassword) {
      setSettingsStatus({ type: 'error', message: 'New password and confirm password do not match.' });
      return;
    }

    setSettingsLoading(true);
    try {
      const res = await api.put('/auth/update-credentials', {
        currentPassword: settingsForm.currentPassword,
        newUsername: settingsForm.newUsername,
        newPassword: settingsForm.newPassword
      });

      if (res.data.success) {
        setSettingsStatus({ type: 'success', message: res.data.message || 'Credentials updated successfully!' });
        updateAuthData(res.data.user, res.data.token);
        setSettingsForm({
          currentPassword: '',
          newUsername: res.data.user?.username || settingsForm.newUsername,
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      setSettingsStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to update credentials. Please verify current password.'
      });
    } finally {
      setSettingsLoading(false);
    }
  };

  if (authLoading || (!isAuthenticated && !loading)) {
    return <div className="py-20 text-center text-amber-400">Authenticating...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl glass-card border border-amber-500/30">
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-playfair text-amber-100 mt-1">
            Admin Dashboard
          </h1>
          <p className="text-xs text-amber-200/70">
            Welcome back, <strong className="text-amber-300">{user?.username || 'Administrator'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md gold-glow'
                : 'bg-amber-950/40 text-amber-300 border-amber-500/40 hover:bg-amber-900/50'
            }`}
          >
            <Settings className="w-4 h-4" /> Account Settings
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-semibold hover:bg-red-500/30 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-amber-500/20 pb-4">
        {[
          { id: 'overview', name: 'Overview', icon: LayoutDashboard },
          { id: 'services', name: `Services (${services.length})`, icon: Frame },
          { id: 'gallery', name: `Gallery (${gallery.length})`, icon: Layers },
          { id: 'testimonials', name: `Reviews (${testimonials.length})`, icon: MessageSquare },
          { id: 'messages', name: `Inbox (${messages.length})`, icon: Mail },
          { id: 'settings', name: 'Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-lg gold-glow'
                : 'bg-amber-950/30 text-amber-200/80 hover:bg-amber-900/40 border border-amber-500/20'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.name}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl glass-card border border-amber-500/20 space-y-2">
              <span className="text-xs text-amber-400 font-semibold uppercase">Total Services</span>
              <h3 className="text-3xl font-bold font-playfair text-amber-100">{services.length}</h3>
              <p className="text-[11px] text-amber-200/60">Framing, printing & gift options</p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-amber-500/20 space-y-2">
              <span className="text-xs text-amber-400 font-semibold uppercase">Gallery Showcase</span>
              <h3 className="text-3xl font-bold font-playfair text-amber-100">{gallery.length}</h3>
              <p className="text-[11px] text-amber-200/60">Sample frame photographs</p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-amber-500/20 space-y-2">
              <span className="text-xs text-amber-400 font-semibold uppercase">Customer Reviews</span>
              <h3 className="text-3xl font-bold font-playfair text-amber-100">{testimonials.length}</h3>
              <p className="text-[11px] text-amber-200/60">Published customer reviews</p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-amber-500/20 space-y-2">
              <span className="text-xs text-amber-400 font-semibold uppercase">Contact Messages</span>
              <h3 className="text-3xl font-bold font-playfair text-amber-100">{messages.length}</h3>
              <p className="text-[11px] text-amber-200/60">Inquiries submitted via website</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/80 space-y-2">
            <h4 className="font-bold text-amber-300 text-sm">💡 Quick Management Tip:</h4>
            <p>
              Use the tabs above to add new services, update prices, upload frame gallery photos, delete outdated items, or check incoming contact inquiries directly from your phone or desktop.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: SERVICES CRUD */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold font-playfair text-amber-100">Manage Services List</h3>
            <button
              onClick={() => handleOpenServiceModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors gold-glow"
            >
              <Plus className="w-4 h-4" /> Add New Service
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-amber-500/30 glass-card">
            <table className="w-full text-left text-xs text-amber-100">
              <thead className="bg-amber-950/60 text-amber-300 font-bold border-b border-amber-500/30 uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">Image</th>
                  <th className="p-3.5">Service Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/15">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-amber-500/5 transition-colors">
                    <td className="p-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-12 h-12 rounded-lg object-cover border border-amber-500/30"
                      />
                    </td>
                    <td className="p-3 font-semibold text-amber-200">{service.name}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">{service.category}</span></td>
                    <td className="p-3 font-bold text-amber-400">{service.price || 'Contact'}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenServiceModal(service)}
                        className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: GALLERY CRUD */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold font-playfair text-amber-100">Manage Frame Gallery</h3>
            <button
              onClick={() => setIsGalleryModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors gold-glow"
            >
              <Plus className="w-4 h-4" /> Add Gallery Image
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl glass-card border border-amber-500/20 overflow-hidden space-y-2 p-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-xl border border-amber-500/30"
                />
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-amber-200 text-xs font-playfair">{item.title}</h4>
                    <span className="text-[10px] text-amber-400">{item.category}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteGallery(item.id)}
                    className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TESTIMONIALS CRUD */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold font-playfair text-amber-100">Manage Customer Reviews</h3>
            <button
              onClick={() => setIsTestimonialModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors gold-glow"
            >
              <Plus className="w-4 h-4" /> Add Customer Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-3 flex justify-between items-start"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={test.customerImage}
                      alt={test.customerName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <h4 className="font-bold text-amber-200 text-xs">{test.customerName}</h4>
                  </div>
                  <p className="text-xs text-amber-200/80 italic">"{test.review}"</p>
                </div>
                <button
                  onClick={() => handleDeleteTestimonial(test.id)}
                  className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MESSAGES INBOX */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-playfair text-amber-100">Customer Contact Inbox</h3>

          {messages.length === 0 ? (
            <div className="p-8 text-center glass-card text-amber-200/80 rounded-2xl">
              No messages in inbox.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 rounded-2xl glass-card border border-amber-500/30 flex flex-col md:flex-row justify-between gap-4"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-300 text-sm">{msg.name}</span>
                      <span className="text-[10px] text-amber-400/80">({msg.mobile})</span>
                      {msg.email && <span className="text-[10px] text-amber-200/60">| {msg.email}</span>}
                    </div>
                    <p className="text-amber-100/90 leading-relaxed font-poppins pt-1">{msg.message}</p>
                    <span className="text-[10px] text-amber-400/60 block pt-1">
                      Received: {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${msg.mobile?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(msg.name)},%20this%20is%20Sachin%20King%20Photo%20Frame%20regarding%20your%20inquiry.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500"
                    >
                      Reply WhatsApp
                    </a>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-amber-500/30 space-y-6">
            <div className="flex items-center gap-3 border-b border-amber-500/20 pb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-playfair text-amber-100">
                  Account Security & Credentials
                </h3>
                <p className="text-xs text-amber-200/70 font-poppins">
                  Update your admin login username and password.
                </p>
              </div>
            </div>

            {/* Status Alert Message */}
            {settingsStatus.message && (
              <div
                className={`p-4 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                  settingsStatus.type === 'success'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-red-500/20 border-red-500/40 text-red-200'
                }`}
              >
                {settingsStatus.type === 'success' ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{settingsStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleUpdateSettings} className="space-y-4">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" /> Admin Username
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.newUsername}
                  onChange={(e) => setSettingsForm({ ...settingsForm, newUsername: e.target.value })}
                  placeholder="Enter new username"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Current Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Current Password <span className="text-amber-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={settingsForm.currentPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                  placeholder="Enter current password to save changes"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
                <p className="text-[10px] text-amber-300/60">Required to confirm authorization.</p>
              </div>

              {/* Divider */}
              <div className="border-t border-amber-500/20 pt-2" />

              {/* New Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" /> New Password (Optional)
                </label>
                <input
                  type="password"
                  value={settingsForm.newPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Confirm New Password Input */}
              {settingsForm.newPassword && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" /> Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={settingsForm.confirmPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={settingsLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all shadow-lg gold-glow flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {settingsLoading ? 'Updating Credentials...' : 'Save Settings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl glass-card border border-amber-500/40 text-xs text-amber-50 space-y-4">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
              <h3 className="text-lg font-bold font-playfair text-amber-100">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-amber-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3">
              <div>
                <label className="block text-amber-300 mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Category</label>
                <input
                  type="text"
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Estimated Price</label>
                <input
                  type="text"
                  placeholder="e.g. ₹150 - ₹2,500"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Short Description *</label>
                <textarea
                  rows="3"
                  required
                  value={serviceForm.shortDescription}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400"
              >
                Save Service
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl glass-card border border-amber-500/40 text-xs text-amber-50 space-y-4">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
              <h3 className="text-lg font-bold font-playfair text-amber-100">Add Gallery Item</h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="text-amber-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-3">
              <div>
                <label className="block text-amber-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Category</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                >
                  <option value="Family Frames">Family Frames</option>
                  <option value="God Frames">God Frames</option>
                  <option value="Wedding Frames">Wedding Frames</option>
                  <option value="Nature Frames">Nature Frames</option>
                  <option value="Canvas Prints">Canvas Prints</option>
                  <option value="Gift Items">Gift Items</option>
                </select>
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400"
              >
                Add To Gallery
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TESTIMONIAL MODAL */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl glass-card border border-amber-500/40 text-xs text-amber-50 space-y-4">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
              <h3 className="text-lg font-bold font-playfair text-amber-100">Add Customer Review</h3>
              <button onClick={() => setIsTestimonialModalOpen(false)} className="text-amber-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div>
                <label className="block text-amber-300 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.customerName}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Review Text *</label>
                <textarea
                  rows="3"
                  required
                  value={testimonialForm.review}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400"
              >
                Save Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
