# **Detailed Notes on Project Structure and Clean Architecture Implementation**

## **Overview**

This document provides an in-depth explanation of the project structure based on Clean Architecture principles. By analyzing the codebase, we focus on the separation of concerns and the roles of different folders in organizing technical and business logic.

## **Key Concepts and Folder Structure**

### **1. Isolation of Concerns: Core and Infrastructure**

- The project follows the principle of isolation, dividing concerns between **Core** and **Infrastructure**.
- **Core** contains business logic, while **Infrastructure** holds technical implementations.
- The **infrastructure** folder was created during the ExpressJS project setup to manage non-business-related aspects.

### **2. Infrastructure Folder**

The **Infrastructure** folder contains technical components:

- **API Subfolder**:
  - Stores API-related technical elements, such as:
    - Controllers
    - Middleware
  - Any component directly handling HTTP requests and responses resides here.
- **Adapters Subfolder**:
  - Bridges Core and Infrastructure layers.
  - Encapsulates dependencies to avoid direct coupling with third-party libraries.

### **3. Core Folder**

The **Core** folder contains business logic and domain models:

- **Interfaces and Entities**:
  - Define the data structure and interactions sent to the frontend.
  - Represent business logic rather than technical details.
- **Ports Folder**:
  - Interfaces between Infrastructure and Core.
  - Example: `Logger Port`
    - Defines methods like `error()`, `warning()`, `info()`, and `debug()`.
    - Abstracts logging implementation from the rest of the system.
    - Ensures logging system remains interchangeable without affecting business logic.

### **4. Use Cases in Core**

- The **use-cases** subfolder contains business logic execution flows.
- Example: Authentication Use Cases
  - Initial structure:
    - `signUp.ts`
    - `signIn.ts`
  - Refined structure for clarity:
    - `signInWithLoginPassword.ts`
    - `signUpWithLoginPassword.ts`
  - This refinement improves readability and explicitly defines authentication methods.

### **5. Adapters in Infrastructure**

- The **adapters** folder holds technical implementations of external dependencies.
- Example:
  - `type-orm` (for database interactions)
  - `winston-logger` (for logging)
  - These implementations correspond to the defined **Ports**.

### **6. Logger Example and Dependency Injection**

- The `Logger Port` defines standard logging methods.
- **Technical implementation:** `winston-logger.adapter`
  - Implements the defined `Logger` interface.
  - Uses Winston as a dependency.
  - Avoids directly using Winston throughout the codebase.

**Benefits of this approach:**

- If Winston becomes obsolete or insecure, replacing it requires only updating the adapter.
- Core and business logic remain unaffected.
- Supports future-proofing and maintainability.

### **7. Dependency Injection**

- The connection between **Adapters** and **Ports** is achieved using Dependency Injection.
- Ensures flexibility and decouples infrastructure from core logic.
- Enhances testability and maintainability.

## **Conclusion**

By following Clean Architecture principles, the project ensures:

- Clear separation of concerns.
- Business logic independence from external dependencies.
- Maintainability and scalability.
- Ease of switching third-party libraries without affecting the entire codebase.

This structured approach lays a solid foundation for a robust and adaptable ExpressJS backend.
