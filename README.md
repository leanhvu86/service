### Trang web am thuc an chay server Node JS

### database MongoDB config mac dinh

#### khởi tạo tài khoản admin bằng postman

curl --location --request POST 'localhost:8000/createAdminAccount' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user": {
    "email": "lethihuong@gmail.com",
    "password": "123456",
    "user":"HUong"
  }
}'

#### khởi tạo lượt view công thức bản ghi đầu tiên

curl --location --request POST 'localhost:8000/createFirstSummary' \
--data-raw ''



### tạo phân loại công thức theo loại món

curl -X POST \
  http://localhost:8000/createMultipleFoodTypes \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 2779a824-6e05-4cd7-3840-1e699470b60c' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTczNTRiMjVkNjNkMjgxYzc1OGM0NiIsImlhdCI6MTU4Njk2Nzg4MywiZXhwIjoxNTg3MDU0MjgzfQ.n5d8qwoElzoisSVpHmn1KOjhsNOppYRk3QEnvavYXVI' \
  -d '{
 "foodTypes" :[
    {
        "foodTypeCode": "KHAIVI",
        "foodTypeName": "Món khai vị",
        "status": 1,
        "_id": "5e54765464efc718a0c91811",
        "__v": 0,
        "createdAt": "2020-02-25T01:20:20.148Z",
        "updatedAt": "2020-02-25T01:20:20.148Z"
    },
    {
        "foodTypeCode": "MOCHIN",
        "foodTypeName": "Món chính",
        "status": 1,
        "_id": "5e54765464efc718a0c91812",
        "__v": 0,
        "createdAt": "2020-02-25T01:20:20.148Z",
        "updatedAt": "2020-02-25T01:20:20.148Z"
    },
    {
        "foodTypeCode": "TRAMIE",
        "foodTypeName": "Món tráng miệng",
        "status": 1,
        "_id": "5e54765464efc718a0c91813",
        "__v": 0,
        "createdAt": "2020-02-25T01:20:20.149Z",
        "updatedAt": "2020-02-25T01:20:20.149Z"
    },
    {
        "foodTypeCode": "DIPLE",
        "foodTypeName": "Món dịp lễ",
        "status": 1,
        "_id": "5e54765464efc718a0c91814",
        "__v": 0,
        "createdAt": "2020-02-25T01:20:20.149Z",
        "updatedAt": "2020-02-25T01:20:20.149Z"
    },
    {
        "foodTypeCode": "CHOTRE",
        "foodTypeName": "Món cho trẻ",
        "status": 1,
        "_id": "5e54765464efc718a0c91815",
        "__v": 0,
        "createdAt": "2020-02-25T01:20:20.149Z",
        "updatedAt": "2020-02-25T01:20:20.149Z"
    }
]
}'


###phân loại công thức theo ẩm thực các quốc gia

curl -X POST \
  http://localhost:8000/createMultipleCountrys \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: a795d3a7-3f17-3259-dd12-2efbe7aa1796' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTczMjkyMjVkNjNkMjgxYzc1OGMwNCIsImlhdCI6MTU4Njk2NzE4NywiZXhwIjoxNTg3MDUzNTg3fQ.PLANyp8N59UKI_Vxo5NZLP9l0tF1ktR44A7NpZtTM_U' \
  -d '{
 "countrys" :[
    {
        "countryCode": "VIE",
        "countryName": "Món Việt Nam",
        "status": 1,
        "_id": "5e542783e5163232b0e58a03",
        "createdAt": "2020-02-24T19:44:03.514Z",
        "updatedAt": "2020-02-24T19:44:03.514Z",
        "__v": 0
    },
    {
        "countryCode": "KOR",
        "countryName": "Món Hàn ",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a05",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.868Z",
        "updatedAt": "2020-02-24T20:12:20.868Z"
    },
    {
        "countryCode": "CHI",
        "countryName": "Món Trung Hoa",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a06",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.868Z",
        "updatedAt": "2020-02-24T20:12:20.868Z"
    },
    {
        "countryCode": "FRE",
        "countryName": "Món Pháp",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a07",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.868Z",
        "updatedAt": "2020-02-24T20:12:20.868Z"
    },
    {
        "countryCode": "AUS",
        "countryName": "Món Úc",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a08",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.868Z",
        "updatedAt": "2020-02-24T20:12:20.868Z"
    },
    {
        "countryCode": "THA",
        "countryName": "Món Thái",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a09",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.868Z",
        "updatedAt": "2020-02-24T20:12:20.868Z"
    },
    {
        "countryCode": "JAP",
        "countryName": "Món Nhật",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a0a",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.869Z",
        "updatedAt": "2020-02-24T20:12:20.869Z"
    },
    {
        "countryCode": "IND",
        "countryName": "Món Ấn Độ",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a0b",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.869Z",
        "updatedAt": "2020-02-24T20:12:20.869Z"
    },
    {
        "countryCode": "USA",
        "countryName": "Món Mỹ",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a0c",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.869Z",
        "updatedAt": "2020-02-24T20:12:20.869Z"
    },
    {
        "countryCode": "SIN",
        "countryName": "Món Singapore",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a0d",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.869Z",
        "updatedAt": "2020-02-24T20:12:20.869Z"
    },
    {
        "countryCode": "ITA",
        "countryName": "Món Ý",
        "status": 1,
        "_id": "5e542e24e5163232b0e58a0e",
        "__v": 0,
        "createdAt": "2020-02-24T20:12:20.869Z",
        "updatedAt": "2020-02-24T20:12:20.869Z"
    }
]
}'

### phân loại công thức theo cách chế biến và nguyên liệu

curl -X POST \
  http://localhost:8000/createMultipleCookWay \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 3aa16c0b-35fa-e3ed-ff4d-95e0d5aad66f' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTczMjkyMjVkNjNkMjgxYzc1OGMwNCIsImlhdCI6MTU4Njk2NzE4NywiZXhwIjoxNTg3MDUzNTg3fQ.PLANyp8N59UKI_Vxo5NZLP9l0tF1ktR44A7NpZtTM_U' \
  -d '{
	"cookWays" :[
    {
        "cookWayCode": "NUO",
        "cookWayName": "Nướng"
    },
    {
        "cookWayCode": "LUO",
        "cookWayName": "Luộc"
    },
    {
        "cookWayCode": "ANS",
        "cookWayName": "Ăn sống"
    },
    {
        "cookWayCode": "CHI",
        "cookWayName": "Chiên"
    },
    {
        "cookWayCode": "HAM",
        "cookWayName": "Hầm"
    },
    {
        "cookWayCode": "XAO",
        "cookWayName": "Xào"},
    {
        "cookWayCode": "EP",
        "cookWayName": "Ép",
        "description": "Làm theo phương pháp mặc định"
    },
    {
        "cookWayCode": "RAN",
        "cookWayName": "Rang"
    },
    {
        "cookWayCode": "HAP",
        "cookWayName": "Hấp"
    },
    {
        "cookWayCode": "TRO",
        "cookWayName": "Trộn"
    },
    {
        "cookWayCode": "KHO",
        "cookWayName": "Kho"
    },
    {
        "cookWayCode": "SOT",
        "cookWayName": "Sốt",
        "description": "Làm theo phương pháp mặc định",
        "status": 1,
        "_id": "5e54845577dd7f50c49fec98",
        "__v": 0,
        "createdAt": "2020-02-25T02:20:05.847Z",
        "updatedAt": "2020-02-25T02:20:05.847Z"
    },
    {
        "cookWayCode": "LAB",
        "cookWayName": "Làm Bánh",
        "description": "Làm theo phương pháp mặc định",
        "status": 1,
        "_id": "5e54845577dd7f50c49fec9b",
        "__v": 0,
        "createdAt": "2020-02-25T02:20:05.848Z",
        "updatedAt": "2020-02-25T02:20:05.848Z"
    },
    {
        "cookWayCode": "CHU",
        "cookWayName": "Chưng",
        "description": "Làm theo phương pháp mặc định",
        "status": 1,
        "_id": "5e54845577dd7f50c49fec9c",
        "__v": 0,
        "createdAt": "2020-02-25T02:20:05.848Z",
        "updatedAt": "2020-02-25T02:20:05.848Z"
    },
    {
        "cookWayCode": "RAU",
        "cookWayName": "Rau xanh",
        "description": "Làm theo phương pháp mặc định",
        "status": 1,
        "_id": "5e6f72f9ad14c027f4a3e427",
        "__v": 0,
        "createdAt": "2020-03-16T12:37:13.419Z",
        "updatedAt": "2020-03-16T12:37:13.419Z"
    },
    {
        "cookWayCode": "CUQ",
        "cookWayName": "Củ Quả",
        "description": "Làm theo phương pháp mặc định",
        "status": 1,
        "_id": "5e6f72f9ad14c027f4a3e428",
        "__v": 0,
        "createdAt": "2020-03-16T12:37:13.419Z",
        "updatedAt": "2020-03-16T12:37:13.419Z"
    },
    {
        "cookWayCode": "DAU",
        "cookWayName": "Đậu phụ",
        "description": "Làm theo phương pháp mặc định",
        "status": 1,
        "_id": "5e6f72f9ad14c027f4a3e429",
        "__v": 0,
        "createdAt": "2020-03-16T12:37:13.419Z",
        "updatedAt": "2020-03-16T12:37:13.419Z"
    },
    {
        "cookWayCode": "NAM",
        "cookWayName": "Nấm hương",
        "description": "Làm theo phương pháp mặc định",
        "status": 1,
        "_id": "5e6f72f9ad14c027f4a3e42a",
        "__v": 0,
        "createdAt": "2020-03-16T12:37:13.419Z",
        "updatedAt": "2020-03-16T12:37:13.419Z"
    }
]}'



