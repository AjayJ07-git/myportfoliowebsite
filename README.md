# Ajay J - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing the skills, projects, and experience of Ajay J, an ML Developer and BTech Civil Engineering student at NIT Trichy.

![Portfolio Preview](profile_img.jpg)

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Theme Toggle**: Switch between light and dark modes with persistent preference storage
- **Smooth Navigation**: Smooth scrolling between sections with active state indicators
- **Animated Text**: Dynamic role text animation cycling through different developer roles
- **Interactive Elements**: Hover effects, fade-in animations, and dropdown menus
- **GitHub Integration**: Live GitHub contributions graph display
- **Resume Download**: Direct download link for the latest resume
- **Modern UI/UX**: Clean, professional design with modern aesthetics

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: [Boxicons](https://boxicons.com/) for social media and UI icons
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Poppins)
- **External APIs**: GitHub contributions chart integration

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── styles.css             # Main stylesheet
├── scripts.js             # JavaScript functionality
├── profile_img.jpg        # Profile image
├── avataaars.png         # Favicon/avatar
├── AjayJ_Linkedin_Resume.pdf  # Resume file
├── icons/                 # Skill icons directory
│   ├── c++.png
│   ├── python.png
│   ├── html.png
│   ├── css.png
│   ├── js.png
│   ├── react.png
│   ├── mysql.png
│   ├── github.png
│   ├── netlify.png
│   └── ms.png
└── README.md             # Project documentation
```

## 🚀 Live Demo

Visit the live portfolio website: [Add your deployed URL here]

## 💻 Local Development

### Prerequisites

- A modern web browser
- A local web server (optional, for testing)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AjayJ07-git/portfolio-website.git
   cd portfolio-website
   ```

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**
   - Direct file: `file:///path/to/index.html`
   - Local server: `http://localhost:8000`

## 📱 Sections

### 🏠 Home
- Introduction with animated role text
- Call-to-action button
- Professional profile image

### 👨‍💻 About
- Personal description and values
- Resume download button
- GitHub contributions graph

### 🛠️ Skills
- Technical skills with visual icons
- Technologies: C++, Python, HTML, CSS, JavaScript, React, MySQL, GitHub, Netlify, MS Office

### 💼 Portfolio
Featured projects:
- **Quantum AI Model**: Quantum-AI integration exploration
- **YOLOv5 Object Detection**: Image object detection implementation

### 🎓 Education
- BTech Civil Engineering, NIT Trichy (2022-Present) - 8.14 CGPA
- Class XII (94.20%) - Pushpalata Vidya Mandir
- Class X (83.60%) - Pushpalata Vidya Mandir

### 💼 Experience
- Research Intern (Natural Language Processing) at NIT Trichy (Jun-Jul 2024)

### 📞 Contact
- GitHub: [@AjayJ07-git](https://github.com/AjayJ07-git)
- LinkedIn: [Ajay J](https://www.linkedin.com/in/ajay-j-b1387031a/)
- Email: ajay.jofficial3@gmail.com

## ✨ Key Features Breakdown

### Theme Toggle
```javascript
// Persistent dark/light mode with localStorage
const currentTheme = localStorage.getItem('theme');
document.documentElement.setAttribute('data-theme', currentTheme || 'light');
```

### Smooth Navigation
- Automatic active state management
- Smooth scrolling with header offset calculation
- Dropdown menu for additional navigation items

### Animated Text
- Typewriter effect for role descriptions
- Cycles through: ML Developer, AI Developer, Web Developer, UI/UX Designer

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized for all screen sizes

## 🎨 Customization

### Updating Personal Information
1. **Profile Image**: Replace `profile_img.jpg` with your image
2. **Resume**: Replace `AjayJ_Linkedin_Resume.pdf` with your resume
3. **Contact Links**: Update social media and email links in `index.html`
4. **Content**: Modify sections in `index.html` to reflect your information

### Adding New Skills
1. Add skill icon to the `icons/` directory
2. Update the skills section in `index.html`:
   ```html
   <div class="skill-item">
       <img src="icons/your-skill.png" alt="Your Skill Icon" class="skill-icon">
       <p>Your Skill</p>
   </div>
   ```

### Adding New Projects
Update the portfolio section in `index.html`:
```html
<div class="portfolio-item">
    <h3>Project Title</h3>
    <p>Project description</p>
    <a href="project-link" class="btn-primary">View Project</a>
</div>
```

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build settings (usually not needed for static sites)
3. Deploy automatically on every push

### Other Platforms
- **Vercel**: Connect GitHub repo for automatic deployment
- **Surge.sh**: `npm install -g surge && surge`
- **Firebase Hosting**: Use Firebase CLI for deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal portfolio, contributions for improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📧 Contact

For any questions or suggestions, feel free to reach out:

- **Email**: ajay.jofficial3@gmail.com
- **LinkedIn**: [Ajay J](https://www.linkedin.com/in/ajay-j-b1387031a/)
- **GitHub**: [@AjayJ07-git](https://github.com/AjayJ07-git)

---

**Made with ❤️ by Ajay J**

*"Weaving Intelligence Into The Web: Where AI Meets Modern Development"*