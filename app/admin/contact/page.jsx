'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  Trash2, 
  Reply, 
  Send,
  Save,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Sparkles,
  AlertCircle,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { DEFAULT_WHATSAPP_SETTINGS, buildWhatsAppChatUrl, cleanWhatsAppNumber } from '@/lib/whatsapp';

export default function ContactPage() {
  // Navigation tab
  const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp' | 'messages'

  // WhatsApp Settings state
  const [whatsappSettings, setWhatsappSettings] = useState({
    whatsappNumber: DEFAULT_WHATSAPP_SETTINGS.whatsappNumber,
    whatsappMessage: DEFAULT_WHATSAPP_SETTINGS.whatsappMessage,
    isEnabled: DEFAULT_WHATSAPP_SETTINGS.isEnabled,
    tooltipText: DEFAULT_WHATSAPP_SETTINGS.tooltipText,
  });
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Contact Messages state
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+8801234567890', subject: 'Product Inquiry', message: 'I want to know about your pricing for bulk orders.', status: 'unread', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+8801234567891', subject: 'Support Request', message: 'I need help with my recent order #12345.', status: 'read', date: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+8801234567892', subject: 'Partnership', message: 'We are interested in becoming a vendor.', status: 'replied', date: '2024-01-13' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+8801234567893', subject: 'Feedback', message: 'Great website! Love the shopping experience.', status: 'read', date: '2024-01-12' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', phone: '+8801234567894', subject: 'Shipping Query', message: 'Do you ship internationally?', status: 'unread', date: '2024-01-11' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  // Fetch saved WhatsApp settings on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoadingSettings(true);
        const res = await fetch('/api/contact/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.settings) {
            setWhatsappSettings({
              whatsappNumber: data.settings.whatsappNumber || DEFAULT_WHATSAPP_SETTINGS.whatsappNumber,
              whatsappMessage: data.settings.whatsappMessage || DEFAULT_WHATSAPP_SETTINGS.whatsappMessage,
              isEnabled: data.settings.isEnabled !== undefined ? data.settings.isEnabled : true,
              tooltipText: data.settings.tooltipText || DEFAULT_WHATSAPP_SETTINGS.tooltipText,
            });
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setIsLoadingSettings(false);
      }
    }
    fetchSettings();
  }, []);

  // Save WhatsApp settings handler
  const handleSaveWhatsApp = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(whatsappSettings),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSaveSuccess(true);
        // Trigger live custom event for open preview/client tabs
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('whatsapp-settings-updated', { detail: whatsappSettings }));
          localStorage.setItem('whatsapp_settings_sync', Date.now().toString());
        }
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setErrorMessage(data.error || 'সেটিংস সংরক্ষণে ব্যর্থ হয়েছে');
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setErrorMessage('নেটওয়ার্ক সমস্যা বা সার্ভার ত্রুটি');
    } finally {
      setIsSaving(false);
    }
  };

  // Filter contacts
  const filteredContacts = contacts.filter(contact => 
    (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || contact.status === filterStatus)
  );

  const markAsRead = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, status: 'read' } : c));
  };

  const markAsReplied = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, status: 'replied' } : c));
    setShowReplyModal(false);
    setReplyMessage('');
  };

  const deleteContact = (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      unread: 'bg-red-100 text-red-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const unreadCount = contacts.filter(c => c.status === 'unread').length;
  const testChatUrl = buildWhatsAppChatUrl(whatsappSettings.whatsappNumber, whatsappSettings.whatsappMessage);
  const cleanedDigits = cleanWhatsAppNumber(whatsappSettings.whatsappNumber);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <span>কন্টাক্ট ও সাপোর্ট ম্যানেজমেন্ট</span>
            <span className="text-sm font-normal px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              WhatsApp Integration
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            ওয়েবসাইটের ফ্লোটিং হোয়াটসঅ্যাপ বাটন এবং গ্রাহকদের পাঠানো মেসেজ পরিচালনা করুন
          </p>
        </div>

        {/* Global Test Quick Button */}
        <a
          href={testChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium shadow-sm transition-all text-sm w-fit active:scale-95"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.893-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.653zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span>নম্বর টেস্ট করুন</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* Modern Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4 pt-2 shadow-sm">
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex items-center gap-2.5 px-5 py-3.5 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'whatsapp'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.487-8.414z" />
            </svg>
          </div>
          <span>WhatsApp বাটন সেটিংস (WhatsApp Button Option)</span>
          {whatsappSettings.isEnabled ? (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-gray-300" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2.5 px-5 py-3.5 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'messages'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-lg'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span>কন্টাক্ট মেসেজ ইনবক্স (Messages)</span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: WHATSAPP BUTTON SETTINGS (Primary User Request)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'whatsapp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main WhatsApp Settings Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 md:p-8 space-y-6">
            <div className="border-b border-gray-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100/70 text-emerald-700 rounded-xl">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    ওয়েবসাইট হোয়াটসঅ্যাপ বাটন অপশন
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    এখানে যে নম্বর সেট করবেন, ওয়েবসাইটের ডান পাশে নিচের গোল বাটনে ক্লিক করলে সরাসরি ওই নম্বরে চ্যাট শুরু হবে।
                  </p>
                </div>
              </div>
            </div>

            {/* Success Feedback Alert */}
            {saveSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold">হোয়াটসঅ্যাপ নম্বর সফলভাবে সংরক্ষিত হয়েছে!</p>
                  <p className="text-xs text-emerald-700">
                    এখন ওয়েবসাইটের ডান পাশের গোল WhatsApp বাটনে ক্লিক করলে গ্রাহকরা সরাসরি এই নম্বরে মেসেজ পাঠাতে পারবেন।
                  </p>
                </div>
              </div>
            )}

            {/* Error Feedback Alert */}
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm font-semibold">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSaveWhatsApp} className="space-y-6">
              {/* WhatsApp Phone Number Field */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp ফোন নম্বর (WhatsApp Number) *</span>
                  </span>
                  <span className="text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    সরাসরি সংযোগ
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 01700000000 বা +8801700000000"
                    value={whatsappSettings.whatsappNumber}
                    onChange={(e) =>
                      setWhatsappSettings({
                        ...whatsappSettings,
                        whatsappNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium text-base shadow-xs"
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>
                    ফরম্যাট উদাহরণ: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">017XXXXXXXX</code> বা <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">+88017XXXXXXXX</code>
                  </span>
                  {cleanedDigits && (
                    <span className="text-emerald-700 font-semibold">
                      WhatsApp লিংক কোড: +{cleanedDigits}
                    </span>
                  )}
                </div>
              </div>

              {/* Default Welcome / Prefilled Message */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>ডিফল্ট মেসেজ (Pre-filled Message - গ্রাহকের জন্য)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="যেমন: আসসালামু আলাইকুম! আমি আপনাদের প্রোডাক্ট ও অর্ডার সম্পর্কে জানতে চাচ্ছি।"
                  value={whatsappSettings.whatsappMessage}
                  onChange={(e) =>
                    setWhatsappSettings({
                      ...whatsappSettings,
                      whatsappMessage: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-sm shadow-xs resize-none"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  গ্রাহক যখন গোল বাটনে ক্লিক করবেন, তখন তাদের WhatsApp চ্যাট উইন্ডোতে এই মেসেজটি স্বয়ংক্রিয়ভাবে টাইপ করা থাকবে।
                </p>
              </div>

              {/* Tooltip Text */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>বাটনের হোভার টেক্সট (Tooltip / Hover Label)</span>
                </label>
                <input
                  type="text"
                  placeholder="WhatsApp এ সরাসরি চ্যাট করুন"
                  value={whatsappSettings.tooltipText}
                  onChange={(e) =>
                    setWhatsappSettings({
                      ...whatsappSettings,
                      tooltipText: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-sm shadow-xs"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  কম্পিউটার থেকে ভিজিটর যখন গোল বাটনের উপর মাউস রাখবেন তখন এই লেখাটি দেখা যাবে।
                </p>
              </div>

              {/* Enable / Disable Switch */}
              <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/80 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    ওয়েবসাইটে হোয়াটসঅ্যাপ বাটন সক্রিয় রাখুন
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    বন্ধ রাখলে ওয়েবসাইটের নিচে গোল বাটনটি সাময়িকভাবে প্রদর্শিত হবে না
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappSettings.isEnabled}
                    onChange={(e) =>
                      setWhatsappSettings({
                        ...whatsappSettings,
                        isEnabled: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all text-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'সংরক্ষণ করা হচ্ছে...' : 'সেটিংস সেভ করুন (Save Settings)'}</span>
                </button>

                <a
                  href={testChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold flex items-center justify-center gap-2 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-600" />
                  <span>সরাসরি টেস্ট করুন (Open WhatsApp)</span>
                </a>
              </div>
            </form>
          </div>

          {/* Right Column: Live Interactive Preview & Guide */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Interactive Preview Card */}
            <div className="bg-gradient-to-br from-[#2B1B16] to-[#1a110e] text-white rounded-2xl p-6 shadow-xl border border-amber-900/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                    লাইভ প্রিভিউ (Live Preview)
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                  ওয়েবসাইটের নিচের ডান পাশ
                </span>
              </div>

              {/* Simulated Website Corner Mockup */}
              <div className="relative h-64 rounded-xl bg-gradient-to-b from-[#FAF6F0] to-[#f4ebe1] p-4 flex flex-col justify-between border border-amber-100/20 shadow-inner overflow-hidden text-gray-800">
                {/* Simulated Content */}
                <div className="space-y-2 opacity-50 select-none pointer-events-none">
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-2.5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2.5 bg-gray-200 rounded w-1/2"></div>
                </div>

                {/* Footer simulation */}
                <div className="border-t border-gray-200/80 pt-2 flex items-center justify-between text-[10px] text-gray-400 select-none">
                  <span>© AWBIN Lifestyle</span>
                  <span>www.awbin.com</span>
                </div>

                {/* The Floating WhatsApp Button as it will appear */}
                {whatsappSettings.isEnabled ? (
                  <div className="absolute bottom-5 right-5 flex items-center group">
                    {/* Tooltip mockup */}
                    <div className="hidden sm:flex items-center gap-1.5 mr-2 px-3 py-1 rounded-full bg-white text-gray-800 text-[11px] font-semibold shadow-md border border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{whatsappSettings.tooltipText || 'WhatsApp এ চ্যাট করুন'}</span>
                    </div>

                    {/* Circular Floating WhatsApp Button */}
                    <a
                      href={testChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Test Click"
                      className="relative w-13 h-13 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2BE271] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                      style={{ width: '52px', height: '52px' }}
                    >
                      <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
                      <svg className="w-6 h-6 fill-current drop-shadow" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.487-8.414z" />
                      </svg>
                      {/* Active Online Status Dot */}
                      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
                      </span>
                    </a>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gray-100/90 flex items-center justify-center text-xs font-semibold text-gray-500">
                    বাটনটি বর্তমানে বন্ধ (Disabled) আছে
                  </div>
                )}
              </div>

              {/* Status and Direct Test Link */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-300">
                  বর্তমান নম্বর: <strong className="text-white">{whatsappSettings.whatsappNumber || 'দেওয়া হয়নি'}</strong>
                </span>
                <a
                  href={testChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 underline underline-offset-2"
                >
                  টেস্ট করে দেখুন →
                </a>
              </div>
            </div>

            {/* Quick Tips / Instructions Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>কিভাবে কাজ করে?</span>
              </h3>
              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    ১
                  </span>
                  <span>
                    <strong>WhatsApp নম্বর দিন:</strong> যেকোনো বাংলাদেশি নম্বর (যেমন 017...) বা আন্তর্জাতিক কোড (+880...) দিন।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    ২
                  </span>
                  <span>
                    <strong>সেভ করুন:</strong> “সেটিংস সেভ করুন” বাটনে চাপ দিলে পরিবর্তনটি তাৎক্ষণিকভাবে সংরক্ষিত হবে।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    ৩
                  </span>
                  <span>
                    <strong>ওয়েবসাইটে প্রদর্শন:</strong> ভিজিটররা ওয়েবসাইটের ডান পাশে নিচে ছোট গোল সবুজ WhatsApp বাটন দেখতে পাবে।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    ৪
                  </span>
                  <span>
                    <strong>সরাসরি চ্যাট:</strong> বাটনে ক্লিক করলেই মোবাইল বা কম্পিউটারে WhatsApp অ্যাপ বা ওয়েব ওপেন হয়ে আপনার নম্বরে চ্যাট শুরু হবে!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: CONTACT MESSAGES INBOX (Preserving Original Feature)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px] max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact List */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">
                  Messages ({filteredContacts.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredContacts.length === 0 ? (
                  <p className="p-6 text-center text-sm text-gray-500">কোনো মেসেজ পাওয়া যায়নি</p>
                ) : (
                  filteredContacts.map((contact) => (
                    <div 
                      key={contact.id}
                      onClick={() => { setSelectedContact(contact); markAsRead(contact.id); }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedContact?.id === contact.id ? 'bg-blue-50/70 border-l-4 border-blue-600' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{contact.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(contact.status)}`}>
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium truncate">{contact.subject}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{contact.message}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{contact.date}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              {selectedContact ? (
                <>
                  <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedContact.subject}</h2>
                      <p className="text-sm text-gray-500 mt-0.5">From: {selectedContact.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowReplyModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-semibold"
                      >
                        <Reply className="w-4 h-4" />
                        Reply
                      </button>
                      <button 
                        onClick={() => deleteContact(selectedContact.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium text-sm text-gray-900">{selectedContact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-medium text-sm text-gray-900">{selectedContact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="font-medium text-sm text-gray-900">{selectedContact.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <p className="font-medium text-sm capitalize text-gray-900">{selectedContact.status}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">Message Content</h3>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm leading-relaxed">
                        {selectedContact.message}
                      </div>
                    </div>
                  </div>

                  {/* Reply Modal */}
                  {showReplyModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Reply to {selectedContact.name}</h3>
                        <p className="text-xs text-gray-500 mb-4">To: {selectedContact.email}</p>
                        <textarea
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="Write your email reply..."
                          className="w-full h-40 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-4"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowReplyModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => markAsReplied(selectedContact.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-semibold"
                          >
                            <Send className="w-4 h-4" />
                            Send Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Select a message from the list to view</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
