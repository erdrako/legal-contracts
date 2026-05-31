# LexMapa Contracts

Repositorio publico de contratos compartidos para LexMapa.

Este repositorio define el lenguaje comun entre `legal-datacollection`, `legal-datavalidation`, `legal-backend` y `legal-frontend`.

## Responsabilidad

- Definir tipos de dominio compartidos.
- Definir DTOs de API.
- Definir eventos entre servicios.
- Mantener reglas de versionado de contratos.
- Documentar como se mapean conceptos legales reales a objetos del sistema.
- Definir el modelo MVP de comparacion legal: propuestas, versiones, diffs,
  temas, grupos y resumen simple.

## Lo que este repositorio no debe contener

- Scrapers.
- Logica de validacion.
- Logica de backend.
- Componentes de UI.
- Secretos o configuracion de infraestructura.

## Estado inicial

Este repositorio arranca con contratos TypeScript base, JSON Schemas, OpenAPI,
fixtures compartidos y documentacion conceptual.

El foco MVP actual es `LegalChangeProposal`:

```text
LegalChangeProposal
-> PlainLanguageSummary
-> AffectedTopic
-> AffectedGroup
-> LegalDiff
-> LegalVersion actual/propuesta
```

Fixture principal:

```text
fixtures/change-proposals.reforma-laboral.example.json
```

## Estructura

```text
src/
  index.ts
docs/
  API_SURFACES.md
  CHANGE_PROPOSAL_IMPORT_FORMAT.md
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
