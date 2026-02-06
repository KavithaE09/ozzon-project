import { Home, Building2, List, ClipboardList, ChevronRight, CheckCircle, BarChart3, ShoppingCart, BriefcaseBusiness, Users, Shield, UserCog,Building, Target, Activity, TrendingUp, FileText, Settings as SettingsIcon, Package, Layers, Ruler, Briefcase, UserCheck, MapPin, Award, FileSpreadsheet,FolderOpen, TrendingDown, Box, ClipboardCheck, Truck, FileCheck, Archive, RotateCcw, Send, ArrowDownToLine, DollarSign, Receipt, PenTool, RefreshCcw, Container
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Sidebar({ open, onNavigate }) {
  const isDark = document.documentElement.classList.contains("dark");
  const location = useLocation();
  const [active, setActive] = useState("Dashboard");
  const [leadOpen, setLeadOpen] = useState(false);
  const [formsOpen, setFormsOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    
    setFormsOpen(false);
    setSalesOpen(false);
    setAccountsOpen(false);
    setPurchaseOpen(false);
    setInventoryOpen(false);
    setApprovalOpen(false);
    setJobOpen(false);
    setLeadOpen(false);

    // Dashboard
    if (path === "/layout" || path === "/layout/") {
      setActive("Dashboard");
    }
    
    // Approval routes 
    else if (path.includes("/quotationapproval")) {
      setActive("QuotationApproval");
      setApprovalOpen(true);
    } 
    else if (path.includes("/proformainvoiceapproval")) {
      setActive("ProformaInvoiceApproval");
      setApprovalOpen(true);
    } 
    else if (path.includes("/containerholdrequestapproval")) {
      setActive("ContainerHoldRequestApprovalForm");
      setApprovalOpen(true);
    } 
    else if (path.includes("/containerblockrequestapproval")) {
      setActive("ContainerBlockApproval");
      setApprovalOpen(true);
    } 
    else if (path.includes("/joborderacceptance")) {
      setActive("JobOrderAcceptance");
      setApprovalOpen(true);
    }
    
    // Purchase routes
    else if (path.includes("/containermaster")) {
      setActive("ContainerMaster");
      setPurchaseOpen(true);
    } 
    else if (path.includes("/purchasemaster")) {
      setActive("PurchaseMaster");
      setPurchaseOpen(true);
    } 
   
    else if (path.includes("/containerstatusupdateform")) {
      setActive("ContainerStatusUpdateForm");
      setSalesOpen(true);
    }
    else if (path.includes("/containerstatus")) {
      setActive("ContainerStatus");
      setPurchaseOpen(true);
    }

    // Inventory routes 
    else if (path.includes("/purchasereturn") && path.includes("search")) {
      setActive("PurchaseReturnSearch");
      setInventoryOpen(true);
    }
    else if (path.includes("/purchasereturn")) {
      setActive("PurchaseReturn");
      setInventoryOpen(true);
    }
    else if (path.includes("/purchaseorder")) {
      setActive("PurchaseOrder");
      setInventoryOpen(true);
    } 
    else if (path.includes("/purchasesearch")) {
      setActive("PurchaseSearch");
      setInventoryOpen(true);
    } 
    else if (path.includes("/goodsreceiptnote")) {
      setActive("GoodsReceiptNote");
      setInventoryOpen(true);
    } 
    else if (path.includes("/purchase")) {
      setActive("Purchase");
      setInventoryOpen(true);
    } 
    else if (path.includes("/stockissuereturn")) {
      setActive("StockIssueReturn");
      setInventoryOpen(true);
    } 
    else if (path.includes("/stockissue")) {
      setActive("StockIssue");
      setInventoryOpen(true);
    }
    else if (path.includes("/salessearch")) {
      setActive("SalesSearch");
      setInventoryOpen(true);
    } 
    else if (path.includes("/salesreturnsearch")) {
      setActive("SalesReturnSearch");
      setInventoryOpen(true);
    }

    // Master Forms routes
    else if (path.includes("/usermaster")) {
      setActive("UserMaster");
      setFormsOpen(true);
    } 
    else if (path.includes("/userrolesettings")) {
      setActive("UserRoleSettings");
      setFormsOpen(true);
    } 
    else if (path.includes("/departmentmaster")) {
      setActive("DepartmentMaster");
      setFormsOpen(true);
    } 
    else if (path.includes("/templategroup")) {
      setActive("TemplateGroup");
      setFormsOpen(true);
    } 
    else if (path.includes("/templatespecification")) {
      setActive("TemplateSpecification");
      setFormsOpen(true);
    } 
    else if (path.includes("/materialgroup")) {
      setActive("MaterialGroup");
      setFormsOpen(true);
    } 
    else if (path.includes("/materiallist")) {
      setActive("MaterialList");
      setFormsOpen(true);
    } 
    else if (path.includes("/leadstatusmaster")) {
      setActive("LeadStatusMaster");
      setFormsOpen(true);
    } 
    else if (path.includes("/unitmaster")) {
      setActive("UnitMaster");
      setFormsOpen(true);
    }
    else if (path.includes("/assignlabour")) {
      setActive("AssignLabour");
      setFormsOpen(true);
    } 
    else if (path.includes("/leadsourcemaster")) {
      setActive("LeadSourceMaster");
      setFormsOpen(true);
    } 
    else if (path.includes("/templatesettings")) {
      setActive("TemplateSettings");
      setFormsOpen(true);
    } 
    else if (path.includes("/rolemaster")) {
      setActive("RoleMaster");
      setFormsOpen(true);
    } 
    else if (path.includes("/grade")) {
      setActive("Grade");
      setFormsOpen(true);
    } 
    else if (path.includes("/groupunder")) {
      setActive("GroupUnder");
      setFormsOpen(true);
    } 
    else if (path.includes("/group")) {
      setActive("Group");
      setFormsOpen(true);
    } 
    else if (path.includes("/settings")) {
      setActive("Settings");
      setFormsOpen(true);
    } 
    else if (path.includes("/sizetype")) {
      setActive("SizeType");
      setFormsOpen(true);
    } 
    else if (path.includes("/supervisor")) {
      setActive("Supervisor");
      setFormsOpen(true);
    } 
    else if (path.includes("/yard")) {
      setActive("Yard");
      setFormsOpen(true);
    } 
    else if (path.includes("/leadowner")) {
      setActive("LeadOwner");
      setFormsOpen(true);
    } 
    else if (path.includes("/receiver")) {
      setActive("Receiver");
      setFormsOpen(true);
    }

    // Sales routes
    else if (path.includes("/lead")) {
      setActive("Lead");
      setSalesOpen(true);
    }
    else if (path.includes("/containerpurchase")) {
      setActive("ContainerPurchase");
      setSalesOpen(true);
    }
    else if (path.includes("/followup")) {
      setActive("FollowUp");
      setSalesOpen(true);
    }
    else if (path.includes("/quotation")) {
      setActive("Quotation");
      setSalesOpen(true);
    }
    else if (path.includes("/proformainvoice")) {
      setActive("ProformaInvoice");
      setSalesOpen(true);
    } 

    // Account routes
    else if (path.includes("/ledgermastergroupform")) {
      setActive("LedgerMasterGroupForm");
      setAccountsOpen(true);
    }
    else if (path.includes("/accounts/ledgermasterform")) {
      setActive("LedgerMasterForm");
      setAccountsOpen(true);
    }
    else if (path.includes("/advancereceipt")) {
      setActive("AdvanceReceipt");
      setAccountsOpen(true);
    }

    // Production routes
    else if (path.includes("/assignjob")) {
      setActive("AssignJob");
      setJobOpen(true);
    } 
    else if (path.includes("/assigntask")) {
      setActive("AssignTask");
      setJobOpen(true);
    } 
    else if (path.includes("/taskcompletion")) {
      setActive("TaskCompletion");
      setJobOpen(true);
    } 
    else if (path.includes("/joborderstatus")) {
      setActive("JobOrderStatus");
      setJobOpen(true);
    }

  }, [location.pathname]);

  const handleClick = (itemName, navigateKey) => {
    setActive(itemName);
    onNavigate && onNavigate(navigateKey || itemName);
  };

  return (
    <aside
      className={`sidebar ${open ? "sidebar-open" : "sidebar-closed"}`}
    >
      {open && (
        <div
          className="w-full h-full flex flex-col overflow-y-auto sidebar-scroll"
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
            paddingLeft: "20px",
            paddingRight: "12px",
          }}
        >
          <style>{`
            .sidebar-scroll::-webkit-scrollbar {
              display: none;
            }
            .sidebar-scroll {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }

            /* Hover lift animation */
            @keyframes float {
              0% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-4px);
              }
              100% {
                transform: translateY(-3px);
              }
            }

            .btn-hover-lift {
              transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
            }

            .btn-hover-lift:hover {
              animation: float 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              box-shadow: ${isDark 
                ? '0 6px 16px rgba(0, 0, 0, 0.4)' 
                : '0 6px 16px rgba(166, 48, 40, 0.25)'};
            }

            .btn-hover-lift:active {
              transform: translateY(-1px);
            }
          `}</style>

          {/* DASHBOARD */}
          <MainButton
            label="Dashboard"
            icon={<Home size={22} />}
            active={active === "Dashboard"}
            isDark={isDark}
            onClick={() => {
              setActive("Dashboard");
              setLeadOpen(false);
              setFormsOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
              onNavigate && onNavigate("Dashboard");
            }}
          />

          {/* MASTER FORMS */}
          <MainButton
            label="Master Forms"
            icon={<List size={22} />}
            active={formsOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={formsOpen}
            onClick={() => {
              setFormsOpen(!formsOpen);
              setLeadOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
            }}
          />
          {formsOpen && (
            <>
              <SubButton label="Role Master" icon={<Shield size={18} />} active={active === "RoleMaster"} isDark={isDark} onClick={() => handleClick("RoleMaster")} />
              <SubButton label="User Role Settings" icon={<UserCog size={18} />} active={active === "UserRoleSettings"} isDark={isDark} onClick={() => handleClick("UserRoleSettings")} />
              <SubButton label="User Master" icon={<Users size={18} />} active={active === "UserMaster"} isDark={isDark} onClick={() => handleClick("UserMaster")} />
              <SubButton label="Department Master" icon={<Building size={18} />} active={active === "DepartmentMaster"} isDark={isDark} onClick={() => handleClick("DepartmentMaster")} />
              <SubButton label="Lead Owner" icon={<UserCheck size={18} />} active={active === "LeadOwner"} isDark={isDark} onClick={() => handleClick("LeadOwner")} />
              <SubButton label="Lead Status Master" icon={<Activity size={18} />} active={active === "LeadStatusMaster"} isDark={isDark} onClick={() => handleClick("LeadStatusMaster")} />
              <SubButton label="Lead Source Master" icon={<TrendingUp size={18} />} active={active === "LeadSourceMaster"} isDark={isDark} onClick={() => handleClick("LeadSourceMaster")} />
              <SubButton label="Size Type" icon={<Ruler size={18} />} active={active === "SizeType"} isDark={isDark} onClick={() => handleClick("SizeType")} />
              <SubButton label="Template Group" icon={<FolderOpen size={18} />} active={active === "TemplateGroup"} isDark={isDark} onClick={() => handleClick("TemplateGroup")} />
              <SubButton label="Template Specification" icon={<FileText size={18} style={{marginLeft: "-7px"}} />} active={active === "TemplateSpecification"} isDark={isDark} onClick={() => handleClick("TemplateSpecification")} />
              <SubButton label="Template Settings" icon={<SettingsIcon size={18} />} active={active === "TemplateSettings"} isDark={isDark} onClick={() => handleClick("TemplateSettings")} />
              <SubButton label="Material Group" icon={<Layers size={18} />} active={active === "MaterialGroup"} isDark={isDark} onClick={() => handleClick("MaterialGroup")} />
              <SubButton label="Material List" icon={<Package size={18} />} active={active === "MaterialList"} isDark={isDark} onClick={() => handleClick("MaterialList")} />
              <SubButton label="Unit Master" icon={<Box size={18} />} active={active === "UnitMaster"} isDark={isDark} onClick={() => handleClick("UnitMaster")} />
              <SubButton label="Assign Labour" icon={<UserCheck size={18} />} active={active === "AssignLabour"} isDark={isDark} onClick={() => handleClick("AssignLabour")} />
              <SubButton label="Supervisor" icon={<Briefcase size={18} />} active={active === "Supervisor"} isDark={isDark} onClick={() => handleClick("Supervisor")} />
              <SubButton label="Receiver/Giver" icon={<Users size={18} />} active={active === "Receiver"} isDark={isDark} onClick={() => handleClick("Receiver")} />
              <SubButton label="Yard" icon={<MapPin size={18} />} active={active === "Yard"} isDark={isDark} onClick={() => handleClick("Yard")} />
              <SubButton label="Grade" icon={<Award size={18} />} active={active === "Grade"} isDark={isDark} onClick={() => handleClick("Grade")} />
              <SubButton label="Settings" icon={<SettingsIcon size={18} />} active={active === "Settings"} isDark={isDark} onClick={() => handleClick("Settings")} />
            </>
          )}

          {/* SALES */}
          <MainButton
            label="Sales"
            icon={<BarChart3 size={22} />}
            active={salesOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={salesOpen}
            onClick={() => {
              setSalesOpen(!salesOpen);
              setLeadOpen(false);
              setFormsOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
            }}
          />
          {salesOpen && (
            <>
              <SubButton label="Container Purchase" icon={<Container size={18} />} active={active === "ContainerPurchase"} isDark={isDark} onClick={() => handleClick("ContainerPurchase", "ContainerPurchase")} />
              <SubButton label="Lead" icon={<Target size={18} />} active={active === "Lead"} isDark={isDark} onClick={() => handleClick("Lead")} />
              <SubButton label="Follow Up" icon={<ClipboardCheck size={18} />} active={active === "FollowUp"} isDark={isDark} onClick={() => handleClick("FollowUp")} />
              <SubButton label="Quotation" icon={<FileSpreadsheet size={18} />} active={active === "Quotation"} isDark={isDark} onClick={() => handleClick("Quotation", "QuotationSearch")} />
              <SubButton label="Proforma Invoice" icon={<FileText size={18} />} active={active === "ProformaInvoice"} isDark={isDark} onClick={() => handleClick("ProformaInvoice", "ProformaInvoiceSearch")} />
              <SubButton label="Container Status " icon={<RefreshCcw size={18} />} active={active === "ContainerStatusUpdateForm"} isDark={isDark} onClick={() => handleClick("ContainerStatusUpdateForm", "ContainerStatusUpdateForm")} />
            </>
          )}

          {/* ACCOUNTS */}
          <MainButton
            label="Accounts"
            icon={<ClipboardList size={22} />}
            active={accountsOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={accountsOpen}
            onClick={() => {
              setAccountsOpen(!accountsOpen)
              setSalesOpen(false);
              setLeadOpen(false);
              setFormsOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setInventoryOpen(false);
            }}
          />
          {accountsOpen && (
            <>
              <SubButton label="Account Group " icon={<FolderOpen size={18} />} active={active === "LedgerMasterGroupForm"} isDark={isDark} onClick={() => handleClick("LedgerMasterGroupForm")} />
              <SubButton label="Ledger Master " icon={<FileText size={18} />} active={active === "LedgerMasterForm"} isDark={isDark} onClick={() => handleClick("LedgerMasterForm", "LedgerMasterForm_Accounts")} />
              <SubButton label="Advance Receipt" icon={<Receipt size={18} />} active={active === "AdvanceReceipt"} isDark={isDark} onClick={() => handleClick("AdvanceReceipt")} />
            </>
          )}

          {/* PURCHASE */}
          <MainButton
            label="Purchase"
            icon={<ShoppingCart size={22} />}
            active={purchaseOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={purchaseOpen}
            onClick={() => {
              setPurchaseOpen(!purchaseOpen);
              setLeadOpen(false);
              setFormsOpen(false);
              setSalesOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
            }}
          />
          {purchaseOpen && (
            <>
              <SubButton label="Container Master" icon={<Container size={18} />} active={active === "ContainerMaster"} isDark={isDark} onClick={() => handleClick("ContainerMaster")} />
              <SubButton label="Purchase Order" icon={<FileCheck size={18} />} active={active === "PurchaseMaster"} isDark={isDark} onClick={() => handleClick("PurchaseMaster", "PurchaseMaster")} />
              <SubButton label="Container Purchase" icon={<ShoppingCart size={18} />} active={active === "ContainerPurchase"} isDark={isDark} onClick={() => handleClick("ContainerPurchase", "ContainerPurchase")} />
              <SubButton label="Container Status" icon={<Activity size={18} />} active={active === "ContainerStatus"} isDark={isDark} onClick={() => handleClick("ContainerStatus", "ContainerStatus")} />
            </>
          )}

          {/* PRODUCTION */}
          <MainButton
            label="Production"
            icon={<BriefcaseBusiness size={22} />}
            active={jobOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={jobOpen}
            onClick={() => {
              setJobOpen(!jobOpen);
              setLeadOpen(false);
              setFormsOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
            }}
          />
          {jobOpen && (
            <>
              <SubButton label="Assign Job" icon={<ClipboardCheck size={18} />} active={active === "AssignJob"} isDark={isDark} onClick={() => handleClick("AssignJob", "AssignJob")} />
              <SubButton label="Assign Task" icon={<PenTool size={18} />} active={active === "AssignTask"} isDark={isDark} onClick={() => handleClick("AssignTask", "AssignTask")} />
              <SubButton label="Task Completion" icon={<CheckCircle size={18} />} active={active === "TaskCompletion"} isDark={isDark} onClick={() => handleClick("TaskCompletion", "TaskCompletion")} />
              <SubButton label="Job Order Status" icon={<Activity size={18} />} active={active === "JobOrderStatus"} isDark={isDark} onClick={() => handleClick("JobOrderStatus", "JobOrderStatus")} />
            </>
          )}

          {/* INVENTORY */}
          <MainButton
            label="Inventory"
            icon={<Building2 size={22} />}
            active={inventoryOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={inventoryOpen}
            onClick={() => {
              setInventoryOpen(!inventoryOpen);
              setFormsOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
            }}
          />
          {inventoryOpen && (
            <>
              <SubButton label="Purchase Order" icon={<FileCheck size={18} />} active={active === "PurchaseOrder"} isDark={isDark} onClick={() => handleClick("PurchaseOrder", "PurchaseOrder")} />
              <SubButton label="Goods Receipt Note" icon={<ArrowDownToLine size={18} />} active={active === "GoodsReceiptNote"} isDark={isDark} onClick={() => handleClick("GoodsReceiptNote", "GoodsReceiptNote")} />
              <SubButton label="Purchase" icon={<ShoppingCart size={18} />} active={active === "PurchaseSearch"} isDark={isDark} onClick={() => handleClick("PurchaseSearch", "PurchaseSearch")} />
              <SubButton label="Purchase Return" icon={<RotateCcw size={18} />} active={active === "PurchaseReturnSearch"} isDark={isDark} onClick={() => handleClick("PurchaseReturnSearch", "PurchaseReturnSearch")} />
              <SubButton label="Stock Issue" icon={<Send size={18} />} active={active === "StockIssue"} isDark={isDark} onClick={() => handleClick("StockIssue", "StockIssue")} />
              <SubButton label="Stock Issue Return" icon={<RotateCcw size={18} />} active={active === "StockIssueReturn"} isDark={isDark} onClick={() => handleClick("StockIssueReturn", "StockIssueReturn")} />
              <SubButton label="Sales" icon={<DollarSign size={18} />} active={active === "SalesSearch"} isDark={isDark} onClick={() => handleClick("SalesSearch", "SalesSearch")} />
              <SubButton label="Sales Return" icon={<TrendingDown size={18} />} active={active === "SalesReturnSearch"} isDark={isDark} onClick={() => handleClick("SalesReturnSearch", "SalesReturnSearch")} />
            </>
          )}

          {/* APPROVAL */}
          <MainButton
            label="Approval"
            icon={<CheckCircle size={22} />}
            active={approvalOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={approvalOpen}
            onClick={() => {
              setApprovalOpen(!approvalOpen);
              setLeadOpen(false);
              setFormsOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
            }}
          />
          {approvalOpen && (
            <>
              <SubButton label="Quotation " icon={<FileCheck size={18} />} active={active === "QuotationApproval"} isDark={isDark} onClick={() => handleClick("QuotationApproval", "QuotationApproval")} />
              <SubButton label="Proforma Invoice " icon={<FileCheck size={18} />} active={active === "ProformaInvoiceApproval"} isDark={isDark} onClick={() => handleClick("ProformaInvoiceApproval", "ProformaInvoiceApproval")} />
              <SubButton label="Container Hold Request " icon={<Archive size={18} />} active={active === "ContainerHoldRequestApprovalForm"} isDark={isDark} onClick={() => handleClick("ContainerHoldRequestApprovalForm", "ContainerHoldRequestApprovalForm")} />
              <SubButton label="Container Block Request" icon={<Archive size={18} />} active={active === "ContainerBlockApproval"} isDark={isDark} onClick={() => handleClick("ContainerBlockRequestApprovalForm", "ContainerBlockRequestApprovalForm")} />
              <SubButton label="Job Order Acceptance" icon={<CheckCircle size={18} />} active={active === "JobOrderAcceptance"} isDark={isDark} onClick={() => handleClick("JobOrderAcceptance", "JobOrderAcceptance")} />
            </>
          )}
        </div>
      )}
    </aside>
  );
}

function MainButton({ label, icon, active, onClick, hasArrow, arrowOpen, isDark }) {
  const [hover, setHover] = useState(false);

  const getBackgroundColor = () => {
    if (isDark) {
      if (active) return "#0F172A";
      if (hover) return "#1E3A5F"; // Blue tint on hover
      return "#374151";
    } else {
      if (active) return "#feecec";
      if (hover) return "#8B2820"; // Darker red on hover
      return "";
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: getBackgroundColor(),
        color: isDark
          ? active
            ? "#3B82F6"
            : "#E5E7EB"
          : active
            ? "#A63028"
            : "#feecec",
        width: "205px",
        height: "45px",
        border: isDark ? "1px solid #475569" : "none",
        marginBottom: "8px",
        paddingLeft: "16px",
        paddingRight: "12px",
        flexShrink: 0,
        cursor: "pointer",
        opacity: active ? 1 : 0.85,
      }}
      className="btn-hover-lift flex items-center justify-between rounded-[12px] font-poppins font-semibold text-[14px]"
    >
      <div className="flex items-center gap-[12px]">
        {icon}
        {label}
      </div>

      {hasArrow && (
        <ChevronRight
          size={18}
          style={{
            transition: "transform 0.2s ease",
            transform: arrowOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      )}
    </button>
  );
}

function SubButton({ label, icon, active, onClick, isDark }) {
  const [hover, setHover] = useState(false);

  const getBackgroundColor = () => {
    if (isDark) {
      if (active) return "#0F172A";
      if (hover) return "#1E3A5F"; // Blue tint on hover
      return "#334155";
    } else {
      if (active) return "#feecec";
      if (hover) return "#8B2820"; // Darker red on hover
      return "";
    }
  };

  const textColor = isDark
    ? active
      ? "#3B82F6"
      : "#E5E7EB"
    : active
      ? "#A63028"
      : "#feecec";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: getBackgroundColor(),
        width: "180px",
        height: "45px",
        border: isDark ? "1px solid #475569" : "none",
        color: textColor,
        marginBottom: "8px",
        marginLeft: "20px",
        paddingLeft: "16px",
        paddingRight: "12px",
        flexShrink: 0,
        cursor: "pointer",
      }}
      className="btn-hover-lift flex items-center gap-[10px] rounded-[10px] font-poppins text-[12px]"
    > 
      {icon}
      {label}
    </button>
  );
}