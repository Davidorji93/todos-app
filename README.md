<!--  Domain-Driven Design (DDD) -->

/src
  /domain
    /models          # To-Do item models and types
    /repositories     # Interfaces for data access
  /infrastructure
    /fileSystem       # File-based data storage and operations
  /application
    /services         # Business logic for To-Do operations
  /presentation
    /components       # React components for UI
    /pages            # Next.js pages
    /api              # Next.js API routes for handling file operations
  /config             # Docker, environment, etc.
