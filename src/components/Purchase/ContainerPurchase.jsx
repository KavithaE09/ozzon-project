import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import containerPurchaseApi from '../../api/containerPurchaseApi';
import { getAllSizeTypes, getAllGrades, getAllYards } from '../../api/masterApi';
import ledgerApi from '../../api/ledgerApi';

export default function ContainerPurchase() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const partyNameDropdownRef = useRef(null);
  const sizeTypeDropdownRef = useRef(null);
  const gradeDropdownRef = useRef(null);
  const yardDropdownRef = useRef(null);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('containerPurchaseFormData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      containerNo: '',
      partyCode: null,
      sizeTypeId: null,
      gradeId: null,
      liner: '',
      yardId: null,
      mfgDate: getTodayDate(),
      inDate: getTodayDate(),
      amount: '',
      remark: '',
      photoPath: '',
      images: [],
      imagePreviews: []
    };
  });

  // Dropdown options from API
  const [partyOptions, setPartyOptions] = useState([]);
  const [sizeTypeOptions, setSizeTypeOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [yardOptions, setYardOptions] = useState([]);

  // Dropdown search states
  const [partyNameSearch, setPartyNameSearch] = useState(() => {
    return localStorage.getItem('containerPartyNameSearch') || '';
  });
  const [isPartyNameOpen, setIsPartyNameOpen] = useState(false);
  const [hoveredPartyName, setHoveredPartyName] = useState(null);

  const [sizeTypeSearch, setSizeTypeSearch] = useState(() => {
    return localStorage.getItem('containerSizeTypeSearch') || '';
  });
  const [isSizeTypeOpen, setIsSizeTypeOpen] = useState(false);
  const [hoveredSizeType, setHoveredSizeType] = useState(null);

  const [gradeSearch, setGradeSearch] = useState(() => {
    return localStorage.getItem('containerGradeSearch') || '';
  });
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [hoveredGrade, setHoveredGrade] = useState(null);

  const [yardSearch, setYardSearch] = useState(() => {
    return localStorage.getItem('containerYardSearch') || '';
  });
  const [isYardOpen, setIsYardOpen] = useState(false);
  const [hoveredYard, setHoveredYard] = useState(null);

  // ✅ Fetch all dropdown data on component mount
  useEffect(() => {
    fetchAllDropdownData();
  }, []);

  // ✅ Save formData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('containerPurchaseFormData', JSON.stringify(formData));
  }, [formData]);

  // ✅ Save search states to localStorage
  useEffect(() => {
    localStorage.setItem('containerPartyNameSearch', partyNameSearch);
  }, [partyNameSearch]);

  useEffect(() => {
    localStorage.setItem('containerSizeTypeSearch', sizeTypeSearch);
  }, [sizeTypeSearch]);

  useEffect(() => {
    localStorage.setItem('containerGradeSearch', gradeSearch);
  }, [gradeSearch]);

  useEffect(() => {
    localStorage.setItem('containerYardSearch', yardSearch);
  }, [yardSearch]);

  const fetchAllDropdownData = async () => {
    try {
      setLoading(true);

      // Fetch Party Names from Ledger
      const ledgerRes = await ledgerApi.getAllLedgers();
      if (ledgerRes.success) {
        setPartyOptions(ledgerRes.data);
      }

      // ✅ FIX: Fetch Size Types - response.data.data structure
      const sizeTypeRes = await getAllSizeTypes();
      console.log('Size Type Response:', sizeTypeRes); // Debug
      if (sizeTypeRes && sizeTypeRes.data) {
        // Check if response has nested data property
        const sizeData = sizeTypeRes.data.data || sizeTypeRes.data;
        setSizeTypeOptions(sizeData);
      }

      // ✅ FIX: Fetch Grades - response.data.data structure
      const gradeRes = await getAllGrades();
      console.log('Grade Response:', gradeRes); // Debug
      if (gradeRes && gradeRes.data) {
        const gradeData = gradeRes.data.data || gradeRes.data;
        setGradeOptions(gradeData);
      }

      // ✅ FIX: Fetch Yards - response.data.data structure
      const yardRes = await getAllYards();
      console.log('Yard Response:', yardRes); // Debug
      if (yardRes && yardRes.data) {
        const yardData = yardRes.data.data || yardRes.data;
        setYardOptions(yardData);
      }

    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      alert('Failed to load dropdown data');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: Filter functions with proper null checks
  const filteredPartyNames = partyOptions.filter(party => {
    if (!party) return false;
    const partyName = party.PartyName || party.partyName || '';
    return partyName.toLowerCase().includes(partyNameSearch.toLowerCase());
  });

  const filteredSizeTypes = sizeTypeOptions.filter(size => {
    if (!size) return false;
    const sizeTypeName = size.SizeType || size.sizeType || '';
    return sizeTypeName.toLowerCase().includes(sizeTypeSearch.toLowerCase());
  });

  const filteredGrades = gradeOptions.filter(grade => {
    if (!grade) return false;
    const gradeName = grade.Grade || grade.grade || '';
    return gradeName.toLowerCase().includes(gradeSearch.toLowerCase());
  });

  const filteredYards = yardOptions.filter(yard => {
    if (!yard) return false;
    const yardName = yard.Yard || yard.yard || '';
    return yardName.toLowerCase().includes(yardSearch.toLowerCase());
  });

  // ✅ Dropdown handlers
  const handlePartyNameInput = (e) => {
    setPartyNameSearch(e.target.value);
    setIsPartyNameOpen(true);
  };

  const handlePartyNameSelect = (party) => {
    const partyCode = party.PartyCode || party.partyCode;
    const partyName = party.PartyName || party.partyName;
    
    setFormData({ ...formData, partyCode: partyCode });
    setPartyNameSearch(partyName);
    setIsPartyNameOpen(false);
  };

  const handleSizeTypeInput = (e) => {
    setSizeTypeSearch(e.target.value);
    setIsSizeTypeOpen(true);
  };

  const handleSizeTypeSelect = (sizeType) => {
    const sizeTypeId = sizeType.SizeTypeId || sizeType.sizeTypeId;
    const sizeTypeName = sizeType.SizeType || sizeType.sizeType;
    
    setFormData({ ...formData, sizeTypeId: sizeTypeId });
    setSizeTypeSearch(sizeTypeName);
    setIsSizeTypeOpen(false);
  };

  const handleGradeInput = (e) => {
    setGradeSearch(e.target.value);
    setIsGradeOpen(true);
  };

  const handleGradeSelect = (grade) => {
    const gradeId = grade.GradeId || grade.gradeId;
    const gradeName = grade.Grade || grade.grade;
    
    setFormData({ ...formData, gradeId: gradeId });
    setGradeSearch(gradeName);
    setIsGradeOpen(false);
  };

  const handleYardInput = (e) => {
    setYardSearch(e.target.value);
    setIsYardOpen(true);
  };

  const handleYardSelect = (yard) => {
    const yardId = yard.YardId || yard.yardId;
    const yardName = yard.Yard || yard.yard;
    
    setFormData({ ...formData, yardId: yardId });
    setYardSearch(yardName);
    setIsYardOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Clear handler
  const handleClear = () => {
    const emptyForm = {
      containerNo: '',
      partyCode: null,
      sizeTypeId: null,
      gradeId: null,
      liner: '',
      yardId: null,
      mfgDate: getTodayDate(),
      inDate: getTodayDate(),
      amount: '',
      remark: '',
      photoPath: '',
      images: [],
      imagePreviews: []
    };
    setFormData(emptyForm);
    setPartyNameSearch('');
    setSizeTypeSearch('');
    setGradeSearch('');
    setYardSearch('');
    
    // Clear localStorage
    localStorage.removeItem('containerPurchaseFormData');
    localStorage.removeItem('containerPartyNameSearch');
    localStorage.removeItem('containerSizeTypeSearch');
    localStorage.removeItem('containerGradeSearch');
    localStorage.removeItem('containerYardSearch');
  };

  // ✅ Submit handler
  const handleSubmit = async () => {
    try {
      if (!formData.containerNo.trim()) {
        alert('Container No is required');
        return;
      }

      setLoading(true);

      const submitData = {
        containerNo: formData.containerNo,
        partyCode: formData.partyCode,
        sizeTypeId: formData.sizeTypeId,
        gradeId: formData.gradeId,
        liner: formData.liner,
        yardId: formData.yardId,
        mfgDate: formData.mfgDate,
        inDate: formData.inDate,
        amount: formData.amount || 0,
        remark: formData.remark,
        photoPath: formData.photoPath || '',
      };

      const response = await containerPurchaseApi.createPurchase(submitData);

      if (response.success) {
        alert('Container Purchase created successfully!');
        
        // Reset form
        const emptyForm = {
          containerNo: '',
          partyCode: null,
          sizeTypeId: null,
          gradeId: null,
          liner: '',
          yardId: null,
          mfgDate: getTodayDate(),
          inDate: getTodayDate(),
          amount: '',
          remark: '',
          photoPath: '',
          images: [],
          imagePreviews: []
        };
        setFormData(emptyForm);
        
        setPartyNameSearch('');
        setSizeTypeSearch('');
        setGradeSearch('');
        setYardSearch('');

        // ✅ Clear localStorage
        localStorage.removeItem('containerPurchaseFormData');
        localStorage.removeItem('containerPartyNameSearch');
        localStorage.removeItem('containerSizeTypeSearch');
        localStorage.removeItem('containerGradeSearch');
        localStorage.removeItem('containerYardSearch');
      }
    } catch (error) {
      console.error('Error creating container purchase:', error);
      alert('Failed to create container purchase');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews
    });
  };

  const handleRemarkChange = (e) => {
    setFormData({
      ...formData,
      remark: e.target.value
    });
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // ✅ Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (partyNameDropdownRef.current && !partyNameDropdownRef.current.contains(e.target)) {
        setIsPartyNameOpen(false);
      }
      if (sizeTypeDropdownRef.current && !sizeTypeDropdownRef.current.contains(e.target)) {
        setIsSizeTypeOpen(false);
      }
      if (gradeDropdownRef.current && !gradeDropdownRef.current.contains(e.target)) {
        setIsGradeOpen(false);
      }
      if (yardDropdownRef.current && !yardDropdownRef.current.contains(e.target)) {
        setIsYardOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            
            <div className="page-header">
              <h1 className="page-title">Container Purchase</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2 className="page-back-icon" />
              </button>
            </div>

            <div className="filter-section">
              <div className="filter-grid">
                {/* Container No */}
                <div className="filter-grid-red">
                  <label className="filter-label">Container No</label>
                  <input
                    type="text"
                    name="containerNo"
                    value={formData.containerNo}
                    onChange={handleChange}
                    placeholder="456123"
                    className="filter-input"
                    disabled={loading}
                  />
                </div>

                {/* Party Name Dropdown */}
                <div ref={partyNameDropdownRef} className="filter-grid-red">
                  <label className="filter-label">Party Name</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={partyNameSearch}
                      onChange={handlePartyNameInput}
                      onFocus={() => setIsPartyNameOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isPartyNameOpen && (
                    <div className="dropdown-menu">
                      {filteredPartyNames.length > 0 ? (
                        filteredPartyNames.map((party, index) => {
                          const displayName = party.PartyName || party.partyName || 'Unknown';
                          return (
                            <div
                              key={index}
                              onClick={() => handlePartyNameSelect(party)}
                              onMouseEnter={() => setHoveredPartyName(displayName)}
                              onMouseLeave={() => setHoveredPartyName(null)}
                              className={`dropdown-item-option ${
                                hoveredPartyName === displayName
                                  ? 'dropdown-item-hovered'
                                  : 'dropdown-item-default'
                              }`}
                            >
                              {displayName}
                            </div>
                          );
                        })
                      ) : (
                        <div className="dropdown-no-matches">No matches found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Size Type Dropdown */}
                <div ref={sizeTypeDropdownRef} className="filter-grid-red">
                  <label className="filter-label">Size Type</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={sizeTypeSearch}
                      onChange={handleSizeTypeInput}
                      onFocus={() => setIsSizeTypeOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isSizeTypeOpen && (
                    <div className="dropdown-menu">
                      {filteredSizeTypes.length > 0 ? (
                        filteredSizeTypes.map((sizeType, index) => {
                          const displayName = sizeType.SizeType || sizeType.sizeType || 'Unknown';
                          return (
                            <div
                              key={index}
                              onClick={() => handleSizeTypeSelect(sizeType)}
                              onMouseEnter={() => setHoveredSizeType(displayName)}
                              onMouseLeave={() => setHoveredSizeType(null)}
                              className={`dropdown-item-option ${
                                hoveredSizeType === displayName
                                  ? 'dropdown-item-hovered'
                                  : 'dropdown-item-default'
                              }`}
                            >
                              {displayName}
                            </div>
                          );
                        })
                      ) : (
                        <div className="dropdown-no-matches">No matches found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Grade Dropdown */}
                <div ref={gradeDropdownRef} className="filter-grid-red">
                  <label className="filter-label">Grade</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={gradeSearch}
                      onChange={handleGradeInput}
                      onFocus={() => setIsGradeOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isGradeOpen && (
                    <div className="dropdown-menu">
                      {filteredGrades.length > 0 ? (
                        filteredGrades.map((grade, index) => {
                          const displayName = grade.Grade || grade.grade || 'Unknown';
                          return (
                            <div
                              key={index}
                              onClick={() => handleGradeSelect(grade)}
                              onMouseEnter={() => setHoveredGrade(displayName)}
                              onMouseLeave={() => setHoveredGrade(null)}
                              className={`dropdown-item-option ${
                                hoveredGrade === displayName
                                  ? 'dropdown-item-hovered'
                                  : 'dropdown-item-default'
                              }`}
                            >
                              {displayName}
                            </div>
                          );
                        })
                      ) : (
                        <div className="dropdown-no-matches">No matches found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Liner */}
                <div className="filter-grid-red">
                  <label className="filter-label">Liner</label>
                  <input
                    type="text"
                    name="liner"
                    value={formData.liner}
                    onChange={handleChange}
                    placeholder="1000"
                    className="filter-input"
                    disabled={loading}
                  />
                </div>

                {/* Yard Dropdown */}
                <div ref={yardDropdownRef} className="filter-grid-red">
                  <label className="filter-label">Yard</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={yardSearch}
                      onChange={handleYardInput}
                      onFocus={() => setIsYardOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isYardOpen && (
                    <div className="dropdown-menu">
                      {filteredYards.length > 0 ? (
                        filteredYards.map((yard, index) => {
                          const displayName = yard.Yard || yard.yard || 'Unknown';
                          return (
                            <div
                              key={index}
                              onClick={() => handleYardSelect(yard)}
                              onMouseEnter={() => setHoveredYard(displayName)}
                              onMouseLeave={() => setHoveredYard(null)}
                              className={`dropdown-item-option ${
                                hoveredYard === displayName
                                  ? 'dropdown-item-hovered'
                                  : 'dropdown-item-default'
                              }`}
                            >
                              {displayName}
                            </div>
                          );
                        })
                      ) : (
                        <div className="dropdown-no-matches">No matches found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* MFG Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">MFG Date</label>
                  <input
                    type="date"
                    name="mfgDate"
                    value={formData.mfgDate}
                    onChange={handleChange}
                    className="filter-input"
                    disabled={loading}
                  />
                </div>

                {/* IN Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">IN Date</label>
                  <input
                    type="date"
                    name="inDate"
                    value={formData.inDate}
                    onChange={handleChange}
                    className="filter-input"
                    disabled={loading}
                  />
                </div>

                {/* Amount */}
                <div className="filter-grid-red">
                  <label className="filter-label">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="10000"
                    className="filter-input"
                    disabled={loading}
                  />
                </div>

                {/* Remark */}
                <div className="filter-grid-red">
                  <label className="filter-label">Remark</label>
                  <textarea
                    name="remark"
                    value={formData.remark}
                    onChange={handleRemarkChange}
                    rows="1"
                    className="multiline-field"
                    disabled={loading}
                  />
                </div>

                {/* Upload Photos */}
                <div className="filter-grid-red">
                  <label className="filter-label">Upload Photos</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const newPreviews = files.map(file => URL.createObjectURL(file));
                      setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, ...files],
                        imagePreviews: [...prev.imagePreviews, ...newPreviews]
                      }));
                      e.target.value = null;
                    }}
                    className="file-input"
                    disabled={loading}
                  />

                  {formData.imagePreviews && formData.imagePreviews.length > 0 && (
                    <div className="image-preview-container">
                      {formData.imagePreviews.map((img, index) => (
                        <div key={index} className="image-preview-wrapper">
                          <img
                            src={img}
                            alt={`preview-${index}`}
                            onClick={() => setSelectedImage(img)}
                            className="image-preview"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="image-remove-btn"
                            disabled={loading}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
              <div
                onClick={() => setSelectedImage(null)}
                className="image-modal-overlay"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="image-modal-content"
                >
                  <img
                    src={selectedImage}
                    alt="view"
                    className="image-modal-img"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="image-modal-close"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="footer-container">
              <div></div>
              <div className="btn-container">
                <button 
                  onClick={handleClear} 
                  className="px-4 py-2 bg-gray-600 text-white border-none rounded cursor-pointer font-medium flex items-center gap-2 hover:bg-gray-700"
                  disabled={loading}
                >
                  Clear
                </button>
                <button 
                  onClick={handleSubmit} 
                  className="btn-all"
                  disabled={loading}
                >
                  <Send size={18} /> {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}