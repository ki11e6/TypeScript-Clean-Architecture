# **Notes on Project Structure and Clean Architecture Implementation**

## **Abstract**

This document offers a comprehensive analysis of Clean Architecture principles as applied to a Node.js backend with TypeScript. By dissecting the project’s structural composition, it elucidates the precise roles of distinct architectural layers, emphasizing the segregation of business logic from technical infrastructure to optimize modularity, maintainability, and adaptability.

## **Architectural Principles and Directory Structure**

### **1. Principle of Isolation: Core vs. Infrastructure**

- The architecture enforces a strict demarcation between **Core** (business logic) and **Infrastructure** (technical implementations).
- The **Infrastructure** directory encapsulates all non-domain-specific concerns.

### **2. The Infrastructure Layer**

The **Infrastructure** layer provides technical scaffolding and is subdivided as follows:

- **API Subdirectory**:
  - Houses components directly managing HTTP transactions, including:
    - Controllers
    - Middleware
  - This ensures API-related concerns are encapsulated within a designated namespace.
- **Adapters Subdirectory**:
  - Serves as a bridge between **Core** and **Infrastructure** layers.
  - Encapsulates dependencies to eliminate direct entanglement with third-party modules, fostering dependency inversion.

### **3. The Core Layer**

The **Core** layer is dedicated to domain logic and structured as follows:

- **Interfaces and Entities**:
  - Define domain models and data contracts.
  - Maintain a clear separation from infrastructure-specific concerns.
- **Ports Directory**:
  - Serves as an abstraction interface between **Core** and **Infrastructure**.
  - Example: The `Logger Port`
    - Declares methods such as `error()`, `warning()`, `info()`, and `debug()`.
    - Abstracts away specific logging implementations to preserve interchangeability.
- **Use Cases Directory**:
  - Encapsulates business logic workflows.
  - Example: Authentication Use Cases
    - Originally structured as:
      - `signUp.ts`
      - `signIn.ts`
    - Refactored for greater specificity:
      - `signInWithLoginPassword.ts`
      - `signUpWithLoginPassword.ts`
    - Enhances semantic clarity and functional delineation.

### **4. Adapters in Infrastructure**

- The **adapters** subdirectory implements third-party dependencies.
- Examples:
  - `type-orm` (database integration)
  - `winston-logger` (logging mechanism)
  - Each adapter corresponds to a defined **Port**, ensuring seamless modularity.

### **5. Dependency Injection and Logging Abstraction**

- The `Logger Port` specifies standardized logging methods.
- **Concrete implementation:** `winston-logger.adapter`
  - Implements the `Logger` interface while leveraging Winston as the underlying dependency.
  - Avoids hardcoded reliance on Winston across the codebase.

**Advantages:**

- Future-proofing: If Winston becomes deprecated or compromised, replacing it requires only substituting the adapter without modifying business logic.
- Enhances maintainability and security.
- Reinforces separation of concerns.

### **6. Dependency Injection Paradigm**

- Bridges **Adapters** and **Ports**, mitigating direct dependency coupling.
- Enhances unit testability and facilitates modular upgrades.

### **7. Dependency Integration**

- The project incorporates two key dependencies:
  - `tsoa`: Facilitates OpenAPI-compliant controllers via decorators.
  - `reflect-metadata`: Enables runtime processing of decorators.

### **8. Structuring the API Layer**

- The `API` directory houses a `controllers` subdirectory.
- Establishes file-naming conventions:
  - `.controller.ts` → Designates a controller.
  - `.adapter.ts` → Denotes an adapter implementation.

### **9. Implementing the Book Controller**

- The **`BookController`** class extends `Controller` from `tsoa`.
- Utilizes constructor inheritance for extensibility.

#### **Defining API Endpoints**

- **List Method (****`list()`****)**:

  - Returns an array of records.
  - Decorators:
    - `@Get()` → Specifies HTTP verb.
    - `@Response(200)` → Defines success response code.

- **GetById Method (****`getById()`****)**:

  - Retrieves a singular entity.
  - Decorators:
    - `@Get('{id}')`
    - `@Response(200)`

- **Create Method (****`create()`****)**:

  - Defines an endpoint for resource creation.
  - Uses:
    - `@Post()`
    - `@Response(201)` → Indicates successful creation.

- **Delete Method (****`delete()`****)**:

  - Removes a resource.
  - Uses:
    - `@Delete('{id}')`
    - `@Response(204)` → Signifies successful deletion without content.

### **10. Defining Controller Routes**

- The `@Route('books')` decorator standardizes endpoint prefixes.
- All requests within this controller are mapped under `/books`.

### **11. Implementing Data Transfer Objects (DTOs)**

- Introduces `zod` as a schema validation library.
- Defines structured DTOs for request and response payloads:
  - **`BookOutputDTO`** → Represents standardized output data.
  - **`GetBookOutputDTO`** → Refines `BookOutputDTO` for GET requests.
  - **`PostBookInputDTO`** → Defines expected payload structure for book creation.
- Centralized within a `DTO` subdirectory, including:
  - `book.dto.ts` (base definition)
  - `get-book.dto.ts` (response-specific definition)
  - `post-book.dto.ts` (input-specific definition)
- Types are inferred via `ReturnType<typeof parse>` for strict type safety.
- Enhances maintainability by ensuring API responses align with domain contracts.

### **12. Implementing Encoder-Decoder (Codec) for Validation**

- Introduces **`book.codec.ts`** for encoding and decoding request payloads.
- Implements `createBookCodec` for parsing request bodies using `safeParse` from `zod`.
- Implements `getBookCodec` for decoding book IDs, ensuring the received parameter is a valid UUID.
- Utilized in the controller methods (`Delete` and `Get`) to validate input parameters before processing.
- Ensures only valid request structures are accepted, reducing error risks and enforcing strict API contracts.

## **Conclusion**

Adhering to Clean Architecture principles provides numerous advantages:

- **Clear Separation of Concerns**: Isolating business logic from technical implementations enhances modularity.
- **Extensibility**: The system remains adaptable to evolving requirements and third-party integrations.
- **Maintainability**: Decoupling infrastructure from domain logic simplifies refactoring.
- **Robustness**: Reduces the risk of systemic failures due to dependency vulnerabilities.

By structuring the backend around these principles, the application maintains long-term scalability and resilience while adhering to software engineering best practices.
