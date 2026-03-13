# jogaFacil

This project adheres to **Clean Architecture** principles and **Clean Code** standards, focusing heavily on readability, modularity, and explicit intent.

## Architectural Boundaries

The application is structured in concentric circles. Dependencies only ever point *inwards*.

### 1. Domain (`src/domain/`)
The absolute core of the application. 
*   **Contents:** Enterprise Entities, Value Objects, and Domain Events. Also contains Interfaces (Contracts) for repositories.
*   **Dependencies:** None. This layer must remain completely isolated from any external frameworks, databases, or UI concerns.

### 2. Application (`src/application/`)
The orchestrator of the domain.
*   **Contents:** Use Cases (Interactors), Application Services, and Data Transfer Objects (DTOs).
*   **Dependencies:** Depends *only* on the Domain layer. 

### 3. Infrastructure (`src/infrastructure/`)
The adapters to the outside world.
*   **Contents:** Database implementations (Repositories), External API integrations, Framework-specific setup/configs.
*   **Dependencies:** Depends on the Application and Domain layers to fulfill their defined interfaces.

### 4. Presentation (`src/presentation/`)
The entry point for users or consumers.
*   **Contents:** Controllers, View Models, Routes, Web sockets, CLI commands.
*   **Dependencies:** Depends on the Application layer to trigger Use Cases.

## Testing (`tests/`)
Tests are treated as first-class citizens and must adhere to the **F.I.R.S.T.** principles:
*   **Fast**
*   **Independent**
*   **Repeatable**
*   **Self-Validating**
*   **Timely**

## Clean Code Directives

*   **Boy Scout Rule:** Always leave the code cleaner than you found it.
*   **Meaningful Names:** Intent-revealing variable and function names.
*   **Small Functions:** Functions should do *one* thing and only have 0-3 arguments ideally.
*   **No Ghost Code:** Remove commented-out dead code immediately.
