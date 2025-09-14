# QR Code Generator

A modern, feature-rich QR Code Generator built with React, TypeScript, and Chakra UI. Generate QR codes for various content types with customizable styling options, history management, and multiple export formats.

## 🚀 Features

### Content Types Supported
- **Text** - Plain text content
- **URL** - Website links (automatically adds https://)
- **Email** - Email addresses (mailto: links)
- **Phone** - Phone numbers (tel: links)
- **WiFi** - WiFi network credentials
- **Contact (vCard)** - Contact information in vCard format

### Customization Options
- **Size Control** - Adjustable QR code dimensions
- **Color Customization** - Custom foreground and background colors
- **Error Correction** - Multiple error correction levels
- **Logo Integration** - Add custom logos to QR codes
- **Custom Text** - Add text labels above QR codes
- **Margin Control** - Adjustable white space around QR codes

### Advanced Features
- **History Management** - Save and revisit previously generated QR codes
- **Multiple Export Options** - Download as PNG/JPEG or copy to clipboard
- **Print Functionality** - Direct printing with formatted layout
- **Dark/Light Mode** - Toggle between color themes
- **Responsive Design** - Works seamlessly on all devices
- **Local Storage** - Persistent history across browser sessions

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Chakra UI** - Component library for consistent UI
- **Framer Motion** - Smooth animations and transitions
- **QRCode Libraries** - Multiple QR code generation libraries
- **Lucide React** - Modern icon system

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd qr-code-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📱 Usage Guide

### Generating QR Codes

1. **Select Content Type**
   - Choose from Text, URL, Email, Phone, WiFi, or Contact
   - Each type has specific formatting requirements

2. **Enter Content**
   - Follow the placeholder text for correct formatting
   - WiFi format: `NetworkName|Password|Security`
   - Contact format: `Name|Phone|Email`

3. **Customize Appearance** (Optional)
   - Adjust size, colors, and margins
   - Add custom logos or text labels
   - Set error correction level

4. **Generate & Export**
   - Download as image file
   - Copy to clipboard
   - Print with formatted layout

### Content Type Examples

```bash
# URL
google.com
https://example.com

# Email
user@example.com

# Phone
+1-555-123-4567

# WiFi
MyNetwork|MyPassword|WPA

# Contact (vCard)
John Doe|555-123-4567|john@example.com
```

## 🎨 Customization Options

### QR Code Settings
- **Size**: 128px - 512px
- **Margin**: 0 - 20 modules
- **Colors**: Any hex color values
- **Error Correction**: L, M, Q, H levels

### Logo Settings
- **Size**: 10% - 40% of QR code size
- **Format**: PNG, JPEG, SVG supported
- **Positioning**: Automatically centered

### Text Labels
- **Position**: Above QR code
- **Styling**: Bold, centered alignment
- **Color**: Matches foreground color

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ActionButtons.tsx
│   ├── ContentInput.tsx
│   ├── ContentTypeSelector.tsx
│   ├── Header.tsx
│   ├── HistoryModal.tsx
│   ├── HistoryPanel.tsx
│   ├── InfoPanel.tsx
│   ├── QRCodeDisplay.tsx
│   └── SettingsPanel.tsx
├── types/               # TypeScript type definitions
│   └── index.ts
├── pages/              # Page components
│   └── Home.tsx
└── App.tsx             # Main application component
```

## 🔧 Key Dependencies

- **@chakra-ui/react** - UI component library
- **qrcode** & **qrcode.react** - QR code generation
- **lucide-react** - Modern icons
- **framer-motion** - Animations
- **@emotion/react** - CSS-in-JS styling

## 💾 Data Storage

- **Local Storage** - QR code history (up to 10 items)
- **Session State** - Current settings and configurations
- **No External APIs** - Fully client-side application

## 🌙 Theme Support

The application supports both light and dark modes with:
- Automatic system preference detection
- Manual toggle option
- Consistent color schemes across all components
- Persistent theme selection

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoints** - Responsive grid layouts
- **Touch Friendly** - Accessible on all screen sizes
- **Performance** - Optimized for various devices

## 🔒 Privacy & Security

- **Client-Side Only** - No data sent to external servers
- **Local Storage** - All data stored locally in browser
- **No Tracking** - No analytics or tracking scripts
- **Open Source** - Transparent codebase

## 🚀 Performance Features

- **Fast Builds** - Vite for lightning-fast development
- **Code Splitting** - Optimized bundle sizes
- **Lazy Loading** - Components loaded on demand
- **Caching** - Browser caching for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request







---
