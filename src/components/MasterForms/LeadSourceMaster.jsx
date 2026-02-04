import MasterForm from './MasterForm';
import { getAllLeadSources, createLeadSource, updateLeadSource, deleteLeadSource } from '../../api/masterApi';

export default function LeadSourceMaster() {
  return <MasterForm
    title="Lead Source"
    fetchAll={getAllLeadSources}
    createItem={createLeadSource}
    updateItem={updateLeadSource}
    deleteItem={deleteLeadSource}
    nameKey="LeadSourceName"
    idKey="LeadSourceId"
  />
}
