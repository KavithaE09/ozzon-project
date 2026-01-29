import React, { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
export default function PurchaseOrder() {
   const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [rows, setRows] = useState([
    { code: "", product: "", unit: "", qty: 1, rate: 0, amount: 0 }
  ]);

  const handleChange = (i, field, value) => {
    const updated = [...rows];
    updated[i][field] = value;

    if (field === "qty" || field === "rate") {
      updated[i].amount =
        Number(updated[i].qty || 0) * Number(updated[i].rate || 0);
    }
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { code: "", product: "", unit: "", qty: 1, rate: 0, amount: 0 }
    ]);
  };

  const deleteRow = (i) => {
    setRows(rows.filter((_, index) => index !== i));
  };

  const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h3 style={styles.title}>Purchase Order</h3>

        {/* Top Form */}
        <div style={styles.topGrid}>
          <TopInput label="PO No" value="PONO001" />
          <TopInput label="PO Date" type="date" value={today} />
          <TopSelect
            label="Supplier"
            options={["Safi & Co", "ABC Traders", "Global Supplies"]}
          />
          <TopInput label="Expect Date" type="date" value={today} />
        </div>

        {/* Material List */}
        <div style={styles.box}>
          <h4 style={styles.subTitle}>Material List</h4>

          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                {[
                  "S.No",
                  "Code",
                  "Product",
                  "Unit",
                  "Qty",
                  "Rate",
                  "Amount",
                  "Action"
                ].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={styles.td}>{i + 1}</td>

                  {/* CODE INPUT */}
                  <td>
                    <input
                      style={styles.codeInput}
                      placeholder="Code"
                      value={row.code}
                      onChange={e =>
                        handleChange(i, "code", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <select
                      style={styles.inputCell}
                      value={row.product}
                      onChange={e =>
                        handleChange(i, "product", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option>Cement</option>
                      <option>Steel</option>
                      <option>Bricks</option>
                    </select>
                  </td>

                  <td>
                    <select
                      style={styles.inputCell}
                      value={row.unit}
                      onChange={e =>
                        handleChange(i, "unit", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option>Kg</option>
                      <option>Nos</option>
                      <option>Bag</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      style={styles.qtyInput}
                      value={row.qty}
                      onChange={e =>
                        handleChange(i, "qty", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      style={styles.rateInput}
                      value={row.rate}
                      onChange={e =>
                        handleChange(i, "rate", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    ₹ {row.amount.toLocaleString()}
                  </td>

                  <td style={styles.td}>
                    <Plus size={16} style={styles.actionIcon} onClick={addRow} />
                    <Edit2 size={16} style={styles.actionIcon} />
                    <Trash2
                      size={16}
                      style={{ ...styles.actionIcon, color: "#B91C1C" }}
                      onClick={() => deleteRow(i)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.total}>
            Total Amount : ₹ {totalAmount.toLocaleString()}
          </div>
        </div>

        {/* Remarks & Submit */}
        <div style={styles.bottom}>
          <textarea
            placeholder="Remarks"
            rows={3}
            style={styles.remarks}
          />
          <button style={styles.submit}>Submit</button>
        </div>
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
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <span>←</span>
        <span>Back</span>
      </button>
    </div>
  );
}

/* ---------- Top Inputs ---------- */
const TopInput = ({ label, type = "text", value }) => (
  <div style={styles.inputBox}>
    <label style={styles.label}>{label}</label>
    <input type={type} defaultValue={value} style={styles.input} />
  </div>
);

const TopSelect = ({ label, options }) => (
  <div style={styles.inputBox}>
    <label style={styles.label}>{label}</label>
    <select style={styles.input}>
      {options.map(o => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

/* ---------- Styles ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5eaea",
    padding: "30px"
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "24px",
    maxWidth: "1200px",
    margin: "auto",
    marginBottom:"10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },
  title: { marginBottom: "20px" },

  topGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "25px"
  },

  inputBox: {
    borderRadius: "6px",
    padding: "8px",
    border: "1px solid #9CA3AF",
    borderRight: "3px solid #DC2626"
  },
  label: {
    fontSize: "16px",
    fontWeight: "600"
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    height: 33,
    paddingTop: 6
  },

  box: {
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "16px"
  },

  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#FDE2E2" },
  th: { padding: "8px", fontSize: "13px", textAlign: "left" },
  td: { padding: "8px", fontSize: "13px" },

  codeInput: {
    width: "90px",
    padding: "6px",
    border: "1px solid #D1D5DB",
    borderRadius: "4px",
    fontSize: "13px"
  },

  inputCell: {
    width: "140px",
    padding: "6px",
    border: "1px solid #D1D5DB",
    borderRadius: "4px"
  },

  qtyInput: {
    width: "80px",
    padding: "6px",
    border: "1px solid #D1D5DB",
    borderRadius: "4px"
  },

  rateInput: {
    width: "120px",
    padding: "6px",
    border: "1px solid #D1D5DB",
    borderRadius: "4px"
  },

  actionIcon: {
    cursor: "pointer",
    marginRight: "8px",
    color: "#7C2D12"
  },

  total: {
    marginTop: "12px",
    textAlign: "right",
    fontWeight: "700"
  },

  bottom: {
    marginTop: "20px",
    display: "flex",
    gap: "20px"
  },
  remarks: {
    width: "70%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #D1D5DB"
  },
  submit: {
    background: "#A63128",
    color: "#fff",
    border: "none",
    padding: "10px 36px",
    borderRadius: "8px",
    fontWeight: "700",
    height:50,
    marginLeft: "auto",
      marginTop: "10px" 
  }
};
