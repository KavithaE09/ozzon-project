import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5e6e8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>Ledger Master</h2>

            {/* Party Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: 'bold' }}>Party Name</label>
                <input
                 type="text"
                  value={formData.partyName}
                  onChange={(e) => handleChange('partyName', e.target.value)}
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              {/* Group Dropdown */}
              <div ref={groupRef} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: 'bold' }}>Group</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={groupSearch}
                    onChange={(e) => {
                      setGroupSearch(e.target.value);
                      setIsGroupOpen(true);
                    }}
                    onFocus={() => setIsGroupOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'white', cursor: 'text' }}
                  />
                  <ChevronDown 
                    size={20} 
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} 
                  />
                </div>
                {isGroupOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: '0', right: '0', marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
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
                          style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '14px', color: hoveredGroup === option ? 'white' : '#374151', backgroundColor: hoveredGroup === option ? '#A63128' : 'white', borderBottom: index < filteredGroups.length - 1 ? '1px solid #E5E7EB' : 'none', transition: 'all 0.2s ease' }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: 'bold' }}>GST No</label>
                <input
                  type="text"
                  value={formData.gstNo}
                  onChange={(e) => handleChange('gstNo', e.target.value)}
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>

            {/* Billing Address */}
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>Billing Address</h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ 
  backgroundColor: 'white',
  padding: '6px',
  borderRadius: '4px',
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #DC2626'
}}>
  <label style={{ 
    display: 'block',
    fontSize: '16px',
    color: '#374151',
    marginBottom: '8px',
    fontWeight: 'bold'
  }}>
    Address-1
  </label>

  <textarea
    value={formData.billingAddress1}
    onChange={(e) => {
      handleChange('billingAddress1', e.target.value);
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }}
    rows={1}
    style={{
      width: '100%',
      padding: '1px 1px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      resize: 'none',       
      minHeight: '20px',        
      lineHeight: '16px',
      overflow: 'hidden',     
      fontFamily: 'inherit'
    }}
  />
</div>

              <div style={{ 
  backgroundColor: 'white',
  padding: '6px',
  borderRadius: '4px',
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #DC2626'
}}>
  <label style={{ 
    display: 'block',
    fontSize: '16px',
    color: '#374151',
    marginBottom: '8px',
    fontWeight: 'bold'
  }}>
    Address-2
  </label>

  <textarea
    value={formData.billingAddress2}
    onChange={(e) => {
      handleChange('billingAddress2', e.target.value);
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }}
    rows={1}
    style={{
      width: '100%',
      padding: '1px 1px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      resize: 'none',
      minHeight: '20px',
      lineHeight: '16px',
      overflow: 'hidden',
      fontFamily: 'inherit'
    }}
  />
</div>



              {/* Billing City Dropdown */}
              <div ref={billingCityRef} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: 'bold' }}>City</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={billingCitySearch}
                    onChange={(e) => {
                      setBillingCitySearch(e.target.value);
                      setIsBillingCityOpen(true);
                    }}
                    onFocus={() => setIsBillingCityOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'white', cursor: 'text' }}
                  />
                  <ChevronDown 
                    size={20} 
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} 
                  />
                </div>
                {isBillingCityOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: '0', right: '0', marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
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
                          style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '14px', color: hoveredBillingCity === option ? 'white' : '#374151', backgroundColor: hoveredBillingCity === option ? '#A63128' : 'white', borderBottom: index < filteredBillingCities.length - 1 ? '1px solid #E5E7EB' : 'none', transition: 'all 0.2s ease' }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: 'bold' }}>PinCode</label>
                <input
                  type="text"
                  value={formData.billingPinCode}
                  onChange={(e) => handleChange('billingPinCode', e.target.value)}
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {/* Billing State Dropdown */}
              <div ref={billingStateRef} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: 'bold' }}>State</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={billingStateSearch}
                    onChange={(e) => {
                      setBillingStateSearch(e.target.value);
                      setIsBillingStateOpen(true);
                    }}
                    onFocus={() => setIsBillingStateOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'white', cursor: 'text' }}
                  />
                  <ChevronDown 
                    size={20} 
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} 
                  />
                </div>
                {isBillingStateOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: '0', right: '0', marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
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
                          style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '14px', color: hoveredBillingState === option ? 'white' : '#374151', backgroundColor: hoveredBillingState === option ? '#A63128' : 'white', borderBottom: index < filteredBillingStates.length - 1 ? '1px solid #E5E7EB' : 'none', transition: 'all 0.2s ease' }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Address */}
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>Delivery Address</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
             <div style={{ 
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #DC2626'
}}>
  <label style={{ 
    display: 'block',
    fontSize: '16px',
    color: '#374151',
    marginBottom: '8px',
    fontWeight: 'bold'
  }}>
    Delivery Address-1
  </label>

  <textarea
    value={formData.deliveryAddress1}
    onChange={(e) => {
      handleChange('deliveryAddress1', e.target.value);
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }}
    rows={1}
    style={{
      width: '100%',
      padding: '1px 1px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      resize: 'none',      
      minHeight: '22px',      
      lineHeight: '18px',
      overflow: 'hidden',   
      fontFamily: 'inherit'
    }}
  />
</div>

             <div style={{ 
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #DC2626'
}}>
  <label style={{ 
    display: 'block',
    fontSize: '16px',
    color: '#374151',
    marginBottom: '8px',
    fontWeight: 'bold'
  }}>
    Address-2
  </label>

  <textarea
    value={formData.deliveryAddress2}
    onChange={(e) => {
      handleChange('deliveryAddress2', e.target.value);
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }}
    rows={1}
    style={{
      width: '100%',
      padding: '1px 1px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      resize: 'none',    
      minHeight: '22px',     
      lineHeight: '18px',
      overflow: 'hidden',   
      fontFamily: 'inherit'
    }}
  />
</div>



              {/* Delivery City Dropdown */}
              <div ref={deliveryCityRef} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: 'bold' }}>City</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={deliveryCitySearch}
                    onChange={(e) => {
                      setDeliveryCitySearch(e.target.value);
                      setIsDeliveryCityOpen(true);
                    }}
                    onFocus={() => setIsDeliveryCityOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: 'white', cursor: 'text' }}
                  />
                  <ChevronDown 
                    size={20} 
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} 
                  />
                </div>
                {isDeliveryCityOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: '0', right: '0', marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
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
                          style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '14px', color: hoveredDeliveryCity === option ? 'white' : '#374151', backgroundColor: hoveredDeliveryCity === option ? '#A63128' : 'white', borderBottom: index < filteredDeliveryCities.length - 1 ? '1px solid #E5E7EB' : 'none', transition: 'all 0.2s ease' }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: 'bold' }}>PinCode</label>
                <input
                  type="text"
                  value={formData.deliveryPinCode}
                  onChange={(e) => handleChange('deliveryPinCode', e.target.value)}
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {/* Delivery State Dropdown */}
              <div ref={deliveryStateRef} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: 'bold' }}>State</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={deliveryStateSearch}
                    onChange={(e) => {
                      setDeliveryStateSearch(e.target.value);
                      setIsDeliveryStateOpen(true);
                    }}
                    onFocus={() => setIsDeliveryStateOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'white', cursor: 'text' }}
                  />
                  <ChevronDown 
                    size={20} 
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} 
                  />
                </div>
                {isDeliveryStateOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: '0', right: '0', marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
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
                          style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '14px', color: hoveredDeliveryState === option ? 'white' : '#374151', backgroundColor: hoveredDeliveryState === option ? '#A63128' : 'white', borderBottom: index < filteredDeliveryStates.length - 1 ? '1px solid #E5E7EB' : 'none', transition: 'all 0.2s ease'}}>
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>
              </div>
              </div>
          {/* Action Buttons */}
          {/* Buttons - Outside the form container */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', maxWidth: '1250px' }}>
            <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
              <span>←</span>
              <span>Back</span>
            </button>
            
           <div style={{ display: 'flex', gap: '12px'  }}>
              <button 
                onClick={handleClear}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}
              >
                <span>✕</span>
                <span>Clear</span>
              </button> 
              
              <button 
                onClick={handleSubmit}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', fontSize: '13px', fontWeight: '500', color: 'white', backgroundColor: '#B91C1C', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                <span>✓</span>
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}