pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '916080963016'
        IMAGE_TAG = '1.0.0'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Tools') {
            steps {
                sh '''
                    git --version
                    docker --version
                    aws --version
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    docker build -t streaming-auth:${IMAGE_TAG} backend/authService

                    docker build -t streaming-stream:${IMAGE_TAG} \
                      -f backend/streamingService/Dockerfile backend

                    docker build -t streaming-admin:${IMAGE_TAG} \
                      -f backend/adminService/Dockerfile backend

                    docker build -t streaming-chat:${IMAGE_TAG} \
                      -f backend/chatService/Dockerfile backend

                    docker build -t streaming-frontend:${IMAGE_TAG} frontend