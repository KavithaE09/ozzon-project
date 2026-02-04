import MasterForm from './MasterForm';
import { getAllYards, createYard, updateYard, deleteYard } from '../../api/masterApi';

export default function YardMaster() {
  return <MasterForm
    title="Yard"
    fetchAll={getAllYards}
    createItem={createYard}
    updateItem={updateYard}
    deleteItem={deleteYard}
    nameKey="Yard"
    idKey="YardId"
  />
}
