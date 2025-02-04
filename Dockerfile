# Base Image 설정
FROM node:20-alpine as build

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /

# 의존성 설치
COPY package*.json .

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 배포 환경
FROM nginx:stable-alpine

# 빌드된 파일 복사
COPY ./dist /usr/share/nginx/html

# 기본 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 사용자 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/conf.d/

# 포트 설정
EXPOSE 80

# 시작 명령어
CMD ["nginx", "-g", "daemon off;"]

