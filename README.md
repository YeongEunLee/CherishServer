# :tree: Cherish-Server

<div align="center" style="display:flex;">
	<img src="./image/tokddak_logo.png" width="250">
</div>
<div align="center">
:sunny: 맞춤형 여행경비 계산/관리 서비스 톡딱 :cloud:  
<br>
서버파트 리포지토리
</div>

---

# 1. API DOC LINK (WIKI)

- [관련 링크](https://github.com/TokDDak/TokDDak-Server/wiki)

---

# 2. Dependency Module

```
"dependencies": {
    "aws-sdk": "^2.591.0",
    "cookie-parser": "~1.4.4",
    "crypto": "^1.0.1",
    "debug": "~2.6.9",
    "dotenv": "^8.2.0",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.24.0",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "mysql2": "^2.0.2",
    "pbkdf2": "^3.0.17",
    "rand": "0.0.4",
    "rand-token": "^0.4.0",
    "request": "^2.88.0",
    "sequelize": "^5.21.2",
    "token": "^0.1.0"
  }
```

- [Async & Await](https://www.npmjs.com/package/async)

- [JWT(JsonWebTokens)](https://www.npmjs.com/package/jsonwebtoken)

- [request(HTTP)](https://www.npmjs.com/package/request)

- [multer](https://www.npmjs.com/package/multer)

- [crypto](https://www.npmjs.com/package/create-hash)

- [moment](https://www.npmjs.com/package/moment)

---

# 3. ERD Diagram

<div align="center" style="display:flex;">
	<img src="./image/tokddak_erd.png">
</div>

---

# 4. Server Architecture

<div align="center" style="display:flex;">
	<img src="./image/server-architecture2.jpeg">
</div>

---

# 5. Main Function

- 여행 예산짜기
- 카테고리(숙박, 식사, 간식 및 주류, 쇼핑, 교통, 액티비티)별 항목(숙소 등급, 식당 등급 등) 추가하기
- 여행별 일정추가 및 경비계산
- 회원가입 / 로그인
- 카테고리별 지출내역 작성 및 관리

---

# 6. Team Role

#### :beer: 남궁권 ([kkoon9](https://github.com/kkoon9))

- 기능 구현

#### :cocktail: 박승완 ([toneyparky](https://github.com/toneyparky))

- TripAdvisor API 활용 및 데이터 수집 [관련 레포지토리](https://github.com/TokDDak/TokDDak-DB-Crawler)

#### :tropical_drink: 현주희 ([Hyun-juhee](https://github.com/Hyun-juhee))

- 환율 API 활용 및 CRUD 구현

#### :wine_glass: 칸반보드 노션링크[(참고)](https://www.notion.so/toneyparky/8fe9b76a98ba45f19e15eed43731b887?v=2d845e1c03b94399baad67c270ac2069)

---

# 7. Develop Framework & Environment

- [Node.js](https://nodejs.org/ko/) - Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임
- [Express.js](http://expressjs.com/ko/) - Node.js 웹 애플리케이션 프레임워크
- [NPM](https://rometools.github.io/rome/) - 자바 스크립트 패키지 관리자
- [vscode](https://code.visualstudio.com/) - 편집기
- [MySQL](https://www.mysql.com/) - DataBase
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - MySQL 시각화 툴
- [AWS EC2](https://aws.amazon.com/ko/ec2/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_ec2_b&sc_content=ec2_e&sc_detail=aws%20ec2&sc_category=ec2&sc_segment=177228231544&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177228231544!e!!g!!aws%20ec2&ef_id=WkRozwAAAnO-lPWy:20180412120123:s) - 클라우드 환경 컴퓨팅 시스템
- [AWS RDS](https://aws.amazon.com/ko/rds/) - 클라우드 환경 데이터베이스 관리 시스템
- [AWS S3](https://aws.amazon.com/ko/s3/) - 클라우드 스토리지
- [Python 3](https://www.python.org/)
- [Jupyter Notebook](https://jupyter.org/) - 편집기

- [TripAdvisor API](https://developer-tripadvisor.com/content-api/) - 트립어드바이져 API

---
