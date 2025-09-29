# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Spring Boot web application for Category management (baitap07/baitap06) built with:
- **Framework**: Spring Boot 3.5.5 with Spring Web MVC
- **Database**: SQL Server with Spring Data JPA
- **Frontend**: Thymeleaf templates with Tailwind CSS
- **Build Tool**: Maven with Java 17
- **Architecture**: Traditional MVC pattern with layered service architecture

## Development Commands

### Build and Run
```powershell
# Build the project
.\mvnw.cmd clean compile

# Run the application (development mode)
.\mvnw.cmd spring-boot:run

# Build WAR package
.\mvnw.cmd clean package

# Run tests
.\mvnw.cmd test

# Run a single test class
.\mvnw.cmd test -Dtest=Baitap06ApplicationTests
```

### Database Setup
The application connects to SQL Server on `localhost:1433` with database `DBUser`. Ensure:
- SQL Server is running on port 1433
- Database `DBUser` exists
- User `sa` with password `1234` has access (configured in `application.properties`)
- Category table exists in `dbo` schema

### Development Server
- Application runs on `http://localhost:8080`
- Root URL (`/`) redirects to `/categories`
- Thymeleaf caching is disabled for development

## Code Architecture

### Package Structure
```
org.example.baitap06/
├── controller/          # Web controllers (MVC)
├── service/            # Business logic layer
├── repository/         # Data access layer (JPA repositories)
├── entity/             # JPA entities
├── Baitap06Application # Main Spring Boot application
└── ServletInitializer  # WAR deployment support
```

### Key Architectural Patterns

**MVC Layer Separation**: Strict separation between Controller → Service → Repository
- Controllers handle HTTP requests/responses and model binding
- Services contain business logic and transaction boundaries  
- Repositories handle data persistence via Spring Data JPA

**Entity Design**: JPA entities with automatic timestamp management
- `@PrePersist` and `@PreUpdate` for createdAt/updatedAt
- Uses `GenerationType.IDENTITY` for ID generation
- Maps to existing SQL Server tables (schema: `dbo`)

**Pagination & Search**: Built-in support using Spring Data
- All list operations use `Pageable` with configurable page size
- Search functionality via repository method queries
- Default sorting by ID descending

### Template Architecture
- **Layout System**: Uses Thymeleaf Layout Dialect
- **Base Template**: `layout.html` with Tailwind CSS and Font Awesome
- **Fragment System**: Reusable header/footer in `fragments/` directory
- **CRUD Templates**: Dedicated templates in `category/` for list, form, delete confirmation

### Database Configuration
- **Connection**: SQL Server JDBC with encryption disabled
- **Schema Management**: `ddl-auto=none` - expects existing database schema
- **Naming Strategy**: Uses legacy JPA naming (preserves exact column names)
- **Dialect**: SQL Server specific dialect with SQL logging enabled

## Entity Relationships

The `Category` entity structure:
- `id`: Auto-generated primary key
- `name`: Required string (100 chars max)
- `description`: Optional string (500 chars max)  
- `userId`: Foreign key stored as Long (simplified relationship)
- `icon`: Optional icon identifier
- `createdAt`/`updatedAt`: Auto-managed timestamps

## Testing Approach

- Uses JUnit 5 with Spring Boot Test
- Context loading test ensures application starts correctly
- Test database configuration inherits from main application properties
- Additional tests should follow Spring Boot testing patterns

## Development Notes

### Database Connection
Update `application.properties` for your local SQL Server setup:
- Change `spring.datasource.url` for different server/database
- Update credentials as needed
- Ensure SQL Server allows SQL Server authentication

### Template Development
- Templates use Vietnamese language (`lang="vi"`)
- Tailwind CSS loaded via CDN for rapid prototyping
- Custom CSS/JS can be added to `static/css/app.css` and `static/js/app.js`

### Adding New Features
Follow the established MVC pattern:
1. Create JPA entity in `entity/` package
2. Create Spring Data repository interface in `repository/` 
3. Create service class in `service/` with business logic
4. Create controller in `controller/` with request mappings
5. Create Thymeleaf templates following existing structure

### Common Development Tasks

**Add New Entity Field**:
1. Update entity class with JPA annotations
2. Ensure database table has corresponding column
3. Update service layer if business logic needed
4. Update templates for display/editing

**Debug Database Issues**:
- Check `spring.jpa.show-sql=true` output in console
- Verify SQL Server connection and database existence
- Ensure table schema matches entity mapping