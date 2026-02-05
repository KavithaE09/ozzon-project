import MasterForm from './singlefieldMasterForm';
import { getAllLeadStatuses, createLeadStatus, updateLeadStatus, deleteLeadStatus } from '../../api/masterApi';

export default function LeadStatusMaster() {
  return <MasterForm
    title="Lead Status"
    fetchAll={getAllLeadStatuses}
    createItem={createLeadStatus}
    updateItem={updateLeadStatus}
    deleteItem={deleteLeadStatus}
    nameKey="LeadStatusName"
    idKey="LeadStatusId"
  />
}
