
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
                    set -e

                    docker build -t streaming-auth:$IMAGE_TAG backend/authService

                    docker build -t streaming-stream:$IMAGE_TAG \
                        -f backend/streamingService/Dockerfile backend

                    docker build -t streaming-admin:$IMAGE_TAG \
                        -f backend/adminService/Dockerfile backend

                    docker build -t streaming-chat:$IMAGE_TAG \
                        -f backend/chatService/Dockerfile backend

                    docker build -t streaming-frontend:$IMAGE_TAG frontend
                '''
            }
        }

        stage('Login to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr-credentials'
                ]]) {
                    sh '''
                        set -e

                        aws sts get-caller-identity

                        aws ecr get-login-password \
                            --region "$AWS_REGION" |
                        docker login \
                            --username AWS \
                            --password-stdin \
                            "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                    '''
                }
            }
        }

        stage('Push Images to ECR') {
            steps {
                sh '''
                    set -e

                    ECR="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

                    for SERVICE in auth stream admin chat frontend; do
                        docker tag \
                            "streaming-${SERVICE}:${IMAGE_TAG}" \
                            "${ECR}/streaming-${SERVICE}:${IMAGE_TAG}"

                        docker push \
                            "${ECR}/streaming-${SERVICE}:${IMAGE_TAG}"
                    done
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All five images pushed to ECR.'
        }

        failure {
            echo 'FAILED: Check the Jenkins console output.'
        }
    }
}
