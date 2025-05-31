# FE
Frontend of ISE Final Project - Team 10

## dummy data (by 송강규)
### users.json
경로 : FE\src\data\users.json
유저에 대한 데이터.
유저 객체 배열로 이루어져있음.
- id : number
- name : string
- email : string
- password : string
- address : string
- cart : Array<number>        

사용 컴포넌트:
- FE\src\component\LoginPage.jsx
- FE\src\component\SignUpPage.jsx
- FE\src\component\ForgotPasswordPage.jsx

### products.json
경로 : FE\src\data\products.json
제품에 대한 데이터
제품 객체 배열로 이루어져있음.
- id : number
- price : number
- title : string
- description : string
- image : string (이미지 주소)
- onSale : boolean (판매중이라면 true)

사용 컴포넌트:
- FE\src\component\StartingInterface.jsx