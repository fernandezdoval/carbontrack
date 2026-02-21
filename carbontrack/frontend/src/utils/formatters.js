/**
 * Utility functions for formatting data
 */

/**
 * Format number with thousands separator
 */
export const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined) return '-';
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format emissions (kg CO2e)
 */
export const formatEmissions = (kg) => {
  if (kg === null || kg === undefined) return '-';
  
  // Convert to tonnes if > 1000 kg
  if (kg >= 1000) {
    return `${formatNumber(kg / 1000, 2)} tonnes CO₂e`;
  }
  
  return `${formatNumber(kg, 1)} kg CO₂e`;
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '-';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '-';
  
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  if (format === 'month-year') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
  
  return d.toLocaleDateString();
};

/**
 * Format percentage
 */
export const formatPercent = (value, decimals = 1) => {
  if (value === null || value === undefined) return '-';
  return `${formatNumber(value, decimals)}%`;
};

/**
 * Get percentage change
 */
export const getPercentChange = (current, previous) => {
  if (!previous || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  
  return formatDate(date);
};

/**
 * Convert kg CO2e to equivalents
 */
export const getEmissionEquivalents = (kgCO2e) => {
  return {
    // Based on average car emissions (0.17 kg CO2e/km)
    carKm: Math.round(kgCO2e / 0.17),
    
    // Based on average tree absorption (21 kg CO2e/year)
    trees: (kgCO2e / 21).toFixed(1),
    
    // Based on average smartphone charge (0.008 kg CO2e)
    phoneCharges: Math.round(kgCO2e / 0.008),
    
    // Based on average home electricity (0.5 kg CO2e/kWh)
    homeElectricityDays: (kgCO2e / (0.5 * 30)).toFixed(1),
  };
};

/**
 * Validate and format emission category name
 */
export const formatCategoryName = (category) => {
  return category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Get color class based on value threshold
 */
export const getValueColor = (value, thresholds = { low: 0, medium: 50, high: 80 }) => {
  if (value < thresholds.medium) return 'text-green-600';
  if (value < thresholds.high) return 'text-yellow-600';
  return 'text-red-600';
};
