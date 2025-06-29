# TaskFlow - Personal Productivity Companion

**[🌐 Try Live Demo](https://taskflow-rho-liart.vercel.app)**

A modern, responsive todo application built with vanilla JavaScript, HTML, and CSS. TaskFlow helps users manage their tasks across different stages (Todo, Completed, Archived) with a clean, intuitive interface.

## 🚀 Features

### Core Functionality

- **Age Verification**: Users must be over 10 years old to access the application
- **User Registration**: Simple name and date of birth registration
- **Task Management**: Create, move, delete, and organize tasks across three stages
- **Data Persistence**: All data is saved locally using browser localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Task Stages

- **Todo**: Active tasks that need to be completed
- **Completed**: Tasks that have been finished
- **Archived**: Tasks that are no longer active but kept for reference

### User Experience

- **Profile Integration**: User avatar generated using UI Avatars API
- **Real-time Counters**: Dynamic task counts for each stage
- **Timestamp Tracking**: Last modified timestamps for all tasks
- **Smooth Animations**: Beautiful transitions and hover effects
- **Form Validation**: Comprehensive input validation with user-friendly error messages

### API Integration

- **UI Avatars API**: Automatic profile picture generation based on user name
- **DummyJSON API**: Initial dummy data loading for first-time users

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser localStorage
- **APIs**: UI Avatars API, DummyJSON API
- **Design**: Modern gradient design with Inter font
- **Responsive**: Mobile-first responsive design

## 📁 Project Structure

```
taskflow/
├── index.html          # Landing page with age verification
├── app.html            # Main application interface
├── styles.css          # Comprehensive styling
├── landing.js          # Landing page functionality
├── app.js              # Main application logic
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Quick Start (Easiest Method)

**Method 1: Direct Browser Opening**

1. Download or clone the project files
2. Navigate to the project folder
3. Double-click on `index.html` to open in your default browser
4. Start using TaskFlow!

**Note**: This method works but some features (like API calls) might be limited due to CORS policies.

### Local Development (Recommended)

**Method 2: Using Python (Built-in)**

```bash
# Navigate to project directory
cd taskflow

# Python 3
python3 -m http.server 8000

# Python 2 (if available)
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser

**Method 3: Using Node.js**

```bash
# Navigate to project directory
cd taskflow

# Using npx (no installation required)
npx http-server

# Using http-server (if installed globally)
npm install -g http-server
http-server

# Using live-server (auto-reload on changes)
npm install -g live-server
live-server
```

**Method 4: Using PHP**

```bash
# Navigate to project directory
cd taskflow

# PHP built-in server
php -S localhost:8000
```

**Method 5: Using VS Code Live Server**

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

**Method 6: Using Python with specific port**

```bash
# Navigate to project directory
cd taskflow

# Custom port (e.g., 3000)
python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser

### Installation Steps

1. **Clone or download** the project files
2. **Choose your preferred method** from above
3. **Open the application** in your browser
4. **Register** with your name and date of birth
5. **Start managing** your tasks!

### Troubleshooting

**If you see CORS errors:**

- Use a local web server (Methods 2-6 above)
- Don't use direct file opening (Method 1)

**If the page doesn't load:**

- Check that all files are in the same directory
- Ensure you're opening `index.html` (not `app.html`)
- Try a different browser

**If APIs don't work:**

- Make sure you're using a local web server
- Check your internet connection
- The app will show fallback data if APIs fail

### Browser Compatibility

- ✅ **Chrome** (recommended)
- ✅ **Firefox**
- ✅ **Safari**
- ✅ **Edge**
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📱 Usage Guide

### First Time Setup

1. **Age Verification**: Enter your name and date of birth
2. **Validation**: System ensures you're over 10 years old
3. **Registration**: Data is saved locally for future visits
4. **Auto-redirect**: You'll be automatically taken to the main app

### Task Management

1. **Adding Tasks**: Use the input field at the top to add new tasks
2. **Moving Tasks**: Use action buttons to move tasks between stages
3. **Deleting Tasks**: Click the 🗑️ icon in the top-right corner of any task card to permanently delete it
4. **Task Actions**:
   - **Todo Stage**: "Mark as Completed" or "Archive"
   - **Completed Stage**: "Move to Todo" or "Archive"
   - **Archived Stage**: "Move to Todo" or "Move to Completed"
   - **All Stages**: Delete icon (🗑️) for permanent removal

### User Profile

- **Avatar**: Automatically generated based on your name
- **Sign Out**: Clear all data and return to landing page
- **Persistence**: Your data remains across browser sessions

## 🎨 Design Features

### Visual Design

- **Modern Gradient**: Beautiful purple-blue gradient background
- **Card-based Layout**: Clean, organized task cards
- **Color Coding**: Different colors for each task stage
- **Smooth Animations**: Hover effects and transitions

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: Adapts to different screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Readable Typography**: Clear, accessible text

## 🔧 Technical Implementation

### Key Classes and Methods

#### LandingPage Class (`landing.js`)

- `validateName()`: Name validation with regex
- `validateAge()`: Age calculation and verification
- `saveUserData()`: localStorage data persistence
- `checkExistingUser()`: Auto-redirect for returning users

#### TaskFlowApp Class (`app.js`)

- `loadDummyData()`: API integration for initial data
- `moveTask()`: Task stage transitions
- `renderAllTasks()`: Dynamic UI updates
- `showNotification()`: User feedback system

### Data Structure

```javascript
// User Data
{
  name: "User Name",
  dateOfBirth: "1990-01-01",
  registrationDate: "2024-01-01T00:00:00.000Z"
}

// Task Data
{
  id: "unique_id",
  title: "Task Title",
  timestamp: "2024-01-01T00:00:00.000Z",
  lastModified: "2024-01-01T00:00:00.000Z"
}
```

## 🌟 Bonus Features

### Enhanced User Experience

- **Keyboard Shortcuts**: Enter key to add tasks
- **Auto-focus**: Input fields automatically focused
- **Success Notifications**: Visual feedback for actions
- **Empty States**: Helpful messages when no tasks exist

### Error Handling

- **Form Validation**: Comprehensive input validation
- **API Fallbacks**: Graceful handling of API failures
- **Data Integrity**: Safe localStorage operations
- **User Feedback**: Clear error messages

## 🚀 Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main` or `master`)

### Vercel

1. Connect GitHub repository to Vercel
2. Deploy automatically on push
3. Get live URL for sharing

### Netlify

1. Drag and drop project folder to Netlify
2. Or connect GitHub repository
3. Automatic deployment and HTTPS

## 🤝 Contributing

This is an assignment project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a coding assignment.

## 🙏 Acknowledgments

- **UI Avatars API**: For profile picture generation
- **DummyJSON API**: For sample task data
- **Inter Font**: For beautiful typography
- **Modern CSS**: For responsive design patterns

---

**TaskFlow** - Your Personal Productivity Companion 🚀
