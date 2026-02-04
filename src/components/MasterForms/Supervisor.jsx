import MasterForm from './MasterForm';
import { getAllSupervisors, createSupervisor, updateSupervisor, deleteSupervisor } from '../../api/masterApi';

export default function SupervisorMaster() {
  return <MasterForm
    title="Supervisor"
    fetchAll={getAllSupervisors}
    createItem={createSupervisor}
    updateItem={updateSupervisor}
    deleteItem={deleteSupervisor}
    nameKey="SupervisorName"
    idKey="SupervisorId"
  />
}
