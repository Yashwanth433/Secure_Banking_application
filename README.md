# Banking Application

A full stack banking application using Node.js, React and MongoDB for deployment on Azure. 

## Features

### Backend (Node.js + Express + TypeScript)
- **Authentication & Authorization**: JWT-based authentication with secure password hashing
- **Account Management**: Multiple account types (checking, savings, credit)
- **Transaction Processing**: Secure money transfers, deposits, and withdrawals
- **Database**: MongoDB with Mongoose ODM and atomic transactions
- **Security**: Rate limiting, input validation, CORS protection, helmet middleware
- **API Documentation**: RESTful API with comprehensive error handling

### Frontend (React + TypeScript)
- **Modern UI**: Responsive design with Tailwind CSS
- **Dashboard**: Account overview with real-time balances
- **Transaction Management**: Transfer money between accounts with form validation
- **Account Details**: Transaction history with pagination
- **Authentication**: Secure login/registration with form validation
- **State Management**: Context API for authentication state

### Database (MongoDB)
- **User Management**: Secure user profiles with encrypted passwords
- **Account System**: Multi-account support per user
- **Transaction Ledger**: Complete transaction history with references
- **Indexes**: Optimized queries for performance

### Deployment (Azure)
- **Container Apps**: Scalable microservices architecture
- **Container Registry**: Private Docker image storage
- **Infrastructure as Code**: Bicep templates for reproducible deployments
- **Monitoring**: Application Insights and Log Analytics
- **Security**: Private networking and secure secrets management


## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB 7+
- Docker (for individual containers if needed)
- Azure CLI (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
   
   Update the environment files with your configuration.

4. **Start MongoDB**
   ```bash
   # Using Docker (optional)
   docker run -d --name mongodb -p 27017:27017 mongo:7
   
   # Or install MongoDB locally
   # Follow: https://docs.mongodb.com/manual/installation/
   ```

5. **Start the application**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run backend:dev  # Backend on https://banking-application-ieks.onrender.com
   npm run frontend:dev # Frontend on https://banking-application-ieks.onrender.com
   ```
