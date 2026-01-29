import React, { useState } from 'react';
import { ChevronRight, Search, Edit2, Trash2, ChevronLeft, } from 'lucide-react';import { useNavigate } from 'react-router-dom';

export default function Debit() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 2;

  const [templateGroups, setTemplateGroups] = useState([
    { id: 1, name: 'INTERESTED' }
  ]);
  const [filteredGroups, setFilteredGroups] = useState([
    { id: 1, name: 'INTERESTED' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);

const indexOfLast = currentPage * rowsPerPage;
const indexOfFirst = indexOfLast - rowsPerPage;

const currentGroups = filteredGroups.slice(
  indexOfFirst,
  indexOfLast
);

  const handleSubmit = () => {
    if (groupName.trim() !== '') {
      const newGroup = {
        id: templateGroups.length > 0 ? Math.max(...templateGroups.map(g => g.id)) + 1 : 1,
        name: groupName.toUpperCase()
      };
      setTemplateGroups([...templateGroups, newGroup]);
      setFilteredGroups([...templateGroups, newGroup]);
      setGroupName('');
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(templateGroups);
    } else {
      const filtered = templateGroups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
      setCurrentPage(1);
    }
  };

  const handleEdit = (group) => {
    setEditingId(group.id);
    setEditingName(group.name);
  };

  const handleUpdate = (groupId) => {
    if (editingName.trim() !== '') {
      const updatedGroups = templateGroups.map(group =>
        group.id === groupId ? { ...group, name: editingName.toUpperCase() } : group
      );
      setTemplateGroups(updatedGroups);
      setFilteredGroups(updatedGroups);
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = (groupId) => {
    const updatedGroups = templateGroups.filter(group => group.id !== groupId);
    setTemplateGroups(updatedGroups);
    setFilteredGroups(updatedGroups);
    setCurrentPage(1);
  };

  return (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* Main Content */}
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Form Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#f5e6e8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '15px' }}>
            {/* Debit A/C Section */}
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
              Debit A/C
            </h2>
            
            <div style={{ 
              marginBottom: '24px',
              display: 'flex', 
              alignItems: 'flex-end', 
               justifyContent: 'flex-start',
              gap: '40px',
            }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Debit A/C List
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter status name"
                  style={{ 
                    width: '256px', 
                    padding: '4px 8px', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                />
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
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
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
                  placeholder="Debit A/C List"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    width: '256px', 
                    padding: '4px 8px', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                />
              </div>
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
                  Debit A/C List
                </span>
              </div>
              <div style={{ backgroundColor: 'white' }}>
               {currentGroups.length > 0 ? (
                      currentGroups.map((group, idx) => (
                  <div 
                    key={group.id}
                    style={{ 
                      padding: '10px 16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      borderBottom: idx !== filteredGroups.length - 1 ? '1px solid #f3f4f6' : 'none',gap:'12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <ChevronRight size={16} style={{ color: '#374151' }} />
                      {editingId === group.id ? (
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
                        <span style={{ fontSize: '14px', color: '#111827' }}>{group.name}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {editingId === group.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(group.id)}
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
                            onClick={() => handleEdit(group)}
                          />
                          <Trash2 
                            size={18} 
                            style={{ color: '#DC2626', cursor: 'pointer' }}
                            onClick={() => handleDelete(group.id)}
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
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 20px', 
              fontSize: '13px', 
              fontWeight: '500', 
              color: '#B91C1C', 
              border: '2px solid #B91C1C', 
              borderRadius: '4px', 
              backgroundColor: 'white', 
              cursor: 'pointer' 
            }}
          >
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}