import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Components';
import { Modal } from '../components/ui/Modals';
import { getRecords, createRecord, updateRecord, deleteRecord } from '../services/api';
import { ChevronLeft, ChevronRight, Download, Filter, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const RecordForm = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState(initialData || {
    age: 30, workclass: 'Private', education: 'Bachelors', occupation: 'Prof-specialty',
    marital_status: 'Never-married', relationship: 'Not-in-family', race: 'White',
    gender: 'Male', hours_per_week: 40, native_country: 'United-States', income: '<=50K'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' || name === 'hours_per_week' ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Age</label><input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-blue/20 outline-none" /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Hours/Week</label><input required type="number" name="hours_per_week" value={formData.hours_per_week} onChange={handleChange} className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-blue/20 outline-none" /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Workclass</label><input required type="text" name="workclass" value={formData.workclass} onChange={handleChange} className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-blue/20 outline-none" /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Education</label><input required type="text" name="education" value={formData.education} onChange={handleChange} className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-blue/20 outline-none" /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Occupation</label><input required type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-blue/20 outline-none" /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Marital Status</label><input required type="text" name="marital_status" value={formData.marital_status} onChange={handleChange} className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-blue/20 outline-none" /></div>
        <div><label className="block text-xs font-medium text-slate-500 mb-1">Income</label>
          <select name="income" value={formData.income} onChange={handleChange} className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-blue/20 outline-none">
            <option>&lt;=50K</option><option>&gt;50K</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium bg-navy text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
          {isSubmitting && <Loader2 size={16} className="animate-spin" />} Save Record
        </button>
      </div>
    </form>
  );
};

const RecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 15;

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await getRecords(page * limit, limit);
      setRecords(data);
    } catch (error) {
      console.error('Failed to fetch records:', error);
      toast.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [page]);

  const handleCreateOrUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedRecord) {
        await updateRecord(selectedRecord.id, formData);
        toast.success('Record updated successfully');
      } else {
        await createRecord(formData);
        toast.success('Record added successfully');
      }
      setIsFormModalOpen(false);
      fetchRecords();
    } catch (error) {
      toast.error(`Failed to ${selectedRecord ? 'update' : 'add'} record`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord) return;
    setIsSubmitting(true);
    try {
      await deleteRecord(selectedRecord.id);
      toast.success('Record deleted successfully');
      setIsDeleteModalOpen(false);
      fetchRecords();
    } catch (error) {
      toast.error('Failed to delete record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAddModal = () => { setSelectedRecord(null); setIsFormModalOpen(true); };
  const openEditModal = (record) => { setSelectedRecord(record); setIsFormModalOpen(true); };
  const openDeleteModal = (record) => { setSelectedRecord(record); setIsDeleteModalOpen(true); };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Census Records</h1>
          <p className="text-text-muted mt-1">Explore, edit, and manage demographic datasets.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-navy hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} /> Filter
          </button>
          <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-lg text-sm font-medium hover:bg-accent-blue-hover transition-colors shadow-sm shadow-blue-500/20">
            <Plus size={16} /> Add Record
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">ID</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Age</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Workclass</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Occupation</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Income</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array(10).fill(0).map((_, i) => (
                  <tr key={i}><td colSpan="6" className="px-6 py-4"><div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div></td></tr>
                ))
              ) : records.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-10 text-slate-500">No records found.</td></tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-navy">#{record.id}</td>
                    <td className="px-6 py-4 text-slate-600">{record.age}</td>
                    <td className="px-6 py-4 text-slate-600">{record.workclass || '—'}</td>
                    <td className="px-6 py-4 text-slate-600">{record.occupation || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        record.income === '>50K' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {record.income}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditModal(record)} className="p-1.5 text-slate-400 hover:text-accent-blue bg-white rounded shadow-sm border border-slate-100">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => openDeleteModal(record)} className="p-1.5 text-slate-400 hover:text-red-500 bg-white rounded shadow-sm border border-slate-100">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing page {page + 1}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"><ChevronLeft size={18} /></button>
            <button onClick={() => setPage(p => p + 1)} disabled={records.length < limit} className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"><ChevronRight size={18} /></button>
          </div>
        </div>
      </Card>

      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={selectedRecord ? "Edit Record" : "Add New Record"}>
        <RecordForm initialData={selectedRecord} onSubmit={handleCreateOrUpdate} onCancel={() => setIsFormModalOpen(false)} isSubmitting={isSubmitting} />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="text-sm text-slate-600 mb-6">Are you sure you want to delete record #{selectedRecord?.id}? This action cannot be undone.</div>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleDelete} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
            {isSubmitting && <Loader2 size={16} className="animate-spin" />} Delete Record
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RecordsPage;
