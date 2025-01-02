# REVA - Real Estate Virtual Assistant 🏢

An AI-powered real estate analysis tool that leverages OpenAI's Assistant API to provide instant property insights, market analysis, and valuation support.

## 🌟 Features

### Property Analysis
- Market cap rate calculations
- Tenant layout analysis
- Price per square foot analysis
- Investment cycle tracking
- Value assessments
- Occupancy monitoring

### Location Intelligence
- Traffic count data integration
- Infrastructure project tracking
- Location optimization analysis
- DOT project monitoring

### Market Analysis
- Coverage of 45 Atlanta submarkets
- Vacancy rate tracking
- Rent growth trends
- Asset value calculations
- Market comparables

### Financial Tools
- Investment cycle analysis
- Depreciation calculations
- Tenant credit ratings
- Interest rate monitoring
- Fed funds rate tracking

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **AI:** OpenAI Assistant API
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/raheesahmed/reva.git
cd reva
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your OpenAI API key:
```env
OPENAI_API_KEY=your_key_here
OPENAI_ASSISTANT_ID=your_assistant_id
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to start using REVA.

## 📁 Project Structure

```
REVA/
├── app/
│   ├── api/
│   │   └── assistant/
│   ├── page.tsx
│   ├── analysis/
│   └── layout.tsx
├── components/
│   ├── ui/
│   └── custom/
├── lib/
│   ├── assistant.ts
│   └── market-data.ts
└── public/
```

## 🤖 OpenAI Assistant Configuration

```typescript
const assistant = await openai.beta.assistants.create({
  name: "REVA",
  instructions: `You are REVA, a specialized real estate analysis assistant.
  Your primary functions include:
  - Analyzing property metrics and market data
  - Providing insights on location value
  - Calculating financial metrics
  - Tracking infrastructure projects
  - Monitoring tenant credit ratings`,
  tools: [
    { type: "code_interpreter" },
    { type: "retrieval" }
  ],
  model: "gpt-4-turbo-preview"
});
```

## 💡 Usage Examples

1. **Property Analysis**
```typescript
// Ask REVA about a property
const analysis = await reva.analyzeProperty({
  address: "236 Thornton Road",
  propertyType: "Retail",
  submarket: "Atlanta"
});
```

2. **Market Research**
```typescript
// Get market insights
const insights = await reva.getMarketInsights({
  submarket: "Atlanta",
  propertyType: "Retail"
});
```

## 🔄 Data Sources

REVA integrates with:
- Department of Transportation (GDOT)
- Federal Reserve Economic Data (FRED)
- CoStar market data
- Credit rating agencies

## 🛠️ Local Development

1. Make your changes
2. Start the development server
3. Test your features
4. Deploy to Vercel

## 📊 Features in Development

- Enhanced market data visualization
- Advanced property comparables
- Expanded infrastructure project tracking
- Real-time market updates
- Custom report generation

## 🤝 Contributing

Feel free to:
- Submit bug reports
- Propose new features
- Improve documentation

## 📧 Contact

Your Name - Rahees Ahmed

Project Link: [https://github.com/raheesahmed/reva](https://github.com/raheesahmed/reva)