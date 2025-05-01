# Project Summary

## The project is divided into two main parts: 1. Core and 2. Infrastructure.

### Infrastructure

The infrastructure consists of adapters and the API. The adapters include third-party packages such as `type-orm` and `winston-logger`. The API folder contains controllers, middleware, and configuration files, all of which facilitate API and client interactions without directly interacting with the core business logic. The connection between infrastructure and core is managed by the logic within the adapters.

### Core

The core encompasses entities, ports, and use-cases.

### Adapters in Infrastructure

Each adapter corresponds to a defined port.
