
# Kubernetes Fullstack Application

This project demonstrates a fullstack application deployment on Kubernetes. It consists of a frontend served by Nginx, a backend built with Node.js, and a MongoDB database for data persistence. The deployment is managed via Kubernetes to ensure scalability and resilience.

## Project Overview

- **Backend (Node.js):** Responsible for handling API requests and business logic.
- **Frontend (Nginx):** Provides the user interface for interacting with the application.
- **MongoDB:** Stores the application's data.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following tools installed:

- **Docker**: To build and manage container images.
- **Kubernetes**: A running cluster (Minikube or another Kubernetes distribution).
- **kubectl**: The command-line tool for Kubernetes operations.

### Deployment Steps

#### 1. Build and Publish Docker Images

First, you need to containerize the backend and frontend services and push the images to a Docker registry.

- **Node.js Backend:**

  \\`bash
  cd backend
  docker build -t <dockerhub-username>/app-backend .
  docker push <dockerhub-username>/app-backend
  cd ..
  \\`

- **Nginx Frontend:**

  \\`bash
  cd frontend
  docker build -t <dockerhub-username>/app-frontend .
  docker push <dockerhub-username>/app-frontend
  cd ..
  \\`

Replace `<dockerhub-username>` with your actual Docker Hub username.

#### 2. Deploy the Application Components

Now, deploy the fullstack application components using Kubernetes manifests.

- **Create a Kubernetes Namespace:**

  For organizational purposes, create a dedicated namespace for the application.

  \\`bash
  kubectl create namespace myapp
  \\`

- **Apply ConfigMap:**

  Deploy the ConfigMap to manage the application's configuration settings.

  \\`bash
  kubectl apply -f K8s/configMap.yaml -n myapp
  \\`

- **Deploy MongoDB:**

  Deploy the MongoDB service and deployment using the provided YAML files.

  \\`bash
  kubectl apply -f K8s/Mongodb/ -n myapp
  \\`

- **Deploy the Node.js Backend:**

  Deploy the backend service to handle API requests.

  \\`bash
  kubectl apply -f K8s/Nodejs/ -n myapp
  \\`

- **Deploy the Nginx Frontend:**

  Finally, deploy the frontend service to serve the user interface.

  \\`bash
  kubectl apply -f K8s/Nginx/ -n myapp
  \\`

#### 3. Verify Deployment Status

To ensure that all components are up and running, check the status of the pods:

\\`bash
kubectl get pods -n myapp
\\`

You should see that all the pods (backend, frontend, MongoDB) are in the `Running` state.

#### 4. Access the Application

If you are using Minikube, retrieve the Minikube IP address:

\\`bash
minikube ip
\\`

Identify the NodePort associated with the backend service:

\\`bash
kubectl get svc -n myapp
\\`

Now, access the application by navigating to the following URL in your web browser:

\\`bash
http://<minikube-ip>:<node-port>
\\`

Replace `<minikube-ip>` with the IP returned by `minikube ip` and `<node-port>` with the NodePort value from the backend service.
