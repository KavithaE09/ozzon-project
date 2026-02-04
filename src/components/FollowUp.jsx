import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
export default function FollowUp() {
  const navigate = useNavigate();
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeTab, setActiveTab] = useState("followup");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    date: getTodayDate()
  });

  useEffect(() => {
    setData([
      {
        slNo: 1,
        leadNo: "0001",
        leadDate: "26-01-26",
        customerName: "Christine Brooks",
        salesPerson: "Christine",
        qStatus: "Approved",
        qApproval: "Printing",
        containerStatus: "Hold",
        piStatus: "Approved",
        contactNo: "9876543210",
        contactDate: "26-01-26",
        nextFollowUp: "26-01-26",
        narration: "Narration"
      },
      {
        slNo: 2,
        leadNo: "0002",
        leadDate: "26-01-26",
        customerName: "Rosie Pearson",
        salesPerson: "Brooks",
        qStatus: "Approved",
        qApproval: "Printing",
        containerStatus: "Approval",
        piStatus: "Approved",
        contactNo: "9876543210",
        contactDate: "26-01-26",
        nextFollowUp: "26-01-26",
        narration: "Narration"
      }
    ]);
  }, []);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Follow Up</h2>

            {/* MAIN TABLE */}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr className="table-header">
                    <th className="table-th-center">Select</th>
                    <th className="table-th-center">S/No</th>
                    <th className="table-th-center">Lead No</th>
                    <th className="table-th-center">Lead Date</th>
                    <th className="table-th">Customer Name</th>
                    <th className="table-th-center">Sales Person</th>
                    <th className="table-th-center">Q.Status</th>
                    <th className="table-th-center">Q.Approval</th>
                    <th className="table-th-center">Container Status</th>
                    <th className="table-th-center">PI Status</th>
                    <th className="table-th-center">Contact No</th>
                    <th className="table-th-center">Contact Date</th>
                    <th className="table-th-center">Next Follow Up Date</th>
                    <th className="table-th">Narration</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="table-row">
                      <td className="table-cell-center">
                        <input
                          type="radio"
                          name="lead"
                          className="accent-primary"
                          onChange={() => {
                            setSelectedLead(row);
                            setActiveTab("followup");
                          }}
                        />
                      </td>
                      <td className="table-cell-center">{row.slNo}</td>
                      <td className="table-cell-center">{row.leadNo}</td>
                      <td className="table-cell-center">{row.leadDate}</td>
                      <td className="table-cell">{row.customerName}</td>
                      <td className="table-cell-center">{row.salesPerson}</td>
                      <td className="table-cell-center">{row.qStatus}</td>
                      <td className="table-cell-center">{row.qApproval}</td>
                      <td className="table-cell-center">{row.containerStatus}</td>
                      <td className="table-cell-center">{row.piStatus}</td>
                      <td className="table-cell-center">{row.contactNo}</td>
                      <td className="table-cell-center">{row.contactDate}</td>
                      <td className="table-cell-center">{row.nextFollowUp}</td>
                      <td className="table-cell">{row.narration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TABS */}
            {selectedLead && (
              <div className="tabs-container">
                <button
                  onClick={() => setActiveTab("followup")}
                  className={`tab-button ${activeTab === "followup" ? "tab-button-active" : ""}`}
                >
                  Follow Up Details
                </button>
                <button
                  onClick={() => setActiveTab("previous")}
                  className={`tab-button ${activeTab === "previous" ? "tab-button-active" : ""}`}
                >
                  Previous Follow Up Details
                </button>
              </div>
            )}

            {/* FOLLOW UP DETAILS */}
            {selectedLead && activeTab === "followup" && (
              <div style={{ marginBottom: "24px" }}>
                <div className="filter-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                  <div className="filter-grid-red">
                    <label className="filter-label">Lead Status</label>
                    <input
                      value={selectedLead.containerStatus}
                      disabled
                      className="filter-input"
                    />
                  </div>
                  <div className="filter-grid-red">
                    <label className="filter-label">Next Follow Up Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="filter-input"
                    />
                  </div>
                </div>

                <div className="filter-grid-red" style={{ marginTop: "16px" }}>
                  <label className="filter-label">Remarks</label>
                  <textarea 
                    rows={1}
                    className='multiline-field'
                  />
                </div>
              </div>
            )}

            {/* PREVIOUS FOLLOW UP DETAILS */}
            {selectedLead && activeTab === "previous" && (
              <div className="table-container" style={{ marginBottom: "24px" }}>
                <table className="data-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-th-center">S/No</th>
                      <th className="table-th-center">Lead Status</th>
                      <th className="table-th-center">Contact Date</th>
                      <th className="table-th-center">Next Follow Up Date</th>
                      <th className="table-th">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index} className="table-row">
                        <td className="table-cell-center">{row.slNo}</td>
                        <td className="table-cell-center">Following</td>
                        <td className="table-cell-center">{row.contactDate}</td>
                        <td className="table-cell-center">{row.nextFollowUp}</td>
                        <td className="table-cell">
                          The Container Was Loading .....................................................................
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SUBMIT AND BACK BUTTONS */}
            <div className="footer-container">
              <button onClick={() => navigate(-1)} className="btn-back">
                <span>←</span>
                <span>Back</span>
              </button>

              {selectedLead && (
                <button className="btn-all">
                  <Send size={18} />  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}