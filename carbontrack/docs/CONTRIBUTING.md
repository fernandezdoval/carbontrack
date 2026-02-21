# Contributing to CarbonTrack

Thank you for your interest in contributing! This document provides guidelines and instructions.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

## How to Contribute

### Reporting Bugs

**Before submitting:**
- Check existing issues to avoid duplicates
- Verify the bug in the latest version

**What to include:**
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

**Template:**
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen.

**Screenshots**
If applicable.

**Environment:**
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 18.0.0]
```

### Suggesting Features

**Before submitting:**
- Check if the feature was already suggested
- Ensure it aligns with project goals

**What to include:**
- Clear description of the feature
- Why it's useful (use cases)
- Potential implementation approach
- Alternatives considered

### Pull Requests

**Process:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Update documentation
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

**PR Guidelines:**
- Link to related issue
- Describe what changed and why
- Include screenshots for UI changes
- Ensure all tests pass
- Follow code style guidelines

**Commit Message Format:**
```
type(scope): short description

Longer description if needed.

Fixes #123
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

---

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (for backend development)
- Git

### Initial Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/carbontrack.git
cd carbontrack

# Add upstream remote
git remote add upstream https://github.com/carbontrack/carbontrack.git

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
cd ../mobile && npm install
```

### Running Locally

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**Both (with Docker):**
```bash
docker-compose up
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests
npm run test:all
```

---

## Code Style

### JavaScript/React

We use ESLint with Airbnb config.

**Key conventions:**
- Use functional components and hooks
- Prefer const over let
- Use arrow functions
- Destructure props
- PropTypes for component props (or TypeScript)

**Example:**
```javascript
// Good
const EmissionCard = ({ title, value, trend }) => {
  const formattedValue = formatNumber(value);
  
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{formattedValue}</p>
    </div>
  );
};

// Not ideal
function EmissionCard(props) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.value}</p>
    </div>
  );
}
```

### CSS/Tailwind

- Use Tailwind utility classes when possible
- Group related classes logically
- Use component classes for repeated patterns
- Prefer semantic color names

```jsx
// Good
<button className="btn btn-primary">
  Click me
</button>

// Avoid inline custom styles
<button style={{ backgroundColor: '#22c55e' }}>
  Click me
</button>
```

### API Design

- RESTful endpoints
- Consistent naming (plural nouns)
- Use proper HTTP methods
- Return consistent error format
- Include pagination for lists

---

## Project Structure

```
carbontrack/
├── backend/           # Node.js API
│   ├── src/
│   │   ├── routes/    # API routes
│   │   ├── controllers/
│   │   ├── services/  # Business logic
│   │   ├── middleware/
│   │   └── utils/
│   └── prisma/        # Database schema
├── frontend/          # React web app
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/  # API calls
│       └── utils/
├── mobile/            # React Native app
├── data/              # Emission factors & reference data
└── docs/              # Documentation
```

---

## Testing Guidelines

### Unit Tests

Test individual functions and components in isolation.

```javascript
// backend/src/services/__tests__/calculator.test.js
import { calculateEmissions } from '../calculator';

describe('calculateEmissions', () => {
  it('should calculate electricity emissions correctly', () => {
    const result = calculateEmissions('electricity', 1000, { region: 'US' });
    expect(result.co2e).toBe(386);
  });
  
  it('should handle invalid input', () => {
    expect(() => calculateEmissions('invalid', -100))
      .toThrow('Invalid category');
  });
});
```

### Integration Tests

Test API endpoints end-to-end.

```javascript
// backend/src/routes/__tests__/activities.test.js
import request from 'supertest';
import app from '../../server';

describe('POST /api/v1/activities', () => {
  it('should create a new activity', async () => {
    const res = await request(app)
      .post('/api/v1/activities')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'PURCHASED_ELECTRICITY',
        value: 1000,
        date: '2024-01-01'
      });
    
    expect(res.status).toBe(201);
    expect(res.body.data.activity).toBeDefined();
  });
});
```

### Component Tests

Test React components with React Testing Library.

```javascript
// frontend/src/components/__tests__/EmissionCard.test.jsx
import { render, screen } from '@testing-library/react';
import EmissionCard from '../EmissionCard';

describe('EmissionCard', () => {
  it('renders title and value', () => {
    render(
      <EmissionCard 
        title="Total Emissions" 
        value={1234} 
      />
    );
    
    expect(screen.getByText('Total Emissions')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });
});
```

---

## Documentation

### Code Comments

- Use JSDoc for functions
- Explain "why", not "what"
- Keep comments up-to-date

```javascript
/**
 * Calculate CO2e emissions for an activity
 * @param {string} category - Emission category
 * @param {number} value - Amount in specified unit
 * @param {Object} options - Additional options (region, subcategory)
 * @returns {Object} Calculation result with CO2e and metadata
 */
export const calculateEmissions = (category, value, options = {}) => {
  // Implementation
};
```

### API Documentation

Update `/docs/API.md` when adding/changing endpoints.

### README Updates

Keep README files current in each directory.

---

## Emission Factor Updates

When adding or updating emission factors:

1. **Source Required:** Only use authoritative sources (EPA, DEFRA, IPCC, IEA)
2. **Document Source:** Include source, year, methodology
3. **Update Tests:** Add tests for new factors
4. **Version Bump:** Update version in `emission-factors.json`

**Example:**
```json
{
  "new_category": {
    "factor": 1.23,
    "unit": "kg",
    "source": "EPA 2024",
    "year": 2024,
    "notes": "Description of what this covers"
  }
}
```

---

## Release Process

1. Update version in `package.json` files
2. Update CHANGELOG.md
3. Tag release: `git tag -a v1.0.0 -m "Release 1.0.0"`
4. Push: `git push origin v1.0.0`
5. Create GitHub release with notes

**Semantic Versioning:**
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

---

## Need Help?

- **Discord:** [Join our community](#)
- **GitHub Discussions:** Ask questions
- **Email:** dev@carbontrack.app

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
