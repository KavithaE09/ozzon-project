import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown,Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LedgerMasterForm() {
  const navigate = useNavigate();
  const cities = [
    "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Amritsar", "Aurangabad",
    "Bengaluru", "Bhopal", "Bhubaneswar", "Chandigarh", "Chennai", "Coimbatore",
    "Cuttack", "Dehradun", "Delhi", "Dhanbad", "Erode", "Faridabad", "Ghaziabad",
    "Guntur", "Gurgaon", "Guwahati", "Hyderabad", "Indore", "Jabalpur", "Jaipur",
    "Jalandhar", "Jamshedpur", "Jodhpur", "Kanpur", "Kochi", "Kolhapur", "Kolkata",
    "Kozhikode", "Lucknow", "Ludhiana", "Madurai", "Mangaluru", "Meerut", "Mumbai",
    "Mysuru", "Nagpur", "Nashik", "Navi Mumbai", "Noida", "Patna", "Pondicherry",
    "Pune", "Raipur", "Rajkot", "Ranchi", "Salem", "Surat", "Thane", "Thanjavur",
    "Thoothukudi", "Thrissur", "Tiruchirappalli", "Tirunelveli", "Trivandrum",
    "Udaipur", "Vadodara", "Varanasi", "Vellore", "Vijayawada", "Visakhapatnam", "Warangal"
  ].sort();

  const states = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
    "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ].sort();

  const groupOptions = ["Group 1", "Group 2", "Group 3"];

  const [formData, setFormData] = useState({
    partyName: '',
    group: '',
    gstNo: '',
    billingAddress1: '',
    billingAddress2: '',
    billingCity: '',
    billingPinCode: '',
    billingState: '',
    deliveryAddress1: '',
    deliveryAddress2: '',
    deliveryCity: '',
    deliveryPinCode: '',
    deliveryState: ''
  });

  // Group dropdown states
  const [groupSearch, setGroupSearch] = useState('');
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const groupRef = useRef(null);

  // Billing City dropdown states
  const [billingCitySearch, setBillingCitySearch] = useState('');
  const [isBillingCityOpen, setIsBillingCityOpen] = useState(false);
  const [hoveredBillingCity, setHoveredBillingCity] = useState(null);
  const billingCityRef = useRef(null);

  // Billing State dropdown states
  const [billingStateSearch, setBillingStateSearch] = useState('');
  const [isBillingStateOpen, setIsBillingStateOpen] = useState(false);
  const [hoveredBillingState, setHoveredBillingState] = useState(null);
  const billingStateRef = useRef(null);

  // Delivery City dropdown states
  const [deliveryCitySearch, setDeliveryCitySearch] = useState('');
  const [isDeliveryCityOpen, setIsDeliveryCityOpen] = useState(false);
  const [hoveredDeliveryCity, setHoveredDeliveryCity] = useState(null);
  const deliveryCityRef = useRef(null);

  // Delivery State dropdown states
  const [deliveryStateSearch, setDeliveryStateSearch] = useState('');
  const [isDeliveryStateOpen, setIsDeliveryStateOpen] = useState(false);
  const [hoveredDeliveryState, setHoveredDeliveryState] = useState(null);
  const deliveryStateRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupRef.current && !groupRef.current.contains(event.target)) {
        setIsGroupOpen(false);
      }
      if (billingCityRef.current && !billingCityRef.current.contains(event.target)) {
        setIsBillingCityOpen(false);
      }
      if (billingStateRef.current && !billingStateRef.current.contains(event.target)) {
        setIsBillingStateOpen(false);
      }
      if (deliveryCityRef.current && !deliveryCityRef.current.contains(event.target)) {
        setIsDeliveryCityOpen(false);
      }
      if (deliveryStateRef.current && !deliveryStateRef.current.contains(event.target)) {
        setIsDeliveryStateOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter functions
  const filteredGroups = groupOptions.filter(opt =>
    opt.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const filteredBillingCities = cities.filter(city =>
    city.toLowerCase().includes(billingCitySearch.toLowerCase())
  );

  const filteredBillingStates = states.filter(state =>
    state.toLowerCase().includes(billingStateSearch.toLowerCase())
  );

  const filteredDeliveryCities = cities.filter(city =>
    city.toLowerCase().includes(deliveryCitySearch.toLowerCase())
  );

  const filteredDeliveryStates = states.filter(state =>
    state.toLowerCase().includes(deliveryStateSearch.toLowerCase())
  );

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({
      partyName: '',
      group: '',
      gstNo: '',
      billingAddress1: '',
      billingAddress2: '',
      billingCity: '',
      billingPinCode: '',
      billingState: '',
      deliveryAddress1: '',
      deliveryAddress2: '',
      deliveryCity: '',
      deliveryPinCode: '',
      deliveryState: ''
    });
    setGroupSearch('');
    setBillingCitySearch('');
    setBillingStateSearch('');
    setDeliveryCitySearch('');
    setDeliveryStateSearch('');
  };

  const handleSubmit = () => {
    alert('Form submitted successfully!');
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Ledger Master</h2>

            {/* Party Details */}
            <div className="filter-grid" style={{ marginBottom: '32px' }}>
              <div className="filter-grid-red">
                <label className="filter-label">Party Name</label>
                <input
                  type="text"
                  value={formData.partyName}
                  onChange={(e) => handleChange('partyName', e.target.value)}
                  className="filter-input"
                />
              </div>

              {/* Group Dropdown */}
              <div ref={groupRef} className="filter-grid-red">
                <label className="filter-label">Group</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={groupSearch}
                    onChange={(e) => {
                      setGroupSearch(e.target.value);
                      setIsGroupOpen(true);
                    }}
                    onFocus={() => setIsGroupOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isGroupOpen && (
                  <div className="dropdown-menu">
                    {filteredGroups.length > 0 ? (
                      filteredGroups.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleChange('group', option);
                            setGroupSearch(option);
                            setIsGroupOpen(false);
                          }}
                          onMouseEnter={() => setHoveredGroup(option)}
                          onMouseLeave={() => setHoveredGroup(null)}
                          className={`dropdown-item-option ${
                            hoveredGroup === option
                              ? 'dropdown-item-hovered'
                              : formData.group === option
                              ? 'dropdown-item-selected'
                              : 'dropdown-item-default'
                          }`}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">
                        No matches found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">GST No</label>
                <input
                  type="text"
                  value={formData.gstNo}
                  onChange={(e) => handleChange('gstNo', e.target.value)}
                  className="filter-input"
                />
              </div>

              <div></div>
            </div>

            {/* Billing Address */}
            <h3 className="section-title">Billing Address</h3>
            <div className="filter-grid" style={{ marginBottom: '20px' }}>
              <div className="filter-grid-red">
                <label className="filter-label">Address-1</label>
                <textarea
                  value={formData.billingAddress1}
                  onChange={(e) => {
                    handleChange('billingAddress1', e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  rows={1}
                  className="multiline-field"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Address-2</label>
                <textarea
                  value={formData.billingAddress2}
                  onChange={(e) => {
                    handleChange('billingAddress2', e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  rows={1}
                  className="multiline-field"
                />
              </div>

              {/* Billing City Dropdown */}
              <div ref={billingCityRef} className="filter-grid-red">
                <label className="filter-label">City</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={billingCitySearch}
                    onChange={(e) => {
                      setBillingCitySearch(e.target.value);
                      setIsBillingCityOpen(true);
                    }}
                    onFocus={() => setIsBillingCityOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isBillingCityOpen && (
                  <div className="dropdown-menu">
                    {filteredBillingCities.length > 0 ? (
                      filteredBillingCities.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleChange('billingCity', option);
                            setBillingCitySearch(option);
                            setIsBillingCityOpen(false);
                          }}
                          onMouseEnter={() => setHoveredBillingCity(option)}
                          onMouseLeave={() => setHoveredBillingCity(null)}
                          className={`dropdown-item-option ${
                            hoveredBillingCity === option
                              ? 'dropdown-item-hovered'
                              : formData.billingCity === option
                              ? 'dropdown-item-selected'
                              : 'dropdown-item-default'
                          }`}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">
                        No matches found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">PinCode</label>
                <input
                  type="text"
                  value={formData.billingPinCode}
                  onChange={(e) => handleChange('billingPinCode', e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-grid" style={{ marginBottom: '32px' }}>
              {/* Billing State Dropdown */}
              <div ref={billingStateRef} className="filter-grid-red">
                <label className="filter-label">State</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={billingStateSearch}
                    onChange={(e) => {
                      setBillingStateSearch(e.target.value);
                      setIsBillingStateOpen(true);
                    }}
                    onFocus={() => setIsBillingStateOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isBillingStateOpen && (
                  <div className="dropdown-menu">
                    {filteredBillingStates.length > 0 ? (
                      filteredBillingStates.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleChange('billingState', option);
                            setBillingStateSearch(option);
                            setIsBillingStateOpen(false);
                          }}
                          onMouseEnter={() => setHoveredBillingState(option)}
                          onMouseLeave={() => setHoveredBillingState(null)}
                          className={`dropdown-item-option ${
                            hoveredBillingState === option
                              ? 'dropdown-item-hovered'
                              : formData.billingState === option
                              ? 'dropdown-item-selected'
                              : 'dropdown-item-default'
                          }`}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">
                        No matches found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* Delivery Address */}
            <h3 className="section-title">Delivery Address</h3>
            <div className="filter-grid" style={{ marginBottom: '20px' }}>
              <div className="filter-grid-red">
                <label className="filter-label">Delivery Address-1</label>
                <textarea
                  value={formData.deliveryAddress1}
                  onChange={(e) => {
                    handleChange('deliveryAddress1', e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  rows={1}
                  className="multiline-field"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Address-2</label>
                <textarea
                  value={formData.deliveryAddress2}
                  onChange={(e) => {
                    handleChange('deliveryAddress2', e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  rows={1}
                  className="multiline-field"
                />
              </div>

              {/* Delivery City Dropdown */}
              <div ref={deliveryCityRef} className="filter-grid-red">
                <label className="filter-label">City</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={deliveryCitySearch}
                    onChange={(e) => {
                      setDeliveryCitySearch(e.target.value);
                      setIsDeliveryCityOpen(true);
                    }}
                    onFocus={() => setIsDeliveryCityOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isDeliveryCityOpen && (
                  <div className="dropdown-menu">
                    {filteredDeliveryCities.length > 0 ? (
                      filteredDeliveryCities.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleChange('deliveryCity', option);
                            setDeliveryCitySearch(option);
                            setIsDeliveryCityOpen(false);
                          }}
                          onMouseEnter={() => setHoveredDeliveryCity(option)}
                          onMouseLeave={() => setHoveredDeliveryCity(null)}
                          className={`dropdown-item-option ${
                            hoveredDeliveryCity === option
                              ? 'dropdown-item-hovered'
                              : formData.deliveryCity === option
                              ? 'dropdown-item-selected'
                              : 'dropdown-item-default'
                          }`}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">
                        No matches found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">PinCode</label>
                <input
                  type="text"
                  value={formData.deliveryPinCode}
                  onChange={(e) => handleChange('deliveryPinCode', e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-grid">
              {/* Delivery State Dropdown */}
              <div ref={deliveryStateRef} className="filter-grid-red">
                <label className="filter-label">State</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={deliveryStateSearch}
                    onChange={(e) => {
                      setDeliveryStateSearch(e.target.value);
                      setIsDeliveryStateOpen(true);
                    }}
                    onFocus={() => setIsDeliveryStateOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isDeliveryStateOpen && (
                  <div className="dropdown-menu">
                    {filteredDeliveryStates.length > 0 ? (
                      filteredDeliveryStates.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleChange('deliveryState', option);
                            setDeliveryStateSearch(option);
                            setIsDeliveryStateOpen(false);
                          }}
                          onMouseEnter={() => setHoveredDeliveryState(option)}
                          onMouseLeave={() => setHoveredDeliveryState(null)}
                          className={`dropdown-item-option ${
                            hoveredDeliveryState === option
                              ? 'dropdown-item-hovered'
                              : formData.deliveryState === option
                              ? 'dropdown-item-selected'
                              : 'dropdown-item-default'
                          }`}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">
                        No matches found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div></div>
              <div></div>
              <div></div>
            </div>
             {/* Action Buttons */}
          <div className="footer-container">
            <button onClick={() => navigate(-1)} className="btn-back">
              <span>←</span>
              <span>Back</span>
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleClear} className="btn-all">
                <span>✕</span>
                <span>Clear</span>
              </button>

              <button onClick={handleSubmit} className="btn-all">
                <Send size={18} />  Submit
              </button>
            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
}