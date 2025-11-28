# ITRF (Global) Ltd - Angular Application

A modern Angular application featuring a sleek dark theme with golden accents, built with Tailwind CSS.

## Features

- ⚡ Angular 19 (Standalone Components)
- 🎨 Tailwind CSS for styling
- 🔀 Angular Router for navigation
- 🌙 Dark mode by default with gold accents
- 📱 Fully responsive design
- 🎯 Modern UI with backdrop blur effects
- 📝 Reactive forms with validation

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

### Build

Create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

Run unit tests:
```bash
npm test
```

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.css
│   │   ├── about/
│   │   │   ├── about.component.ts
│   │   │   ├── about.component.html
│   │   │   └── about.component.css
│   │   └── contact/
│   │       ├── contact.component.ts
│   │       ├── contact.component.html
│   │       └── contact.component.css
│   ├── app.component.ts      # Root component with navigation
│   ├── app.routes.ts         # Application routes
│   └── app.config.ts         # Application configuration
├── index.html                # Main HTML file
├── main.ts                   # Application entry point
└── styles.css                # Global styles with Tailwind
```

## Pages

### Home (`/`)
- Hero section with call-to-action buttons
- Feature cards highlighting company strengths
- Benefits section explaining why choose us
- Fully responsive grid layout

### About (`/about`)
- Company introduction
- Mission and Vision cards
- Core Values section with icons
- Professional card-based layout

### Contact (`/contact`)
- Contact form with validation
- Name, Email, and Message fields
- Form submission handling
- Contact information cards (Email, Phone, Location)

## Technologies

- **Angular**: 19.2.0
- **TypeScript**: 5.7.2
- **Tailwind CSS**: 3.4.10
- **RxJS**: 7.8.0

## Angular Features Used

- ✅ Standalone Components (no NgModules needed)
- ✅ Signal-based architecture ready
- ✅ Angular Router with lazy loading support
- ✅ Reactive Forms (FormsModule)
- ✅ CommonModule for directives
- ✅ TypeScript strict mode

## Styling

### Color Scheme
The application uses a custom dark theme with golden accents:
- **Primary (Gold)**: `#d4af37` - Used for highlights and active states
- **Background**: Dark blue (`#0a1628`)
- **Cards**: Slightly lighter dark with borders
- **Text**: White with various opacity levels

### Custom CSS Classes
Defined in `src/styles.css`:
- `.btn` - Button base styles
- `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button variants
- `.btn-sm`, `.btn-default`, `.btn-lg` - Button sizes
- `.card` - Card container
- `.card-header`, `.card-title`, `.card-description`, `.card-content` - Card sections
- `.input`, `.label`, `.textarea` - Form elements

## Customization

### Changing Colors

Edit the CSS variables in `src/styles.css`:
```css
:root {
  --primary: 45 100% 51%;  /* Gold accent */
  --background: 222.2 84% 4.9%;  /* Dark background */
  /* ... more variables */
}
```

### Adding New Components

Generate a new component:
```bash
ng generate component pages/new-page --standalone
```

Add the route in `src/app/app.routes.ts`:
```typescript
{ path: 'new-page', component: NewPageComponent }
```

### Tailwind Configuration

Edit `tailwind.config.js` to customize Tailwind settings, add custom colors, or extend the default theme.

## Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 4200 |
| `npm run build` | Build for production |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests |
| `ng generate component name` | Generate new component |
| `ng generate service name` | Generate new service |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private

## Contact

For questions or support, visit the Contact page or email info@itrfglobal.com
