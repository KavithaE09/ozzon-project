import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContainerPurchase() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
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

  const [formData, setFormData] = useState({
    containerNo: '',
    partyName: '',
    sizeType: '',
    grade: '',
    liner: '',
    yard: '',
    mfgDate: getTodayDate(),
    inDate: getTodayDate(),
    amount: '',
    remark: '',
    images: [],
    imagePreviews: []
  });

  const [partyNameSearch, setPartyNameSearch] = useState('');
  const [isPartyNameOpen, setIsPartyNameOpen] = useState(false);
  const [hoveredPartyName, setHoveredPartyName] = useState(null);

  const [sizeTypeSearch, setSizeTypeSearch] = useState('');
  const [isSizeTypeOpen, setIsSizeTypeOpen] = useState(false);
  const [hoveredSizeType, setHoveredSizeType] = useState(null);

  const [gradeSearch, setGradeSearch] = useState('');
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [hoveredGrade, setHoveredGrade] = useState(null);

  const [yardSearch, setYardSearch] = useState('');
  const [isYardOpen, setIsYardOpen] = useState(false);
  const [hoveredYard, setHoveredYard] = useState(null);

  const partyNameOptions = [
    'Kavitha',
    'Raneesh Kumar',
    'Nathan Electronics',
    'Logic-Tech Solutions',
    'Global Traders'
  ];

  const sizeTypeOptions = ['20', '40', '60', '80'];
  const gradeOptions = ['A', 'B', 'C'];
  const yardOptions = ['Global', 'Local'];

  const filteredPartyNames = partyNameOptions.filter(opt =>
    opt.toLowerCase().includes(partyNameSearch.toLowerCase())
  );

  const filteredSizeTypes = sizeTypeOptions.filter(opt =>
    opt.toLowerCase().includes(sizeTypeSearch.toLowerCase())
  );

  const filteredGrades = gradeOptions.filter(opt =>
    opt.toLowerCase().includes(gradeSearch.toLowerCase())
  );

  const filteredYards = yardOptions.filter(opt =>
    opt.toLowerCase().includes(yardSearch.toLowerCase())
  );

  const handlePartyNameInput = (e) => {
    setPartyNameSearch(e.target.value);
    setIsPartyNameOpen(true);
  };

  const handlePartyNameSelect = (option) => {
    setFormData({ ...formData, partyName: option });
    setPartyNameSearch(option);
    setIsPartyNameOpen(false);
  };

  const handleSizeTypeInput = (e) => {
    setSizeTypeSearch(e.target.value);
    setIsSizeTypeOpen(true);
  };

  const handleSizeTypeSelect = (option) => {
    setFormData({ ...formData, sizeType: option });
    setSizeTypeSearch(option);
    setIsSizeTypeOpen(false);
  };

  const handleGradeInput = (e) => {
    setGradeSearch(e.target.value);
    setIsGradeOpen(true);
  };

  const handleGradeSelect = (option) => {
    setFormData({ ...formData, grade: option });
    setGradeSearch(option);
    setIsGradeOpen(false);
  };

  const handleYardInput = (e) => {
    setYardSearch(e.target.value);
    setIsYardOpen(true);
  };

  const handleYardSelect = (option) => {
    setFormData({ ...formData, yard: option });
    setYardSearch(option);
    setIsYardOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your submit logic here
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
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

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
            
            {/* 🆕 Page Header with Back Button */}
            <div className="page-header">
              <h1 className="page-title">Container Purchase</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2   className="page-back-icon" />
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
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isPartyNameOpen && (
                    <div className="dropdown-menu">
                      {filteredPartyNames.length > 0 ? (
                        filteredPartyNames.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handlePartyNameSelect(option)}
                            onMouseEnter={() => setHoveredPartyName(option)}
                            onMouseLeave={() => setHoveredPartyName(null)}
                            className={`dropdown-item-option ${
                              hoveredPartyName === option
                                ? 'dropdown-item-hovered'
                                : formData.partyName === option
                                ? 'dropdown-item-selected'
                                : 'dropdown-item-default'
                            }`}
                          >
                            {option}
                          </div>
                        ))
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
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isSizeTypeOpen && (
                    <div className="dropdown-menu">
                      {filteredSizeTypes.length > 0 ? (
                        filteredSizeTypes.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleSizeTypeSelect(option)}
                            onMouseEnter={() => setHoveredSizeType(option)}
                            onMouseLeave={() => setHoveredSizeType(null)}
                            className={`dropdown-item-option ${
                              hoveredSizeType === option
                                ? 'dropdown-item-hovered'
                                : formData.sizeType === option
                                ? 'dropdown-item-selected'
                                : 'dropdown-item-default'
                            }`}
                          >
                            {option}
                          </div>
                        ))
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
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isGradeOpen && (
                    <div className="dropdown-menu">
                      {filteredGrades.length > 0 ? (
                        filteredGrades.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleGradeSelect(option)}
                            onMouseEnter={() => setHoveredGrade(option)}
                            onMouseLeave={() => setHoveredGrade(null)}
                            className={`dropdown-item-option ${
                              hoveredGrade === option
                                ? 'dropdown-item-hovered'
                                : formData.grade === option
                                ? 'dropdown-item-selected'
                                : 'dropdown-item-default'
                            }`}
                          >
                            {option}
                          </div>
                        ))
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
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isYardOpen && (
                    <div className="dropdown-menu">
                      {filteredYards.length > 0 ? (
                        filteredYards.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleYardSelect(option)}
                            onMouseEnter={() => setHoveredYard(option)}
                            onMouseLeave={() => setHoveredYard(null)}
                            className={`dropdown-item-option ${
                              hoveredYard === option
                                ? 'dropdown-item-hovered'
                                : formData.yard === option
                                ? 'dropdown-item-selected'
                                : 'dropdown-item-default'
                            }`}
                          >
                            {option}
                          </div>
                        ))
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

            {/* Footer Buttons - Only Submit button now */}
            <div className="footer-container">
              <div></div> {/* Empty div for spacing */}
              <button onClick={handleSubmit} className="btn-all">
                <Send size={18} />  Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}