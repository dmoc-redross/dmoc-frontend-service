pipeline {
    agent any

    stages {
        stage('git clone') {
            steps {
                script {
                    git credentialsId: 'gitlab-skymarvel', url: 'http://repo.antiersolutions.com/sky-marvel1/sky-marvel-frontend.git', branch: 'jenkins/pipeline' 
                }
            }
        }
        
        stage('Login to ECR') {
            steps {
                script {
                    // Setup AWS CLI credentials for ECR
                    sh "aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 557547717958.dkr.ecr.ap-northeast-2.amazonaws.com"
                }
            }
        }

         stage('Copy env') {
             steps {
                 script {
                     // copy env
                     sh " cp -r /var/lib/jenkins/prod-skymarvel-env/user.env/.env.production ."
                 }
             }
         }
        
        stage('Docker build') {
            steps {
                script {
                    // Docker build
                    sh "docker build -t prod-frontend-user-service ." 
                }
            }
        }
        
        stage('Docker tag') {
            steps {
                script {
                    // Docker tag
                    sh "docker tag prod-frontend-user-service:latest 557547717958.dkr.ecr.ap-northeast-2.amazonaws.com/prod-frontend-user-service:${env.BUILD_ID}"
                }
            }
        }
        
        stage('Docker push to ECR') {
            steps {
                script {
                    // Docker push to ECR
                    sh "docker push 557547717958.dkr.ecr.ap-northeast-2.amazonaws.com/prod-frontend-user-service:${env.BUILD_ID}"
                }
            }
        }
        
        stage('Remove Docker Image on Jenkins server') {
            steps {
                script {
                    // Remove Docker images 
                    sh "docker system prune -af"
                }
            }
        }
        
        stage('Workspace Cleanup') {
            steps {
                script {
                    // Clean up the workspace
                    deleteDir()
                }
            }
        }
        
        stage('Update deployment images') {
            steps {
                script {
                    // Update deployment images
                    sh "/usr/local/bin/kubectl set image deployment/frontend-user frontend-user=557547717958.dkr.ecr.ap-northeast-2.amazonaws.com/prod-frontend-user-service:${env.BUILD_ID} -n prod-skymarvel-ns"
                }
            }
        }
        
        stage('Restart Kubernetes deployment') {
            steps {
                script {
                    // Applying changes to Kubernetes Deployment 
                    sh "/usr/local/bin/kubectl rollout restart deployment frontend-user -n prod-skymarvel-ns"
                }
            }
        }
    }

    post {
        always {
            emailext (
                subject: 'SkyMarvel MLM: Frontend User Service', 
                mimeType: 'text/html', 
                to: 'skymarvel230@gmail.com',
                recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']], 
                body: 'Testing Jenkins sending an email message after building a job.'
            )
        }
    
        success {
            emailext (
                subject: "Success: [SkyMarvel MLM] Frontend User Service Successfully Deployed", 
                mimeType: 'text/html', 
                to: 'skymarvel230@gmail.com, pradeep.kumar@antiersolutions.com, aman.saxena@antiersolutions.com, gowtham@antiersolutions.com, shyamanand.kumar@antiersolutions.com, rajinder.singh@antiersolutions.com, neil.kad@antiersolutions.com',
                recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']], 
                body: "<b>SkyMarvel MLM</b><br/>Project: ${env.JOB_NAME} <br/>Build Number: ${env.BUILD_NUMBER} <br/>[SkyMarvel MLM]: Frontend User Service Successfully Deployed"
            )
        }

        failure {
            emailext (
                subject: "Failure: [SkyMarvel MLM] Frontend User Service Not Deployed", 
                mimeType: 'text/html', 
                to: 'skymarvel230@gmail.com, shyamanand.kumar@antiersolutions.com, pradeep.kumar@antiersolutions.com, aman.saxena@antiersolutions.com, gowtham@antiersolutions.com, rajinder.singh@antiersolutions.com, neil.kad@antiersolutions.com',
                recipientProviders: [[$class: 'DevelopersRecipientProvider'],[$class: 'RequesterRecipientProvider']], 
                body: "<b>SkyMarvel MLM</b><br/>Project: ${env.JOB_NAME} <br/>Build Number: ${env.BUILD_NUMBER} <br/> [SkyMarvel MLM]: Frontend User Service Not Deployed"
            )
        }
    }
}
