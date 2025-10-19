# 💰 ExpenseTrackr - Personal Expense Tracker

A modern, responsive expense tracking web application built with React.js that helps users manage their income and expenses with interactive visualizations and analytics.

![ExpenseTrackr](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🌟 Features

### Core Functionality
- ✅ **CRUD Operations** - Create, Read, Update, and Delete transactions
- 💵 **Income & Expense Tracking** - Separate tracking for income and expenses
- 📊 **Category Management** - 8 pre-defined categories with custom icons
- 💰 **Budget Tracking** - Set monthly budgets with visual progress indicators
- 🔍 **Advanced Filtering** - Filter by transaction type and category
- 📈 **Export to CSV** - Download transaction data for external analysis

### Data Visualization
- 📊 **Pie Chart** - Visual breakdown of expenses by category
- 📉 **Bar Chart** - Monthly income vs expenses trends
- 🎯 **Summary Cards** - Real-time balance, income, expenses, and budget stats
- ⚠️ **Budget Alerts** - Color-coded warnings based on budget usage

### User Experience
- 🎨 **Modern UI/UX** - Clean, intuitive interface with gradient backgrounds
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Real-time Updates** - Instant calculation and chart updates
- 🎭 **Interactive Charts** - Hover effects and tooltips on visualizations
- 🌈 **Color-coded Transactions** - Easy visual distinction between income/expense

## 🚀 Demo

[Live Demo](https://your-deployed-link.netlify.app) *(Add your deployment link here)*

## 📸 Screenshots

### Dashboard View
![Dashboard](./screenshots/dashboard.png)

### Add Transaction Modal
![Add Transaction](./screenshots/add-transaction.png)

### Charts & Analytics
![Charts](./screenshots/charts.png)

## 🛠️ Tech Stack

- **Frontend Framework:** React.js 18+
- **Styling:** Tailwind CSS 3.3+
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useReducer)
- **Data Visualization:** Custom SVG Charts
- **Build Tool:** Create React App

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
   git clone https://github.com/AsryAhamed/ExpenseTrackr.git
   cd ExpenseTrackr
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npm start
```

4. **Open your browser**
```
   Navigate to http://localhost:3000
```

## 📁 Project Structure
```
ExpenseTrackr/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ExpenseTrackr.jsx    # Main component
│   │   ├── PieChart.jsx          # Pie chart visualization
│   │   └── BarChart.jsx          # Bar chart visualization
│   ├── App.js                    # Root component
│   ├── index.js                  # Entry point
│   └── index.css                 # Global styles
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎯 Usage

### Adding a Transaction
1. Click the **"Add Transaction"** button
2. Select transaction type (Income/Expense)
3. Enter amount, category, description, and date
4. Click **"Add"** to save

### Editing a Transaction
1. Click the **edit icon** (✏️) on any transaction
2. Modify the details
3. Click **"Update"** to save changes

### Deleting a Transaction
1. Click the **delete icon** (🗑️) on any transaction
2. Transaction will be removed immediately

### Setting Budget
1. Click the **edit icon** on the Budget card
2. Enter your monthly budget amount
3. Click **"Save Budget"**

### Filtering Transactions
- Use the **Type dropdown** to filter by Income/Expense
- Use the **Category dropdown** to filter by specific categories
- Click **"Export"** to download transactions as CSV

## 💡 Key Features Explained

### Dynamic Charts
- **Pie Chart:** Automatically calculates and displays expense distribution
- **Bar Chart:** Shows 6-month trend of income vs expenses
- Both charts update in real-time as you add/edit/delete transactions

### Budget Management
- Set custom monthly budgets
- Visual progress bar with color indicators:
  - 🟢 Green: Under 70% of budget
  - 🟠 Orange: 70-90% of budget
  - 🔴 Red: Over 90% of budget

### Smart Categorization
8 built-in categories with emoji icons:
- 🍔 Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Bills & Utilities
- ⚕️ Healthcare
- 📚 Education
- 📦 Other

## 🔧 Configuration

### Tailwind Configuration
Customize colors, fonts, and spacing in `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      // Add your custom configurations here
    },
  },
}
```

### Adding New Categories
Edit the `CATEGORIES` array in `ExpenseTrackr.jsx`:
```javascript
const CATEGORIES = [
  { name: 'Your Category', color: '#hexcolor', icon: '🎨' },
  // ...
];
```

## 📊 Future Enhancements

- [ ] User authentication (Firebase/Auth0)
- [ ] Cloud data persistence (Firebase/MongoDB)
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Advanced analytics and reports
- [ ] Dark mode toggle
- [ ] Email notifications for budget alerts
- [ ] Mobile app (React Native)
- [ ] Data backup and restore
- [ ] Custom categories creation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Asry Ahamed**

- GitHub: [@AsryAhamed](https://github.com/AsryAhamed)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Portfolio: [Your Website](https://your-website.com)

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- Design inspiration from modern fintech apps
- Built with ❤️ using React and Tailwind CSS

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me at your.email@example.com

---

⭐ **If you found this project helpful, please give it a star!** ⭐

Made with ❤️ by Asry Ahamed
