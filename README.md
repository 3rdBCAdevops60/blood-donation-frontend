# 🩸 Blood Donation Management System – Frontend

---

## 📌 Project Overview

The **Blood Donation Management System – Frontend** is a web application built using **React JS**.  
It provides a clean and user-friendly interface to interact with backend APIs for managing blood donors.

The frontend allows users to perform CRUD operations such as adding donors, updating availability, filtering by blood group, and deleting donor records.

---

## ⚙️ Technologies Used

- React JS  
- JavaScript (ES6)  
- Axios  
- HTML5  
- CSS3  
- Docker  
- SonarQube  
- GitHub Actions (CI)  
- VS Code  

---

## 🧩 Features

- View all blood donors  
- Add new donor  
- Edit donor details  
- Toggle donor availability  
- Delete donor  
- Filter donors by blood group  
- Responsive UI  
- REST API integration using Axios  

---

## 📂 Project Structure

src/
 ├── components/
 │   ├── DonorList.js
 │   ├── AddDonor.js
 │   └── EditDonor.js
 ├── services/
 │   └── DonorService.js
 ├── App.js
 └── index.js

Backend Connection

The frontend communicates with the backend using Axios.

Backend Base URL (Local)
http://localhost:8080/api/donors

Backend Base URL (Production – Render)
https://blood-donation-backend-8r7h.onrender.com/api/donors
<img width="546" height="380" alt="image" src="https://github.com/user-attachments/assets/55bf746b-6074-45c2-8b35-aa203f7b5024" />


▶️ How to Run Frontend (Local)
Step 1: Install Dependencies
npm install

Step 2: Start React Application
npm start
<img width="1101" height="591" alt="image" src="https://github.com/user-attachments/assets/491caf09-97b2-4bd8-9dcc-8e624cb54628" />

Build frontend:

<img width="859" height="570" alt="image" src="https://github.com/user-attachments/assets/977c82e4-0442-443a-8b52-c4dcaba33810" />

Step 3: Open in Browser
http://localhost:3000

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/965442b6-c704-46b4-950f-6c6606692e60" />



🔁 CRUD Operations Mapping
Operation	UI Action
Create	Add Donor Form
Read	View Donor List
Update	Availability Toggle / Edit
Delete	Delete Button
🔍 Code Quality Analysis – SonarQube

SonarQube is used to analyze frontend code quality, detect bugs, vulnerabilities, and code smells.

Step 1: Start SonarQube using Docker
docker run -d --name sonarqube -p 9000:9000 sonarqube


Access dashboard:

http://localhost:9000


<img width="1076" height="555" alt="image" src="https://github.com/user-attachments/assets/3f57dd3e-814e-4975-9f74-c8fb21365181" />


Step 2: Run Sonar Scanner (Frontend)
sonar-scanner \
-Dsonar.projectKey=blood-donation-frontend \
-Dsonar.sources=src \
-Dsonar.host.url=http://localhost:9000 \
-Dsonar.login=YOUR_SONAR_TOKEN

<img width="1116" height="542" alt="image" src="https://github.com/user-attachments/assets/70932398-c215-43da-87d9-a2f4b08e646b" />



🐳 Dockerization

The frontend is containerized using Docker for consistent deployment.

Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

Build Docker Image
docker build -t blood-donation-frontend .

Run Docker Container
docker run -p 3000:3000 blood-donation-frontend


<img width="1097" height="572" alt="image" src="https://github.com/user-attachments/assets/0b904507-dbb2-47df-b28f-bc70bea193c8" />


⚙️ CI/CD – GitHub Actions

GitHub Actions is used to automatically build the frontend application on every push to the main branch.

Workflow File
.github/workflows/frontend-ci.yml

name: Frontend CI

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install Dependencies
      run: npm install

    - name: Build React App
      run: npm run build

<img width="1069" height="539" alt="image" src="https://github.com/user-attachments/assets/98510b46-cc85-4587-a595-74dd8189cd79" />


🚀 Deployment Flow
Developer Push
   ↓
GitHub Repository
   ↓
GitHub Actions (Build)
   ↓
Docker Image
   ↓
Vercel Deployment
 
https://blood-donation-frontend.vercel.app/ 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f346095d-3f94-4bd8-8048-983fadc1eab4" />


🎯 Purpose of Frontend

The frontend provides an intuitive interface for administrators and users to manage blood donors efficiently and quickly search for available donors during emergency situations.

🔮 Future Enhancements

-Authentication & authorization
-Role-based access (Admin / User)
-Advanced donor search
-UI improvements with Material UI / Tailwind
-Notification alerts

👩‍💻 Developed By

Varshini K
