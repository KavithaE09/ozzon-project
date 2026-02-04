import MasterForm from './MasterForm';
import { getAllRoles, createRole, updateRole, deleteRole } from '../../api/masterApi';

export default function RoleMaster() {
  return <MasterForm
    title="Role"
    fetchAll={getAllRoles}
    createItem={createRole}
    updateItem={updateRole}
    deleteItem={deleteRole}
    nameKey="RoleName"
    idKey="RoleId"
  />
}
