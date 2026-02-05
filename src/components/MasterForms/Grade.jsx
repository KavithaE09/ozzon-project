import MasterForm from './singlefieldMasterForm';
import { getAllGrades, createGrade, updateGrade, deleteGrade } from '../../api/masterApi';

export default function GradeMaster() {
  return <MasterForm
    title="Grade"
    fetchAll={getAllGrades}
    createItem={createGrade}
    updateItem={updateGrade}
    deleteItem={deleteGrade}
    nameKey="Grade"
    idKey="GradeId"
  />
}
