import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FollowUp() {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeTab, setActiveTab] = useState("followup");
  const [data, setData] = useState([]);

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

  const thStyle = {
    padding: "10px",
    textAlign: "center",
    whiteSpace: "nowrap"
  };

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    whiteSpace: "nowrap"
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#F3E8E8", minHeight: "100vh" }}>
      <div style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>Follow Up</h2>

        {/* MAIN TABLE – NO CHANGE */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead style={{ backgroundColor: "#fde2e2" }}>
              <tr>
                <th style={thStyle}>Select</th>
                <th style={thStyle}>S/No</th>
                <th style={thStyle}>Lead No</th>
                <th style={thStyle}>Lead Date</th>
                <th style={thStyle}>Customer Name</th>
                <th style={thStyle}>Sales Person</th>
                <th style={thStyle}>Q.Status</th>
                <th style={thStyle}>Q.Approval</th>
                <th style={thStyle}>Container Status</th>
                <th style={thStyle}>PI Status</th>
                <th style={thStyle}>Contact No</th>
                <th style={thStyle}>Contact Date</th>
                <th style={thStyle}>Next Follow Up Date</th>
                <th style={thStyle}>Narration</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9fafb" }}
                >
                  <td style={tdStyle}>
                    <input
                      type="radio"
                      name="lead"
                      onChange={() => {
                        setSelectedLead(row);
                        setActiveTab("followup");
                      }}
                    />
                  </td>
                  <td style={tdStyle}>{row.slNo}</td>
                  <td style={tdStyle}>{row.leadNo}</td>
                  <td style={tdStyle}>{row.leadDate}</td>
                  <td style={{ ...tdStyle, textAlign: "left" }}>{row.customerName}</td>
                  <td style={tdStyle}>{row.salesPerson}</td>
                  <td style={tdStyle}>{row.qStatus}</td>
                  <td style={tdStyle}>{row.qApproval}</td>
                  <td style={tdStyle}>{row.containerStatus}</td>
                  <td style={tdStyle}>{row.piStatus}</td>
                  <td style={tdStyle}>{row.contactNo}</td>
                  <td style={tdStyle}>{row.contactDate}</td>
                  <td style={tdStyle}>{row.nextFollowUp}</td>
                  <td style={{ ...tdStyle, textAlign: "left" }}>{row.narration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABS */}
        {selectedLead && (
          <div style={{ display: "flex", marginTop: "130px" }}>
            <button
              onClick={() => setActiveTab("followup")}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                background: activeTab === "followup" ? "#fff" : "#f3f4f6",
                fontWeight: activeTab === "followup" ? "600" : "400"
              }}
            >
              Follow Up Details
            </button>
            <button
              onClick={() => setActiveTab("previous")}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderLeft: "none",
                background: activeTab === "previous" ? "#fff" : "#f3f4f6",
                fontWeight: activeTab === "previous" ? "600" : "400"
              }}
            >
              Previous Follow Up Details
            </button>
          </div>
        )}

        {/* FOLLOW UP DETAILS */}
        {selectedLead && activeTab === "followup" && (
          <div style={{ marginTop: "90px" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <label>Lead Status</label>
                <input
                  value={selectedLead.containerStatus}
                  disabled
                  style={{ display: "block", padding: "6px", marginTop: "4px" }}
                />
              </div>
              <div>
                <label>Next Follow Up Date</label>
                <input
                  type="date"
                  style={{ display: "block", padding: "6px", marginTop: "4px" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <label>Remarks</label>
              <textarea rows="6" style={{ width: "100%", marginTop: "6px" }} />
            </div>

            
          </div>
        )}
{/* PREVIOUS FOLLOW UP DETAILS – SAME TABLE STYLE */}
{selectedLead && activeTab === "previous" && (
  <div style={{ marginTop: "24px", overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
      <thead style={{ backgroundColor: "#fde2e2" }}>
        <tr>
          <th style={thStyle}>S/No</th>
          <th style={thStyle}>Lead Status</th>
          <th style={thStyle}>Contact Date</th>
          <th style={thStyle}>Next Follow Up Date</th>
          <th style={thStyle}>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9fafb" }}
          >
            <td style={tdStyle}>{row.slNo}</td>
            <td style={tdStyle}>Following</td>
            <td style={tdStyle}>{row.contactDate}</td>
            <td style={tdStyle}>{row.nextFollowUp}</td>
            <td style={{ ...tdStyle, textAlign: "left" }}>
              The Container Was Loading .....................................................................
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
</div>

      {/* BACK */}
      <div style={{ marginTop: "24px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "2px solid #B91C1C",
            color: "#B91C1C",
            padding: "6px 16px",
            background: "#fff"
          }}
        >
          ← Back
        </button>
      </div>
      <div style={{ textAlign: "right", marginTop: "-25px" }}>
              <button
                style={{
                  backgroundColor: "#A63128",
                  color: "#fff",
                  padding: "15px 34px",
                  border: "none",
                  borderRadius: "10px"
                }}
              >
                Submit
              </button>
            </div>
    </div>
    
  );
}
