##GRPC/HTTP examples generated by grpc-ms library with JWT and MongoDB/PostgreSQL support

### How to start

To load and see proto files definitions (services, models), install 
[BloomRPC](https://github.com/uw-labs/bloomrpc)

![Screenshot](example.png)

## Projects

### Start all projects like monolithic application (.env.mono)
    cd statistic
    npm start -- mono

### Auth (JWT, MongoDB)

This microservice is generated with command:
    
    grpc-ms -s auth -p 8080 -d mongodb -jwt

Configuration file is .env.local
    
    PORT=8080
    JWT_SECRET=example
    DATABASE_URI=mongodb://localhost:27017/example-auth

Run this service with command:

    npm install
    npm start

Reserved ports for this microservice is 8080/GRPC, 8081/HTTP

### Company (MongoDB)

This microservice is generated with command:

    grpc-ms -s company -p 8084 -d mongodb

Configuration file is .env.local

    PORT=8084
    DATABASE_URI=mongodb://localhost:27017/example-company
    AUTH_SERVICE=0.0.0.0:8080/auth.proto

Run this service with command:

    npm install
    npm start

Reserved ports for this microservice is 8084/GRPC, 8085/HTTP

All actions in this service required authentication, this part is implemented in main index.js file
and attached on server like middleware (Express style)

    // Download remote protos AUTH_SERVICE=0.0.0.0:8080/auth.proto
    process.client = await new GRPCClient().load();  
    
    const { authService } = process.client;
    const auth = (req, next) => authService
        .profile(req.metadata)
        .then((user) => { req.user = user; next(); })
        .catch(next);

### Employee (MongoDB)

This microservice is generated with command:

    grpc-ms -s employee -p 8082 -d mongodb

Configuration file is .env.local

    PORT=8082
    DATABASE_URI=mongodb://localhost:27017/example-employee
    AUTH_SERVICE=0.0.0.0:8080/auth.proto
    COMPANY_SERVICE=0.0.0.0:8084/company.proto

Run this service with command:

    npm install
    npm start

Reserved ports for this microservice is 8082/GRPC, 8083/HTTP
This service use same authntification like company service. This service also create connection with
company service (service/employee.service.js)

    static async create(employee) {
      const { companyService } = process.client;

      // this.metadata, contains incoming headers like authorzation (GRPC or HTTP)
      const company = await companyService.get({ id: employee.companyId }, this.metadata);
      const output = await (new db.Employee({ userId: this.user.id, ...employee, company })).save();

      return { id: output._id };
    }

### Statistic (PostgreSQL)

This microservice is generated with command:

    grpc-ms -s statistic -p 8086 -d postgres

Configuration file is .env.local

    PORT=8086
    DATABASE_URI=postgres://postgres:password@localhost:5432/statistic
    AUTH_SERVICE=0.0.0.0:8080/auth.proto
    COMPANY_SERVICE=0.0.0.0:8084/company.proto
    EMPLOYEE_SERVICE=0.0.0.0:8082/employee.proto
    DATABASE_DROP_ON_START=false

Run this service with command:

    npm install
    npm start

Reserved ports for this microservice is 8086/GRPC, 8087/HTTP