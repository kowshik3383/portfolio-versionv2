# Portfolio with AI Blog System

A modern Next.js portfolio with an automated AI blog generation system using Gemini API.

## 🚀 Features

### Portfolio
- Modern, responsive design
- Project showcase
- Skills and experience sections
- Custom animations and interactions

### AI Blog System
- **3 blogs generated daily** using Gemini API
- **Structured content types:**
  - 🔥 Problem Posts (negative SEO)
  - ⚡ Solution Posts (fixes)
  - 🚀 Opinion Posts (trends)
- **MDX format** for rich content
- **Automated scheduling** with cron jobs
- **Smart filtering** by type and tags

## 🛠️ Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MDX** for blog content
- **Gemini API** for AI content generation
- **pnpm** for package management

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-versionv2
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🎯 Usage

### Development
```bash
pnpm dev
```

### Build & Start
```bash
pnpm build
pnpm start
```

### Generate Blogs Manually
```bash
pnpm run generate:blogs
```

### Set Up Daily Automation
```bash
./scripts/setupCron.sh
```

## 📝 Blog System

### Content Strategy
The system generates three types of blogs daily:

1. **Problem Posts** - "Why X is bad/broken/failing"
2. **Solution Posts** - "How to fix X"  
3. **Opinion Posts** - "Is X worth it in 2026?"

### Topics Covered
- Next.js performance issues
- React mistakes developers make
- Frontend security vulnerabilities
- TypeScript best practices
- CSS Grid vs Flexbox
- API design patterns
- State management in 2026
- Web accessibility mistakes
- Database optimization tips
- Docker for frontend developers

### File Structure
```
content/blogs/
├── 2026-04-19-why-nextjs-apps-become-slow.mdx
├── 2026-04-19-fix-nextjs-performance.mdx
├── 2026-04-19-is-nextjs-worth-it.mdx
└── [auto-generated daily]
```

## 🔧 Configuration

### Environment Variables
- `GEMINI_API_KEY` - Your Gemini API key
- `BLOG_TOPICS` - Comma-separated list of topics (optional)
- `BLOG_TYPES` - Comma-separated list of blog types (optional)

### Cron Job
The system sets up a daily cron job at 9:00 AM:
```bash
0 9 * * * cd /path/to/portfolio && pnpm run generate:blogs
```

## 🎨 Design Principles

### SEO Optimization
- Structured content types for better indexing
- Rich metadata and Open Graph tags
- Semantic HTML structure
- Performance-optimized images

### User Experience
- Fast loading times
- Mobile-responsive design
- Intuitive navigation
- Dark theme with purple accents

### Content Quality
- Human-like tone and style
- Real-world examples and code
- Problem-focused approach
- Actionable solutions

## 🚨 Important Notes

### AI Content Guidelines
- **Don't just generate and publish** - always review content
- **Add personal insights** - tweak intros and add real examples
- **Maintain quality** - avoid AI spam detection
- **Monitor performance** - track SEO results

### Best Practices
1. Review generated content before publishing
2. Add personal experiences and examples
3. Update with current information
4. Monitor Google Search Console
5. Track user engagement metrics

## 🤖 AI Integration

### Gemini API Usage
- Uses `gemini-pro` model for content generation
- Configurable temperature for creativity control
- Rate limiting to avoid API limits
- Error handling for failed generations

### Content Generation Process
1. Fetch topics and types
2. Generate content via Gemini API
3. Parse and validate MDX format
4. Save to content directory
5. Log generation results

## 📊 Monitoring

### Logs
- Cron job logs saved to `cron.log`
- Generation status and errors
- Performance metrics

### Manual Testing
```bash
# Test blog generation
pnpm run generate:blogs

# Check generated files
ls content/blogs/

# View logs
tail -f cron.log
```

## 🎯 Future Enhancements

- [ ] Dynamic topic suggestions based on trends
- [ ] Social media auto-sharing
- [ ] Newsletter integration
- [ ] Comment system
- [ ] Related posts algorithm
- [ ] Analytics dashboard

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create a GitHub issue
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Next.js and AI**