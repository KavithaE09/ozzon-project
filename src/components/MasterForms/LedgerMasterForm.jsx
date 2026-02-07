import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ledgerApi from "../../api/ledgerApi";
import accountGroupApi from "../../api/AccountgroupApi";

export default function LedgerMasterForm() {
  const navigate = useNavigate();

  const states = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
    "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ].sort();

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accountGroups, setAccountGroups] = useState([]);

  // ---------- LocalStorage-Persistent States ----------
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('ledgerFormData');
    return saved ? JSON.parse(saved) : {
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
    };
  });

  const [groupSearch, setGroupSearch] = useState(() => localStorage.getItem('ledgerGroupSearch') || '');
  const [selectedGroupCode, setSelectedGroupCode] = useState(() => {
    const saved = localStorage.getItem('ledgerSelectedGroupCode');
    return saved ? Number(saved) : null;
  });
  const [billingCitySearch, setBillingCitySearch] = useState(() => localStorage.getItem('ledgerBillingCitySearch') || '');
  const [billingStateSearch, setBillingStateSearch] = useState(() => localStorage.getItem('ledgerBillingStateSearch') || '');
  const [deliveryCitySearch, setDeliveryCitySearch] = useState(() => localStorage.getItem('ledgerDeliveryCitySearch') || '');
  const [deliveryStateSearch, setDeliveryStateSearch] = useState(() => localStorage.getItem('ledgerDeliveryStateSearch') || '');

  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const groupRef = useRef(null);

  const [isBillingCityOpen, setIsBillingCityOpen] = useState(false);
  const [hoveredBillingCity, setHoveredBillingCity] = useState(null);
  const billingCityRef = useRef(null);

  const [isBillingStateOpen, setIsBillingStateOpen] = useState(false);
  const [hoveredBillingState, setHoveredBillingState] = useState(null);
  const billingStateRef = useRef(null);

  const [isDeliveryCityOpen, setIsDeliveryCityOpen] = useState(false);
  const [hoveredDeliveryCity, setHoveredDeliveryCity] = useState(null);
  const deliveryCityRef = useRef(null);

  const [isDeliveryStateOpen, setIsDeliveryStateOpen] = useState(false);
  const [hoveredDeliveryState, setHoveredDeliveryState] = useState(null);
  const deliveryStateRef = useRef(null);

  // ------------------- Fetch Account Groups -------------------
  useEffect(() => {
    fetchAccountGroups();
  }, []);

  const fetchAccountGroups = async () => {
    try {
      setLoading(true);
      const response = await accountGroupApi.getAccountGroupsForDropdown();
      if (response?.data) setAccountGroups(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load account groups');
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Persist to LocalStorage -------------------
  useEffect(() => localStorage.setItem('ledgerFormData', JSON.stringify(formData)), [formData]);
  useEffect(() => localStorage.setItem('ledgerGroupSearch', groupSearch), [groupSearch]);
  useEffect(() => localStorage.setItem('ledgerSelectedGroupCode', selectedGroupCode), [selectedGroupCode]);
  useEffect(() => localStorage.setItem('ledgerBillingCitySearch', billingCitySearch), [billingCitySearch]);
  useEffect(() => localStorage.setItem('ledgerBillingStateSearch', billingStateSearch), [billingStateSearch]);
  useEffect(() => localStorage.setItem('ledgerDeliveryCitySearch', deliveryCitySearch), [deliveryCitySearch]);
  useEffect(() => localStorage.setItem('ledgerDeliveryStateSearch', deliveryStateSearch), [deliveryStateSearch]);

  // ------------------- Handle Click Outside -------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupRef.current && !groupRef.current.contains(event.target)) setIsGroupOpen(false);
      if (billingCityRef.current && !billingCityRef.current.contains(event.target)) setIsBillingCityOpen(false);
      if (billingStateRef.current && !billingStateRef.current.contains(event.target)) setIsBillingStateOpen(false);
      if (deliveryCityRef.current && !deliveryCityRef.current.contains(event.target)) setIsDeliveryCityOpen(false);
      if (deliveryStateRef.current && !deliveryStateRef.current.contains(event.target)) setIsDeliveryStateOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ------------------- Filtered Lists -------------------
  const filteredGroups = accountGroups.filter(group => (group?.accountGroupName || '').toLowerCase().includes(groupSearch.toLowerCase()));
  const filteredBillingCities = cities.filter(city => city.toLowerCase().includes(billingCitySearch.toLowerCase()));
  const filteredBillingStates = states.filter(state => state.toLowerCase().includes(billingStateSearch.toLowerCase()));
  const filteredDeliveryCities = cities.filter(city => city.toLowerCase().includes(deliveryCitySearch.toLowerCase()));
  const filteredDeliveryStates = states.filter(state => state.toLowerCase().includes(deliveryStateSearch.toLowerCase()));

  // ------------------- Handle Form Change -------------------
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  // ------------------- Clear Form -------------------
  const handleClear = () => {
    setFormData({
      partyName: '', group: '', gstNo: '',
      billingAddress1: '', billingAddress2: '', billingCity: '', billingPinCode: '', billingState: '',
      deliveryAddress1: '', deliveryAddress2: '', deliveryCity: '', deliveryPinCode: '', deliveryState: ''
    });
    setGroupSearch('');
    setSelectedGroupCode(null);
    setBillingCitySearch('');
    setBillingStateSearch('');
    setDeliveryCitySearch('');
    setDeliveryStateSearch('');
    setError('');

    localStorage.removeItem('ledgerFormData');
    localStorage.removeItem('ledgerGroupSearch');
    localStorage.removeItem('ledgerSelectedGroupCode');
    localStorage.removeItem('ledgerBillingCitySearch');
    localStorage.removeItem('ledgerBillingStateSearch');
    localStorage.removeItem('ledgerDeliveryCitySearch');
    localStorage.removeItem('ledgerDeliveryStateSearch');
  };

  // ------------------- Submit Form -------------------
  const handleSubmit = async () => {
    try {
      setError('');
      if (!formData.partyName?.trim()) return setError('Party Name is required');
      if (!selectedGroupCode) return setError('Account Group is required');

      setLoading(true);
      const ledgerData = {
        PartyName: formData.partyName.trim(),
        GroupCode: Number(selectedGroupCode),
        GSTNo: formData.gstNo?.trim() || ' ',
        BillAd1: formData.billingAddress1?.trim() || ' ',
        BillAd2: formData.billingAddress2?.trim() || ' ',
        BillCity: formData.billingCity || ' ',
        BillPinCode: formData.billingPinCode?.trim() || ' ',
        BillState: formData.billingState || ' ',
        DelAd1: formData.deliveryAddress1?.trim() || ' ',
        DelAd2: formData.deliveryAddress2?.trim() || ' ',
        DelCity: formData.deliveryCity || ' ',
        DelPinCode: formData.deliveryPinCode?.trim() || ' ',
        DelState: formData.deliveryState || ' '
      };

      const response = await ledgerApi.createLedger(ledgerData);
      if (response?.success || response?.data || [200, 201].includes(response?.status)) {
        alert('✅ Ledger created successfully!');
        handleClear();
      } else setError('Ledger created but response format is unexpected');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to create ledger');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <div className="page-header">
              <h1 className="page-title">Ledger Master</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2 className="page-back-icon" />
              </button>
            </div>

            {/* Error Message */}
            {error && error.trim() !== '' && (
              <div style={{ 
                padding: '12px 16px', 
                marginBottom: '20px', 
                backgroundColor: '#fee2e2', 
                color: '#991b1b',
                borderRadius: '6px',
                fontSize: '14px',
                border: '1px solid #fecaca',
                fontWeight: '500',
                maxHeight: '200px',
                overflow: 'auto'
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Party Details */}
            <div className="filter-grid" style={{ marginBottom: '32px' }}>
              <div className="filter-grid-red">
                <label className="filter-label">Party Name</label>
                <input
                  type="text"
                  value={formData.partyName}
                  onChange={(e) => handleChange('partyName', e.target.value)}
                  className="filter-input"
                  disabled={loading}
                  placeholder="Enter party name"
                />
              </div>

              <div ref={groupRef} className="filter-grid-red">
                <label className="filter-label">Group</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={groupSearch}
                    onChange={(e) => {
                      setGroupSearch(e.target.value);
                      setIsGroupOpen(true);
                      if (error) setError('');
                    }}
                    onFocus={() => setIsGroupOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                    disabled={loading}
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isGroupOpen && (
                  <div className="dropdown-menu">
                    {filteredGroups.length > 0 ? (
                      filteredGroups.map((group, index) => {
                        const displayName = group.accountGroupName || 'Unknown';
                        const groupId = group.accountGroupId;
                        
                        return (
                          <div
                            key={groupId || index}
                            onClick={() => {
                              handleChange('group', displayName);
                              setGroupSearch(displayName);
                              setSelectedGroupCode(groupId);
                              setIsGroupOpen(false);
                              if (error) setError('');
                              console.log('✅ Selected Group:', displayName, 'Code:', groupId);
                            }}
                            onMouseEnter={() => setHoveredGroup(displayName)}
                            onMouseLeave={() => setHoveredGroup(null)}
                            className={`dropdown-item-option ${
                              hoveredGroup === displayName
                                ? 'dropdown-item-hovered'
                                : formData.group === displayName
                                ? 'dropdown-item-selected'
                                : 'dropdown-item-default'
                            }`}
                          >
                            {displayName}
                          </div>
                        );
                      })
                    ) : (
                      <div className="dropdown-no-matches">
                        {loading ? 'Loading...' : 'No matches found'}
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
                  disabled={loading}
                  placeholder="Enter GST number"
                  maxLength={15}
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
                  disabled={loading}
                  placeholder="Enter address line 1"
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
                  disabled={loading}
                  placeholder="Enter address line 2"
                />
              </div>

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
                    placeholder="Type or select state..."
                    className="dropdown-input"
                    disabled={loading}
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

              <div className="filter-grid-red">
                <label className="filter-label">PinCode</label>
                <input
                  type="text"
                  value={formData.billingPinCode}
                  onChange={(e) => handleChange('billingPinCode', e.target.value)}
                  className="filter-input"
                  disabled={loading}
                  placeholder="Enter pincode"
                  maxLength={6}
                />
              </div>
            </div>

            <div className="filter-grid" style={{ marginBottom: '32px' }}>
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
                    placeholder="Type or select city..."
                    className="dropdown-input"
                    disabled={loading}
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
                  disabled={loading}
                  placeholder="Enter delivery address line 1"
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
                  disabled={loading}
                  placeholder="Enter delivery address line 2"
                />
              </div>

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
                    placeholder="Type or select state..."
                    className="dropdown-input"
                    disabled={loading}
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

              <div className="filter-grid-red">
                <label className="filter-label">PinCode</label>
                <input
                  type="text"
                  value={formData.deliveryPinCode}
                  onChange={(e) => handleChange('deliveryPinCode', e.target.value)}
                  className="filter-input"
                  disabled={loading}
                  placeholder="Enter pincode"
                  maxLength={6}
                />
              </div>
            </div>

            <div className="filter-grid">
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
                    placeholder="Type or select city..."
                    className="dropdown-input"
                    disabled={loading}
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

              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* Action Buttons */}
            <div className="footer-container" style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              marginTop: '24px' 
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={handleClear} 
                  className="btn-all" 
                  disabled={loading}
                  style={{ opacity: loading ? 0.6 : 1 }}
                >
                  <span>✕</span>
                  <span>Clear</span>
                </button>

                <button 
                  onClick={handleSubmit} 
                  className="btn-all" 
                  disabled={loading}
                  style={{ opacity: loading ? 0.6 : 1 }}
                >
                  <Send size={18} /> 
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}