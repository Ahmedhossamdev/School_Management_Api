### About

The School Management System is a comprehensive platform designed to facilitate efficient management and organization within educational institutions. This system serves as a centralized hub for administrators, teachers, students, and super-admins to streamline various administrative tasks and enhance communication.

### Deployment

The school management system is currently deployed and accessible at [https://school-mangment-system.onrender.com/](https://school-mangment-system.onrender.com/).

### How to test the api

To test the API, follow these steps:

1. Sign in with the following superadmin account details:
    - Email: [superadmin@gmail.com](https://mailto:superadmin@gmail.com)
    - Password: Test1234
2. Once signed in, create a new user. Set the role of the new account to 'superadmin' using the superadmin account.
3. Additionally, you can use the following school admin account to perform further tests:
    - Email: [schooladmin@gmail.com](https://mailto:schooladmin@gmail.com)
    - Password: Test1234

Make sure to follow the steps precisely as mentioned in the Markdown format while testing the API.

### Entity Overview

1. **Authentication:** The system includes user authentication features such as sign-in, sign-up, and logout. Redis is used to manage refresh tokens for improved security and efficient user session management.
2. **Users:** The platform supports different user roles, including admin (school-admin), teachers, students, and super-admin, each with specific access levels and permissions.
3. **School:** Comprehensive school management functionalities are available, including the creation, modification, and deletion of schools. School-related data, such as contact information, address, and establishment year, can be efficiently managed (Only superadmins can do this operations).
4. **Classroom:** The system allows administrators to create and manage classrooms. They can assign teachers, add or remove students, and maintain specific classroom information, ensuring effective classroom coordination and organization (Only admins can do this operations).
5. **Students:** The system enables the management of student information, Administrators can easily add, update, and remove students, ensuring centralized and efficient student data management (Only admins can do this operations).
    

### Technology Stack:

- Backend: Node.js
- Database: MongoDB - Redis
- API Framework: Express.js
- Unit Testing: jest and super-test
    

### Unit Testing:

- npm test
    

<img src="https://content.pstmn.io/b332eb67-5a5e-4253-b1ad-8c426bce4ed0/U2NyZWVuc2hvdCAyMDIzLTEwLTI0IDA1MTYxNS5wbmc=">

### Model:

<img src="https://content.pstmn.io/41e58c6d-87c2-44ac-b8da-fec71208f666/ZXJkLnBuZw==">

## User

| Key | Kind | Notes |
| --- | --- | --- |
| id | string (ObjectId) | Primary Key |
| name | string | Required: Please tell us your name! |
| email | string | Required: Please provide your email |
| phoneNumber | string | Required: Please provide your phone number |
| photo | string | Default: 'default.jpg' |
| role | string | Enum: \['superadmin', 'admin', 'teacher', 'student'\] |
| password | string | Required: Please provide a password |
| passwordChangeAt | datetime | \- |

## Student

| Key | Kind | Notes |
| --- | --- | --- |
| id | string (ObjectId) | Primary Key |
| name | string | Required |
| age | number | Required |
| gender | string | Enum: \['male', 'female'\] |
| address | string | \- |
| contactNumber | string | \- |
| email | string | \- |
| classroom | string (ObjectId) | Ref: 'Classroom' |
| school | string (ObjectId) | Ref: 'School' |
| created_at | datetime | \- |
| updated_at | datetime | \- |

## School

| Key | Kind | Notes |
| --- | --- | --- |
| id | string (ObjectId) | Primary Key |
| name | string | Required |
| address | string | Required |
| contactNumber | string | \- |
| website | string | \- |
| establishedYear | number | Required |
| created_at | datetime | \- |
| updated_at | datetime | \- |

## Classroom

| Key | Kind | Notes |
| --- | --- | --- |
| id | string (ObjectId) | Primary Key |
| name | string | Required |
| school | string (ObjectId) | Ref: 'School' |
| created_at | datetime | \- |
| updated_at | datetime | \- |

### Endpoints

Note!.. All API responses have a fixed structure.

#### School Endpoints

- **POST Create School:** Create a new school with specific details.
- **GET Get All Schools:** Retrieve all schools available in the system.
- **GET Get School By Id:** Retrieve school information based on the provided school ID.
- **PUT Update School:** Update school information based on the provided school ID.
- **DELETE Delete School:** Delete a school based on the provided school ID.
    

#### Student Endpoints

- **GET Get All Students In School:** Retrieve all students in a particular school.
- **GET Get Student:** Retrieve student information based on the provided student ID.
- **POST Add Student to School:** Add a new student to the school with specific details.
- **PUT Update Student:** Update student information based on the provided student ID.
- **DELETE Delete Student:** Delete a student based on the provided student ID.
    

#### ClassRoom Endpoints

- **GET Get All Classes In School:** Retrieve all classes available in a particular school.
- **GET Get All Students In ClassRoom:** Retrieve all students in a particular classroom.
- **GET Get Class:** Retrieve classroom information based on the provided classroom ID.
- **POST Create Class Room:** Create a new classroom within a school.
- **POST Add Student to Class:** Add a student to a specific classroom.
- **PUT Update Class:** Update classroom information based on the provided classroom ID.
- **PUT Remove Student From Class:** Remove a student from a specific classroom.
- **DELETE Delete Class:** Delete a class based on the provided classroom ID.
    

#### System Users Endpoints

- **GET Get User:** Retrieve user information based on the provided user ID.
- **GET Get Me:** Retrieve the current user's information.
- **GET All Users** Retrieve All Users In The System
- **PUT User** Update User Information
- **DELETE User** Delete User
    

### Installation

1. Clone the repository from [GitHub](https://github.com/Ahmedhossamdev/School_Management_Api).
2. Install the necessary dependencies using `npm install`.
3. Configure the database settings and environment variables in the `.env` file.
    

### Environment Variables

Create a `.env` file in the root directory of your project and define the following environment variables:

``` plaintext
MONGODB_URI=mongodb+srv://your-username:your-password@cluster-url.mongodb.net/school
PORT=3000
REDIS_CLIENT=your-redis-client-url
REDIS_SECRET=your-redis-secret
NODE_ENV=development
JWT_ACCESS_TOKEN_SECRET=your-access-token-secret
JWT_REFRESH_TOKEN_SECRET=your-refresh-token-secret

 ```
