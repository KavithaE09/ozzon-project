import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  /* ===== BANK DETAILS ===== */
  const [bankDetails, setBankDetails] = useState([
    { label: 'BANK NAME', value: 'ICICI BANK' },
    { label: 'BRANCH', value: 'KURINJI NAGAR' },
    { label: 'A/C NO', value: '254005005364' },
    { label: 'IFSC', value: 'ICIC0002540' },
    { label: 'GSTIN No.', value: '33AFLPV1525R1ZT' },
    { label: 'PAN No.', value: 'AFLPV1525R' }
  ]);

  /* ===== PREFIX DETAILS ===== */
  const [financialYear, setFinancialYear] = useState('25-26');
  const [quotationPrefix, setQuotationPrefix] = useState('OQ');
  const [proformaPrefix, setProformaPrefix] = useState('Raneesh');
  const [invoicePrefix, setInvoicePrefix] = useState('Raneesh');

  const [container, setContainer] = useState('1');
  const [containerblock, setContainerblock] = useState('1');
  const [containerfabric, setContainerfabric] = useState('1');

  /* ===== IMAGE STATES ===== */
  const [companyLogo, setCompanyLogo] = useState([]);
  const [companyLogoPreviews, setCompanyLogoPreviews] = useState([]);
  const [authorizedSign, setAuthorizedSign] = useState([]);
  const [authorizedSignPreviews, setAuthorizedSignPreviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [terms, setTerms] = useState(`1. This rate is valid for 2 weeks from the quotation date.
2. Delivery: Fabrication will take a minimum of 21 days to complete.
3. Payment Mode: 60% in advance & balance 40% on completion and before loading.
4. Transportation & Unloading: To be arranged by the customer at site.
5. Buy Back: Seller has a buy-back policy once the container is used.
6. Warranty: Six months from the date of delivery.
7. Transit Insurance: Transit insurance can be arranged on request and will be billed separately.`);

  return (
    <div className="page-container">
      <div className="main-section">
        <div className="content-card">
          <h3 className="page-title">Settings</h3>

          <div className="flex gap-5 mb-5 flex-col lg:flex-row">


            <div className="flex-[1.4] filter-grid-gray">
              <div className="section-title">Bank Details</div>

              <div className="grid gap-1.5">
                {bankDetails.map((item, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <span className="w-[120px] font-medium filter-label">{item.label}</span>
                    <span className="w-2.5">:</span>
                    <input
                      value={item.value}
                      onChange={(e) => {
                        const updated = [...bankDetails];
                        updated[i].value = e.target.value;
                        setBankDetails(updated);
                      }}
                      className="filter-input flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>


            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput label="Financial Year" value={financialYear} setValue={setFinancialYear} />
              <FloatingInput label="Quotation Prefix" value={quotationPrefix} setValue={setQuotationPrefix} />
              <FloatingInput label="Proforma Invoice Prefix" value={proformaPrefix} setValue={setProformaPrefix} />
              <FloatingInput label="Invoice Prefix" value={invoicePrefix} setValue={setInvoicePrefix} />
            </div>
          </div>


          <div className="filter-grid-gray mb-5">
            <div className="section-title">Terms And Conditions</div>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="multiline-field w-full min-h-[150px]"
              rows={8}
            />
          </div>


          <div className="filter-grid-gray">
            <div className="section-title">Logo Upload & Container Settings</div>

            <div className="flex gap-6 mb-5 flex-col md:flex-row">
              <UploadField 
                label="Company Logo"
                images={companyLogo}
                setImages={setCompanyLogo}
                imagePreviews={companyLogoPreviews}
                setImagePreviews={setCompanyLogoPreviews}
                setSelectedImage={setSelectedImage}
              />
              <UploadField 
                label="Authorized Sign"
                images={authorizedSign}
                setImages={setAuthorizedSign}
                imagePreviews={authorizedSignPreviews}
                setImagePreviews={setAuthorizedSignPreviews}
                setSelectedImage={setSelectedImage}
              />
            </div>

            {/* CONTAINER FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FloatingInput label="Container Hold Hours" value={container} setValue={setContainer} />
              <FloatingInput label="Container Block Days for Empty" value={containerblock} setValue={setContainerblock} />
              <FloatingInput label="Container Block Days for Fabric" value={containerfabric} setValue={setContainerfabric} />
            </div>
          </div>

          {/* ===== SAVE BUTTON ===== */}
          <div className="btn-container">
            <button className="btn-search">
              Save
            </button>
          </div>

        </div>

        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)}
          className="btn-back"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content">
            <img
              src={selectedImage}
              alt="Full view"
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
    </div>
  );
} 

const FloatingInput = ({ label, value, setValue }) => (
  <div className="filter-grid-gray">
    <label className="filter-label">
      {label}
    </label>
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      className="filter-input"
    />
  </div>
);

const UploadField = ({ label, images, setImages, imagePreviews, setImagePreviews, setSelectedImage }) => {
  
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1">
      <label className="filter-label">{label}</label>
      <input 
        type="file" 
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files);
          const newPreviews = files.map(file => URL.createObjectURL(file));
          setImages(prev => [...prev, ...files]);
          setImagePreviews(prev => [...prev, ...newPreviews]);
          e.target.value = null;
        }}
        className="file-input w-full"
      />

      {imagePreviews && imagePreviews.length > 0 && (
        <div className="image-preview-container">
          {imagePreviews.map((img, index) => (
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
  );
};