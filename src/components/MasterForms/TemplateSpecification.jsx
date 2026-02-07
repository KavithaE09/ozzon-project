import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ChevronRight,
  Edit2,
  Trash2,
  ChevronLeft,
  Send,
  Undo2,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllTempGroups } from "../../api/masterApi.js";
import tempSpecApi from '../../api/tempSpecApi';

export default function TemplateSpecification() {
  const navigate = useNavigate();
  const templateGroupDropdownRef = useRef(null);

  // ✅ Searchable dropdown states
  const [templateGroupSearch, setTemplateGroupSearch] = useState(() => {
    return localStorage.getItem('templateGroupSearch') || '';
  });
  const [selectedTemplateGroupId, setSelectedTemplateGroupId] = useState(() => {
    const saved = localStorage.getItem('selectedTemplateGroupId');
    return saved ? Number(saved) : null;
  });
  const [isTemplateGroupOpen, setIsTemplateGroupOpen] = useState(false);
  const [hoveredTemplateGroup, setHoveredTemplateGroup] = useState(null);
  
  const [templateSpecificationName, setTemplateSpecificationName] = useState(() => {
    return localStorage.getItem('templateSpecificationName') || '';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const [templateGroups, setTemplateGroups] = useState([]);
  const [templateSpecs, setTemplateSpecs] = useState([]);
  const [filteredSpecs, setFilteredSpecs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const totalPages = Math.ceil(filteredSpecs.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredSpecs.slice(indexOfFirst, indexOfLast);

  // ✅ Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('templateGroupSearch', templateGroupSearch);
  }, [templateGroupSearch]);

  useEffect(() => {
    if (selectedTemplateGroupId) {
      localStorage.setItem('selectedTemplateGroupId', selectedTemplateGroupId.toString());
    }
  }, [selectedTemplateGroupId]);

  useEffect(() => {
    localStorage.setItem('templateSpecificationName', templateSpecificationName);
  }, [templateSpecificationName]);

  // ✅ Filter template groups based on search
  const filteredTemplateGroups = templateGroups.filter((group) => {
    if (!group) return false;
    const groupName = group.TempGroupName || group.templateGroupName || group.name || '';
    return String(groupName).toLowerCase().includes(templateGroupSearch.toLowerCase());
  });

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (templateGroupDropdownRef.current && !templateGroupDropdownRef.current.contains(event.target)) {
        setIsTemplateGroupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     FETCH TEMPLATE GROUPS
  ========================= */
  useEffect(() => {
    const fetchTemplateGroups = async () => {
      try {
        const res = await getAllTempGroups();
        setTemplateGroups(res.data || []);
      } catch (error) {
        console.error("Error fetching template groups:", error);
      }
    };
    fetchTemplateGroups();
  }, []);

  /* =========================
     FETCH TEMPLATE SPECS
  ========================= */
  const fetchTemplateSpecs = async () => {
    try {
      const res = await tempSpecApi.getAll();
      console.log("Full API Response:", res);
      console.log("res.data:", res.data);

      // ✅ Handle multiple possible response structures
      let list = [];
      
      if (Array.isArray(res?.data?.data)) {
        list = res.data.data;
      } else if (Array.isArray(res?.data)) {
        list = res.data;
      } else if (res?.data && typeof res.data === 'object') {
        const possibleArrays = Object.values(res.data).filter(val => Array.isArray(val));
        if (possibleArrays.length > 0) {
          list = possibleArrays[0];
        }
      }

      console.log("Processed list:", list);
      console.log("First item:", list[0]);
      
      setTemplateSpecs(list);
      setFilteredSpecs(list);
    } catch (error) {
      console.error("Error fetching specs:", error);
      setTemplateSpecs([]);
      setFilteredSpecs([]);
    }
  };

  useEffect(() => {
    fetchTemplateSpecs();
  }, []);

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    if (!selectedTemplateGroupId || !templateSpecificationName.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const payload = {
        templateGroupId: Number(selectedTemplateGroupId),
        templateSpecificationName: templateSpecificationName.trim().toUpperCase()
      };

      console.log("Submitting:", payload);

      if (editingId) {
        await tempSpecApi.update(editingId, payload);
        alert("Updated successfully!");
        setEditingId(null);
      } else {
        await tempSpecApi.create(payload);
        alert("Added successfully!");
      }

      // ✅ Refresh the list
      await fetchTemplateSpecs();

      // ✅ Clear form AND localStorage
      setTemplateGroupSearch('');
      setSelectedTemplateGroupId(null);
      setTemplateSpecificationName('');
      localStorage.removeItem('templateGroupSearch');
      localStorage.removeItem('selectedTemplateGroupId');
      localStorage.removeItem('templateSpecificationName');
      setCurrentPage(1);

    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  /* =========================
     SEARCH
  ========================= */
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredSpecs(templateSpecs);
    } else {
      const filtered = templateSpecs.filter(spec => {
        const name = spec.TempSpecName || 
                    spec.templateSpecificationName || 
                    spec.name || 
                    '';
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredSpecs(filtered);
      setCurrentPage(1);
    }
  };

  /* =========================
     EDIT
  ========================= */
  const handleEdit = (spec) => {
    console.log("Editing spec:", spec);
    console.log("Available fields:", Object.keys(spec));
    
    const id = spec.TemplateSpecId || 
               spec.TempSpecId || 
               spec.id || 
               spec.Id ||
               spec.templateSpecificationId ||
               spec.TemplateSpecificationId;
    
    const groupId = spec.TempGroupId || 
                    spec.templateGroupId || 
                    spec.TemplateGroupId;
    
    // Find the group name for display
    const templateGroup = templateGroups.find(
      g => g.TempGroupId === groupId
    );
    
    setEditingId(id);
    setTemplateSpecificationName(
      spec.TempSpecName || 
      spec.templateSpecificationName || 
      spec.name || 
      ''
    );
    setTemplateGroupSearch(templateGroup?.TempGroupName || '');
    setSelectedTemplateGroupId(groupId);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      console.log("Deleting ID:", id);
      await tempSpecApi.remove(id);
      alert("Deleted successfully!");
      await fetchTemplateSpecs();
      setCurrentPage(1);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">

            <div className="page-header">
              <h1 className="page-title">Template Specification</h1>
              <button onClick={() => navigate(-1)} className="page-back-btn">
                <Undo2 className="page-back-icon" />
              </button>
            </div>

            <div className="filter-section">
              <div className="filter-grid">

                {/* ✅ Searchable Template Group Dropdown */}
                <div ref={templateGroupDropdownRef} className="filter-grid-red">
                  <label className="filter-label">Template Group Name</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={templateGroupSearch}
                      onChange={(e) => {
                        setTemplateGroupSearch(e.target.value);
                        setIsTemplateGroupOpen(true);
                      }}
                      onFocus={() => setIsTemplateGroupOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input"
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isTemplateGroupOpen && (
                    <div className="dropdown-menu">
                      {filteredTemplateGroups.length > 0 ? (
                        filteredTemplateGroups.map((group, index) => {
                          const displayName = group.TempGroupName || group.templateGroupName || group.name || 'Unknown';
                          const groupId = group.TempGroupId || group.templateGroupId || group.id;
                          
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setTemplateGroupSearch(displayName);
                                setSelectedTemplateGroupId(groupId);
                                setIsTemplateGroupOpen(false);
                              }}
                              onMouseEnter={() => setHoveredTemplateGroup(displayName)}
                              onMouseLeave={() => setHoveredTemplateGroup(null)}
                              className={`dropdown-item-option ${
                                hoveredTemplateGroup === displayName
                                  ? "dropdown-item-hovered"
                                  : "dropdown-item-default"
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

                <div className="filter-grid-red">
                  <label className="filter-label">
                    Template Specification Name
                  </label>
                  <input
                    type="text"
                    value={templateSpecificationName}
                    onChange={(e) =>
                      setTemplateSpecificationName(e.target.value)
                    }
                    placeholder="Enter specification name"
                    className="filter-input"
                  />
                </div>

                <div className="btn-container">
                  <button onClick={handleSubmit} className="btn-all">
                    <Send size={18} /> {editingId ? 'Update' : 'Submit'}
                  </button>
                </div>

              </div>
            </div>

            <h2 className="page-title">Record List</h2>

            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-green">
                  <label className="filter-label">Search By</label>
                  <input
                    type="text"
                    placeholder="Template Specification Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-input"
                  />
                </div>

                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all">
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            </div>

            <div className="master-table-container">
              <div className="master-table-header" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span className="master-table-title" style={{ flex: 1 }}>
                  Template Group Name
                </span>
                <span className="master-table-title" style={{ flex: 1 }}>
                  Template Specification Name
                </span>
                <span style={{ width: '100px' }}></span>
              </div>

              <div className="master-table-body">
                {currentRows.length > 0 ? (
                  currentRows.map((spec, index) => {
                    console.log("Rendering spec:", spec);
                    console.log("Object keys:", Object.keys(spec));
                    console.log("All values:", spec);
                    
                    const templateGroup = templateGroups.find(
                      g => g.TempGroupId === (spec.TempGroupId || spec.templateGroupId || spec.TemplateGroupId)
                    );
                    
                    return (
                      <div
                        key={spec.TemplateSpecId || spec.TempSpecId || spec.id || spec.Id || index}
                        className="master-table-row"
                        style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                      >
                        <div className="master-table-content" style={{ flex: 1 }}>
                          <ChevronRight size={16} />
                          <span className="master-name-text">
                            {templateGroup?.TempGroupName || 'N/A'}
                          </span>
                        </div>
                        
                        <div className="master-table-content" style={{ flex: 1, paddingLeft: '0' }}>
                          <span className="master-name-text">
                            {spec.TempSpecName || 
                             spec.templateSpecificationName || 
                             spec.name || 
                             spec.TemplateName ||
                             'No Name'}
                          </span>
                        </div>
                        
                        <div className="table-actions">
                          <button
                            onClick={() => {
                              console.log("Edit clicked for:", spec);
                              handleEdit(spec);
                            }}
                            className="btn-action"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => {
                              const id = spec.TemplateSpecId || 
                                        spec.TempSpecId || 
                                        spec.id || 
                                        spec.Id ||
                                        spec.templateSpecificationId ||
                                        spec.TemplateSpecificationId;
                              
                              console.log("Delete clicked - ID:", id);
                              console.log("Full spec object:", spec);
                              
                              if (!id) {
                                alert("Cannot find ID in object. Check console for details.");
                                console.error("Available fields:", Object.keys(spec));
                                return;
                              }
                              
                              handleDelete(id);
                            }}
                            className="btn-action"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-data-cell">
                    No records found
                  </div>
                )}
              </div>
            </div>

            {filteredSpecs.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="pagination-btn"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="pagination-page-btn"
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="pagination-btn"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}