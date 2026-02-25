import React, { useState, useEffect } from 'react';
import { Calendar, Download, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

export default function Reports() {
  const { t } = useLanguage();
  const [activities, setActivities] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = () => {
    const stored = localStorage.getItem('carbontrack_activities');
    setActivities(stored ? JSON.parse(stored) : []);
  };

  // Monthly trend data
  const monthlyData = React.useMemo(() => {
    const months = {};
    activities.forEach(activity => {
      const date = new Date(activity.date);
      if (date.getFullYear() === selectedYear) {
        const monthKey = date.getMonth();
        months[monthKey] = (months[monthKey] || 0) + parseFloat(activity.co2e || 0);
      }
    });

    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return monthNames.map((name, idx) => ({
      month: name,
      emissions: parseFloat((months[idx] || 0).toFixed(2))
    }));
  }, [activities, selectedYear]);

  // Category breakdown
  const categoryData = React.useMemo(() => {
    const categories = {};
    activities.forEach(activity => {
      const date = new Date(activity.date);
      if (date.getFullYear() === selectedYear && date.getMonth() === selectedMonth) {
        const cat = activity.category || 'other';
        categories[cat] = (categories[cat] || 0) + parseFloat(activity.co2e || 0);
      }
    });

    return Object.entries(categories).map(([name, value]) => ({
      name: t(name),
      value: parseFloat(value.toFixed(2))
    }));
  }, [activities, selectedYear, selectedMonth, t]);

  // Total stats
  const totalEmissions = activities.reduce((sum, a) => sum + parseFloat(a.co2e || 0), 0);
  const yearEmissions = monthlyData.reduce((sum, m) => sum + m.emissions, 0);

  const years = [...new Set(activities.map(a => new Date(a.date).getFullYear()))];
  const availableYears = years.length > 0 ? years : [new Date().getFullYear()];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('reports')}</h1>
            <p className="text-gray-600">Análisis detallado de emisiones</p>
          </div>
          <button className="btn btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>

        {/* Filters */}
        <div className="card mb-6 flex gap-4 items-center">
          <div>
            <label className="label">Año</label>
            <select
              className="input"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Mes</label>
            <select
              className="input"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((name, idx) => (
                <option key={idx} value={idx}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Emisiones Totales</p>
            <p className="text-3xl font-bold text-gray-900">{totalEmissions.toFixed(2)}</p>
            <p className="text-sm text-gray-500">kg CO₂e (histórico)</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Emisiones {selectedYear}</p>
            <p className="text-3xl font-bold text-primary-600">{yearEmissions.toFixed(2)}</p>
            <p className="text-sm text-gray-500">kg CO₂e</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Actividades Registradas</p>
            <p className="text-3xl font-bold text-blue-600">{activities.length}</p>
            <p className="text-sm text-gray-500">total</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Trend */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">
              <TrendingUp className="w-5 h-5 inline mr-2" />
              {t('emissionTrends')}
            </h2>
            {monthlyData.some(m => m.emissions > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="kg CO₂e"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>No hay datos para mostrar</p>
              </div>
            )}
          </div>

          {/* Category Breakdown */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">
              <Calendar className="w-5 h-5 inline mr-2" />
              {t('categoryBreakdown')}
            </h2>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>No hay datos para el mes seleccionado</p>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Bar Chart */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Emisiones Mensuales {selectedYear}</h2>
          {monthlyData.some(m => m.emissions > 0) ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="emissions" fill="#10b981" name="kg CO₂e" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>No hay datos para mostrar</p>
              <p className="text-sm mt-2">Añade actividades para ver informes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
