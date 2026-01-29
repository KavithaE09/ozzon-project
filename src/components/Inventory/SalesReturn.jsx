import { Plus,Pencil,Trash2, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";import { useNavigate } from 'react-router-dom';

export default function SalesReturn() {
  const navigate = useNavigate();
  const [editingRow, setEditingRow] = useState(null);
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

    const addRowAbove = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 0, { code: "", product: "", unit: "", qty: 0, rate: 0, disc: 0 });
    setRows(newRows);
  };
  const [form, setForm] = useState({
    salesDate: getTodayDate(),
    salesType: "",
    customer: "",
    cashAccount: "",
    salesAccount: "",
    billNo: "88447755127436",
    remarks: "kavitha",
    includingTax: false,
  voucherNo: "1234",
    customerBal: "₹ 1,00,000",
    salesBal: "₹ 1,00,000",
    gstin: "33ABCDE1234F2Z5",
  });

  // Add style tag for placeholder
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .dropdown-input::placeholder {
        font-size: 12px;
        color: #9CA3AF;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Dropdown states
  const [salesTypeSearch, setSalesTypeSearch] = useState('');
  const [isSalesTypeOpen, setIsSalesTypeOpen] = useState(false);
  const [hoveredSalesType, setHoveredSalesType] = useState(null);
  const salesTypeRef = useRef(null);

  const [customerSearch, setCustomerSearch] = useState('');
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [hoveredCustomer, setHoveredCustomer] = useState(null);
  const customerRef = useRef(null);

  const [cashAccountSearch, setCashAccountSearch] = useState('');
  const [isCashAccountOpen, setIsCashAccountOpen] = useState(false);
  const [hoveredCashAccount, setHoveredCashAccount] = useState(null);
  const cashAccountRef = useRef(null);

  const [salesAccountSearch, setSalesAccountSearch] = useState('');
  const [isSalesAccountOpen, setIsSalesAccountOpen] = useState(false);
  const [hoveredSalesAccount, setHoveredSalesAccount] = useState(null);
  const salesAccountRef = useRef(null);

  // Options
  const salesTypeOptions = ["Credit / Cash Purchase", "Credit", "Cash"];
  const customerOptions = ["Safi & Co", "Global Traders"];
  const cashAccountOptions = ["Cash", "Bank"];
  const salesAccountOptions = ["Material Sales Account", "Material Purchase Account"];

  // Filtered options
  const filteredSalesTypes = salesTypeOptions.filter(opt =>
    opt.toLowerCase().includes(salesTypeSearch.toLowerCase())
  );
  const filteredCustomers = customerOptions.filter(opt =>
    opt.toLowerCase().includes(customerSearch.toLowerCase())
  );
  const filteredCashAccounts = cashAccountOptions.filter(opt =>
    opt.toLowerCase().includes(cashAccountSearch.toLowerCase())
  );
  const filteredSalesAccounts = salesAccountOptions.filter(opt =>
    opt.toLowerCase().includes(salesAccountSearch.toLowerCase())
  );

  const [rows, setRows] = useState([
    {
      code: "101",
      product: "TCKU 1524662",
      unit: "Number",
      qty: 2,
      rate: 1000,
      disc: 10,
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (salesTypeRef.current && !salesTypeRef.current.contains(event.target)) {
        setIsSalesTypeOpen(false);
      }
      if (customerRef.current && !customerRef.current.contains(event.target)) {
        setIsCustomerOpen(false);
      }
      if (cashAccountRef.current && !cashAccountRef.current.contains(event.target)) {
        setIsCashAccountOpen(false);
      }
      if (salesAccountRef.current && !salesAccountRef.current.contains(event.target)) {
        setIsSalesAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [key]: value });
  };

  const updateRow = (index, key, value) => {
    const newRows = [...rows];
    newRows[index][key] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { code: "", product: "", unit: "", qty: 0, rate: 0, disc: 0 },
    ]);
  };

 const [charges, setCharges] = useState({
  weighing: "",
  freight: "",
  other: "",
  cgst2_5: "",
  sgst2_5: "",
  igst5: "",
  cgst6: "",
  sgst6: "",
  igst12: "",
  cgst9: "",
  sgst9: "",
  igst18: "",
  cgst14: "",
  sgst14: "",
  igst28: "",
});

const salesTotals = rows.reduce(
  (acc, row) => {
    const qty = Number(row.qty) || 0;
    const rate = Number(row.rate) || 0;
    const disc = Number(row.disc) || 0;

    const amount = qty * rate;
    const discAmount = (amount * disc) / 100;
    const taxable = amount - discAmount;

    const cgst = (taxable * 9) / 100;
    const sgst = (taxable * 9) / 100;

    acc.totalAmount += amount;
    acc.totalDiscount += discAmount;
    acc.taxableValue += taxable;
    acc.cgstTotal += cgst;
    acc.sgstTotal += sgst;

    return acc;
  },
  {
    totalAmount: 0,
    totalDiscount: 0,
    taxableValue: 0,
    cgstTotal: 0,
    sgstTotal: 0,
  }
);


const chargesTotal = Object.values(charges).reduce(
  (sum, val) => sum + (Number(val) || 0),
  0
);

const netAmount =
  salesTotals.taxableValue +
  salesTotals.cgstTotal +
  salesTotals.sgstTotal +
  chargesTotal;


  return (
    <div style={{ background: "#f6eaea", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: 24, marginBlockStart: 10,marginBottom:10 }}>
        <label style={{ fontSize: 20, fontWeight: 600 }}>Sales Return</label>

      <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 20 }}>
              <FloatingInput
                label="Sales Return Date"
                type="date"
                value={form.salesDate}
                onChange={handleChange("salesDate")}
              />
              
              <FloatingDropdown
                label="Sales Return Type"
                value={salesTypeSearch}
                setValue={setSalesTypeSearch}
                isOpen={isSalesTypeOpen}
                setIsOpen={setIsSalesTypeOpen}
                hovered={hoveredSalesType}
                setHovered={setHoveredSalesType}
                options={filteredSalesTypes}
                dropdownRef={salesTypeRef}
                onSelect={(option) => {
                  setForm({ ...form, salesType: option });
                  setSalesTypeSearch(option);
                  setIsSalesTypeOpen(false);
                }}
              />

              <FloatingDropdown
                label="Customer"
                value={customerSearch}
                setValue={setCustomerSearch}
                isOpen={isCustomerOpen}
                setIsOpen={setIsCustomerOpen}
                hovered={hoveredCustomer}
                setHovered={setHoveredCustomer}
                options={filteredCustomers}
                dropdownRef={customerRef}
                onSelect={(option) => {
                  setForm({ ...form, customer: option });
                  setCustomerSearch(option);
                  setIsCustomerOpen(false);
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              <FloatingDropdown
                label="Cash Account"
                value={cashAccountSearch}
                setValue={setCashAccountSearch}
                isOpen={isCashAccountOpen}
                setIsOpen={setIsCashAccountOpen}
                hovered={hoveredCashAccount}
                setHovered={setHoveredCashAccount}
                options={filteredCashAccounts}
                dropdownRef={cashAccountRef}
                onSelect={(option) => {
                  setForm({ ...form, cashAccount: option });
                  setCashAccountSearch(option);
                  setIsCashAccountOpen(false);
                }}
              />

              <FloatingDropdown
                label="Sales Return Account"
                value={salesAccountSearch}
                setValue={setSalesAccountSearch}
                isOpen={isSalesAccountOpen}
                setIsOpen={setIsSalesAccountOpen}
                hovered={hoveredSalesAccount}
                setHovered={setHoveredSalesAccount}
                options={filteredSalesAccounts}
                dropdownRef={salesAccountRef}
                onSelect={(option) => {
                  setForm({ ...form, salesAccount: option });
                  setSalesAccountSearch(option);
                  setIsSalesAccountOpen(false);
                }}
              />

              <FloatingInput
                label="Bill No"
                value={form.billNo}
                onChange={handleChange("billNo")}
              />
            </div>
          </div>

          <div style={infoBox}>
            <InfoRow label="Sales Return Voucher No : " value={form.voucherNo} />
            <InfoRow label="Customer Cur. Balance : " value={form.customerBal} />
            <InfoRow label="Sales A/c Cur. Balance : " value={form.salesBal} />
            <InfoRow label="GSTIN :" value={form.gstin} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", marginTop: 24 }}>
          <FloatingInput
            label="Remarks"
            value={form.remarks}
            onChange={handleChange("remarks")}
            width={975}
            multiline
          />
          <label style={taxWrap}>
            <input
              type="checkbox"
              checked={form.includingTax}
              onChange={handleChange("includingTax")}
            />
            <span style={{ marginLeft: 8 }}>Including Tax</span>
          </label>
        </div>

      <h3 style={{ marginTop: 32, fontSize: 15, fontWeight: 600 }}>
          Sales Return List
        </h3>

        <div style={{ overflowX: "auto", marginTop: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: '#fde2e2' }}>
                {[
                  "S.No",
                  "Code",
                  "Product",
                  "Unit",
                  "Qty",
                  "Rate",
                  "Amount",
                  "Disc %",
                  "Disc Amount",
                  "Taxable Value",
                  "CGST %",
                  "CGST Amount",
                  "SGST %",
                  "SGST Amount",
                  "Total Amount",
                  "Action",
                ].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => {
                const qty = Number(row.qty) || 0;
                const rate = Number(row.rate) || 0;
                const disc = Number(row.disc) || 0;

                const amount = qty * rate;
                const discAmount = (amount * disc) / 100;
                const taxable = amount - discAmount;

                const cgstPer = 9;
                const sgstPer = 9;

                const cgstAmt = (taxable * cgstPer) / 100;
                const sgstAmt = (taxable * sgstPer) / 100;

                const total = taxable + cgstAmt + sgstAmt;

                return (
                  <tr key={i}
                    style={{
                      backgroundColor: editingRow === i ? "white" : "transparent"
                    }}
                  >
                    <td style={td}>{i + 1}</td>

                    <td style={td}>
                      <input
                        value={row.code}
                        onChange={(e) => updateRow(i, "code", e.target.value)}
                        style={cellInput}
                      />
                    </td>

                    <td style={td}>
                      <input
                        value={row.product}
                        onChange={(e) => updateRow(i, "product", e.target.value)}
                        style={cellInput}
                      />
                    </td>

                    <td style={td}>
                      <input
                        value={row.unit}
                        onChange={(e) => updateRow(i, "unit", e.target.value)}
                        style={cellInput}
                      />
                    </td>

                    <td style={td}>
                      <input
                        type="number"
                        value={row.qty}
                        onChange={(e) => updateRow(i, "qty", e.target.value)}
                        style={cellInput}
                      />
                    </td>

                    <td style={td}>
                      <input
                        type="number"
                        value={row.rate}
                        onChange={(e) => updateRow(i, "rate", e.target.value)}
                        style={cellInput}
                      />
                    </td>

                    <td style={td}>₹ {amount.toLocaleString()}</td>

                    <td style={td}>
                      <input
                        type="number"
                        value={row.disc}
                        onChange={(e) => updateRow(i, "disc", e.target.value)}
                        style={cellInput}
                      />
                    </td>

                    <td style={td}>₹ {discAmount.toLocaleString()}</td>
                    <td style={td}>₹ {taxable.toLocaleString()}</td>

                    <td style={td}>{cgstPer}%</td>
                    <td style={td}>₹ {cgstAmt.toLocaleString()}</td>

                    <td style={td}>{sgstPer}%</td>
                    <td style={td}>₹ {sgstAmt.toLocaleString()}</td>

                    <td style={{ ...td, fontWeight: 600 }}>
                      ₹ {total.toLocaleString()}
                    </td>

                   <td style={td}>
                      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>

                        {/* ADD */}
                        <Plus
                          size={16}
                          style={{ cursor: "pointer", color: "#000000" }}
                          onClick={addRowAbove}
                        />

                        <Pencil
                          size={16}
                          style={{ cursor: "pointer", color: "#000000" }}
                          onClick={() => setEditingRow(i)}
                        />


                        {/* DELETE */}
                        <Trash2
                          size={16}
                          style={{ cursor: "pointer", color: "#DC2626" }}
                          onClick={() => {
                            const updated = rows.filter((_, index) => index !== i);
                            setRows(updated);
                          }}
                        />

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={addRow}
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
                gap: '8px',
              }}
            >
              <Plus size={18} /> Row
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 32,
            alignItems: "flex-start",
          }}
      >
          <div style={{ flex: 1 }}>
            <div style={chargesGrid}>
              <ChargeBox
                label="Weighing And Loading"
                value={charges.weighing}
                onChange={(e) =>
                  setCharges({ ...charges, weighing: e.target.value })
                }
              />

              <ChargeBox
                label="Freight Charges"
                value={charges.freight}
                onChange={(e) =>
                  setCharges({ ...charges, freight: e.target.value })
                }
              />

              <ChargeBox
                label="Other Charges"
                value={charges.other}
                onChange={(e) =>
                  setCharges({ ...charges, other: e.target.value })
                }
              />

              <ChargeBox
                label="CGST 2.5%"
                value={charges.cgst2_5}
                onChange={(e) =>
                  setCharges({ ...charges, cgst2_5: e.target.value })
                }
              />

              <ChargeBox
                label="SGST 2.5%"
                value={charges.sgst2_5}
                onChange={(e) =>
                  setCharges({ ...charges, sgst2_5: e.target.value })
                }
              />

              <ChargeBox
                label="IGST 5%"
                value={charges.igst5}
                onChange={(e) =>
                  setCharges({ ...charges, igst5: e.target.value })
                }
              />

              <ChargeBox
                label="CGST 6%"
                value={charges.cgst6}
                onChange={(e) =>
                  setCharges({ ...charges, cgst6: e.target.value })
                }
              />

              <ChargeBox
                label="SGST 6%"
                value={charges.sgst6}
                onChange={(e) =>
                  setCharges({ ...charges, sgst6: e.target.value })
                }
              />

              <ChargeBox
                label="IGST 12%"
                value={charges.igst12}
                onChange={(e) =>
                  setCharges({ ...charges, igst12: e.target.value })
                }
              />

              <ChargeBox
                label="CGST 9%"
                value={charges.cgst9}
                onChange={(e) =>
                  setCharges({ ...charges, cgst9: e.target.value })
                }
              />

              <ChargeBox
                label="SGST 9%"
                value={charges.sgst9}
                onChange={(e) =>
                  setCharges({ ...charges, sgst9: e.target.value })
                }
              />

              <ChargeBox
                label="IGST 18%"
                value={charges.igst18}
                onChange={(e) =>
                  setCharges({ ...charges, igst18: e.target.value })
                }
              />

              <ChargeBox
                label="CGST 14%"
                value={charges.cgst14}
                onChange={(e) =>
                  setCharges({ ...charges, cgst14: e.target.value })
                }
              />

              <ChargeBox
                label="SGST 14%"
                value={charges.sgst14}
                onChange={(e) =>
                  setCharges({ ...charges, sgst14: e.target.value })
                }
              />

              <ChargeBox
                label="IGST 28%"
                value={charges.igst28}
                onChange={(e) =>
                  setCharges({ ...charges, igst28: e.target.value })
                }
              />
            </div>
          </div>

        <div style={totalBox}>
          <TotalRow
              label="Total Amount"
              value={`₹ ${salesTotals.totalAmount.toLocaleString()}`}
            />

            <TotalRow
              label="Total Discount"
              value={`₹ ${salesTotals.totalDiscount.toLocaleString()}`}
            />

            <TotalRow
              label="Taxable Value Total"
              value={`₹ ${salesTotals.taxableValue.toLocaleString()}`}
            />

            <TotalRow
              label="CGST Total"
              value={`₹ ${salesTotals.cgstTotal.toLocaleString()}`}
            />

            <TotalRow
              label="SGST Total"
              value={`₹ ${salesTotals.sgstTotal.toLocaleString()}`}
            />

            <TotalRow
              label="Other Charges Total"
              value={`₹ ${chargesTotal.toLocaleString()}`}
            />

            <TotalRow
              label="Net Amount"
              value={`₹ ${netAmount.toLocaleString()}`}
              bold
            />

          </div>
        </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
          <button style={submitBtn}>
            <span>✓</span>Submit
          </button>
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
          cursor: 'pointer'
        }}
      >
        <span>←</span>
        <span>Back</span>
      </button>
    </div>
  );
}

const FloatingInput = ({
  label,
  value,
  onChange,
  width = 255,
  multiline = false
}) => (
  <div style={{ 
    width, 
    position: "relative",  
    border: "1px solid #9CA3AF",
    borderRadius: "4px",
    padding: "8px",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontFamily: "inherit",
    borderRight: '3px solid #DC2626'
  }}>
    {/* Label inside box */}
    <label style={{
      position: "absolute",
      top: "6px",      
      left: "8px",
      fontSize: "14px",
      color: "#374151",
      pointerEvents: "none"
    }}>
      {label}
    </label>

    {multiline ? (
      <textarea
        value={value}
        onChange={onChange}
        rows={3}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          resize: "none",
          paddingTop: "22px", 
          fontSize: "14px",
          lineHeight: "20px",
          height: "60px",
          overflowY: "auto",
          boxSizing: "border-box",
          fontFamily: "inherit"
        }}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          paddingTop: "22px",  
          fontSize: "14px",
          boxSizing: "border-box",
          fontFamily: "inherit"
        }}
      />
    )}
  </div>
);

const FloatingDropdown = ({
  label,
  value,
  setValue,
  isOpen,
  setIsOpen,
  hovered,
  setHovered,
  options,
  dropdownRef,
  onSelect,
  width = 255,
}) => (
  <div ref={dropdownRef} style={{ ...floatWrap, width, position: 'relative', zIndex: isOpen ? 1001 : 1 }}>
    <label style={{
      position: "absolute",
      top: 6,
      left: 12,
      fontSize: 16,
      fontWeight: 'bold',
      color: "#374151",
      background: "#fff",
      padding: "0 4px",
      pointerEvents: "none",
      zIndex: 10
    }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Type or select..."
        className="dropdown-input"
        style={{ 
          ...floatInput, 
          cursor: 'text'
        }}
      />
      <ChevronDown
        size={16}
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#6B7280',
          pointerEvents: 'none'
        }}
      />
    </div>
    {isOpen && (
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '0',
        right: '0',
        marginTop: '4px',
        backgroundColor: 'white',
        border: '1px solid #D1D5DB',
        borderRadius: '4px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxHeight: '200px',
        overflowY: 'auto',
        zIndex: 1000
      }}>
        {options.length > 0 ? (
          options.map((option, index) => (
            <div
              key={index}
              onClick={() => onSelect(option)}
              onMouseEnter={() => setHovered(option)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
                color: hovered === option ? 'white' : '#374151',
                backgroundColor: hovered === option ? '#A63128' : 'white',
                borderBottom: index < options.length - 1 ? '1px solid #E5E7EB' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {option}
            </div>
          ))
        ) : (
          <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>
            No matches found
          </div>
        )}
      </div>
    )}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div style={{ display: "flex", fontSize: 13 }}>
    <div style={{ width: 170, color: "#6b7280" }}>{label}</div>
    <div style={{ fontWeight: 500 }}>{value}</div>
  </div>
);

const ChargeBox = ({ label, value, onChange }) => (
  <div style={chargeInputWrap}>
    <label style={chargeLabel}>{label}</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      style={chargeInput}
    />
  </div>
);


const TotalRow = ({ label, value, bold }) => (
  <div style={totalRow}>
    <div>{label}</div>
    <div style={{ fontWeight: bold ? 600 : 500 }}>{value}</div>
  </div>);

const floatWrap = { position: "relative", width: 255 };

const floatLabel = {
  position: "absolute",
  top: 6,
  left: 12,
  fontSize: 16,
  fontWeight: 'bold',
  color: "#374151",
  background: "#fff",
  padding: "0 4px",
  pointerEvents: "none",
  zIndex: 10
};

const floatInput = {
  width: "100%",
  height: 59,
  padding: "22px 12px 0",
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #DC2626',
  borderRadius: 8,
  fontSize: 16,
  boxSizing: "border-box",
};

const infoBox = {
  width: 284,
  border: "1px solid #9CA3AF",
  borderRadius: 8,
  padding: 14,
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const taxWrap = {
  marginLeft: 20,
  display: "flex",
  alignItems: "center",
  fontSize: 16,
};

const th = {
  border: "1px solid #9CA3AF",
  padding: 8,
  fontSize: 13,
  textAlign: "left",
  whiteSpace: "nowrap",
};

const td = {
  border: "1px solid #9CA3AF",
  padding: 6,
  fontSize: 13,
  whiteSpace: "nowrap",
};

const cellInput = {
  width: "100%",
  height: 27,
  lineHeight: "27px",
  border: "1px solid #9CA3AF",
  borderRadius: 4,
  padding: "0 6px",
  fontSize: 13,
  boxSizing: "border-box",
};

const chargesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,};

const totalBox = {
  width: 300,
  border: "1px solid #9CA3AF",
  borderRadius: 8,
  padding: 16,
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  fontSize: 16,
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
};

const submitBtn = {
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
  gap: '8px',
};

const chargeInputWrap = {
  position: "relative",
  width: 255,
};

const chargeLabel = {
  position: "absolute",
  top: 6,
  left: 12,
  fontSize: 16,
  color: "#6b7280",
  background: "#fff",
  padding: "0 4px",
  pointerEvents: "none",
};

const chargeInput = {
  width: "100%",
  height: 59,
  padding: "22px 12px 0",
  border: "1px solid #9CA3AF",
  borderRadius: 8,
  fontSize: 16,
  boxSizing: "border-box",
  background: "#fff",
};
