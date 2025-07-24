# Frequently Asked Questions

## General Questions

### What is LearnSphere?
LearnSphere is a modern e-learning platform built with React and Vite. It provides features for course browsing, video streaming, user authentication, and learning progress tracking.

### What technologies does LearnSphere use?
- **Frontend**: React 19.1.0, Vite 6.3.5, Tailwind CSS 4.1.10
- **Routing**: React Router DOM 7.6.2
- **UI/UX**: Framer Motion, Headless UI, Heroicons
- **Media**: HLS.js, Plyr, React Player for video streaming
- **API**: Axios for HTTP requests
- **Authentication**: Google OAuth integration

## Development Questions

### How do I get started with development?
1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and configure variables
4. Run `npm run dev`

See the [README.md](README.md) for detailed instructions.

### What environment variables do I need?
- `VITE_BACKEND_URI` - Your backend API URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `VITE_GOOGLE_REDIRECT_URI` - OAuth redirect URL

### Why am I getting API errors?
1. **Check environment variables** - Ensure `VITE_BACKEND_URI` is set correctly
2. **Backend connectivity** - Verify your backend is running and accessible
3. **CORS issues** - Make sure CORS is configured on your backend
4. **Network errors** - Check browser console for detailed error messages

### How do I add a new page?
1. Create the page component in `src/Pages/`
2. Add the route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx` if needed

### How do I add a new API service?
1. Create or modify service files in `src/Services/`
2. Follow the pattern used in `courseService.jsx`
3. Add proper error handling and JSDoc comments

### Why isn't my build working?
1. **Clear cache**: `rm -rf node_modules package-lock.json && npm install`
2. **Check dependencies**: Ensure all dependencies are compatible
3. **Environment variables**: Verify all required env vars are set
4. **TypeScript errors**: Check for any type errors (if using TypeScript)

## Features Questions

### How does authentication work?
LearnSphere uses Google OAuth for authentication. The flow:
1. User clicks login → redirected to Google
2. Google authorization → redirect back to app
3. Backend validates token → creates session
4. Frontend stores session state

### How does video streaming work?
The platform supports multiple video formats:
- **HLS streaming** with HLS.js
- **Regular video files** with Plyr
- **YouTube/Vimeo** with React Player

### Is the platform mobile-friendly?
Yes! LearnSphere is built with mobile-first responsive design using Tailwind CSS. All features work on mobile devices.

### How do I customize the styling?
LearnSphere uses Tailwind CSS for styling:
1. **Utility classes** - Use existing Tailwind classes
2. **Custom CSS** - Add to `src/index.css` when needed
3. **Components** - Create styled components in `src/components/`

## Deployment Questions

### How do I deploy to production?
1. **Build the project**: `npm run build`
2. **Choose platform**: Vercel, Netlify, AWS, etc.
3. **Configure environment variables** for production
4. **Set up domain** and SSL certificate

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed guides.

### What about SEO?
- Meta tags are handled in `index.html`
- For better SEO, consider server-side rendering with Next.js
- Use proper heading hierarchy and semantic HTML

### How do I set up analytics?
Add your analytics code to `index.html` or create a dedicated analytics service component.

## Troubleshooting

### Application shows blank page
1. Check browser console for JavaScript errors
2. Verify environment variables are set
3. Ensure all dependencies are installed
4. Check that your backend is accessible

### Videos won't play
1. **Check video URLs** - Ensure they're accessible
2. **CORS issues** - Video hosting might block cross-origin requests
3. **Format support** - Ensure video format is supported
4. **Network** - Check internet connection

### Authentication not working
1. **Google OAuth setup** - Verify client ID and redirect URI
2. **Backend configuration** - Check OAuth settings on backend
3. **Environment variables** - Ensure all OAuth vars are set
4. **Domain authorization** - Add your domain to Google Console

### Slow performance
1. **Bundle size** - Check for large dependencies
2. **Images** - Optimize and compress images
3. **Code splitting** - Implement lazy loading for routes
4. **Caching** - Configure proper caching headers

### Build size too large
1. **Analyze bundle** - Use bundle analyzer tools
2. **Remove unused code** - Tree shake dependencies
3. **Code splitting** - Split large chunks
4. **Dynamic imports** - Lazy load components

## Contributing

### How do I contribute?
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Submit a pull request

### What should I contribute?
- Bug fixes
- New features
- UI/UX improvements
- Performance optimizations
- Documentation improvements
- Tests

### Code style guidelines?
- Use functional components with hooks
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Use Tailwind CSS for styling
- Write meaningful commit messages

## Need More Help?

- **Documentation**: Check [README.md](README.md) and [docs/](docs/) folder
- **Issues**: Open a GitHub issue
- **API Documentation**: See [docs/API.md](docs/API.md)
- **Deployment**: Check [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)