# Robert McKercher - Academic Website

Academic website for Robert McKercher, Economist at McMaster University.

## Features

- Professional academic portfolio
- CV showcase
- Research papers listing
- Contact information
- Interactive research visualizations (coming soon)

## Getting Started

### Prerequisites

- Node.js 14+ and npm/yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Deployment to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import this repository
4. Click Deploy
5. Once deployed, add your custom domain (robertmckercher.ca) in Vercel settings

## Customization

### Add Your Photo

Replace the placeholder image in `pages/index.tsx`:

```tsx
<img src="/your-photo.jpg" alt="Robert McKercher" />
```

Place your photo in the `public/` directory.

### Add Your CV

Place your CV PDF as `public/cv.pdf`

### Update Papers with Briefs

Edit the `papers` array in `pages/index.tsx` to add descriptions and links.

### Add Interactive Visualizations

Create new pages in the `pages/` directory and add React components.

## License

MIT