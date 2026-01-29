import React, { useState } from 'react';
import { ChevronRight, Search, Edit2, Trash2 , ChevronLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TemplateSpecification() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [templateGroupName, setTemplateGroupName] = useState('');
  const [templateSpecificationName, setTemplateSpecificationName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const [templateSpecs, setTemplateSpecs] = useState([
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'RANEESH' },
    { id: 3, name: 'BALA' },
    { id: 4, name: 'NAVEEN' }
  ]);
  const [filteredSpecs, setFilteredSpecs] = useState([
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'RANEESH' },
    { id: 3, name: 'BALA' },
    { id: 4, name: 'NAVEEN' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

const totalPages = Math.ceil(filteredSpecs.length / rowsPerPage);

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const currentRows = filteredSpecs.slice(
  indexOfFirstRow,
  indexOfLastRow
);


  const handleSubmit = () => {
    if (templateSpecificationName.trim() !== '') {
      const newSpec = {
        id: templateSpecs.length > 0 ? Math.max(...templateSpecs.map(s => s.id)) + 1 : 1,
        name: templateSpecificationName.toUpperCase()
      };
      setTemplateSpecs([...templateSpecs, newSpec]);
      setFilteredSpecs([...templateSpecs, newSpec]);
      setTemplateGroupName('');
      setTemplateSpecificationName('');
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredSpecs(templateSpecs);
    } else {
      const filtered = templateSpecs.filter(spec =>
        spec.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSpecs(filtered);
    }
  };

  const handleEdit = (spec) => {
    setEditingId(spec.id);
    setEditingName(spec.name);
  };

  const handleUpdate = (specId) => {
    if (editingName.trim() !== '') {
      const updatedSpecs = templateSpecs.map(spec =>
        spec.id === specId ? { ...spec, name: editingName.toUpperCase() } : spec
      );
      setTemplateSpecs(updatedSpecs);
      setFilteredSpecs(updatedSpecs);
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = (specId) => {
    const updatedSpecs = templateSpecs.filter(spec => spec.id !== specId);
    setTemplateSpecs(updatedSpecs);
    setFilteredSpecs(updatedSpecs);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* Form Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#f5e6e8' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '15px' }}>
          {/* Template Specification Section */}
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
            Template specification
          </h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
             justifyContent: 'flex-start',
              gap: '40px',
            marginBottom: '24px' 
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', width: '280px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color:'#374151',
                  marginBottom: '8px'
                }}>
                  Template Group Name
                </label>
                <input
                  type="text"
                  value={templateGroupName}
                  onChange={(e) => setTemplateGroupName(e.target.value)}
                  placeholder="Enter group name"
                  style={{ 
                    width: 'calc(100% - 16px)', 
                    padding: '4px 8px', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', width: '280px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Template Specification Name
                </label>
                <input
                  type="text"
                  value={templateSpecificationName}
                  onChange={(e) => setTemplateSpecificationName(e.target.value)}
                  placeholder="Enter specification name"
                  style={{ 
                    width: 'calc(100% - 16px)', 
                    padding: '4px 8px', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
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

          {/* Record List Section */}
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
            Record List
          </h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
           justifyContent: 'flex-start',
              gap: '40px',
            marginBottom: '24px' 
          }}>
            <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E', width: '280px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#374151',
                marginBottom: '8px'
              }}>
                Search By
              </label>
              <input
                type="text"
                placeholder="Template Specification Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: 'calc(100% - 16px)', 
                  padding: '4px 8px', 
                  border: 'none', 
                  borderRadius: '4px',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <button 
                onClick={handleSearch}
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
                <Search size={18} /> Search
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ 
            border: '1px solid #9CA3AF', 
            borderRadius: '8px', 
            overflow: 'hidden' 
          }}>
            <div style={{ 
              backgroundColor: '#fde2e2', 
              padding: '10px 16px', 
              borderBottom: '1px solid #9CA3AF' 
            }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>
                Template Specification Name
              </span>
            </div>
            <div style={{ backgroundColor: 'white' }}>
              {filteredSpecs.length > 0 ? (
             currentRows.map((spec, idx) => (

                <div 
                  key={spec.id}
                  style={{ 
                    padding: '10px 16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    borderBottom: idx !== currentRows.length - 1 ? '1px solid #f3f4f6' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <ChevronRight size={16} style={{ color: '#374151' }} />
                    {editingId === spec.id ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '4px 8px',
                          border: '1px solid #9CA3AF',
                          borderRadius: '4px',
                          fontSize: '14px',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '14px', color: '#111827' }}>{spec.name}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {editingId === spec.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(spec.id)}
                          style={{
                            padding: '4px 12px',
                            backgroundColor: '#A63128',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          style={{
                            padding: '4px 12px',
                            backgroundColor: '#6B7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <Edit2 
                          size={18} 
                          style={{ color: '#6B7280', cursor: 'pointer' }}
                          onClick={() => handleEdit(spec)}
                        />
                        <Trash2 
                          size={18} 
                          style={{ color: '#DC2626', cursor: 'pointer' }}
                          onClick={() => handleDelete(spec.id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
                  <div style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
                    No records found
                  </div>
                )}
            </div>
          </div>
        </div>
        <div style={{
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '12px'
}}>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(p => p - 1)}
    style={{
      padding: '6px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      backgroundColor: currentPage === 1 ? '#e5e7eb' : '#ffffff',
      cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
    }}
  >
   <ChevronLeft />

  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      style={{
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        backgroundColor: currentPage === page ? '#A63128' : '#ffffff',
        color: currentPage === page ? '#ffffff' : '#000000',
        cursor: 'pointer'
      }}
    >
      {page}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(p => p + 1)}
    style={{
      padding: '6px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#ffffff',
      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
    }}
  >
  <ChevronRight />
  </button>
</div>

        <button 
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
          <span>←</span>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}