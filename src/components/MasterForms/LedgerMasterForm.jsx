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
  const [selectedGroupCode, setSelectedGroupCode] = useState(null);

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

  const [groupSearch, setGroupSearch] = useState('');
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const groupRef = useRef(null);

  const [billingCitySearch, setBillingCitySearch] = useState('');
  const [isBillingCityOpen, setIsBillingCityOpen] = useState(false);
  const [hoveredBillingCity, setHoveredBillingCity] = useState(null);
  const billingCityRef = useRef(null);

  const [billingStateSearch, setBillingStateSearch] = useState('');
  const [isBillingStateOpen, setIsBillingStateOpen] = useState(false);
  const [hoveredBillingState, setHoveredBillingState] = useState(null);
  const billingStateRef = useRef(null);

  const [deliveryCitySearch, setDeliveryCitySearch] = useState('');
  const [isDeliveryCityOpen, setIsDeliveryCityOpen] = useState(false);
  const [hoveredDeliveryCity, setHoveredDeliveryCity] = useState(null);
  const deliveryCityRef = useRef(null);

  const [deliveryStateSearch, setDeliveryStateSearch] = useState('');
  const [isDeliveryStateOpen, setIsDeliveryStateOpen] = useState(false);
  const [hoveredDeliveryState, setHoveredDeliveryState] = useState(null);
  const deliveryStateRef = useRef(null);

  useEffect(() => {
    fetchAccountGroups();
  }, []);

  const fetchAccountGroups = async () => {
    try {
      setLoading(true);
      
      const response = await accountGroupApi.getAccountGroupsForDropdown();
      console.log('📦 Account Groups Response:', response);
      
      if (response && response.data) {
        setAccountGroups(response.data);
      }
    } catch (err) {
      console.error('❌ Error fetching account groups:', err);
      setError('Failed to load account groups');
    } finally {
      setLoading(false);
    }
  };

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

  const filteredGroups = accountGroups.filter((group) => {
    if (!group) return false;
    const groupName = group.accountGroupName || '';
    return String(groupName).toLowerCase().includes(groupSearch.toLowerCase());
  });

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
    if (error) setError('');
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
    setSelectedGroupCode(null);
    setBillingCitySearch('');
    setBillingStateSearch('');
    setDeliveryCitySearch('');
    setDeliveryStateSearch('');
    setError('');
  };

  const handleSubmit = async () => {
    try {
      setError('');

      const partyNameValue = formData.partyName?.trim();

      console.log('🔍 Validation Check:');
      console.log('Party Name:', partyNameValue);
      console.log('Selected Group Code:', selectedGroupCode);

      if (!partyNameValue || partyNameValue.length === 0) {
        setError('Party Name is required');
        return;
      }
      
      if (!selectedGroupCode) {
        setError('Account Group is required');
        return;
      }

      setLoading(true);

      // FIXED: Match exact database column names and handle NULL constraints
      // Try sending empty string with single space (some databases accept this but not empty or NULL)
      const ledgerData = {
        PartyName: partyNameValue,
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

      console.log('📤 Submitting Ledger Data:');
      console.log(JSON.stringify(ledgerData, null, 2));
      console.log('📤 Data types:', {
        PartyName: typeof ledgerData.PartyName,
        GroupCode: typeof ledgerData.GroupCode,
        GSTNo: typeof ledgerData.GSTNo
      });

      const response = await ledgerApi.createLedger(ledgerData);
      
      console.log('✅ Success Response:', response);
      
      if (response?.success || response?.data || response?.status === 200 || response?.status === 201) {
        alert('✅ Ledger created successfully!');
        handleClear();
      } else {
        setError('Ledger created but response format is unexpected');
      }
    } catch (err) {
      console.error('❌ Full Error:', err);
      console.error('❌ Error Response:', err.response);
      console.error('❌ Response Data:', err.response?.data);
      console.error('❌ Response Status:', err.response?.status);
      console.error('❌ Response Headers:', err.response?.headers);
      
      let errorMessage = 'Failed to create ledger';
      
      if (err.response?.data) {
        const data = err.response.data;
        
        // Log the raw response for debugging
        console.log('📋 Raw Response Data Type:', typeof data);
        console.log('📋 Raw Response Data:', data);
        
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.errors) {
          if (Array.isArray(data.errors)) {
            errorMessage = data.errors.map(e => e.message || e.msg || e).join(', ');
          } else if (typeof data.errors === 'object') {
            errorMessage = Object.entries(data.errors)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ');
          } else {
            errorMessage = JSON.stringify(data.errors);
          }
        } else {
          errorMessage = JSON.stringify(data);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      if (err.response?.status === 400) {
        errorMessage = `Bad Request: ${errorMessage}`;
      } else if (err.response?.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (err.response?.status === 403) {
        errorMessage = 'Forbidden. You do not have permission.';
      } else if (err.response?.status === 500) {
        errorMessage = `Server Error (500): ${errorMessage}. Please check the server logs or contact support.`;
      }
      
      setError(errorMessage);
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