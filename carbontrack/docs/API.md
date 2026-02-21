# CarbonTrack API Documentation

REST API for carbon emissions tracking and calculations.

## Base URL

**Development:** `http://localhost:3000/api/v1`
**Production:** `https://api.carbontrack.app/api/v1`

## Authentication

Most endpoints require authentication via JWT token.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## Endpoints

### Health Check

**GET** `/health`

Check API health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

---

### Emission Calculations

#### Quick Calculate

**POST** `/v1/calculate`

Calculate emissions for a single activity (no auth required).

**Request:**
```json
{
  "category": "electricity",
  "value": 1000,
  "region": "US",
  "subcategory": "gasoline",
  "unit": "kWh"
}
```

**Parameters:**
- `category` (required): Emission category (electricity, transportation, etc.)
- `value` (required): Numeric value
- `region` (optional): Region code (US, UK, EU, GLOBAL)
- `subcategory` (optional): Subcategory (gasoline, diesel, etc.)
- `unit` (optional): Unit override

**Response:**
```json
{
  "success": true,
  "data": {
    "co2e": 386,
    "factor": 0.386,
    "unit": "kWh",
    "source": "EPA eGRID 2023",
    "year": 2023,
    "inputValue": 1000,
    "inputUnit": "kWh"
  }
}
```

#### Get Emission Factors

**GET** `/v1/emission-factors`

Get metadata about available emission factors.

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0",
    "lastUpdated": "2024-01",
    "sources": ["EPA", "DEFRA", "IPCC"]
  }
}
```

#### Get Factors by Category

**GET** `/v1/emission-factors/:category`

Get available regions/subcategories for a category.

**Response:**
```json
{
  "success": true,
  "data": {
    "category": "electricity",
    "regions": ["US", "US_CALIFORNIA", "UK", "EU", "GLOBAL"]
  }
}
```

---

### Authentication

#### Register

**POST** `/v1/auth/register`

Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe",
  "organizationName": "Acme Corp",
  "industry": "retail",
  "country": "US"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "organization": {
      "id": "uuid",
      "name": "Acme Corp"
    },
    "token": "jwt-token-here"
  }
}
```

#### Login

**POST** `/v1/auth/login`

Authenticate and get JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token-here",
    "expiresIn": "7d"
  }
}
```

---

### Organizations

#### Get Organization

**GET** `/v1/organizations/:id`

Get organization details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Acme Corp",
    "industry": "retail",
    "size": "SMALL",
    "country": "US",
    "currency": "USD",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Organization

**PUT** `/v1/organizations/:id`

Update organization details.

**Request:**
```json
{
  "name": "Acme Corporation",
  "industry": "e-commerce",
  "size": "MEDIUM"
}
```

---

### Activities

#### List Activities

**GET** `/v1/activities`

Get list of logged activities.

**Query Parameters:**
- `startDate`: ISO date string
- `endDate`: ISO date string
- `category`: Filter by category
- `facilityId`: Filter by facility
- `limit`: Max results (default: 50)
- `offset`: Pagination offset

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "uuid",
        "category": "PURCHASED_ELECTRICITY",
        "date": "2024-01-01",
        "value": 1000,
        "unit": "kWh",
        "supplier": "Local Utility Co",
        "cost": 120.50,
        "emissions": {
          "co2e": 386,
          "scope": "SCOPE_2"
        }
      }
    ],
    "total": 100,
    "limit": 50,
    "offset": 0
  }
}
```

#### Create Activity

**POST** `/v1/activities`

Log a new emission activity.

**Request:**
```json
{
  "category": "PURCHASED_ELECTRICITY",
  "date": "2024-01-01",
  "value": 1000,
  "unit": "kWh",
  "facilityId": "uuid",
  "supplier": "Local Utility Co",
  "description": "January electricity bill",
  "cost": 120.50,
  "currency": "USD",
  "receiptUrl": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "activity": { ... },
    "emission": {
      "co2e": 386,
      "scope": "SCOPE_2",
      "factor": 0.386,
      "source": "EPA eGRID 2023"
    }
  }
}
```

#### Update Activity

**PUT** `/v1/activities/:id`

Update an existing activity.

#### Delete Activity

**DELETE** `/v1/activities/:id`

Delete an activity.

---

### Emissions

#### Get Emissions

**GET** `/v1/emissions`

Get emissions data with filters.

**Query Parameters:**
- `startDate`, `endDate`: Date range
- `scope`: Filter by scope (SCOPE_1, SCOPE_2, SCOPE_3)
- `category`: Filter by category
- `groupBy`: Group results (day, week, month, year, category, scope)

**Response:**
```json
{
  "success": true,
  "data": {
    "emissions": [...],
    "total": 12345,
    "breakdown": {
      "scope1": 2000,
      "scope2": 5000,
      "scope3": 5345
    }
  }
}
```

#### Get Summary

**GET** `/v1/emissions/summary`

Get aggregated emissions summary.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 12345,
    "thisMonth": 1234,
    "lastMonth": 1100,
    "percentChange": 12.2,
    "byScope": { ... },
    "byCategory": { ... }
  }
}
```

#### Get Trends

**GET** `/v1/emissions/trends`

Get time-series emissions data for charts.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-01",
      "total": 1234,
      "scope1": 200,
      "scope2": 500,
      "scope3": 534
    }
  ]
}
```

---

### Reports

#### Generate Report

**POST** `/v1/reports/generate`

Generate a compliance or summary report.

**Request:**
```json
{
  "type": "annual" | "monthly" | "compliance" | "custom",
  "year": 2024,
  "month": 1,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "includeScopes": ["SCOPE_1", "SCOPE_2", "SCOPE_3"],
  "format": "json" | "pdf" | "csv"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "type": "annual",
    "generatedAt": "2024-01-15T10:00:00.000Z",
    "summary": { ... },
    "downloadUrl": "/reports/uuid/download"
  }
}
```

#### Download Report

**GET** `/v1/reports/:id/download?format=pdf`

Download generated report.

**Query Parameters:**
- `format`: pdf, csv, xlsx

**Response:** Binary file download

---

### Recommendations

#### Get Recommendations

**GET** `/v1/recommendations`

Get AI-generated reduction recommendations.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Switch to LED lighting",
      "description": "Replace fluorescent bulbs with LED...",
      "category": "PURCHASED_ELECTRICITY",
      "potentialSavingKg": 500,
      "potentialCostSaving": 200,
      "implementationCost": 1000,
      "paybackMonths": 5,
      "priority": 1,
      "status": "PENDING"
    }
  ]
}
```

#### Update Recommendation Status

**PATCH** `/v1/recommendations/:id`

Update recommendation status (in progress, completed, dismissed).

**Request:**
```json
{
  "status": "IN_PROGRESS" | "COMPLETED" | "DISMISSED"
}
```

---

### Targets

#### Get Targets

**GET** `/v1/targets`

Get reduction targets.

#### Create Target

**POST** `/v1/targets`

Set a new reduction target.

**Request:**
```json
{
  "name": "30% reduction by 2025",
  "description": "Reduce overall emissions by 30%",
  "targetYear": 2025,
  "baselineYear": 2023,
  "baselineValue": 10000,
  "targetValue": 7000,
  "scope": "SCOPE_2"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE",
  "details": { ... }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `422` - Unprocessable Entity (business logic error)
- `500` - Internal Server Error

---

## Rate Limits

- **Free tier:** 100 requests/hour
- **Starter:** 1,000 requests/hour
- **Business:** 10,000 requests/hour
- **Enterprise:** Unlimited

Headers in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642262400
```

---

## Webhooks (Coming Soon)

Subscribe to events:
- `activity.created`
- `emission.calculated`
- `target.achieved`
- `recommendation.generated`

---

## SDKs (Coming Soon)

- JavaScript/TypeScript
- Python
- Ruby
- Go
