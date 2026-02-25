import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import CategoryChart from '../components/CategoryChart';

export default function Dashboard() {
  const { t } = useLanguage();
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalEmissions: 0,
    monthlyEmissions: 0,
    activityCount: 0,
    avgPerDay: 0,
    trend: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const stored = localStorage.getItem('carbontrack_activities');
    const allActivities = stored ? JSON.parse(stored) : [];
    setActivities(allActivities);

    // Calculate stats
    const now = new Date();
    const thisMonth = allActivities.filter(a => {
      const actDate = new Date(a.date);
      return actDate.getMonth() === now.getMonth() && 
             actDate.getFullYear() === now.getFullYear();
    });

    const lastMonth = allActivities.filter(a => {
      const actDate = new Date(a.date);
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return actDate.getMonth() === lastMonthDate.getMonth() && 
             actDate.getFullYear() === lastMonthDate.getFullYear();
    });

    const totalEmissions = allActivities.reduce((sum, a) => sum + parseFloat(a.co2e || 0), 0);
    const monthlyEmissions = thisMonth.reduce((sum, a) => sum + parseFloat(a.co2e || 0), 0);
    const lastMonthEmissions = lastMonth.reduce((sum, a) => sum + parseFloat(a.co2e || 0), 0);
    
    const trend = lastMonthEmissions > 0 
      ? ((monthlyEmissions - lastMonthEmissions) / lastMonthEmissions * 100).toFixed(1)
      : 0;

    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const avgPerDay = (monthlyEmissions / daysInMonth).toFixed(2);

    setStats({
      totalEmissions: totalEmissions.toFixed(2),
      monthlyEmissions: monthlyEmissions.toFixed(2),
      activityCount: thisMonth.length,
      avgPerDay,
      trend: parseFloat(trend),
    });
  };

  const categoryData = React.useMemo(() => {
    const categories = {};
    activities.forEach(activity => {
      const cat = activity.category || 'other';
      categories[cat] = (categories[cat] || 0) + parseFloat(activity.co2e || 0);
    });
    return Object.entries(categories).map(([name, value]) => ({
      name: t(name),
      value: parseFloat(value.toFixed(2)),
    }));
  }, [activities, t]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard')}</h1>
          <p className="text-gray-600">Visión general de tu huella de carbono</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('totalEmissions')}
            value={stats.totalEmissions}
            unit="kg CO₂e"
            subtitle="Histórico"
            icon={<BarChart3 className="w-5 h-5" />}
            color="text-primary-600"
            bgColor="bg-primary-50"
          />
          <StatCard
            title={t('thisMonth')}
            value={stats.monthlyEmissions}
            unit="kg CO₂e"
            subtitle={`${t('trend')}: ${stats.trend > 0 ? '+' : ''}${stats.trend}%`}
            icon={stats.trend >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            color={stats.trend >= 0 ? "text-red-600" : "text-green-600"}
            bgColor={stats.trend >= 0 ? "bg-red-50" : "bg-green-50"}
          />
          <StatCard
            title={t('activities_count')}
            value={stats.activityCount}
            unit="este mes"
            subtitle={`Total: ${activities.length}`}
            icon={<Activity className="w-5 h-5" />}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title={t('avgPerDay')}
            value={stats.avgPerDay}
            unit="kg CO₂e"
            subtitle="Promedio mensual"
            icon={<TrendingDown className="w-5 h-5" />}
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Category Chart */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">{t('emissionsByCategory')}</h2>
            {categoryData.length > 0 ? (
              <CategoryChart data={categoryData} />
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>No hay datos para mostrar</p>
                <p className="text-sm mt-2">Añade actividades para ver estadísticas</p>
              </div>
            )}
          </div>

          {/* Recent Activities */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">{t('recentActivities')}</h2>
            {activities.length > 0 ? (
              <div className="space-y-3">
                {activities.slice(0, 5).map((activity, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{t(activity.category)}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString()} • {activity.amount} {activity.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{activity.co2e}</p>
                      <p className="text-xs text-gray-500">kg CO₂e</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>{t('noActivities')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, subtitle, icon, color, bgColor }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <div className={color}>{icon}</div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <div className="flex items-baseline gap-2 mb-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{unit}</p>
      </div>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}
