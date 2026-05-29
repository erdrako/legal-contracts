# Superficies de API esperadas

Este repositorio no implementa APIs, pero documenta las superficies que otros repos deben respetar.

La especificacion OpenAPI inicial vive en:

- `openapi/backend.v1.yaml`

## Backend publico

```http
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
