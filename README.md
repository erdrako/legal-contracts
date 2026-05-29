# LexMapa Contracts

Repositorio publico de contratos compartidos para LexMapa.

Este repositorio define el lenguaje comun entre `legal-datacollection`, `legal-datavalidation`, `legal-backend` y `legal-frontend`.

## Responsabilidad

- Definir tipos de dominio compartidos.
- Definir DTOs de API.
- Definir eventos entre servicios.
- Mantener reglas de versionado de contratos.
- Documentar como se mapean conceptos legales reales a objetos del sistema.

## Lo que este repositorio no debe contener

- Scrapers.
- Logica de validacion.
- Logica de backend.
- Componentes de UI.
- Secretos o configuracion de infraestructura.

## Estado inicial

Este repositorio arranca con contratos TypeScript base y documentacion conceptual. En fases siguientes se agregaran JSON Schemas, OpenAPI specs y fixtures compartidos.

## Estructura

```text
src/
  index.ts
docs/
  API_SURFACES.md
  MODEL_MAP.md
  VERSIONING.md
```

## Uso local

```bash
npm install
npm run typecheck
```

Hasta que exista publicacion en un registry, otros repos pueden consumir este paquete por referencia Git o copiando temporalmente los tipos durante el prototipo.

## Principio de auditoria

Un cambio en contratos debe dejar claro:

- Que comportamiento habilita.
- Que repositorios consumidores quedan afectados.
- Si rompe compatibilidad.
- Como se migra un consumidor existente.

