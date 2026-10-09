# StreamingApp – Kubernetes Container Orchestration

## Project Overview

StreamingApp is a multi-service MERN application deployed using Docker,
Kubernetes, Helm and AWS EKS.

## Services

- Auth Service – 3001
- Streaming Service – 3002
- Admin Service – 3003
- Chat Service – 3004
- Frontend – 80
- MongoDB – 27017

## Technologies

- GitHub
- Git
- Docker
- Docker Hub
- Jenkins
- AWS
- Amazon ECR
- Amazon EKS
- Kubernetes
- Helm
- Ingress
- MongoDB
- CloudWatch

## Docker Images

1. streaming-auth:1.0.0
2. streaming-stream:1.0.0
3. streaming-admin:1.0.0
4. streaming-chat:1.0.0
5. streaming-frontend:1.0.0

## Helm Installation

```bash
kubectl create namespace streaming

helm install streamingapp ./streamingapp \
-n streaming