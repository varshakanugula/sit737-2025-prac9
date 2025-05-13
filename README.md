# SIT737 2025 – Practical Task 9P  
### MongoDB Integration with Kubernetes

## 📌 Overview

This project demonstrates deploying a Node.js microservice integrated with MongoDB inside a Kubernetes cluster using Docker and Minikube. The application supports basic CRUD operations and uses Mongoose for MongoDB interaction.

---

## 📁 Project Structure

├── microservice/ # Node.js app code
│ ├── app.js
│ ├── Dockerfile
│ ├── package.json
│ └── package-lock.json
│
├── k8s/ # Kubernetes configuration files
│ ├── mongo-pv.yaml
│ ├── mongo-pvc.yaml
│ ├── mongodb-deployment.yaml
│ ├── mongodb-service.yaml
│ ├── secrets.yaml
│ ├── app-deployment.yaml
│ └── node-web-service.yaml
│
├── .gitignore
└── README.md



---

## ⚙️ Technologies Used

- **Node.js 20**
- **Express**
- **MongoDB 6**
- **Mongoose**
- **Docker**
- **Kubernetes** (via Minikube)
- **kubectl CLI**

---

## 🧑‍💻 How to Deploy

### Step 1: Start Minikube

```bash
minikube start --driver=docker


# Step 2: Set Docker Env to Minikube
  eval $(minikube docker-env)

# Step 3: Build Docker Image
  cd microservice
  docker build -t node-web:1 .

# Step 4: Apply Kubernetes Resources
  cd ../k8s

# Create secret
kubectl create secret generic mongo-secret \
  --from-literal=mongo-root-username=mongoadmin \
  --from-literal=mongo-root-password=admin123

# Apply volumes
kubectl apply -f mongo-pv.yaml
kubectl apply -f mongo-pvc.yaml

# Deploy MongoDB
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml

# Deploy Node.js app
kubectl apply -f app-deployment.yaml
kubectl apply -f node-web-service.yaml

# Step 5: Access the Application
  minikube service node-web-service
  (#This opens the app in your browser (e.g., http://127.0.0.1:30007).)

