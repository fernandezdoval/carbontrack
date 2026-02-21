import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate compliance and summary reports</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ReportCard
          title="Monthly Summary"
          description="Overview of emissions by category for the past month"
          icon={Calendar}
        />
        <ReportCard
          title="Annual Report"
          description="Complete yearly emissions inventory"
          icon={FileText}
        />
        <ReportCard
          title="Compliance Export"
          description="Formatted for regulatory disclosure requirements"
          icon={Download}
        />
        <ReportCard
          title="Custom Report"
          description="Build a custom report with specific date ranges and categories"
          icon={FileText}
        />
      </div>

      <div className="card bg-yellow-50 border-yellow-200">
        <h3 className="font-bold text-yellow-900 mb-2">📊 Coming Soon</h3>
        <p className="text-sm text-yellow-800">
          Reporting features will be available once you start logging activities. 
          You'll be able to export data in multiple formats including CSV, PDF, and Excel.
        </p>
      </div>
    </div>
  );
}

function ReportCard({ title, description, icon: Icon }) {
  return (
    <div className="card hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <button className="text-sm text-primary-600 font-medium mt-2 hover:text-primary-700">
            Generate Report →
          </button>
        </div>
      </div>
    </div>
  );
}
