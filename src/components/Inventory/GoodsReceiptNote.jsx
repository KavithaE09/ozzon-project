import React, { useState } from "react";
import { Plus, Trash2, Edit2,Printer } from "lucide-react";
import { useNavigate } from 'react-router-dom';
export default function GoodsReceiptNotes() {
   const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [rows, setRows] = useState([
    {
      code: "001",
      product: "Steel",
      unit: "Kg",
      orderQty: 1000,
      prevQty: 0,
      arrivalQty: 0,
      rejectedQty: 0,
      acceptedQty: 0,
      remark: ""
    }
  ]);

  const handleChange = (i, field, value) => {
    const updated = [...rows];
    updated[i][field] = value;

    if (field === "arrivalQty" || field === "rejectedQty") {
      updated[i].acceptedQty =
        Number(updated[i].arrivalQty || 0) -
        Number(updated[i].rejectedQty || 0);
    }

    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        code: "",
        product: "",
        unit: "",
        orderQty: 0,
        prevQty: 0,
        arrivalQty: 0,
        rejectedQty: 0,
        acceptedQty: 0,
        remark: ""
      }
    ]);
  };

  const deleteRow = (i) => {
    setRows(rows.filter((_, index) => index !== i));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h3 style={styles.title}>G.R.N (Goods Receipt Note)</h3>

        {/* PO LIST */}
        <div style={styles.box}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Select</th>
                <th style={styles.th}>S.No</th>
                <th style={styles.th}>PO No</th>
                <th style={styles.th}>PO Date</th>
                <th style={styles.th}>Supplier</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2].map((r, i) => (
                <tr key={i}>
                  <td style={styles.td}>
                    <input type="radio" />
                  </td>
                  <td style={styles.td}>{r}</td>
                  <td style={styles.td}>PONO00{r}</td>
                  <td style={styles.td}>20-05-2025</td>
                  <td style={styles.td}>Raneesh</td>
                  <td style={styles.td}>
                    <Printer size={16} />
                    
                    <Edit2 size={16} style={styles.actionIcon} />
                    <Trash2 size={16} style={{ ...styles.actionIcon, color: "red" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MATERIAL LIST */}
        <h4 style={styles.subTitle}>Material List</h4>
        <div style={styles.box}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                {[
                  "S.No",
                  "Code",
                  "Product",
                  "Unit",
                  "Order Qty",
                  "Previous Received Qty",
                  "Arrival Qty",
                  "Rejected Qty",
                  "Accepted Qty",
                  "Remark",
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
                  <td style={styles.td}>{row.code}</td>
                  <td style={styles.td}>{row.product}</td>
                  <td style={styles.td}>{row.unit}</td>
                  <td style={styles.td}>{row.orderQty}</td>
                  <td style={styles.td}>{row.prevQty}</td>

                  <td style={styles.td}>
                    <input
                      type="number"
                      style={styles.smallInput}
                      value={row.arrivalQty}
                      onChange={e =>
                        handleChange(i, "arrivalQty", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      type="number"
                      style={styles.smallInput}
                      value={row.rejectedQty}
                      onChange={e =>
                        handleChange(i, "rejectedQty", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      type="number"
                      style={styles.smallInput}
                      value={row.acceptedQty}
                      readOnly
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      placeholder="Remark"
                      style={styles.remarkInput}
                      value={row.remark}
                      onChange={e =>
                        handleChange(i, "remark", e.target.value)
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <Plus size={16} style={styles.actionIcon} onClick={addRow} />
                    <Edit2 size={16} />
                    <Trash2
                      size={16}
                      style={{ ...styles.actionIcon, color: "red" }}
                      onClick={() => deleteRow(i)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ADD ROW */}
          <div style={styles.rowFooter}>
            <button style={styles.addRowBtn}>+ Row</button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div style={styles.submitWrap}>
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

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5eaea",
    padding: "30px"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    maxWidth: "1200px",
    margin: "auto",
    marginBottom: "10px"
  },
  title: {
    marginBottom: "16px"
  },
  subTitle: {
    margin: "20px 0 10px",
    fontWeight: 600
  },
  box: {
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "16px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  thead: {
    background: "#FDE2E2"
  },
  th: {
    padding: "10px",
    fontSize: "13px",
    textAlign: "left",
    whiteSpace: "nowrap"
  },
  td: {
    padding: "10px",
    fontSize: "13px",
    verticalAlign: "middle"
  },
  smallInput: {
    width: "80px",
    height: "32px",
    padding: "4px 6px",
    borderRadius: "6px",
    border: "1px solid #D1D5DB"
  },
  remarkInput: {
    width: "140px",
    height: "32px",
    padding: "4px 6px",
    borderRadius: "6px",
    border: "1px solid #D1D5DB"
  },
  actionIcon: {
    cursor: "pointer",
    marginRight: "8px"
  },
  rowFooter: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px"
  },
  addRowBtn: {
    padding: "6px 14px",
    borderRadius: "6px",
    border: "1px solid #D1D5DB",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600
  },
  submitWrap: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "24px"
  },
  submit: {
    background: "#A63128",
    color: "#fff",
    border: "none",
    padding: "12px 44px",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer"
  }
};
