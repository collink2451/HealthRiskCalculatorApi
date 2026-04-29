# Health Risk Calculator API

Node.js/Express REST API that calculates health insurance risk scores based on age, BMI, blood pressure, and family disease history. Used by the [health-risk-calculator-client](../health-risk-calculator-client) frontend.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/ping` | Health check — returns `Pong!` |
| `POST` | `/calculate_risk` | Calculate overall risk score from pre-scored factors |
| `POST` | `/age_to_points` | Convert age to risk points |
| `POST` | `/bmi_to_points` | Convert height/weight to BMI risk points |
| `POST` | `/bp_to_points` | Convert blood pressure to risk points |
| `POST` | `/disease_to_points` | Convert family disease flags to risk points |

### Risk Scoring

Each endpoint returns a `points` value and a Bootstrap color class (`bg-success`, `bg-warning`, `bg-danger`, `bg-warning-subtle`) for display purposes.

**Overall risk tiers:**

| Score | Risk Level |
|-------|-----------|
| ≤ 20 | Low Risk |
| 21–50 | Moderate Risk |
| 51–75 | High Risk |
| > 75 | Uninsurable |

## Request Bodies

**`/age_to_points`**
```json
{ "age": 35 }
```

**`/bmi_to_points`**
```json
{ "height": 70, "weight": 160 }
```
Height in inches, weight in pounds.

**`/bp_to_points`**
```json
{ "systolic": 120, "diastolic": 80 }
```

**`/disease_to_points`**
```json
{ "diabetes": false, "cancer": true, "alzhe": false }
```

**`/calculate_risk`**
```json
{ "age": 0, "bmi": 30, "bp": 15, "disease": 10 }
```
Pass the `points` values returned by each individual endpoint.

## Setup

### Requirements

- Node.js 18+

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
PORT=3000
```

3. Start the server:

```bash
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start with nodemon (auto-restarts on changes) |
