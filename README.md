# Proyecto de Citas Médicas

Este proyecto es una aplicación de gestión de citas médicas implementada utilizando una arquitectura hexagonal y principios SOLID. Está diseñado para ser escalable y mantener una separación clara entre la lógica de negocio, las aplicaciones y la infraestructura.

## Estructura del Proyecto

La estructura del proyecto se organiza de la siguiente manera:

medical-appointments/
├── src/
│ ├── domain/ # Lógica de negocio pura, siguiendo SOLID
│ │ ├── entities/ # Entidades o modelos de dominio
│ │ │ ├── Appointment.ts
│ │ ├── services/ # Servicios del dominio (use cases)
│ │ │ ├── AppointmentService.ts
│ ├── application/ # Casos de uso (adaptadores de entrada)
│ │ ├── handlers/ # Lambdas
│ │ │ ├── appointment.ts # Crear cita y actualizar estado
│ │ │ ├── appointmentPE.ts # Procesar cita Perú
│ │ │ ├── appointmentCL.ts # Procesar cita Chile
│ ├── infrastructure/ # Capa de infraestructura (adaptadores de salida)
│ │ ├── dynamo/ # Interfaz para interactuar con DynamoDB
│ │ │ ├── DynamoRepository.ts
│ │ ├── rds/ # Interfaz para interactuar con MySQL (RDS)
│ │ │ ├── RDSRepository.ts
│ ├── shared/ # Código compartido/utilidades
│ │ ├── logger.ts
│ │ ├── validation.ts
│
├── tests/ # Pruebas unitarias e integración
│ ├── appointment.test.ts
│ ├── appointmentPE.test.ts
│ ├── appointmentCL.test.ts
│
├── serverless.yml # Configuración Serverless
├── package.json # Dependencias del proyecto
├── tsconfig.json # Configuración TypeScript
└── README.md # Documentación
