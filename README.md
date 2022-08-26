# GDPR_Management Service
This is a tool to help developpers implement GDPR into their applications. This will give the ability to users to create requests to rectify, delete, download all data,  and give the ability to the provider to accept or deny those requests, automatically reverberating the changes to the application database, through use of API.


Credit to FSojistra for creating the Provider application : https://github.com/FSojitra/Registration-Login-and-CRUD-Action-using-MERN-stack

# Documentation
The full documentation can be accessed on Notion : API documentation, implementation guide, and installation guide.


https://www.notion.so/GDPR-Management-Service-documentation-b55d2eeadd1b4b188697bccf621ad560


# How to install and deploy GDPRMS

Prerequisites : 

-Install Node.js

# 1. Installation of GDPRMS API

1. Create a mysql database
2. Fill the .env file in GDPR_HELPER/API/
    1.  `DATABASE_URL="mysql://username:password@host:port/DatabaseName"` corresponding to the authentication URL to the database.
    2. `ADMIN_API_KEY` is the key that will be used by external clients to access GDPRMS
    3. `API_ENDPOINT_PROCESS_DATA_REQUEST_ANSWERS="http://localhost:2000/processAnswers"` Is the address to the endpoint of the Provider Application api that is used by the server to notify the Provider server that new data request answers need to be processed.

1. Run `cd .\GDPR_HELPER\API\`
2. Run `npm install`
3. Run  `npx prisma db push`

# 2. Installation of GDPRMS Client

1. Fill the .env file in GDPR_HELPER/frontend/ .
    1. `REACT_APP_GDPRMS_URL='http://localhost:4000'` corresponds to the URL of GDPRMS API.
    2. `REACT_APP_ADMIN_API_KEY` is the key that will be used by the client to access GDPRMS 
        
        <aside>
        💡 Note that only the admin pages uses this key, data subjects all have their own keys given by the server. Such environment variable key is unsafe since it is exposed to the client, in later development, it should be only accessed after the admin has logged in and should not be directly stored in the client application.
        
        </aside>
        
    3. `REACT_APP_API_ENDPOINT_GET_DATA_CONTENT='http://localhost:2000/getContent?id='` Is the address to the endpoint of the Provider Application api that is used by the server to access the content of any personal data, since GDPRMS does not store any personal data.
2. Run `cd .\GDPR_HELPER\frontend\`
3. Run `npm install`

# 3. Run GDPRMS

### API

Run : 

1. `cd .\GDPR_HELPER\API\`
2. `npm run start`

### Frontend

Run : 

1. `cd .\GDPR_HELPER\frontend\`
2. `npm run start`

# 4. Optional - Install and Run the Sample Provider Application

### Backend

Run : 

1. `npm install`
2. `npm run start`

### Frontend

Run : 

1. `npm install`
2. `npm run start`

