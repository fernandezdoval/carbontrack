/**
 * CarbonTrack API Server
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import emissionFactorService from './config/emissionFactors.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes (will be added)
app.get('/api/v1', (req, res) => {
  res.json({
    name: 'CarbonTrack API',
    version: '1.0.0',
    endpoints: [
      'GET /api/v1/emission-factors',
      'POST /api/v1/calculate',
      'POST /api/v1/auth/register',
      'POST /api/v1/auth/login',
      'GET /api/v1/organizations/:id',
      'POST /api/v1/activities',
      'GET /api/v1/emissions',
      'GET /api/v1/reports',
      'GET /api/v1/recommendations'
    ]
  });
});

// Emission factors endpoints
app.get('/api/v1/emission-factors', async (req, res) => {
  try {
    const metadata = emissionFactorService.getMetadata();
    res.json({
      success: true,
      data: metadata
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/v1/emission-factors/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const regions = emissionFactorService.getRegions(category);
    
    res.json({
      success: true,
      data: {
        category,
        regions
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

// Quick calculation endpoint (no auth required for demo)
app.post('/api/v1/calculate', async (req, res) => {
  try {
    const { category, value, region, subcategory, unit } = req.body;
    
    if (!category || value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Category and value are required'
      });
    }
    
    const result = emissionFactorService.calculate(category, parseFloat(value), {
      region,
      subcategory,
      unit
    });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
async function start() {
  try {
    // Load emission factors
    console.log('Loading emission factors...');
    await emissionFactorService.load();
    console.log('✓ Emission factors loaded');
    
    app.listen(PORT, () => {
      console.log(`\n🌱 CarbonTrack API running on http://localhost:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`   Health: http://localhost:${PORT}/health`);
      console.log(`   API Info: http://localhost:${PORT}/api/v1\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
