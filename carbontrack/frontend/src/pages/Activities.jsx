import React from 'react';
import { Plus, FileText } from 'lucide-react';

export default function Activities() {
  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Log</h1>
          <p className="text-gray-600">Track and manage your emission activities</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 inline mr-2" />
          Log Activity
        </button>
      </div>

      <div className="card">
        <div className="text-center py-16 text-gray-400">
          <FileText className="w-16 h-16 mx-auto mb-3 opacity-50" />
          <p className="text-lg mb-2">No activities logged yet</p>
          <p className="text-sm">Start tracking your emissions by logging your first activity</p>
          <button className="btn btn-primary mt-4">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Your First Activity
          </button>
        </div>
      </div>

      <div className="card mt-6 bg-blue-50 border-blue-200">
        <h3 className="font-bold text-blue-900 mb-2">💡 What to log?</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Monthly utility bills (electricity, gas, water)</li>
          <li>Business travel (flights, car rentals, fuel purchases)</li>
          <li>Shipping and freight</li>
          <li>Cloud computing usage</li>
          <li>Waste disposal</li>
          <li>Employee commutes</li>
        </ul>
      </div>
    </div>
  );
}
