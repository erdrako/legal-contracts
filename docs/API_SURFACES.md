# Superficies de API esperadas

Este repositorio no implementa APIs, pero documenta las superficies que otros repos deben respetar.

La especificacion OpenAPI inicial vive en:

- `openapi/backend.v1.yaml`

## Backend publico

```http
GET /change-proposals
GET /change-proposals/:id
GET /change-proposals/:id/diffs
GET /legal-items
GET /legal-items/:id
GET /legal-items/:id/overview
GET /legal-items/:id/provisions
GET /legal-items/:id/relationships
GET /legal-items/:id/timeline
GET /legal-items/:id/semantic-diff?from=&to=
GET /legal-items/:id/freshness
GET /legal-concepts/:id
GET /search?q=
```

Para el MVP, `/search?q=` debe priorizar preguntas en lenguaje simple y devolver
propuestas de cambio legal cuando coinciden con la consulta. Cuando la busqueda
coincide con temas, grupos o cambios especificos, la respuesta debe incluir:

- `matchedDiffIds`
- `matchedTopicIds`
- `matchedGroupIds`
- `matchSummary`

Estos campos permiten que el frontend explique por que una reforma fue
encontrada y resalte los cambios relevantes sin depender de terminologia
juridica.

Para items reales de agenda oficial (`dataKind = REAL_AGENDA_ITEM`) la API debe
exponer fuente de agenda, camara, fecha de tratamiento, comisiones y estado de
fuentes. Si todavia no hay textos originales cargados, `/change-proposals/:id/diffs`
puede devolver `diffs: []` y el frontend debe mostrar el estado pendiente.

## Procesadores remotos

```http
GET  /processors/status
GET  /processing-queue?limit=
POST /processors/enroll
POST /processors/heartbeat
POST /processors/jobs/claim
POST /processors/jobs/:id/progress
POST /processors/jobs/:id/result
POST /processors/jobs/:id/fail
POST /processors/jobs/:id/release
POST /processing-queue/jobs
POST /processing-queue/senate-diff-jobs
```

Esta superficie coordina procesadores Docker externos por pull. Los resultados
son operativos y quedan sujetos a validacion: artifacts, normas afectadas,
disposiciones extraidas, operaciones y candidatos de diff.

## Datavalidation interno

```http
GET  /validation/status
GET  /validation/jobs
GET  /validation/jobs/:id
POST /validation/jobs/:id/approve
POST /validation/jobs/:id/reject
POST /validation/jobs/:id/request-review
GET  /validation/legal-items/:id/freshness
GET  /validation/legal-items/:id/pending-changes
```

## Datacollection interno

```http
POST /collection/jobs
GET  /collection/jobs/:id
POST /collection/legal-items/:id/refresh
GET  /collection/sources/status
```
