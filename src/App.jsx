import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./components/Admin";
import UserRoleSettings from "./components/MasterForms/UserRoleSettings";
import ContainerMaster from "./components/MasterForms/ContainerMaster";
import DepartmentMaster from "./components/MasterForms/DepartmentMaster";
import LedgerMasterForm from "./components/MasterForms/LedgerMasterForm";
import LedgerMasterGroupForm from "./components/MasterForms/LedgerMasterGroupForm";
import MaterialGroup from "./components/MasterForms/MaterialGroup";
import TemplateGroup from "./components/MasterForms/TemplateGroup";
import QuotationSearchForm from "./components/Quotation/QuotationSearchForm";
import QuotationForm from "./components/Quotation/QuotationForm";
import LeadSearch from "./components/Lead/LeadSearch";
import LeadCreationForm from "./components/Lead/LeadCreationForm";
import ContainerHoldRequestForm from "./components/Hold/ContainerHoldRequestForm";
import ProformaInvoiceSearch from "./components/ProformaInvoice/ProformaInvoiceSearch";
import PartyAdvanceForm from "./components/Advance/PartyAdvanceForm";
import ContainerBlockRequestForm from "./components/Block/ContainerBlockRequestForm";
import ProformaInvoiceForm from "./components/ProformaInvoice/ProformaInvoiceForm";
import ContainerBlockRequestApprovalForm from "./components/Block/ContainerBlockRequestApprovalForm";
import ContainerStatusApprovalForm from "./components/Status/ContainerStatusApprovalForm";
import ContainerStatusUpdateForm from "./components/Status/ContainerStatusUpdateForm";
import ContainerHoldRequestApprovalForm from "./components/Hold/ContainerHoldRequestApprovalForm";
import TemplateSpecification from "./components/MasterForms/TemplateSpecification";
import LeadSource from "./components/MasterForms/LeadSourceMaster";
import LeadStatusMaster from "./components/MasterForms/LeadStatusMaster";
import Sales from "./components/Inventory/Sales";
import SalesSearch from "./components/Inventory/SalesSearch";
import SalesReturn from "./components/Inventory/SalesReturn";
import SalesReturnSearch from "./components/Inventory/SalesReturnSearch";
import Purchase from "./components/Inventory/Purchase";
import PurchaseSearch from "./components/Inventory/PurchaseSearch";
import PurchaseReturn from "./components/Inventory/PurchaseReturn";
import PurchaseReturnSearch from "./components/Inventory/PurchaseReturnSearch";
import MaterialList from "./components/MasterForms/MaterialList";
import TemplateSettings from "./components/MasterForms/TemplateSettings";
import RoleMaster from "./components/MasterForms/RoleMaster";
import UserMaster from "./components/MasterForms/UserMaster";
import ContainerPurchase from "./components/Purchase/ContainerPurchase";
import QuotationApproval from "./components/Quotation/QuotationApproval";
import ProformaInvoiceApproval from "./components/ProformaInvoice/ProformaInvoiceApproval";
import UnitMaster from "./components/MasterForms/UnitMaster";
import PurchaseMaster from "./components/Purchase/PurchaseMaster";
import ContainerStatus from "./components/MasterForms/ContainerStatus";

import Grade from "./components/MasterForms/Grade";
import Group from "./components/MasterForms/Group";
import GroupUnder from "./components/MasterForms/GroupUnder";
import Settings from "./components/MasterForms/Settings";
import SizeType from "./components/MasterForms/SizeType";

import Supervisor from "./components/MasterForms/Supervisor";
import Yard from "./components/MasterForms/Yard";
import SalesPerson from "./components/MasterForms/SalesPerson";
import LeadOwner from "./components/MasterForms/LeadOwner";
import Receiver from "./components/MasterForms/Receiver";
import AssignJob from "./components/Job/AssignJob";
import AssignTask from "./components/Job/AssignTask";
import TaskCompletion from "./components/Job/TaskCompletion";
import JobOrderStatus from "./components/Job/JobOrderStatus";
import JobOrderAcceptance from "./components/Job/JobOrderAcceptance";
import AssignLabour from "./components/MasterForms/AssignLabour";
import StockIssue from "./components/Inventory/StockIssue";
import StockIssueReturn from "./components/Inventory/StockIssueReturn";
import AdvanceReceipt from "./components/Advance/AdvanceReceipt";
import PurchaseOrder from "./components/Inventory/PurchaseOrder";
import GoodsReceiptNote from "./components/Inventory/GoodsReceiptNote";
import FollowUp from "./components/FollowUp";
import ForgetPassword from "./components/ForgetPassword";
import OTP from "./components/OTP";
import Register from "./components/Register";


export default function App() {
  return (
    <Routes>
      <Route path="ForgetPassword" element={<ForgetPassword />} />
      <Route path="OTP" element={<OTP />} />
      <Route path="Register" element={<Register />} />
      <Route path="/" element={<Admin />} />
      <Route path="/Layout" element={<Layout />}>
        <Route index element={<div className=" flex h-full w-full items-center  justify-center pt-16">
          <h1 className="text-4xl  font-bold italic tracking-wider text-[var(--primary-color)]">
            COMING SOON !!!
          </h1>  </div>} />
        <Route path="lead" element={<LeadSearch />} />
        <Route path="lead/lead" element={<LeadCreationForm />} />
        <Route path="lead/hold" element={<ContainerHoldRequestForm />} />
        <Route path="lead/quotation" element={<QuotationSearchForm />} />
        <Route path="quotation" element={<QuotationSearchForm />} />
        <Route path="quotation/quotation" element={<QuotationForm />} />
        <Route path="quotation/proformainvoice" element={<ProformaInvoiceSearch />} />
        <Route path="proformainvoice" element={<ProformaInvoiceSearch />} />
        <Route path="proformainvoice/add" element={<ProformaInvoiceForm />} />
        <Route path="proformainvoice/advance" element={<PartyAdvanceForm />} />
        <Route path="proformainvoice/block" element={<ContainerBlockRequestForm />} />
        <Route path="proformainvoice/block/submit" element={<ContainerBlockRequestApprovalForm />} />
        <Route path="containerstatusupdateform" element={<ContainerStatusUpdateForm />} />
        <Route path="proformainvoice/approve/submit" element={<ContainerStatusApprovalForm />} />
        <Route path="hold/submit" element={<ContainerHoldRequestApprovalForm />} />
        <Route path="userrolesettingsmaster" element={<UserRoleSettings />} />
        <Route path="containermaster" element={<ContainerMaster />} />
        <Route path="containerpurchase" element={<ContainerPurchase />} />
        <Route path="departmentmaster" element={<DepartmentMaster />} />

        <Route path="materialgroup" element={<MaterialGroup />} />
        <Route path="materiallist" element={<MaterialList />} />
        <Route path="templategroup" element={<TemplateGroup />} />
        <Route path="templatespecification" element={<TemplateSpecification />} />
        <Route path="leadsourcemaster" element={<LeadSource />} />
        <Route path="leadstatusmaster" element={<LeadStatusMaster />} />
        <Route path="sales" element={<Sales />} />
        <Route path="salessearch" element={<SalesSearch />} />
        <Route path="salesreturn" element={<SalesReturn />} />
        <Route path="salesreturnsearch" element={<SalesReturnSearch />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="purchasesearch" element={<PurchaseSearch />} />
        <Route path="stockissue" element={<StockIssue />} />
        <Route path="stockissuereturn" element={<StockIssueReturn />} />
        <Route path="purchasereturn" element={<PurchaseReturn />} />
        <Route path="purchasereturnsearch" element={<PurchaseReturnSearch />} />
        <Route path="templatesettings" element={<TemplateSettings />} />
        <Route path="rolemaster" element={<RoleMaster />} />
        <Route path="usermaster" element={<UserMaster />} />
        <Route path="quotationapproval" element={<QuotationApproval />} />
        <Route path="proformainvoiceapproval" element={<ProformaInvoiceApproval />} />
        <Route path="containerholdrequestapproval" element={<ContainerHoldRequestApprovalForm />} />
        <Route path="containerblockrequestapproval" element={<ContainerBlockRequestApprovalForm />} />
        <Route path="unitmaster" element={<UnitMaster />} />
        <Route path="purchaseorder" element={<PurchaseOrder />} />
        <Route path="ContainerStatus" element={<ContainerStatus />} />
        <Route path="PurchaseMaster" element={<PurchaseMaster />}/>
        <Route path="Grade" element={<Grade />} />
        <Route path="Group" element={<Group />} />
        <Route path="GroupUnder" element={<GroupUnder />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="SizeType" element={<SizeType />} />
        <Route path="Supervisor" element={<Supervisor />} />

        <Route path="Yard" element={<Yard />} />
        <Route path="master/ledgermasterform" element={<LedgerMasterForm />} />
        <Route path="accounts/ledgermasterform" element={<LedgerMasterForm />} />
        <Route path="goodsreceiptnote" element={<GoodsReceiptNote />} />

        <Route path="SalesPerson" element={<SalesPerson />} />
        <Route path="LeadOwner" element={<LeadOwner />} />
        <Route path="Receiver" element={<Receiver />} />
        <Route path="LedgerMasterGroupForm" element={<LedgerMasterGroupForm />} />
        <Route path="AssignJob" element={<AssignJob />} />
        <Route path="AssignTask" element={<AssignTask />} />
        <Route path="TaskCompletion" element={<TaskCompletion />} />
        <Route path="JobOrderStatus" element={<JobOrderStatus />} />
        <Route path="JobOrderAcceptance" element={<JobOrderAcceptance />} />
        <Route path="AssignLabour" element={<AssignLabour />} />
        <Route path="AdvanceReceipt" element={<AdvanceReceipt />} />
        <Route path="FollowUp" element={<FollowUp />} />
      </Route>
    </Routes>
  );
}
