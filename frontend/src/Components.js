import React, { useState } from 'react';

// Header Component
const Header = ({ selectedCity, setSelectedCity, cities, onMessagesClick }) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white z-50 max-w-md mx-auto">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">PF</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">PhoneFlip</h1>
            <div className="relative">
              <button 
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="text-xs flex items-center"
              >
                📍 {selectedCity} ▼
              </button>
              {showCityDropdown && (
                <div className="absolute top-full left-0 bg-white text-black rounded-lg shadow-lg mt-1 py-2 w-40 z-10">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCityDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button 
          onClick={onMessagesClick}
          className="p-2 hover:bg-blue-700 rounded-full"
        >
          💬
        </button>
      </div>
    </header>
  );
};

// Bottom Navigation Component
const BottomNavigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'sell', icon: '➕', label: 'Sell' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex-1 py-3 px-1 text-center ${
              currentPage === item.id ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <div className="text-lg">{item.icon}</div>
            <div className="text-xs mt-1">{item.label}</div>
          </button>
        ))}
      </div>
    </nav>
  );
};

// Phone Card Component
const PhoneCard = ({ phone, onClick, compact = false }) => {
  const formatPrice = (price) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div 
      onClick={() => onClick(phone)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <img 
          src={phone.images[0]} 
          alt={phone.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          {phone.condition}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 mb-1 text-sm">{phone.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-blue-600">{formatPrice(phone.price)}</span>
          {phone.originalPrice > phone.price && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(phone.originalPrice)}</span>
          )}
        </div>
        
        <div className="space-y-1 text-xs text-gray-600">
          <div>📱 {phone.storage} • {phone.color}</div>
          <div>📍 {phone.location}</div>
          <div className="flex items-center">
            ⭐ {phone.rating} • {phone.posted}
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Grid Component
const CategoryGrid = ({ onCategoryClick }) => {
  const categories = [
    { name: 'Apple', icon: '🍎', color: 'bg-gray-100' },
    { name: 'Samsung', icon: '📱', color: 'bg-blue-100' },
    { name: 'Oppo', icon: '💚', color: 'bg-green-100' },
    { name: 'Vivo', icon: '💙', color: 'bg-purple-100' },
    { name: 'Realme', icon: '⚡', color: 'bg-yellow-100' },
    { name: 'Xiaomi', icon: '🧡', color: 'bg-orange-100' }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {categories.map(category => (
        <button
          key={category.name}
          onClick={() => onCategoryClick(category.name)}
          className={`${category.color} p-4 rounded-lg text-center hover:shadow-md transition-shadow`}
        >
          <div className="text-2xl mb-2">{category.icon}</div>
          <div className="text-sm font-medium">{category.name}</div>
        </button>
      ))}
    </div>
  );
};

// Home Page Component
const HomePage = ({ phones, onPhoneClick, onCategoryClick }) => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 mx-4 rounded-xl mt-4">
        <h2 className="text-xl font-bold mb-2">Welcome to PhoneFlip</h2>
        <p className="text-blue-100 text-sm mb-4">Pakistan's trusted phone marketplace</p>
        <div className="bg-white/20 p-3 rounded-lg">
          <div className="text-sm">💡 Featured Deal</div>
          <div className="font-semibold">iPhone 15 starting from PKR 350,000</div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3 px-4">Browse by Brand</h3>
        <CategoryGrid onCategoryClick={onCategoryClick} />
      </div>

      {/* Featured Phones */}
      <div>
        <h3 className="text-lg font-semibold mb-3 px-4">Featured Phones</h3>
        <div className="grid grid-cols-2 gap-3 px-4">
          {phones.map(phone => (
            <PhoneCard key={phone.id} phone={phone} onClick={onPhoneClick} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-100 p-4 mx-4 rounded-lg">
        <h4 className="font-semibold mb-3">Why PhoneFlip?</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">1000+</div>
            <div className="text-xs text-gray-600">Active Listings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">98%</div>
            <div className="text-xs text-gray-600">Satisfied Users</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">24/7</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search Page Component
const SearchPage = ({ phones, onPhoneClick, searchQuery, setSearchQuery, onFilterClick, filters }) => {
  const activeFiltersCount = Object.values(filters).filter(f => f !== 'All').length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search phones, brands, models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg pl-10"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">🔍</div>
          </div>
          <button 
            onClick={onFilterClick}
            className="p-3 border border-gray-300 rounded-lg relative"
          >
            🔧
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{phones.length} phones found</h3>
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>Sort by: Latest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>

        {phones.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {phones.map(phone => (
              <PhoneCard key={phone.id} phone={phone} onClick={onPhoneClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">No phones found</h3>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Phone Details Component
const PhoneDetails = ({ phone, onBack, onMessageSeller }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const formatPrice = (price) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center p-4 border-b sticky top-16 bg-white z-10">
        <button onClick={onBack} className="mr-3 text-xl">←</button>
        <h2 className="text-lg font-semibold flex-1">Phone Details</h2>
        <button className="text-xl">❤️</button>
      </div>

      <div className="space-y-6">
        {/* Images */}
        <div className="relative">
          <img 
            src={phone.images[currentImageIndex]} 
            alt={phone.title}
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            1/{phone.images.length}
          </div>
        </div>

        {/* Price and Title */}
        <div className="px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-blue-600">{formatPrice(phone.price)}</span>
            {phone.originalPrice > phone.price && (
              <span className="text-lg text-gray-500 line-through">{formatPrice(phone.originalPrice)}</span>
            )}
          </div>
          <h1 className="text-xl font-semibold mb-2">{phone.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{phone.condition}</span>
            <span>📍 {phone.location}</span>
            <span>⏰ {phone.posted}</span>
          </div>
        </div>

        {/* Specifications */}
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-3">Specifications</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Storage</span>
              <span className="font-medium">{phone.storage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Color</span>
              <span className="font-medium">{phone.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Display</span>
              <span className="font-medium">{phone.specs.display}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Camera</span>
              <span className="font-medium">{phone.specs.camera}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Battery</span>
              <span className="font-medium">{phone.specs.battery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">RAM</span>
              <span className="font-medium">{phone.specs.ram}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processor</span>
              <span className="font-medium">{phone.specs.processor}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">{phone.description}</p>
        </div>

        {/* Seller Info */}
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {phone.seller.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{phone.seller}</div>
                <div className="flex items-center text-sm text-gray-600">
                  ⭐ {phone.rating} (127 reviews)
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              ✅ Verified seller • Member since 2022
            </div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="px-4 pb-8">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              📞 Call Now
            </button>
            <button 
              onClick={onMessageSeller}
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              💬 WhatsApp
            </button>
          </div>
          <button className="w-full mt-3 border border-gray-300 py-3 rounded-lg font-semibold">
            💰 Make Offer
          </button>
        </div>
      </div>
    </div>
  );
};

// Sell Page Component
const SellPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    storage: '',
    condition: '',
    price: '',
    description: '',
    color: '',
    location: 'Karachi'
  });

  const brands = ['Apple', 'Samsung', 'Oppo', 'Vivo', 'Realme', 'Xiaomi', 'OnePlus', 'Tecno'];
  const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center p-4 border-b sticky top-16 bg-white z-10">
        <button onClick={onBack} className="mr-3 text-xl">←</button>
        <h2 className="text-lg font-semibold">Sell Your Phone</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Photos (Add up to 5)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-gray-600 text-sm">Tap to add photos</p>
            <p className="text-xs text-gray-500 mt-1">Good photos get 3x more responses</p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone Title *</label>
            <input
              type="text"
              placeholder="e.g., iPhone 15 Pro Max 256GB"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Brand *</label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Storage *</label>
              <select
                value={formData.storage}
                onChange={(e) => setFormData({...formData, storage: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Storage</option>
                {storageOptions.map(storage => (
                  <option key={storage} value={storage}>{storage}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Condition *</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({...formData, condition: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <input
                type="text"
                placeholder="e.g., Space Gray"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (PKR) *</label>
            <input
              type="number"
              placeholder="e.g., 85000"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">💡 Tip: Check similar phones for competitive pricing</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              placeholder="Describe your phone's condition, any accessories included, reason for selling..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h3 className="font-semibold">Additional Options</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">PTA Approved</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Under Warranty</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Original Box & Accessories</span>
          </label>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg">
          Post Ad - FREE
        </button>

        <p className="text-xs text-gray-500 text-center">
          By posting, you agree to PhoneFlip's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

// Profile Page Component
const ProfilePage = ({ phones, onPhoneClick }) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-blue-600 text-white p-6 mx-4 rounded-xl mt-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
            AK
          </div>
          <div>
            <h2 className="text-xl font-bold">Ahmad Khan</h2>
            <p className="text-blue-100">⭐ 4.8 (45 reviews)</p>
            <p className="text-blue-100 text-sm">Member since Jan 2023</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white border border-gray-200 p-4 rounded-lg text-center">
            <div className="text-xl mb-2">📋</div>
            <div className="text-sm font-medium">My Ads</div>
            <div className="text-xs text-gray-500">5 active</div>
          </button>
          <button className="bg-white border border-gray-200 p-4 rounded-lg text-center">
            <div className="text-xl mb-2">❤️</div>
            <div className="text-sm font-medium">Favorites</div>
            <div className="text-xs text-gray-500">12 saved</div>
          </button>
        </div>
      </div>

      {/* My Listings */}
      <div className="px-4">
        <h3 className="text-lg font-semibold mb-3">My Active Listings</h3>
        <div className="space-y-3">
          {phones.map(phone => (
            <div key={phone.id} className="bg-white border border-gray-200 rounded-lg p-3 flex gap-3">
              <img src={phone.images[0]} alt={phone.title} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{phone.title}</h4>
                <p className="text-blue-600 font-semibold">PKR {phone.price.toLocaleString()}</p>
                <p className="text-xs text-gray-500">👁️ 23 views • 💬 3 messages</p>
              </div>
              <button className="text-gray-400">⋮</button>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="px-4">
        <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
        <div className="bg-white rounded-lg border border-gray-200">
          {[
            { icon: '👤', text: 'Edit Profile', arrow: true },
            { icon: '🔔', text: 'Notifications', arrow: true },
            { icon: '💳', text: 'Payment Methods', arrow: true },
            { icon: '❓', text: 'Help & Support', arrow: true },
            { icon: '⚙️', text: 'Settings', arrow: true },
            { icon: '🚪', text: 'Logout', arrow: false }
          ].map((item, index) => (
            <button key={index} className="w-full flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
              {item.arrow && <span className="text-gray-400">›</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Filter Modal Component
const FilterModal = ({ filters, setFilters, brands, priceRanges, conditions, storageOptions, onClose }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const applyFilters = () => {
    setFilters(tempFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      brand: 'All',
      priceRange: 'All',
      condition: 'All',
      storage: 'All'
    };
    setTempFilters(clearedFilters);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end max-w-md mx-auto">
      <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        <div className="p-4 space-y-6">
          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-3">Brand</h3>
            <div className="grid grid-cols-3 gap-2">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setTempFilters({...tempFilters, brand})}
                  className={`p-2 text-sm rounded border ${
                    tempFilters.brand === brand 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <button
                  key={range}
                  onClick={() => setTempFilters({...tempFilters, priceRange: range})}
                  className={`w-full p-3 text-left rounded border ${
                    tempFilters.priceRange === range 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h3 className="font-semibold mb-3">Condition</h3>
            <div className="grid grid-cols-3 gap-2">
              {conditions.map(condition => (
                <button
                  key={condition}
                  onClick={() => setTempFilters({...tempFilters, condition})}
                  className={`p-2 text-sm rounded border ${
                    tempFilters.condition === condition 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div>
            <h3 className="font-semibold mb-3">Storage</h3>
            <div className="grid grid-cols-3 gap-2">
              {storageOptions.map(storage => (
                <button
                  key={storage}
                  onClick={() => setTempFilters({...tempFilters, storage})}
                  className={`p-2 text-sm rounded border ${
                    tempFilters.storage === storage 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex gap-3">
          <button 
            onClick={clearFilters}
            className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold"
          >
            Clear All
          </button>
          <button 
            onClick={applyFilters}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// Message Modal Component
const MessageModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end max-w-md mx-auto">
      <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {[
              {
                name: 'Hassan Ali',
                message: 'Is the iPhone still available?',
                time: '2 min ago',
                unread: true,
                phone: 'iPhone 15 Pro Max'
              },
              {
                name: 'Sarah Ahmed',
                message: 'Can you reduce the price?',
                time: '1 hour ago',
                unread: false,
                phone: 'Samsung Galaxy S24'
              },
              {
                name: 'Ali Khan',
                message: 'WhatsApp number please',
                time: '3 hours ago',
                unread: false,
                phone: 'Oppo Reno 12'
              }
            ].map((chat, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-semibold text-sm">{chat.name}</div>
                  <div className="text-xs text-gray-500">{chat.time}</div>
                </div>
                <div className="text-xs text-blue-600 mb-1">{chat.phone}</div>
                <div className="text-sm text-gray-700">{chat.message}</div>
                {chat.unread && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-sm">Start chatting with buyers and sellers!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Components = {
  Header,
  BottomNavigation,
  HomePage,
  SearchPage,
  PhoneDetails,
  SellPage,
  ProfilePage,
  CategoryGrid,
  PhoneCard,
  FilterModal,
  MessageModal
};

export default Components;