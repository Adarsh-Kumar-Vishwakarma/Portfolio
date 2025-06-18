# Portfolio Frontend

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a beautiful dark theme with smooth animations and a functional contact form that integrates with a backend API.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with smooth responsive breakpoints
- **Dark Theme**: Modern dark color scheme with blue accents
- **Smooth Scrolling**: Seamless navigation between sections
- **Contact Form**: Functional contact form with backend integration
- **Social Links**: Direct links to LinkedIn, GitHub, and email
- **Resume Download**: Direct download link to resume

### Sections
1. **Hero Section**: Introduction with call-to-action buttons
2. **About Section**: Personal information and background
3. **Projects Section**: Showcase of portfolio projects
4. **Skills Section**: Technical skills and expertise
5. **Contact Section**: Contact form and information

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **React Router**: Client-side routing
- **React Query**: Data fetching and caching
- **Form Validation**: Client-side form validation
- **Toast Notifications**: User feedback for form submissions
- **Loading States**: Visual feedback during form submission
- **Error Handling**: Comprehensive error handling for API calls

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1**: Modern React with hooks
- **TypeScript 5.5.3**: Type-safe JavaScript
- **Vite 5.4.1**: Fast build tool and dev server
- **Tailwind CSS 3.4.11**: Utility-first CSS framework

### UI Components
- **Radix UI**: Accessible component primitives
- **Shadcn/ui**: Beautiful, accessible components
- **Lucide React**: Modern icon library
- **Tailwind CSS Animate**: Smooth animations

### Form & Data
- **React Hook Form**: Performant forms with validation
- **Zod**: Schema validation
- **React Query**: Data fetching and caching
- **Sonner**: Toast notifications

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── About.tsx     # About section component
│   │   ├── Contact.tsx   # Contact form component
│   │   ├── Hero.tsx      # Hero section component
│   │   ├── Navigation.tsx # Navigation component
│   │   ├── Projects.tsx  # Projects section component
│   │   └── Skills.tsx    # Skills section component
│   ├── hooks/
│   │   ├── use-mobile.tsx # Mobile detection hook
│   │   └── use-toast.ts  # Toast notification hook
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── pages/
│   │   ├── Index.tsx     # Main page component
│   │   └── NotFound.tsx  # 404 page component
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 24.2.0+** (Recommended: v24.2.0 or higher)
- **npm or yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### Environment Variables
The frontend connects to the backend API. Make sure your backend is running on the correct port (default: `http://localhost:3001`).

### Vite Configuration
- **Port**: 8080 (development)
- **Host**: All interfaces (`::`)
- **Aliases**: `@` points to `src/` directory

### Tailwind Configuration
- **Dark mode**: Class-based
- **Custom animations**: Fade-in effects
- **Custom colors**: Blue accent colors
- **Responsive breakpoints**: Mobile-first approach

## 📱 Contact Form Integration

The contact form integrates with the backend API:

### API Endpoint
- **URL**: `http://localhost:3001/api/contact`
- **Method**: POST
- **Content-Type**: application/json

### Form Fields
- `name` (required): User's name
- `email` (required): User's email address
- `subject` (required): Message subject
- `message` (required): Message content

### Error Handling
The form handles various error scenarios:
- **Network errors**: Connection issues
- **Validation errors**: Backend validation failures
- **Rate limiting**: Too many submissions
- **Service errors**: Email service unavailable

### Success Flow
1. Form submission with loading state
2. API call to backend
3. Success toast notification
4. Form reset
5. Email sent to portfolio owner

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.ts`:
- Primary blue: `blue-400`, `blue-600`, `blue-700`
- Background: `gray-900`, `gray-800`
- Text: `white`, `gray-300`, `gray-400`

### Content
Update the following files to customize content:
- `src/components/Hero.tsx`: Hero section content
- `src/components/About.tsx`: About section content
- `src/components/Projects.tsx`: Project showcase
- `src/components/Skills.tsx`: Skills and expertise
- `src/components/Contact.tsx`: Contact information

### Styling
- Global styles: `src/index.css`
- Component styles: Tailwind classes in components
- Animations: `tailwind.config.ts` keyframes

## 🚀 Deployment

### Static Hosting
The built application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service

### Popular Hosting Options
- **Vercel**: Automatic deployments from Git
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Free hosting for public repositories
- **Firebase Hosting**: Google's hosting service

### Environment Configuration
For production deployment, update the API endpoint in `src/components/Contact.tsx`:
```typescript
const response = await fetch('https://your-backend-domain.com/api/contact', {
  // ... rest of the code
});
```

## 🔍 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Code Style
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (if configured)
- **TypeScript**: Strict type checking

### Component Structure
Each component follows a consistent pattern:
- Functional components with TypeScript
- Tailwind CSS for styling
- Props interface for type safety
- Export default for easy imports

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 8080
   npx kill-port 8080
   ```

2. **TypeScript errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

3. **Tailwind styles not working**
   ```bash
   # Rebuild Tailwind CSS
   npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
   ```

4. **API connection issues**
   - Ensure backend is running on correct port
   - Check CORS configuration in backend
   - Verify API endpoint URL

### Performance Optimization
- **Code splitting**: React.lazy for route-based splitting
- **Image optimization**: Use optimized images
- **Bundle analysis**: `npm run build -- --analyze`

## 📄 License

This project is part of a portfolio website. Feel free to use and modify for your own portfolio.

## 🤝 Contributing

This is a personal portfolio project. For questions or suggestions, please open an issue or contact the developer.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
