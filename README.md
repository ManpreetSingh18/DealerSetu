# DealerSetu - Property Dealer Network

A Progressive Web App (PWA) designed specifically for property dealers/brokers in India to manage their inventory and share properties with other dealers.

## 🚀 Features

- **Property Management**: Add, edit, and organize your property inventory
- **Public/Private Properties**: Share properties with other dealers or keep them private
- **Community Dashboard**: Browse properties shared by other dealers
- **Direct Contact**: Call or WhatsApp property owners directly
- **Mobile-First Design**: Optimized for smartphone usage
- **PWA Support**: Installable like a native app

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: TailwindCSS + Shadcn UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **PWA**: next-pwa plugin
- **Deployment**: Vercel

## 🎨 Design System

### Color Palette
- **Primary**: #2563EB (Deep Blue)
- **Accent**: #F97316 (Orange)
- **Background**: #F9FAFB (Light Gray)
- **Success**: #22C55E (Green - Available)
- **Error**: #DC2626 (Red - Rented/Sold)

### Key Features
- Mobile-first responsive design
- Large touch targets (44px minimum)
- WhatsApp-inspired interface
- High contrast for readability
- Card-based layout with clear hierarchy

## 📱 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd dealer-setu
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Add your Supabase credentials
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Project Status

### ✅ Completed
- [x] Project setup with Next.js + TailwindCSS + Shadcn UI
- [x] PWA configuration
- [x] Basic UI components and layout
- [x] Color scheme and design system
- [x] Mobile-first responsive design

### 🚧 In Progress
- [ ] Supabase database setup
- [ ] User authentication system
- [ ] Property form implementation
- [ ] Dashboard functionality

### 📅 Planned
- [ ] Location search with default options
- [ ] Property image upload
- [ ] Push notifications
- [ ] Hindi language support

## 🏗️ Project Structure

```
dealer-setu/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/          # Shadcn UI components
│   └── lib/
│       └── utils.ts     # Utility functions
├── public/
│   ├── manifest.json    # PWA manifest
│   └── icon.svg         # App icon
└── next.config.js       # Next.js configuration
```

## 🎯 Target Users

- **Primary**: Local Indian property dealers/brokers
- **Age**: 25-55
- **Tech Comfort**: WhatsApp-savvy, limited app usage
- **Language**: English (Hindi planned for future)

## 📄 License

This project is private and proprietary.

---

**DealerSetu** - Connecting property dealers across India 🏠