import React, { useState } from 'react';
import { Calculator, Zap, Fuel, Plane, Trash2, Cloud, Droplet } from 'lucide-react';
import axios from 'axios';

const CATEGORIES = [
  { 
    id: 'electricity', 
    name: 'Electricity', 
    icon: Zap,
    unit: 'kWh',
    description: 'Grid electricity consumption',
    regions: ['US', 'US_CALIFORNIA', 'US_TEXAS', 'UK', 'EU', 'GLOBAL']
  },
  { 
    id: 'transportation', 
    name: 'Gasoline/Diesel', 
    icon: Fuel,
    subcategories: ['gasoline', 'diesel'],
    unit: 'liters',
    description: 'Vehicle fuel consumption'
  },
  { 
    id: 'flights', 
    name: 'Air Travel', 
    icon: Plane,
    subcategories: ['short_haul', 'medium_haul', 'long_haul', 'long_haul_business'],
    unit: 'km',
    description: 'Flight distance'
  },
  { 
    id: 'waste', 
    name: 'Waste', 
    icon: Trash2,
    subcategories: ['landfill', 'incineration', 'recycling_paper', 'recycling_plastic'],
    unit: 'kg',
    description: 'Waste disposal'
  },
  { 
    id: 'cloud', 
    name: 'Cloud Computing', 
    icon: Cloud,
    subcategories: ['aws_us_east', 'gcp_us_central', 'azure_us_east', 'generic_datacenter'],
    unit: 'kWh',
    description: 'Cloud service energy use'
  },
  { 
    id: 'water', 
    name: 'Water', 
    icon: Droplet,
    subcategories: ['supply_treatment', 'wastewater'],
    unit: 'm³',
    description: 'Water consumption'
  },
];

export default function Calculate() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [value, setValue] = useState('');
  const [region, setRegion] = useState('US');
  const [subcategory, setSubcategory] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    if (!value || parseFloat(value) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/v1/calculate', {
        category: selectedCategory.id,
        value: parseFloat(value),
        region: selectedCategory.regions ? region : undefined,
        subcategory: subcategory || undefined
      });

      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setResult(null);
    setValue('');
    setSubcategory(category.subcategories ? category.subcategories[0] : '');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Calculator</h1>
          <p className="text-gray-600">Calculate emissions for one-time activities or events</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Enter Activity Details</h2>
            
            {/* Category Selection */}
            <div className="mb-4">
              <label className="label">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                      selectedCategory.id === cat.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <cat.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategory (if applicable) */}
            {selectedCategory.subcategories && (
              <div className="mb-4">
                <label className="label">Type</label>
                <select 
                  className="input"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  {selectedCategory.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Region (for electricity) */}
            {selectedCategory.regions && (
              <div className="mb-4">
                <label className="label">Region</label>
                <select 
                  className="input"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {selectedCategory.regions.map((r) => (
                    <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Amount */}
            <div className="mb-4">
              <label className="label">
                Amount ({selectedCategory.unit})
              </label>
              <input
                type="number"
                className="input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter ${selectedCategory.unit}`}
                min="0"
                step="0.01"
              />
              <p className="text-xs text-gray-500 mt-1">{selectedCategory.description}</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleCalculate}
              disabled={loading}
              className="btn btn-primary w-full"
            >
              <Calculator className="w-4 h-4 inline mr-2" />
              {loading ? 'Calculating...' : 'Calculate Emissions'}
            </button>
          </div>

          {/* Results Section */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            
            {!result && (
              <div className="text-center py-12 text-gray-400">
                <Calculator className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p>Enter details and calculate to see results</p>
              </div>
            )}

            {result && (
              <div>
                <div className="mb-6 p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
                  <p className="text-sm text-primary-800 mb-1">Total Emissions</p>
                  <p className="text-4xl font-bold text-primary-900">
                    {result.co2e.toLocaleString()}
                  </p>
                  <p className="text-sm text-primary-700 mt-1">kg CO₂e</p>
                </div>

                <div className="space-y-3">
                  <DetailRow label="Input" value={`${result.inputValue} ${result.inputUnit}`} />
                  <DetailRow label="Emission Factor" value={`${result.factor} kg CO₂e/${result.unit}`} />
                  <DetailRow label="Source" value={result.source} />
                  <DetailRow label="Year" value={result.year} />
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium mb-1">💡 Context</p>
                  <p className="text-sm text-blue-800">
                    This is equivalent to driving approximately{' '}
                    <strong>{Math.round(result.co2e / 0.17)} km</strong> in an average car.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="card mt-6 bg-gray-50">
          <h3 className="font-bold mb-2">About These Calculations</h3>
          <p className="text-sm text-gray-600">
            We use industry-standard emission factors from EPA, DEFRA, IPCC, and IEA. 
            All values are in CO₂ equivalent (CO₂e), which includes all greenhouse gases 
            normalized to the warming potential of carbon dioxide.
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
