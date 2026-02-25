import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Calendar, Zap, Fuel, Plane, Trash, Cloud, Droplet } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const CATEGORIES = [
  { id: 'electricity', name: 'Electricity', icon: Zap, color: 'bg-yellow-500' },
  { id: 'transportation', name: 'Transportation', icon: Fuel, color: 'bg-blue-500' },
  { id: 'flights', name: 'Flights', icon: Plane, color: 'bg-indigo-500' },
  { id: 'waste', name: 'Waste', icon: Trash, color: 'bg-green-500' },
  { id: 'cloud', name: 'Cloud', icon: Cloud, color: 'bg-purple-500' },
  { id: 'water', name: 'Water', icon: Droplet, color: 'bg-cyan-500' },
];

export default function Activities() {
  const { t } = useLanguage();
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      // Por ahora usamos localStorage hasta que el backend esté listo
      const stored = localStorage.getItem('carbontrack_activities');
      if (stored) {
        setActivities(JSON.parse(stored));
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading activities:', err);
      setError(t('errorLoading'));
      setLoading(false);
    }
  };

  const saveActivity = (activity) => {
    const newActivities = editingId
      ? activities.map(a => a.id === editingId ? { ...activity, id: editingId } : a)
      : [...activities, { ...activity, id: Date.now().toString() }];
    
    setActivities(newActivities);
    localStorage.setItem('carbontrack_activities', JSON.stringify(newActivities));
    setShowForm(false);
    setEditingId(null);
  };

  const deleteActivity = (id) => {
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      const newActivities = activities.filter(a => a.id !== id);
      setActivities(newActivities);
      localStorage.setItem('carbontrack_activities', JSON.stringify(newActivities));
    }
  };

  const editActivity = (activity) => {
    setEditingId(activity.id);
    setShowForm(true);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('myActivities')}</h1>
            <p className="text-gray-600">{t('trackAndManage')}</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); }}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {t('addActivity')}
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <ActivityForm
            onSave={saveActivity}
            onCancel={() => { setShowForm(false); setEditingId(null); }}
            editingActivity={activities.find(a => a.id === editingId)}
          />
        )}

        {/* Activities List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="card text-center py-12">
            <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noActivities')}</h3>
            <p className="text-gray-500 mb-6">Comienza añadiendo tu primera actividad</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t('addActivity')}
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={editActivity}
                onDelete={deleteActivity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityForm({ onSave, onCancel, editingActivity }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(editingActivity || {
    category: 'electricity',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    unit: 'kWh',
    description: '',
    co2e: 0,
  });

  const [calculating, setCalculating] = useState(false);

  const categoryConfig = {
    electricity: { unit: 'kWh', factor: 0.5 },
    transportation: { unit: 'liters', factor: 2.3 },
    flights: { unit: 'km', factor: 0.115 },
    waste: { unit: 'kg', factor: 0.5 },
    cloud: { unit: 'kWh', factor: 0.4 },
    water: { unit: 'm³', factor: 0.3 },
  };

  const handleCategoryChange = (category) => {
    const config = categoryConfig[category];
    setFormData({ ...formData, category, unit: config.unit });
  };

  const calculateEmissions = () => {
    const config = categoryConfig[formData.category];
    const co2e = parseFloat(formData.amount) * config.factor;
    setFormData({ ...formData, co2e: co2e.toFixed(2) });
  };

  useEffect(() => {
    if (formData.amount > 0) {
      calculateEmissions();
    }
  }, [formData.amount, formData.category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.amount > 0) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">
            {editingActivity ? t('edit') + ' ' + t('activities') : t('addActivity')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="label">{t('category')}</label>
            <div className="grid grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.category === cat.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <cat.icon className="w-6 h-6" />
                  <span className="font-medium text-sm">{t(cat.id)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="label">
              <Calendar className="w-4 h-4 inline mr-1" />
              {t('date') || 'Fecha'}
            </label>
            <input
              type="date"
              className="input"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="label">{t('amount')} ({formData.unit})</label>
            <input
              type="number"
              className="input"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder={`${t('amount')} en ${formData.unit}`}
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">{t('description')}</label>
            <textarea
              className="input"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción opcional..."
              rows="3"
            />
          </div>

          {/* CO2e Result */}
          {formData.co2e > 0 && (
            <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-sm text-primary-700 mb-1">Emisiones calculadas</p>
              <p className="text-3xl font-bold text-primary-900">{formData.co2e}</p>
              <p className="text-sm text-primary-600">kg CO₂e</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary flex-1"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={!formData.amount || formData.amount <= 0}
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ActivityCard({ activity, onEdit, onDelete }) {
  const { t } = useLanguage();
  const category = CATEGORIES.find(c => c.id === activity.category);
  const Icon = category?.icon || Zap;

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${category?.color || 'bg-gray-500'} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">
                {t(activity.category)} - {activity.amount} {activity.unit}
              </h3>
              <p className="text-sm text-gray-500">
                <Calendar className="w-3 h-3 inline mr-1" />
                {new Date(activity.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{activity.co2e}</p>
              <p className="text-xs text-gray-500">kg CO₂e</p>
            </div>
          </div>
          
          {activity.description && (
            <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
          )}
          
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(activity)}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <Edit2 className="w-4 h-4" />
              {t('edit')}
            </button>
            <button
              onClick={() => onDelete(activity.id)}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              {t('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
