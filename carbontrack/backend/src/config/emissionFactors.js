/**
 * Emission Factors Configuration
 * Loads and manages emission factors for calculations
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EmissionFactorService {
  constructor() {
    this.factors = null;
    this.loaded = false;
  }

  async load() {
    if (this.loaded) return;
    
    const factorsPath = path.join(__dirname, '../../../data/emission-factors.json');
    const data = await fs.readFile(factorsPath, 'utf-8');
    this.factors = JSON.parse(data);
    this.loaded = true;
  }

  /**
   * Get emission factor for a specific category
   * @param {string} category - Category (electricity, naturalGas, etc.)
   * @param {string} subcategory - Subcategory or region
   * @param {string} unit - Unit of measurement
   * @returns {Object} Factor details
   */
  getFactor(category, subcategory = 'GLOBAL', unit = null) {
    if (!this.loaded) {
      throw new Error('Emission factors not loaded. Call load() first.');
    }

    const categoryData = this.factors[category];
    if (!categoryData) {
      throw new Error(`Unknown emission category: ${category}`);
    }

    // Handle nested structures (e.g., transportation.gasoline)
    let factor = subcategory ? categoryData[subcategory] : categoryData.GLOBAL;
    
    if (!factor && subcategory !== 'GLOBAL') {
      // Fallback to GLOBAL if specific region not found
      factor = categoryData.GLOBAL;
    }

    if (!factor) {
      throw new Error(`Emission factor not found: ${category}.${subcategory}`);
    }

    return factor;
  }

  /**
   * Calculate CO2e emissions
   * @param {string} category - Emission category
   * @param {number} value - Amount (e.g., kWh, liters, km)
   * @param {Object} options - { region, subcategory, unit }
   * @returns {Object} { co2e, factor, source, unit }
   */
  calculate(category, value, options = {}) {
    const { region = 'GLOBAL', subcategory = null, unit = null } = options;
    
    const factorKey = subcategory || region;
    const factorData = this.getFactor(category, factorKey, unit);
    
    const co2e = value * factorData.factor;
    
    return {
      co2e: parseFloat(co2e.toFixed(3)),
      factor: factorData.factor,
      unit: factorData.unit,
      source: factorData.source,
      year: factorData.year,
      inputValue: value,
      inputUnit: unit || factorData.unit
    };
  }

  /**
   * Get all available regions for a category
   */
  getRegions(category) {
    const categoryData = this.factors[category];
    if (!categoryData) return [];
    return Object.keys(categoryData);
  }

  /**
   * Get metadata about emission factors
   */
  getMetadata() {
    return this.factors.metadata;
  }
}

// Singleton instance
const emissionFactorService = new EmissionFactorService();

export default emissionFactorService;
