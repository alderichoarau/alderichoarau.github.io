# Landing Page - Aldéric Hoarau

## 🚀 Build & Deployment with GitHub Pages

This project is designed to be easily deployed on GitHub Pages, allowing you to host a static landing page for free.

### Build and Deployment Steps

1. **Push to the main branch (`main`)**:
	- Source files (`index.html`, `styles.css`, `script.js`, etc.) should be present at the root of the repository or in the appropriate folders.

2. **Enable GitHub Pages**:
	- Go to your repository settings (`Settings > Pages`).
	- Select the `main` branch and the `/root` folder as the source.
	- Save to activate hosting.

3. **Automatic Deployment**:
	- On each commit to `main`, GitHub Pages automatically rebuilds and publishes the latest version of the site.

4. **Access the landing page**:
	- The public URL is usually:
	  `https://<username>.github.io/<repo-name>/`

### Benefits

- **No server configuration required**
- **Instant deployment after each push**
- **Ideal for portfolios, resumes, landing pages, documentation**

### Best Practices

- Keep all static files at the root or in well-organized folders
- Ensure `index.html` is at the root
- Use relative paths for resources (images, CSS, JS)

---


##  Project Structure

```
landing-page/
├── index.html          # Main HTML file
├── styles.css          # External CSS file
├── script.js           # External JavaScript file
├── sections/           # Folder for separate HTML sections
│   ├── navigation.html # Navigation / Menu
│   ├── header.html     # Header with profile
│   ├── about.html      # About section
│   ├── skills.html     # Skills section
│   ├── experience.html # Experience section
│   ├── certifications.html # Certifications section
│   ├── languages.html  # Languages section
│   ├── contact.html    # Contact section
│   └── footer.html     # Footer
└── README.md           # Project documentation
```

## 🚀 Usage

### Full version (external files)
The `index.html` file uses external CSS and JavaScript files:
- **CSS:** `styles.css`
- **JavaScript:** `script.js`

### Separate sections
Each section is available in the `sections/` folder to facilitate:
- Maintenance
- Reusability
- Modular development

## 🎨 Features

### Navigation
- Fixed responsive menu
- Smooth scrolling to sections
- Mobile hamburger menu
- CTA button "Get In Touch"

### Sections
1. **Header** - Introduction with profile photo
2. **About** - Professional description
3. **Skills** - Key skills with icons
4. **Experience** - Experience timeline
5. **Certifications** - List of certifications
6. **Languages** - Spoken languages
7. **Contact** - Multiple contact buttons

### Design
- **Responsive** - Adapts to all screens
- **Modern** - Gradient backgrounds, glass-morphism
- **Interactive** - Hover animations, smooth transitions
- **Accessible** - FontAwesome icons, high contrast colors

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styles (Grid, Flexbox, Animations)
- **JavaScript** - Interactions (vanilla JS)
- **FontAwesome** - Vector icons
- **Google Fonts** - Inter font

## 📱 Responsive Design

- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🎯 Anchor Points

- `#home` - Header
- `#about` - About section
- `#skills` - Skills section
- `#experience` - Experience section
- `#certifications` - Certifications section
- `#contact` - Contact section

## 🔄 How to use separate sections

To integrate a section into another project:
1. Copy the HTML file of the desired section
2. Include the corresponding CSS styles from `styles.css`
3. Add JavaScript if needed (`script.js`)

---
*Project created with ❤️ for a modern professional presentation*
