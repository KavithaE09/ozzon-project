import MasterForm from './MasterForm';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../../api/masterApi';

export default function DepartmentMaster() {
  return <MasterForm
    title="Department"
    fetchAll={getAllDepartments}
    createItem={createDepartment}
    updateItem={updateDepartment}
    deleteItem={deleteDepartment}
    nameKey="DepartmentName"
    idKey="DepartmentId"
  />
}
