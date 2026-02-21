import React from 'react';
import { TrendingUp, Zap, Truck, Trash2, Cloud } from 'lucide-react';

export default function Dashboard() {
  // Mock data for now
  const stats = {
    totalEmissions: 24567,
    thisMonth: 2134,
    change: -12,
    targetReduction: 30
  };

  const categoryBreakdown = [
    { name: 'Electricity', value: 45, icon: Zap, color: 'bg-yellow-500' },
    { name: 'Transportation', value: 30, icon: Truck, color: 'bg-blue-500' },
    { name: 'Waste', value: 15, icon: Trash2, color: 'bg-red-500' },
    { name: 'Cloud Services', value: 10, icon: Cloud, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Dashboard</h1>
        <p className="text-gray-600">Track and manage your organization's carbon footprint</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Emissions (YTD)"
          value={`${stats.totalEmissions.toLocaleString()} kg`}
          subtitle="CO₂e this year"
          trend={null}
        />
        <StatCard
          title="This Month"
          value={`${stats.thisMonth.toLocaleString()} kg`}
          subtitle="CO₂e in current month"
          trend={stats.change}
        />
        <StatCard
          title="Reduction Target"
          value={`${stats.targetReduction}%`}
          subtitle="By end of 2024"
          color="text-primary-600"
        />
        <StatCard
          title="Avg per Employee"
          value="245 kg"
          subtitle="Monthly CO₂e"
          trend={-8}
        />
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Emissions by Category</h2>
          <div className="space-y-4">
            {categoryBreakdown.map((cat, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <cat.icon className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{cat.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${cat.color} h-2 rounded-full`}
                    style={{ width: `${cat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <ActionButton 
              title="Log New Activity"
              description="Add utilities, transport, or other emissions"
              href="/activities"
            />
            <ActionButton 
              title="Calculate Emissions"
              description="Quick calculator for one-time events"
              href="/calculate"
            />
            <ActionButton 
              title="View Reports"
              description="Generate compliance & summary reports"
              href="/reports"
            />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="text-gray-500 text-center py-8">
          <p>No activities logged yet.</p>
          <p className="text-sm mt-2">Start by adding your first emission source!</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, trend, color = 'text-gray-900' }) {
  return (
    <div className="card">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <div className="flex items-center gap-2 mt-1">
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function ActionButton({ title, description, href }) {
  return (
    <a 
      href={href}
      className="block p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
    >
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </a>
  );
}
