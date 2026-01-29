import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Form, useNavigate } from 'react-router-dom';
export default function ContainerPurchase() {
    const [selectedImage, setSelectedImage] = useState(null);
    const partyNameDropdownRef = useRef(null);
    const sizeTypeDropdownRef = useRef(null);
    const gradeDropdownRef = useRef(null);
    const yardDropdownRef = useRef(null);
    const navigate = useNavigate();

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
        if (groupName.trim() !== '') {
            // Add new group to the list
            setTemplateGroups([...templateGroups, groupName.toUpperCase()]);
            setFilteredGroups([...templateGroups, groupName.toUpperCase()]);
            // Clear input
            setGroupName('');
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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <div style={{ flex: 1, overflow: 'auto', padding: '24px', backgroundColor: '#F2E6E6' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '10px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>Container Purchase</h2>

                        <div style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'start'  }}>
                                <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Container No</label>
                                    <input
                                        type="text"
                                        name="containerNo"
                                        value={formData.containerNo}
                                        onChange={handleChange}
                                        placeholder="456123"
                                        style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>

                                {/* Party Name Dropdown */}
                                <div
                                    ref={partyNameDropdownRef}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #9CA3AF',
                                        borderRight: '3px solid #DC2626',
                                        position: 'relative'
                                    }}
                                >
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                                        Party Name
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={partyNameSearch}
                                            onChange={handlePartyNameInput}
                                            onFocus={() => setIsPartyNameOpen(true)}
                                            placeholder="Type or select..."
                                            style={{ width: '100%', padding: '1px 1px', border: 'none', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                                        />
                                        <ChevronDown size={20} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                                    </div>
                                    {isPartyNameOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', zIndex: 1000 }}>
                                            {filteredPartyNames.length > 0 ? (
                                                filteredPartyNames.map((option, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handlePartyNameSelect(option)}
                                                        onMouseEnter={() => setHoveredPartyName(option)}
                                                        onMouseLeave={() => setHoveredPartyName(null)}
                                                        style={{
                                                            padding: '8px 12px',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            color: hoveredPartyName === option ? 'white' : '#374151',
                                                            backgroundColor: hoveredPartyName === option ? '#A63128' : formData.partyName === option ? '#FEE2E2' : 'white',
                                                            borderBottom: index < filteredPartyNames.length - 1 ? '1px solid #E5E7EB' : 'none'
                                                        }}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: '8px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Size Type Dropdown */}
                                <div
                                    ref={sizeTypeDropdownRef}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #9CA3AF',
                                        borderRight: '3px solid #DC2626',
                                        position: 'relative'
                                    }}
                                >
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                                        Size Type
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={sizeTypeSearch}
                                            onChange={handleSizeTypeInput}
                                            onFocus={() => setIsSizeTypeOpen(true)}
                                            placeholder="Type or select..."
                                            style={{ width: '100%', padding: '1px 1px', border: 'none', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                                        />
                                        <ChevronDown size={20} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                                    </div>
                                    {isSizeTypeOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', zIndex: 1000 }}>
                                            {filteredSizeTypes.length > 0 ? (
                                                filteredSizeTypes.map((option, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleSizeTypeSelect(option)}
                                                        onMouseEnter={() => setHoveredSizeType(option)}
                                                        onMouseLeave={() => setHoveredSizeType(null)}
                                                        style={{
                                                            padding: '8px 12px',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            color: hoveredSizeType === option ? 'white' : '#374151',
                                                            backgroundColor: hoveredSizeType === option ? '#A63128' : formData.sizeType === option ? '#FEE2E2' : 'white',
                                                            borderBottom: index < filteredSizeTypes.length - 1 ? '1px solid #E5E7EB' : 'none'
                                                        }}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: '8px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Grade Dropdown */}
                                <div
                                    ref={gradeDropdownRef}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #9CA3AF',
                                        borderRight: '3px solid #DC2626',
                                        position: 'relative'
                                    }}
                                >
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                                        Grade
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={gradeSearch}
                                            onChange={handleGradeInput}
                                            onFocus={() => setIsGradeOpen(true)}
                                            placeholder="Type or select..."
                                            style={{ width: '100%', padding: '1px 1px', border: 'none', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                                        />
                                        <ChevronDown size={20} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                                    </div>
                                    {isGradeOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', zIndex: 1000 }}>
                                            {filteredGrades.length > 0 ? (
                                                filteredGrades.map((option, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleGradeSelect(option)}
                                                        onMouseEnter={() => setHoveredGrade(option)}
                                                        onMouseLeave={() => setHoveredGrade(null)}
                                                        style={{
                                                            padding: '8px 12px',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            color: hoveredGrade === option ? 'white' : '#374151',
                                                            backgroundColor: hoveredGrade === option ? '#A63128' : formData.grade === option ? '#FEE2E2' : 'white',
                                                            borderBottom: index < filteredGrades.length - 1 ? '1px solid #E5E7EB' : 'none'
                                                        }}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: '8px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Liner</label>
                                    <input
                                        type="text"
                                        name="liner"
                                        value={formData.liner}
                                        onChange={handleChange}
                                        placeholder="1000"
                                        style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>

                                {/* Yard Dropdown */}
                                <div
                                    ref={yardDropdownRef}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #9CA3AF',
                                        borderRight: '3px solid #DC2626',
                                        position: 'relative'
                                    }}
                                >
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                                        Yard
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={yardSearch}
                                            onChange={handleYardInput}
                                            onFocus={() => setIsYardOpen(true)}
                                            placeholder="Type or select..."
                                            style={{ width: '100%', padding: '1px 1px', border: 'none', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                                        />
                                        <ChevronDown size={20} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                                    </div>
                                    {isYardOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', zIndex: 1000 }}>
                                            {filteredYards.length > 0 ? (
                                                filteredYards.map((option, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleYardSelect(option)}
                                                        onMouseEnter={() => setHoveredYard(option)}
                                                        onMouseLeave={() => setHoveredYard(null)}
                                                        style={{
                                                            padding: '8px 12px',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            color: hoveredYard === option ? 'white' : '#374151',
                                                            backgroundColor: hoveredYard === option ? '#A63128' : formData.yard === option ? '#FEE2E2' : 'white',
                                                            borderBottom: index < filteredYards.length - 1 ? '1px solid #E5E7EB' : 'none'
                                                        }}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: '8px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>MFG Date</label>
                                    <input
                                        type="date"
                                        name="mfgDate"
                                        value={formData.mfgDate}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>IN Date</label>
                                    <input
                                        type="date"
                                        name="inDate"
                                        value={formData.inDate}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Amount</label>
                                    <input
                                        type="text"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        placeholder="10000"
                                        style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
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
                                        marginBottom: '6px',
                                        fontWeight: '600'
                                    }}>
                                        Remark
                                    </label>

                                    <textarea 
                name="remark" 
                value={formData.remark} 
                onChange={handleRemarkChange} 
                rows="1" 
                style={{ 
                  width: '100%', 
                  padding: '1px 1px', 
                  fontSize: '15px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  outline: 'none', 
                  fontFamily: 'inherit',
                  resize: 'none',
                  minHeight: '16px',
                  lineHeight: '14px',
                  overflow: 'hidden'
                }} 
              />
                                </div>


                                <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                                    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                                        Upload Photos
                                    </label>
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
                                        style={{ width: '100%', border: 'none', outline: 'none' }}
                                    />

                                    {formData.imagePreviews && formData.imagePreviews.length > 0 && (
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                            {formData.imagePreviews.map((img, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        position: 'relative',
                                                        width: '70px',
                                                        height: '70px'
                                                    }}
                                                >
                                                    <img
                                                      src={img}
                                                      alt={`preview-${index}`}
                                                      onClick={() => setSelectedImage(img)}
                                                      style={{
                                                      width: '70px',
                                                      height: '70px',
                                                      objectFit: 'cover',
                                                      borderRadius: '6px',
                                                      border: '1px solid #9CA3AF',
                                                      cursor: 'pointer'
                                                       }}
                                                    />


                                                    {/* Hover X button */}
                                                    <div
                                                        onClick={() => removeImage(index)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '-6px',
                                                            right: '-6px',
                                                            width: '20px',
                                                            height: '20px',
                                                            backgroundColor: '#B91C1C',
                                                            color: 'white',
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '12px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        ✕
                                                    </div>
                                                    {selectedImage && (
    <div
    onClick={() => setSelectedImage(null)}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: 'relative' }}
    >
      <img
        src={selectedImage}
        alt="view"
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          borderRadius: '10px'
        }}
      />

      {/* Close Button */}
      <div
        onClick={() => setSelectedImage(null)}
        style={{
          position: 'absolute',
          top: '-12px',
          right: '-12px',
          width: '30px',
          height: '30px',
          backgroundColor: '#DC2626',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ✕
      </div>
    </div>
  </div>
)}

                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </div>

                            </div>
                        </div>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', maxWidth: '1250px' }}>
                        <button
                            onClick={() => navigate(-1)}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
                            <span>←</span>
                            <span>Back</span>
                        </button>
                        <div style={{ display: 'grid', justifyContent: 'end', marginTop: '20px' }}>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    width: '150px',
                                    height: '50px',
                                    padding: '10px 24px',
                                    backgroundColor: '#A63128',
                                    color: 'white',
                                    borderRadius: '15px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
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