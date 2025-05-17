pipeline {
    agent any

    stages {
        stage('Checkout App Repo') {
            steps {
                git url: 'https://bitbucket.org/yourteam/app.git', branch: 'main'
            }
        }

        stage('Start Backend') {
            steps {
                // Khởi động backend Node.js ở background
                sh 'nohup node backend/backend.js &'
                // Windows thì dùng PowerShell hoặc cmd command tương đương
                // Ví dụ trên Windows dùng bat:
                // bat 'start /B node backend/backend.js'
                sleep 10 // chờ backend khởi động
            }
        }

        stage('Checkout Test Repo') {
            steps {
                git url: 'https://bitbucket.org/yourteam/test.git', branch: 'main'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'mvn clean test'
                // Nếu Windows thì dùng bat 'mvn clean test'
            }
        }
    }

    post {
        always {
            // Dọn dẹp backend hoặc các tài nguyên nếu cần
            echo 'Pipeline finished'
        }
    }
}
