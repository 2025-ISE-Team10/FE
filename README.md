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