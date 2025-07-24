# Contributing to LearnSphere

Thank you for your interest in contributing to LearnSphere! This guide will help you get started with contributing to our e-learning platform.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Contributions](#making-contributions)
- [Code Style Guidelines](#code-style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. We expect all contributors to be respectful, inclusive, and professional.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- Git
- Basic knowledge of React, JavaScript, and modern web development

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/learnsphere-vite.git
   cd learnsphere-vite
   ```

3. **Add the original repository as upstream**:
   ```bash
   git remote add upstream https://github.com/jay2121js/learnsphere-vite.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🛠️ Making Contributions

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Help us improve the platform's stability
- **Feature additions** - Add new functionality to enhance user experience
- **UI/UX improvements** - Make the platform more intuitive and beautiful
- **Performance optimizations** - Help make the platform faster
- **Documentation** - Improve guides, comments, and examples
- **Testing** - Add tests to improve code reliability

### Branch Naming Convention

Use descriptive branch names that indicate the type of work:

- `feature/course-search-enhancement`
- `bugfix/video-player-loading-issue`
- `docs/api-integration-guide`
- `refactor/authentication-context`

## 📝 Code Style Guidelines

### React Components

1. **Use functional components** with hooks instead of class components
2. **File naming**: Use PascalCase for component files (e.g., `CourseCard.jsx`)
3. **Component structure**:
   ```jsx
   import React, { useState, useEffect } from 'react';
   import PropTypes from 'prop-types';

   const ComponentName = ({ prop1, prop2, ...props }) => {
     // Hooks at the top
     const [state, setState] = useState(initialValue);

     // Effects
     useEffect(() => {
       // Effect logic
     }, [dependencies]);

     // Event handlers
     const handleClick = () => {
       // Handler logic
     };

     // Render
     return (
       <div className="component-container">
         {/* Component JSX */}
       </div>
     );
   };

   ComponentName.propTypes = {
     prop1: PropTypes.string.isRequired,
     prop2: PropTypes.number,
   };

   ComponentName.defaultProps = {
     prop2: 0,
   };

   export default ComponentName;
   ```

### Styling Guidelines

1. **Use Tailwind CSS** for styling
2. **Responsive design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
3. **Custom CSS**: Only when Tailwind utilities are insufficient
4. **Class naming**: Keep classes organized and readable

### JavaScript/JSX Best Practices

1. **Use ES6+ features** (arrow functions, destructuring, async/await)
2. **Avoid inline styles** - prefer Tailwind classes
3. **Use meaningful variable names**
4. **Add comments for complex logic**
5. **Handle errors gracefully** with try-catch blocks

### API Integration

1. **Use the courseService pattern** for API calls
2. **Handle loading states** appropriately
3. **Provide user feedback** for async operations
4. **Implement proper error handling**

Example API service:
```javascript
const newService = {
  getData: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/endpoint/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data ${id}:`, error);
      throw new Error('Failed to load data. Please try again.');
    }
  },
};
```

## 🔍 Pull Request Process

1. **Create a feature branch** from the main branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Test your changes**:
   ```bash
   npm run dev      # Test in development
   npm run build    # Ensure build works
   npm run lint     # Check code style
   ```

4. **Commit your changes** with a descriptive message:
   ```bash
   git add .
   git commit -m "feat: add course search functionality"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Screenshots (if UI changes)
   - Reference to related issues

### Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested in development environment
- [ ] Build passes
- [ ] Lint checks pass

## Screenshots (if applicable)
Add screenshots of UI changes.

## Related Issues
Closes #[issue-number]
```

## 🐛 Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Test in the latest version** of the code
3. **Gather relevant information** (browser, OS, steps to reproduce)

### Issue Template

```markdown
## Bug Description
Clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: [e.g., Windows 10, macOS Big Sur]
- Browser: [e.g., Chrome 95, Firefox 94]
- Node.js version: [e.g., 18.0.0]
- npm version: [e.g., 8.0.0]

## Additional Context
Add any other context about the problem.
```

## 🧪 Testing Guidelines

### Manual Testing

1. **Test all affected features** after making changes
2. **Test responsive design** on different screen sizes
3. **Test in multiple browsers** (Chrome, Firefox, Safari, Edge)
4. **Test with different user scenarios** (logged in, guest, instructor)

### Automated Testing

While we don't have extensive automated tests yet, we encourage:

1. **Writing unit tests** for utility functions
2. **Component testing** for complex components
3. **Integration testing** for critical user flows

## 🏷️ Commit Message Guidelines

Use conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic changes)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add course progress tracking
fix: resolve video player loading issue
docs: update API integration guide
style: improve course card styling
refactor: simplify authentication context
```

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 💬 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Code Review** - Submit a PR and request review

## 🎉 Recognition

Contributors will be acknowledged in our README and release notes. We appreciate every contribution, no matter how small!

Thank you for contributing to LearnSphere! 🚀