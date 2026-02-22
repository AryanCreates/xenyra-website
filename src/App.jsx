import './index.css';
import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Phone, 
  Facebook, 
  Linkedin, 
  Instagram,
  Twitter,
  ChevronDown,
  X,
  Plus,
  Minus,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Lock,
  User,
  LogOut,
  Package,
  Star,
  Sparkles,
  Wand2
} from 'lucide-react';

// --- DUMMY PRODUCT DATA ---
const CATEGORIES = ['faceWash', 'Cleanser', 'Toners', 'Sunscreen', 'Moisturisers', 'Mask'];

const PRODUCTS = [
  // faceWash (Under ₹399)
  { id: 1, name: 'Gentle Foaming Face Wash', category: 'faceWash', price: 349, img: 'https://iili.io/qF5jav1.jpg' },
  { id: 2, name: 'Purifying Neem Face Wash', category: 'faceWash', price: 299, img: 'https://iili.io/qF5Nqbe.jpg' },
  { id: 3, name: 'Vitamin C Brightening Wash', category: 'faceWash', price: 399, img: 'https://iili.io/qF5NCzu.jpg' },
  { id: 4, name: 'Hydrating Aloe Wash', category: 'faceWash', price: 379, img: 'https://iili.io/qF5Nosj.jpg' },
  
  // Cleanser (Under ₹499)
  { id: 5, name: 'Deep Cleanse Charcoal Cleanser', category: 'Cleanser', price: 449, img: 'https://iili.io/qF5NcXa.jpg' },
  { id: 6, name: 'Hydrating Milky Cleanser', category: 'Cleanser', price: 479, img: 'https://iili.io/qF5NAdB.jpg' },
  { id: 7, name: 'Squalane Barrier Cleanser', category: 'Cleanser', price: 499, img: 'https://iili.io/qF5NE1R.jpg' },
  { id: 8, name: 'Salicylic Acid Cleanser', category: 'Cleanser', price: 429, img: 'https://iili.io/qF5N1qv.jpg' },

  // Toners (Under ₹299)
  { id: 9, name: 'Rose Water Toner', category: 'Toners', price: 249, img: 'https://iili.io/qF565xV.jpg' },
  { id: 10, name: 'Pore Minimizing Toner', category: 'Toners', price: 279, img: 'https://iili.io/qF56cf1.jpg' },
  { id: 11, name: 'Witch Hazel Clarifying Toner', category: 'Toners', price: 299, img: 'https://iili.io/qF56YiP.jpg' },
  { id: 12, name: 'Green Tea Soothing Toner', category: 'Toners', price: 259, img: 'https://iili.io/qF567WB.jpg' },

  // Sunscreen (Under ₹499)
  { id: 13, name: 'SPF 50 Matte Sunscreen', category: 'Sunscreen', price: 449, img: 'https://iili.io/qF5tA2S.jpg' },
  { id: 14, name: 'Invisible Gel Sunscreen', category: 'Sunscreen', price: 499, img: 'https://iili.io/qF5tzB4.jpg' },
  { id: 15, name: 'Tinted Mineral Sunscreen', category: 'Sunscreen', price: 479, img: 'https://iili.io/qF5tIEl.jpg' },
  { id: 16, name: 'Aqua Light Sunscreen', category: 'Sunscreen', price: 459, img: 'https://iili.io/qF5tT42.jpg' },

  // Moisturisers (Under ₹399)
  { id: 17, name: 'Daily Gel Moisturiser', category: 'Moisturisers', price: 349, img: 'https://iili.io/qF7H7KG.jpg' },
  { id: 18, name: 'Ceramide Repair Cream', category: 'Moisturisers', price: 399, img: 'https://iili.io/qF7HYlf.jpg' },
  { id: 19, name: 'Oil-Free Mattifying Cream', category: 'Moisturisers', price: 329, img: 'https://iili.io/qF7HRPs.jpg' },
  { id: 20, name: 'Overnight Nourishing Cream', category: 'Moisturisers', price: 379, img: 'https://iili.io/qF7HAVn.jpg' },

  // Mask (Under ₹299)
  { id: 21, name: 'Clay Detox Mask', category: 'Mask', price: 249, img: 'https://iili.io/qF7fL41.jpg' },
  { id: 22, name: 'Honey Glow Sleeping Mask', category: 'Mask', price: 299, img: 'https://iili.io/qF7fsEP.jpg' },
  { id: 23, name: 'Green Tea Sheet Mask', category: 'Mask', price: 279, img: 'https://iili.io/qF7fiCB.jpg' },
  { id: 24, name: 'Brightening Peel-off Mask', category: 'Mask', price: 259, img: 'https://iili.io/qF7frTx.jpg' },
];

const REVIEWS = [
  { id: 1, name: "Sarah Jenkins", role: "Verified Buyer", text: "\"Where Real Confidence Meets Premium Skin Science. I've never felt better about my skin.\"" },
  { id: 2, name: "Michael Chen", role: "Loyal Customer", text: "\"The vending machine concept is genius! I grabbed the cleanser on my way home and I'm hooked.\"" },
  { id: 3, name: "Emily Davis", role: "Verified Buyer", text: "\"Finally found a sunscreen that doesn't leave a white cast. The Essential Glow Trio is a lifesaver.\"" },
  { id: 4, name: "Priya Sharma", role: "Verified Buyer", text: "\"My sensitive skin loves the Hydrating Milky Cleanser. So gentle yet so effective.\"" },
  { id: 5, name: "David Wilson", role: "First-time Buyer", text: "\"Breaking stereotypes indeed! The face wash is amazing and my skin feels incredibly fresh.\"" },
  { id: 6, name: "Jessica Taylor", role: "Loyal Customer", text: "\"I've replaced all my expensive brands with Xenyra. The quality is unmatched at this price point.\"" },
  { id: 7, name: "Anita Desai", role: "Verified Buyer", text: "\"The Overnight Nourishing Cream works like magic. I wake up with such plump, glowing skin.\"" },
  { id: 8, name: "James Anderson", role: "Verified Buyer", text: "\"Great customer service and even better products. The charcoal cleanser cleared my pores in a week.\"" },
];

export default function App() {
  // State Management
  const [currentView, setCurrentView] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // User Auth State
  const [user, setUser] = useState(null); 
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  // Cart & Favorites State
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  // UI Drawer/Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentState, setPaymentState] = useState('idle');

  // --- AI ROUTINE STATE & FUNCTIONS ---
  const [aiSkinType, setAiSkinType] = useState('Combination');
  const [aiConcern, setAiConcern] = useState('Acne & Breakouts');
  const [aiClimate, setAiClimate] = useState('Humid');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState('');

  const generateAiRoutine = async () => {
    setAiLoading(true);
    setAiError('');
    setAiResult(null);
    const apiKey = "";
    
    const catalogData = PRODUCTS.map(p => ({id: p.id, name: p.name, category: p.category}));
    const promptText = `You are a world-class dermatologist representing Xenyra skincare. 
    A user has ${aiSkinType} skin, their main concern is ${aiConcern}, and they live in a ${aiClimate} climate.
    Recommend a personalized 3-step daily skincare routine using ONLY products from this exact catalog:
    ${JSON.stringify(catalogData)}
    
    Choose exactly 3 products that best fit their needs.`;

    const callApi = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        routine: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    step: { type: "INTEGER" },
                                    time: { type: "STRING" },
                                    productId: { type: "INTEGER" },
                                    reason: { type: "STRING" }
                                }
                            }
                        },
                        advice: { type: "STRING" }
                    }
                }
            }
          })
        });
        
        if (!response.ok) throw new Error('Failed to generate routine');
        const data = await response.json();
        return JSON.parse(data.candidates[0].content.parts[0].text);
      } catch (err) {
        if (retries > 0) {
          await new Promise(r => setTimeout(r, delay));
          return callApi(retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const result = await callApi();
      setAiResult(result);
    } catch (err) {
      setAiError("Our AI beauty expert is currently unavailable. Please try again in a moment.");
    } finally {
      setAiLoading(false);
    }
  };

  const addAiRoutineToCart = () => {
    if (!aiResult) return;
    setCart(prev => {
      let newCart = [...prev];
      aiResult.routine.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        if (product) {
          const existingIndex = newCart.findIndex(p => p.id === product.id);
          if (existingIndex >= 0) {
            newCart[existingIndex] = { ...newCart[existingIndex], qty: newCart[existingIndex].qty + 1 };
          } else {
            newCart.push({ ...product, qty: 1 });
          }
        }
      });
      return newCart;
    });
    setIsCartOpen(true);
  };

  // --- SCROLL LISTENER FOR NAVBAR SHADOW ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- CART FUNCTIONS ---
  const addToCart = (product, e) => {
    if(e) e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(p => {
      if (p.id === id) {
        const newQty = Math.max(0, p.qty + delta);
        return { ...p, qty: newQty };
      }
      return p;
    }).filter(p => p.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // --- BUNDLE FUNCTION ---
  const addBundleToCart = (e) => {
    if (e) e.stopPropagation();
    // IDs for Face Wash (1), Moisturiser (17), and Sunscreen (13)
    const bundleIds = [1, 17, 13]; 
    
    setCart(prev => {
      let newCart = [...prev];
      bundleIds.forEach(id => {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
          const existingIndex = newCart.findIndex(p => p.id === id);
          if (existingIndex >= 0) {
            newCart[existingIndex] = { ...newCart[existingIndex], qty: newCart[existingIndex].qty + 1 };
          } else {
            newCart.push({ ...product, qty: 1 });
          }
        }
      });
      return newCart;
    });
    setIsCartOpen(true);
  };

  // --- FAVORITES FUNCTIONS ---
  const toggleFavorite = (product, e) => {
    if(e) e.stopPropagation();
    setFavorites(prev => 
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  // --- SEARCH FUNCTIONS ---
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // --- NAVIGATION FUNCTIONS ---
  const navigateToCategory = (category) => {
    setActiveCategory(category);
    setCurrentView('shop');
    window.scrollTo(0, 0);
  };

  const navigateToProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    setIsSearchOpen(false);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const navigateHome = () => { setCurrentView('home'); window.scrollTo(0, 0); };
  const navigateToAbout = () => { setCurrentView('about'); window.scrollTo(0, 0); };
  const navigateToPrivacy = () => { setCurrentView('privacy'); window.scrollTo(0, 0); };
  const navigateToContact = () => { setCurrentView('contact'); window.scrollTo(0, 0); };
  const navigateToFAQ = () => { setCurrentView('faq'); window.scrollTo(0, 0); };

  // --- PAYMENT SIMULATION ---
  const handlePayment = () => {
    setPaymentState('processing');
    setTimeout(() => {
      setPaymentState('success');
      setTimeout(() => {
        setCart([]);
        setIsCheckoutOpen(false);
        setPaymentState('idle');
        setIsCartOpen(false);
        navigateHome();
      }, 2500);
    }, 2000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginName && loginEmail) {
      setUser({ name: loginName, email: loginEmail });
      setIsLoginOpen(false);
      setLoginName('');
      setLoginEmail('');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      
      {/* 1. STICKY NAVBAR */}
      <nav className={`sticky top-0 z-[90] w-full flex items-center justify-between px-6 lg:px-10 py-3 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100' 
          : 'bg-white shadow-sm border-b border-transparent'
      }`}>
        <div className="flex items-center space-x-10">
          {/* Logo */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105" onClick={navigateHome}>
            <img 
              src="https://iili.io/qF5WMCl.jpg" 
              alt="Xenyra Logo" 
              className="w-full h-full object-contain bg-[#0a050f]"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://iili.io/qF5WMCl.png'; }}
            />
          </div>
          
          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-10 text-[16px] font-bold text-[#2d3748]">
            <button onClick={navigateHome} className={`transition-colors hover:text-[#d97736] ${currentView === 'home' ? 'text-[#d97736]' : ''}`}>
              Home
            </button>
            <button onClick={() => {setCurrentView('shop'); window.scrollTo(0,0);}} className={`transition-colors hover:text-[#d97736] ${currentView === 'shop' ? 'text-[#d97736]' : ''}`}>
              Shop
            </button>
            <button onClick={() => {setCurrentView('ai-routine'); window.scrollTo(0,0);}} className={`transition-colors hover:text-[#f05a7e] flex items-center gap-1.5 ${currentView === 'ai-routine' ? 'text-[#f05a7e]' : ''}`}>
              <Sparkles size={16} className={`${currentView === 'ai-routine' ? 'fill-[#f05a7e]' : ''}`} /> AI Routine ✨
            </button>
            <button onClick={navigateToAbout} className={`transition-colors hover:text-[#d97736] ${currentView === 'about' ? 'text-[#d97736]' : ''}`}>
              About Us
            </button>
            <button onClick={navigateToContact} className={`transition-colors hover:text-[#d97736] ${currentView === 'contact' ? 'text-[#d97736]' : ''}`}>
              Contact
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-5 lg:space-x-8">
          {/* Action Icons */}
          <div className="flex space-x-3 items-center">
            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(prev => !prev)}
              className="relative p-2.5 bg-gray-50/80 text-gray-600 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 shadow-sm border border-gray-100 hover:scale-110"
            >
              <ShoppingCart size={18} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f05a7e] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
            {/* Favorites Icon */}
            <button 
              onClick={() => setIsFavoritesOpen(prev => !prev)}
              className="relative p-2.5 bg-gray-50/80 text-gray-600 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 shadow-sm border border-gray-100 hover:scale-110 hidden sm:block"
            >
              <Heart size={18} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f05a7e] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </button>
            {/* Search Icon */}
            <button 
              onClick={() => {
                setIsSearchOpen(prev => {
                  if (!prev) setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
                  return !prev;
                });
              }}
              className="p-2.5 bg-gray-50/80 text-gray-600 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 shadow-sm border border-gray-100 hover:scale-110 hidden sm:block"
            >
              <Search size={18} />
            </button>
          </div>

          {/* User Profile / Login */}
          <div className="hidden sm:flex items-center z-50 border-l border-gray-200 pl-4 lg:pl-6">
            {user ? (
              <div className="relative group py-2">
                <button className="flex items-center space-x-2 cursor-pointer text-sm font-bold text-gray-700 hover:text-pink-600 transition-colors px-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-purple-200 text-[#3b1c54] shadow-sm rounded-full flex items-center justify-center text-sm uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-gray-400 group-hover:text-pink-600 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {/* Profile Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform origin-top -translate-y-4 group-hover:translate-y-0">
                  <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-b from-pink-50/50 to-white">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center gap-3 transition-colors">
                      <User size={16} className="text-gray-400"/> My Profile
                    </button>
                    <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center gap-3 transition-colors">
                      <Package size={16} className="text-gray-400"/> My Orders
                    </button>
                    <div className="h-px bg-gray-100 my-1 mx-2"></div>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                      <LogOut size={16} className="text-red-400"/> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center space-x-2 text-sm font-bold text-gray-600 hover:text-[#3b1c54] hover:bg-gray-50 transition-all py-2 px-3 rounded-xl"
              >
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <User size={16} className="text-gray-500" />
                </div>
                <span>Log In</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- SEARCH OVERLAY --- */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-md z-[100] transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="max-w-4xl mx-auto pt-24 px-6 relative">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-6 p-2 text-gray-500 hover:text-gray-900 bg-gray-100 rounded-full">
            <X size={24} />
          </button>
          
          <div className="relative">
            <Search size={28} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              id="searchInput"
              type="text" 
              placeholder="Search for face wash, moisturiser, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-2xl lg:text-4xl bg-transparent border-b-2 border-gray-300 focus:border-pink-500 py-4 pl-16 pr-4 outline-none text-gray-900 placeholder-gray-300 transition-colors"
            />
          </div>

          {searchQuery && (
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Search Results ({searchResults.length})</h3>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pb-10">
                  {searchResults.map(product => (
                    <div 
                      key={product.id} 
                      onClick={() => navigateToProduct(product)}
                      className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md cursor-pointer transition-all"
                    >
                      <img src={product.img} alt={product.name} className="w-16 h-16 object-contain mix-blend-multiply bg-gray-50 rounded" />
                      <div>
                        <p className="text-xs text-pink-500 uppercase">{product.category}</p>
                        <h4 className="font-bold text-gray-900">{product.name}</h4>
                        <p className="text-gray-600">₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 text-xl">
                  No products found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- VIEWS --- */}
      {currentView === 'home' ? (
        <main>
          {/* 2. HERO SECTION */}
          <section className="relative w-full pt-16 pb-32 px-8 lg:px-24 flex flex-col lg:flex-row items-center justify-between"
            style={{
              background: 'linear-gradient(to right bottom, #6b8cce, #d881b7, #f05a7e)'
            }}
          >
            {/* Left Content */}
            <div className="lg:w-1/2 flex flex-col items-start space-y-6 z-10 lg:pr-12">
              <h1 className="text-5xl lg:text-6xl text-gray-900 leading-[1.2] font-medium tracking-tight">
                Glow Naturally. Shine <br /> Confidently.
              </h1>
              <p className="text-xl lg:text-2xl text-gray-800 max-w-lg leading-snug">
                Xenyra brings you gentle, effective <br />
                <span 
                  onClick={() => {setCurrentView('shop'); window.scrollTo(0,0);}}
                  className="text-blue-700 font-medium cursor-pointer hover:text-blue-900 hover:underline transition-all"
                >
                  skincare
                </span> made to nourish, protect, <br />
                and enhance your natural beauty.
              </p>
              <button 
                onClick={() => {setCurrentView('shop'); window.scrollTo(0,0);}}
                className="mt-6 bg-[#3f1e58] text-white px-8 py-3 rounded-md font-medium text-lg hover:bg-[#2a133d] transition shadow-lg"
              >
                Discover
              </button>
            </div>

            {/* Right: Enlarged Bundle Card */}
            <div className="lg:w-1/2 flex flex-col items-center mt-12 lg:mt-0 z-10 w-full">
              <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl w-full max-w-[500px] border border-white/60 transform transition-all hover:-translate-y-1 hover:shadow-3xl">
                {/* Header */}
                <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-5">
                  <div>
                    <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Bestseller Routine</span>
                    <h3 className="font-extrabold text-gray-900 text-2xl">Essential Glow Trio</h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Your perfect 3-step daily routine.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-[#f05a7e] block">₹1,147</span>
                    <span className="text-sm text-gray-400 line-through">₹1,300</span>
                  </div>
                </div>

                {/* Products List with Benefits */}
                <div className="space-y-3 mb-8">
                  {/* Step 1: Face Wash */}
                  <div 
                    className="flex items-center gap-5 bg-gray-50/70 p-4 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white hover:shadow-md transition-all duration-300"
                    onClick={addBundleToCart}
                  >
                    <div className="w-20 h-20 bg-white rounded-xl p-2 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img src={PRODUCTS.find(p=>p.id===1).img} alt="Face Wash" className="w-full h-full object-contain mix-blend-multiply"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">Step 1: Cleanse</h4>
                      <p className="text-sm text-gray-600 leading-snug">Purifies pores & removes impurities without stripping natural moisture.</p>
                    </div>
                  </div>

                  {/* Step 2: Moisturiser */}
                  <div 
                    className="flex items-center gap-5 bg-gray-50/70 p-4 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white hover:shadow-md transition-all duration-300"
                    onClick={addBundleToCart}
                  >
                    <div className="w-20 h-20 bg-white rounded-xl p-2 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300 delay-75">
                      <img src={PRODUCTS.find(p=>p.id===17).img} alt="Moisturiser" className="w-full h-full object-contain mix-blend-multiply"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">Step 2: Hydrate</h4>
                      <p className="text-sm text-gray-600 leading-snug">Locks in deep 24hr hydration for a plump, healthy, and dewy finish.</p>
                    </div>
                  </div>

                  {/* Step 3: Sunscreen */}
                  <div 
                    className="flex items-center gap-5 bg-gray-50/70 p-4 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white hover:shadow-md transition-all duration-300"
                    onClick={addBundleToCart}
                  >
                    <div className="w-20 h-20 bg-white rounded-xl p-2 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300 delay-150">
                      <img src={PRODUCTS.find(p=>p.id===13).img} alt="Sunscreen" className="w-full h-full object-contain mix-blend-multiply"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">Step 3: Protect</h4>
                      <p className="text-sm text-gray-600 leading-snug">Broad-spectrum SPF 50 shield. Zero white cast with a non-greasy feel.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={addBundleToCart}
                  className="w-full bg-[#3f1e58] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2a133d] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
                >
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" /> 
                  Add Complete Routine to Cart
                </button>
              </div>
            </div>
          </section>

          {/* 3. WELCOME SECTION */}
          <section className="relative w-full pb-24 pt-24 px-8 lg:px-24 bg-[#dedcee]">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
              
              {/* Left: Product Grid */}
              <div className="lg:w-1/2 grid grid-cols-6 gap-2 bg-white p-4 rounded-xl shadow-sm">
                {[...Array(18)].map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => navigateToProduct(PRODUCTS[i % PRODUCTS.length])}
                    className="aspect-[3/4] bg-gray-50 flex items-center justify-center p-1 overflow-hidden border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src={PRODUCTS[i % PRODUCTS.length].img} 
                      alt="Product"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                ))}
              </div>

              {/* Right: Text Content */}
              <div className="lg:w-1/2 flex flex-col items-start space-y-6 lg:pl-8">
                <h2 className="text-[2.75rem] font-bold text-gray-900 tracking-tight leading-none">
                  Welcome to Xenyra
                </h2>
                <p className="text-xl text-gray-800">
                  At Xenyra, we believe skincare is not just a <br /> routine—it's self-love.
                </p>
                <p className="text-xl text-gray-800 max-w-lg leading-relaxed font-light">
                  <span 
                    onClick={() => {setCurrentView('shop'); window.scrollTo(0,0);}}
                    className="bg-[#fadbe7] italic px-2 py-0.5 text-[#3b1c54] font-normal mr-1 cursor-pointer hover:bg-[#f0c2d3] transition-colors rounded-sm"
                  >
                    Our products
                  </span> 
                  are crafted with a blend of science and nature to give your skin the care it truly deserves.
                </p>
                <button 
                  onClick={() => {setCurrentView('shop'); window.scrollTo(0,0);}}
                  className="mt-4 bg-[#fadbe7] text-[#3b1c54] px-6 py-3 rounded-md font-medium hover:bg-[#f5c7d8] transition"
                >
                  Discover our products
                </button>
              </div>
            </div>
          </section>

          {/* 3.5 BRAND VIDEO SECTION */}
          <section className="relative w-full py-24 px-8 lg:px-24 bg-gradient-to-b from-[#dedcee] to-white flex flex-col items-center justify-center">
            <div className="text-center mb-10">
              <span className="text-[#d97736] font-bold tracking-widest text-sm mb-4 uppercase drop-shadow-sm">The Experience</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mt-2">
                Discover Your <span className="text-[#f05a7e]">Glow</span>
              </h2>
            </div>
            
            <div className="w-full max-w-5xl relative aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-8 border-white bg-gray-100 group">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/zkoGpJS5aCM?playsinline=1&rel=0&modestbranding=1"
                title="Xenyra Brand Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* 4. OUR STORY SECTION */}
          <section className="relative w-full py-24 px-8 lg:px-24 flex flex-col lg:flex-row items-center justify-between overflow-hidden"
            style={{
              background: 'linear-gradient(to right, #8196e8, #a379d4, #e45187)'
            }}
          >
            {/* Subtle background waves */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto" preserveAspectRatio="none">
                <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>

            {/* Left: Text */}
            <div className="lg:w-1/2 flex flex-col items-start space-y-6 z-10 max-w-xl">
              <h2 className="text-3xl font-bold text-[#2a133d] border-b-[3px] border-[#2a133d] pb-1 inline-block">
                Our Story
              </h2>
              <p className="text-gray-900 text-lg leading-relaxed font-medium">
                Our journey began with a vision to make skincare accessible to everyone. We started by placing our innovative vending machines in high-traffic areas, quickly gaining popularity for our curated selection of premium skincare products that cater to all skin types.
              </p>
            </div>

            {/* Right: Image and Graphic */}
            <div className="lg:w-1/2 flex justify-end mt-16 lg:mt-0 z-10 relative">
              <div className="relative w-full max-w-[500px] bg-[#c1e8ff] rounded-lg p-0 shadow-2xl aspect-[4/3] flex items-end justify-center overflow-hidden border border-white/30">
                <div className="absolute top-4 right-4 bg-[#facc15] p-5 rounded-[2.5rem] rounded-tr-xl rounded-bl-[3rem] transform -rotate-2 max-w-[260px] z-20 shadow-md border-2 border-white/20">
                  <h3 className="text-white text-xl font-black leading-tight text-center drop-shadow-md" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif'}}>
                    face cream for boys:<br/> breaking skincare<br/> stereotype!
                  </h3>
                  <div className="absolute -bottom-5 left-12 w-10 h-10 bg-[#facc15] transform rotate-45 rounded-sm"></div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1596404554332-90bf66b44ab6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Boy with face cream" 
                  className="relative z-10 w-full h-[120%] object-cover object-top translate-y-8"
                />
              </div>
            </div>
          </section>

          {/* 5. TESTIMONIALS SECTION */}
          <section className="relative w-full py-28 px-8 lg:px-24 bg-gradient-to-br from-[#fcfbf6] via-[#f3e5f5] to-[#fff0f5]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[#d97736] font-bold tracking-widest text-sm mb-4 uppercase">Testimonials</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mt-2">
                  Real People, <span className="text-[#a379d4]">Real Results</span>
                </h2>
                <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                  See what our community has to say about their journey to healthier, glowing skin with Xenyra.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Video 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-full relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white bg-gray-100 transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/cgaXuXoE-Dc?playsinline=1&rel=0&modestbranding=1"
                      title="Customer Testimonial 1"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* Video 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-full relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white bg-gray-100 transform md:rotate-2 hover:rotate-0 transition-transform duration-500 md:translate-y-8">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/xZz_CMgUW0A?playsinline=1&rel=0&modestbranding=1"
                      title="Customer Testimonial 2"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : currentView === 'product' && selectedProduct ? (
        /* --- PRODUCT DETAILS VIEW --- */
        <main className="py-12 px-6 lg:px-24 bg-white min-h-[80vh]">
          <div className="max-w-6xl mx-auto">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <button onClick={navigateHome} className="hover:text-pink-600 transition">Home</button>
              <span>/</span>
              <button onClick={() => navigateToCategory(selectedProduct.category)} className="hover:text-pink-600 transition capitalize">{selectedProduct.category}</button>
              <span>/</span>
              <span className="text-gray-900 font-medium">{selectedProduct.name}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
              {/* Product Image */}
              <div className="md:w-1/2 relative bg-gray-50 rounded-2xl p-12 flex items-center justify-center border border-gray-100 aspect-square md:aspect-auto md:min-h-[500px]">
                <button 
                  onClick={(e) => toggleFavorite(selectedProduct, e)}
                  className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-md text-gray-400 hover:text-pink-500 transition-colors z-10"
                >
                  <Heart 
                    size={24} 
                    fill={favorites.some(f => f.id === selectedProduct.id) ? '#ec4899' : 'none'} 
                    className={favorites.some(f => f.id === selectedProduct.id) ? 'text-pink-500' : ''}
                  />
                </button>
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl"
                />
              </div>

              {/* Product Info */}
              <div className="md:w-1/2 flex flex-col justify-center">
                <span className="text-sm font-bold text-pink-500 tracking-widest uppercase mb-2">
                  {selectedProduct.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {selectedProduct.name}
                </h1>
                <p className="text-3xl font-light text-gray-900 mb-6">
                  ₹{selectedProduct.price}
                </p>
                
                <div className="prose text-gray-600 mb-8 space-y-4">
                  <p>
                    Experience the perfect blend of nature and science with our {selectedProduct.name}. Carefully formulated to nourish and revitalize your skin, giving you that natural, healthy glow every single day.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>100% Cruelty-free and vegan formulation</li>
                    <li>Dermatologically tested for all skin types</li>
                    <li>Free from parabens and harsh chemicals</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 mb-8 border-t border-b border-gray-100 py-6">
                  <ShieldCheck className="text-green-500" size={24} />
                  <span className="text-sm text-gray-700 font-medium">100% Authentic Product Guarantee</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-[#3b1c54] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setIsCheckoutOpen(true);
                      setIsCartOpen(false);
                    }}
                    className="flex-1 bg-pink-100 text-pink-700 py-4 px-8 rounded-xl font-bold text-lg hover:bg-pink-200 transition-all flex items-center justify-center"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : currentView === 'about' ? (
        <main className="py-20 px-6 lg:px-24 min-h-[80vh] flex flex-col items-center gap-16" style={{ background: 'linear-gradient(to right bottom, #6b8cce, #d881b7, #f05a7e)' }}>
          {/* Main About Card */}
          <div className="max-w-4xl w-full bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-10 border border-white/20 text-center relative z-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">About Xenyra</h1>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-left">
              <p>Welcome to <strong className="text-pink-600">Xenyra</strong>, where nature meets scientific innovation. Founded on the belief that everyone deserves to feel confident in their own skin, Xenyra is dedicated to crafting premium skincare solutions that are as effective as they are gentle.</p>
              <p>Our journey began with a simple yet powerful vision: to break stereotypes and make high-quality skincare accessible to all. From our early days placing innovative vending machines in high-traffic areas, to our current comprehensive product line, we have always prioritized clean ingredients and proven results.</p>
              <p>Every product in the Xenyra collection is meticulously formulated using ethically sourced botanicals and clinical-grade actives. Whether you're looking for a refreshing face wash or a deeply nourishing moisturizer, our products are 100% cruelty-free, dermatologist-tested, and designed to celebrate your natural glow.</p>
              <p className="pt-4 font-medium text-center text-gray-900 italic">Skincare isn't just a routine—it's an act of self-love. <br/>Thank you for letting Xenyra be a part of yours.</p>
            </div>
          </div>

          {/* About Us Image Gallery */}
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pb-4 md:pb-12">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white/40 bg-white/20 relative aspect-[4/3] group transform transition-all hover:-translate-y-2">
              <img 
                src="https://iili.io/qF7V8c7.jpg" 
                alt="Xenyra Skincare Experience" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              />
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white/40 bg-white/20 relative aspect-[4/3] group transform transition-all hover:-translate-y-2 md:translate-y-12">
              <img 
                src="https://iili.io/qF7VSS9.jpg" 
                alt="Xenyra Products Collection" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-7xl w-full bg-white/95 backdrop-blur rounded-[2rem] shadow-2xl p-10 lg:p-16 border border-white/20 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-pink-100/80 text-pink-700 px-5 py-2.5 rounded-full font-bold text-sm mb-6 uppercase tracking-wider shadow-sm border border-pink-200">
                <Star size={18} className="fill-pink-500 text-pink-500" />
                Over 100K+ Happy Customers
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Our Happy Customers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {REVIEWS.map(review => (
                <div key={review.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic flex-grow mb-8 text-[16px] leading-relaxed font-medium">
                    {review.text}
                  </p>
                  <div className="pt-4 border-t border-gray-50">
                    <span className="font-bold text-gray-900">{review.name}</span>
                    <span className="text-gray-400 text-sm ml-2">- {review.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : currentView === 'privacy' ? (
        <main className="py-20 px-6 lg:px-24 min-h-[80vh] flex flex-col items-center" style={{ background: 'linear-gradient(to right bottom, #6b8cce, #d881b7, #f05a7e)' }}>
          <div className="max-w-4xl w-full bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-10 border border-white/20">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-10 pb-4 border-b border-gray-100">Effective Date: February 2026</p>
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section><h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2><p>We may collect personal information such as your name, email address, phone number, and shipping address when you make a purchase, create an account, or sign up for our newsletter. We also automatically collect certain device information and browsing data when you visit our site.</p></section>
              <section><h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2><p>We use your information to process transactions, fulfill orders, improve our website functionality, and communicate with you. With your consent, we may also send you promotional emails about new Xenyra products and special offers.</p></section>
              <section><h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies and Tracking</h2><p>Our website uses cookies to enhance your browsing experience, remember your cart items, and analyze site traffic patterns. You can choose to disable cookies through your browser settings, though some website features may not function properly.</p></section>
              <section><h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security & Payments</h2><p>We implement standard industry practices to protect your data. All payment transactions are processed through secure, encrypted payment gateways (such as Razorpay). We do not store your full credit card information on our servers.</p></section>
              <section><h2 className="text-xl font-bold text-gray-900 mb-3">5. Contact Us</h2><p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out to our dedicated support team at <strong>privacy@xenyra.com</strong>.</p></section>
            </div>
          </div>
        </main>
      ) : currentView === 'contact' ? (
        <main className="py-16 px-6 lg:px-24 min-h-[80vh] flex items-center justify-center" style={{ background: 'linear-gradient(to right bottom, #6b8cce, #d881b7, #f05a7e)' }}>
          <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/5 p-8 lg:p-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact us</h1>
              <p className="text-gray-500 mb-8">Contact us about anything related to our company or services.</p>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Name *</label>
                    <input type="text" defaultValue={user ? user.name : ""} placeholder={user ? user.name : "Name"} className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#6b8cce] outline-none transition" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#6b8cce] outline-none transition" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email *</label>
                    <input type="email" defaultValue={user ? user.email : "xenyrabeautyandskincare@gmail.com"} className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#6b8cce] outline-none transition" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Company</label>
                    <input type="text" placeholder="ACME Corp" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#6b8cce] outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Subject *</label>
                  <input type="text" placeholder="Describe your request" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#6b8cce] outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Message *</label>
                  <textarea rows="4" placeholder="Write down your message" className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6b8cce] outline-none transition resize-none"></textarea>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
                  <p className="text-sm text-gray-500">We typically respond within 1-2 business days.</p>
                  <button type="submit" className="bg-[#6b4b66] text-white px-8 py-3 rounded-md font-medium hover:bg-[#4f354b] transition shadow-md w-full sm:w-auto">Send Message</button>
                </div>
              </form>
            </div>
            <div className="hidden lg:block lg:w-2/5 relative overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Architecture Contact" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-white/10 flex items-center justify-center pointer-events-none">
                <div className="text-[#b34000] font-bold text-6xl leading-[0.8] tracking-tight transform -rotate-[25deg] opacity-90 drop-shadow-sm select-none" style={{ fontFamily: '"Brush Script MT", cursive, sans-serif' }}>Xenyra<br/>Skincare</div>
              </div>
            </div>
          </div>
        </main>
      ) : currentView === 'ai-routine' ? (
        <main className="py-20 px-6 lg:px-24 min-h-[80vh] flex flex-col items-center bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full font-bold text-sm mb-6 shadow-md">
                <Sparkles size={16} /> Powered by Gemini AI
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Your Custom Skincare Routine</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tell us a bit about your skin, and our AI dermatologist will curate the perfect 3-step Xenyra routine just for you.</p>
            </div>

            {!aiResult && !aiLoading && (
              <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-xl border border-white/60">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700">Skin Type</label>
                    <select value={aiSkinType} onChange={e => setAiSkinType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-pink-500 outline-none">
                      <option>Combination</option>
                      <option>Oily</option>
                      <option>Dry</option>
                      <option>Normal</option>
                      <option>Sensitive</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700">Primary Concern</label>
                    <select value={aiConcern} onChange={e => setAiConcern(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-pink-500 outline-none">
                      <option>Acne & Breakouts</option>
                      <option>Aging & Fine Lines</option>
                      <option>Dullness & Uneven Tone</option>
                      <option>Dryness & Flaking</option>
                      <option>Redness & Irritation</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700">Local Climate</label>
                    <select value={aiClimate} onChange={e => setAiClimate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-pink-500 outline-none">
                      <option>Humid</option>
                      <option>Dry</option>
                      <option>Cold & Windy</option>
                      <option>Hot & Sunny</option>
                    </select>
                  </div>
                </div>
                
                {aiError && <p className="text-red-500 text-center mb-6 font-medium bg-red-50 py-3 rounded-lg">{aiError}</p>}

                <button 
                  onClick={generateAiRoutine}
                  className="w-full bg-gradient-to-r from-[#3b1c54] to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-[#2a133d] hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Wand2 size={20} /> ✨ Generate My Routine
                </button>
              </div>
            )}

            {aiLoading && (
              <div className="bg-white/80 backdrop-blur-md p-16 rounded-[2rem] shadow-xl border border-white/60 flex flex-col items-center justify-center text-center">
                <Loader2 size={48} className="text-pink-500 animate-spin mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyzing your skin profile...</h3>
                <p className="text-gray-500">Our AI expert is selecting the perfect Xenyra products for you.</p>
              </div>
            )}

            {aiResult && !aiLoading && (
              <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border border-pink-100 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Your Perfect Routine</h2>
                    <p className="text-gray-600 font-medium italic border-l-4 border-pink-400 pl-4 bg-pink-50/50 py-2 pr-2 rounded-r-lg">{aiResult.advice}</p>
                  </div>
                  <button onClick={() => setAiResult(null)} className="text-sm font-bold text-gray-400 hover:text-pink-600 underline">Start Over</button>
                </div>

                <div className="space-y-6 mb-10">
                  {aiResult.routine.map((stepInfo, index) => {
                    const product = PRODUCTS.find(p => p.id === stepInfo.productId);
                    if (!product) return null;
                    return (
                      <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-sm flex-shrink-0 relative">
                          <span className="absolute -top-3 -left-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">{stepInfo.step}</span>
                          <img src={product.img} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">{stepInfo.time} Routine</span>
                          <h4 className="text-xl font-bold text-gray-900 mt-1 mb-2">{product.name}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{stepInfo.reason}</p>
                        </div>
                        <div className="font-bold text-xl text-gray-900 md:mt-6">₹{product.price}</div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={addAiRoutineToCart}
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-orange-500 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={20} /> Add Routine to Cart ✨
                </button>
              </div>
            )}
          </div>
        </main>
      ) : currentView === 'faq' ? (
        /* --- FAQ VIEW --- */
        <main className="py-20 px-6 lg:px-24 min-h-[80vh] flex flex-col items-center bg-gray-50">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-500">Everything you need to know about Xenyra products and our services.</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f05a7e]"></div> Are Xenyra products cruelty-free and vegan?
                </h3>
                <p className="text-gray-600 leading-relaxed ml-4">Yes! We are proudly 100% cruelty-free. We never test on animals, and the majority of our skincare line is entirely vegan. Check individual product labels for specific botanical certifications.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f05a7e]"></div> How do I know which products are right for my skin type?
                </h3>
                <p className="text-gray-600 leading-relaxed ml-4">We recommend starting with our gentle 'Face Wash' and a basic 'Moisturiser'. For specific concerns, check the detailed descriptions on each product page, which indicate whether they are best for oily, dry, combination, or sensitive skin.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f05a7e]"></div> Can I use your products if I have sensitive skin?
                </h3>
                <p className="text-gray-600 leading-relaxed ml-4">Absolutely. Our formulations are free from harsh chemicals, parabens, and synthetic fragrances, making them ideal for sensitive skin. However, we always recommend patch-testing a new product on your jawline before full application.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f05a7e]"></div> What is your return policy?
                </h3>
                <p className="text-gray-600 leading-relaxed ml-4">We offer a 30-day money-back guarantee. If you aren't completely satisfied with your purchase or if a product doesn't suit your skin, simply reach out to our support team for a hassle-free return or exchange.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f05a7e]"></div> How long does shipping usually take?
                </h3>
                <p className="text-gray-600 leading-relaxed ml-4">Standard shipping takes 3-5 business days within the country. You will receive a tracking link via email as soon as your order dispatches from our warehouse.</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <button onClick={navigateToContact} className="bg-[#3b1c54] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2a133d] transition-colors shadow-md">
                Contact Customer Support
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* --- SHOP VIEW --- */
        <main className="py-16 px-6 lg:px-24 bg-white min-h-[80vh]">
          <div className="max-w-7xl mx-auto">
            
            {/* Shop Header */}
            <div className="text-center mb-10">
              <h1 className="text-5xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">Shop All</h1>
              <p className="text-lg text-gray-500 font-medium">Nourish, protect, and enhance your natural beauty.</p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-6 py-2.5 rounded-full text-[15px] font-bold transition-all ${
                  activeCategory === 'All' 
                    ? 'bg-black text-white shadow-md' 
                    : 'bg-[#f4f4f5] text-[#3f3f46] hover:bg-[#e4e4e7]'
                }`}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[15px] font-bold transition-all capitalize ${
                    activeCategory === cat 
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-[#f4f4f5] text-[#3f3f46] hover:bg-[#e4e4e7]'
                  }`}
                >
                  {cat === 'faceWash' ? 'Face Wash' : cat}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory).map(product => (
                <div 
                  key={product.id} 
                  onClick={() => navigateToProduct(product)}
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden p-6 relative mb-4">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={(e) => toggleFavorite(product, e)}
                      className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-gray-400 hover:text-pink-500 transition-colors z-10"
                    >
                      <Heart 
                        size={18} 
                        fill={favorites.some(f => f.id === product.id) ? '#ec4899' : 'none'} 
                        className={favorites.some(f => f.id === product.id) ? 'text-pink-500' : ''}
                      />
                    </button>
                    {/* Add to Cart overlay button */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button 
                        onClick={(e) => addToCart(product, e)}
                        className="w-full bg-black/90 backdrop-blur text-white py-3 rounded-xl font-bold text-sm hover:bg-black flex items-center justify-center gap-2 shadow-lg"
                      >
                        <ShoppingCart size={16} /> Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="px-1">
                    <h4 className="text-[15px] font-bold text-gray-900 mb-1 leading-tight line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-gray-500 text-sm font-medium">₹{product.price}</p>
                  </div>
                </div>
              ))}
              
              {/* Empty State Fallback */}
              {PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory).length === 0 && (
                <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium text-lg">More {activeCategory} products coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* --- PRE-FOOTER CTA --- */}
      <section className="bg-[#fcfbf6] py-24 px-6 text-center flex flex-col items-center">
        <span className="text-[#d97736] font-bold tracking-widest text-sm mb-4 uppercase">#GlowOnTheGo</span>
        <h2 className="text-4xl md:text-[44px] font-bold text-[#1a1a1a] mb-6 tracking-tight">Join the Skincare Festival Experience</h2>
        <p className="text-[#4b5563] max-w-2xl mx-auto text-[17px] mb-10 leading-relaxed">
          Follow us on social media and join thousands of others who have transformed their skin routine.
        </p>
        <button
          onClick={() => { setActiveCategory('All'); setCurrentView('shop'); window.scrollTo(0, 0); }}
          className="bg-black text-white px-8 py-4 uppercase tracking-[0.1em] text-[13px] font-bold shadow-md hover:bg-gray-800 transition-colors"
        >
          Shop The Collection
        </button>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#171717] pt-14 pb-8 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-6">
              <h2 className="text-[26px] font-bold tracking-[0.15em] text-white uppercase">XENYRA</h2>
              <p className="text-[#a1a1aa] text-[15px] leading-relaxed pr-6">
                Skincare crafted with a blend of science and nature. Glow naturally, shine confidently.
              </p>
            </div>

            {/* Col 2: Shop */}
            <div>
              <h4 className="font-bold text-white mb-6 text-[17px]">Shop</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => {setActiveCategory('All'); setCurrentView('shop'); window.scrollTo(0,0);}} className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">
                    All Products
                  </button>
                </li>
                <li>
                  <button onClick={() => {setActiveCategory('Cleanser'); setCurrentView('shop'); window.scrollTo(0,0);}} className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">
                    Cleansers
                  </button>
                </li>
                <li>
                  <button onClick={() => {setActiveCategory('Moisturisers'); setCurrentView('shop'); window.scrollTo(0,0);}} className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">
                    Moisturizers
                  </button>
                </li>
                <li>
                  <button onClick={() => {setCurrentView('shop'); window.scrollTo(0,0);}} className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">
                    Serums
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <h4 className="font-bold text-white mb-6 text-[17px]">Company</h4>
              <ul className="space-y-4">
                <li><button onClick={navigateToAbout} className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">Our Story</button></li>
                <li><button className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">Xenyra Clinic</button></li>
                <li><button className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">Careers</button></li>
                <li><button onClick={navigateToContact} className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">Contact Us</button></li>
              </ul>
            </div>

            {/* Col 4: Stay Connected */}
            <div>
              <h4 className="font-bold text-white mb-6 text-[17px]">Stay Connected</h4>
              <div className="flex space-x-3 mb-6">
                <a href="#" className="w-11 h-11 rounded-full bg-[#27272a] flex items-center justify-center text-white hover:bg-[#3f3f46] transition-colors"><Facebook size={18} /></a>
                <a href="#" className="w-11 h-11 rounded-full bg-[#27272a] flex items-center justify-center text-white hover:bg-[#3f3f46] transition-colors"><Instagram size={18} /></a>
                <a href="#" className="w-11 h-11 rounded-full bg-[#27272a] flex items-center justify-center text-white hover:bg-[#3f3f46] transition-colors"><Twitter size={18} /></a>
              </div>
              <p className="text-[#a1a1aa] text-[14px] leading-relaxed max-w-[200px]">
                Subscribe to our newsletter for 10% off.
              </p>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="border-t border-[#27272a] pt-6 flex flex-col items-center justify-center">
            <p className="text-[#71717a] text-[14px] font-medium text-center">
              © {new Date().getFullYear()} Xenyra. Powered by React. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* --- CART SLIDE-OUT --- */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={20} /> Your Cart
            <span className="bg-pink-100 text-pink-600 text-sm py-0.5 px-2 rounded-full font-medium ml-2">
              {cartItemCount} items
            </span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingCart size={64} className="opacity-20" />
              <p className="text-lg">Your cart is empty</p>
              <button onClick={() => { setIsCartOpen(false); setCurrentView('shop'); }} className="text-pink-600 font-medium hover:underline mt-2">
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">₹{item.price}</p>
                  <div className="flex items-center gap-3 bg-gray-50 w-max rounded-lg p-1 border border-gray-200">
                    <button onClick={() => updateCartQty(item.id, -1)} className="p-1 hover:bg-white rounded text-gray-600 shadow-sm"><Minus size={14} /></button>
                    <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateCartQty(item.id, 1)} className="p-1 hover:bg-white rounded text-gray-600 shadow-sm"><Plus size={14} /></button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{item.price * item.qty}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="font-bold text-2xl text-gray-900">₹{cartTotal}</span>
            </div>
            <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-[#3b1c54] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2a133d] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* --- FAVORITES SLIDE-OUT --- */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isFavoritesOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsFavoritesOpen(false)}
      />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isFavoritesOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-pink-50/50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Heart size={20} className="text-pink-500 fill-pink-500" /> Wishlist
            <span className="bg-pink-100 text-pink-600 text-sm py-0.5 px-2 rounded-full font-medium ml-2">
              {favorites.length} items
            </span>
          </h2>
          <button onClick={() => setIsFavoritesOpen(false)} className="p-2 hover:bg-pink-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favorites.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <Heart size={64} className="opacity-20" />
              <p className="text-lg">Your wishlist is empty</p>
            </div>
          ) : (
            favorites.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-white border border-gray-100 p-3 rounded-xl shadow-sm relative group cursor-pointer" onClick={() => {setIsFavoritesOpen(false); navigateToProduct(item);}}>
                <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0 pr-8">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                  <p className="text-xs text-pink-500 uppercase tracking-wide mb-1">{item.category}</p>
                  <p className="text-sm font-bold text-gray-900">₹{item.price}</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(item); setIsFavoritesOpen(false); }}
                    className="mt-2 text-xs bg-gray-900 text-white px-3 py-1.5 rounded flex items-center gap-1 hover:bg-[#3b1c54] transition"
                  >
                    <ShoppingCart size={12}/> Move to Cart
                  </button>
                </div>
                <button 
                  onClick={(e) => toggleFavorite(item, e)}
                  className="absolute top-2 right-2 p-2 text-gray-300 hover:text-red-500 transition-colors bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- REALISTIC RAZORPAY MODAL --- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/70 z-[80] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[400px] overflow-hidden relative animate-in fade-in zoom-in duration-200 font-sans">
            
            {/* Header */}
            <div className="bg-[#528FF0] text-white p-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-xl italic text-[#528FF0]">
                  R
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Xenyra Skincare</h3>
                  <p className="text-[11px] text-blue-100 uppercase tracking-wider bg-white/20 inline-block px-1.5 py-0.5 rounded mt-0.5">Test Mode</p>
                </div>
              </div>
              <button 
                onClick={() => paymentState === 'idle' && setIsCheckoutOpen(false)} 
                className={`text-blue-100 hover:text-white ${paymentState !== 'idle' ? 'opacity-0' : ''}`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="bg-gray-50 p-6">
              {paymentState === 'idle' && (
                <div className="space-y-6">
                  <div className="text-center py-2 border-b border-gray-200 pb-5">
                    <p className="text-gray-500 text-sm mb-1">Amount to Pay</p>
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">₹ {cartTotal.toLocaleString('en-IN')}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-gray-700">Contact Details</p>
                    <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                       <input 
                         type="text" 
                         placeholder="Phone Number" 
                         className="w-full border-b border-gray-200 px-4 py-3 text-sm focus:outline-none focus:bg-blue-50/50 transition-colors" 
                         defaultValue="+91 9876543210" 
                       />
                       <input 
                         type="email" 
                         placeholder="Email ID" 
                         className="w-full px-4 py-3 text-sm focus:outline-none focus:bg-blue-50/50 transition-colors" 
                         defaultValue="user@example.com" 
                       />
                    </div>
                  </div>

                  <button 
                    onClick={handlePayment}
                    className="w-full bg-[#528FF0] text-white py-3.5 rounded font-semibold text-[15px] hover:bg-[#407be0] transition-colors shadow-sm flex justify-center items-center gap-2 mt-2"
                  >
                    Pay ₹{cartTotal.toLocaleString('en-IN')}
                  </button>
                </div>
              )}

              {paymentState === 'processing' && (
                <div className="py-16 flex flex-col items-center justify-center space-y-5 bg-white rounded border border-gray-100 shadow-sm">
                  <Loader2 size={44} className="text-[#528FF0] animate-spin" />
                  <p className="text-[15px] font-medium text-gray-800">Processing Payment</p>
                  <p className="text-xs text-gray-500 text-center px-6 leading-relaxed">
                    Please wait while we process your payment.<br/>Do not press back or close this window.
                  </p>
                </div>
              )}

              {paymentState === 'success' && (
                <div className="py-12 flex flex-col items-center justify-center space-y-3 bg-white rounded border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Payment Successful</h3>
                  <p className="text-gray-500 text-sm text-center">
                    Payment ID: pay_{Math.random().toString(36).substring(2, 10)}<br/><span className="text-xs text-gray-400 mt-2 block">Redirecting to merchant...</span>
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-white p-3 flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-200">
              <div className="flex items-center gap-1 font-medium"><Lock size={10} className="text-green-600"/> 100% SECURE</div>
              <div className="font-bold text-gray-500 tracking-wider">RAZORPAY</div>
            </div>
          </div>
        </div>
      )}

      {/* --- LOGIN / SIGNUP MODAL --- */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
                <button onClick={() => setIsLoginOpen(false)} className="text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                  <X size={20}/>
                </button>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">Sign in to access your saved favorites, track your orders, and manage your account.</p>
              <form onSubmit={handleLogin}>
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={loginName} 
                      onChange={e => setLoginName(e.target.value)} 
                      placeholder="e.g. Yadav Pankaj" 
                      className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#3b1c54] focus:border-transparent outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={loginEmail} 
                      onChange={e => setLoginEmail(e.target.value)} 
                      placeholder="yadav@example.com" 
                      className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#3b1c54] focus:border-transparent outline-none transition" 
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#3b1c54] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2a133d] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <User size={20} /> Sign In to Xenyra
                </button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account? <span className="text-pink-600 font-semibold cursor-pointer hover:underline">Sign up here</span>
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}