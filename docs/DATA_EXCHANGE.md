# Formatos de intercambio

Este documento define los paquetes minimos que circulan entre repositorios.

## Candidate bundle

Producido por `legal-datacollection`.

Consumido por `legal-datavalidation`.

Debe contener:

- Fuente de origen.
- Items legales candidatos.
- Disposiciones candidatas.
- Citas.
- Relaciones, reglas, conceptos y snapshots candidatos cuando existan.
- Metadata de generacion.

Archivo de referencia:

- `schemas/candidate-bundle.schema.json`
- `fixtures/candidate-bundle.example.json`

## Approved bundle

Producido por `legal-datavalidation`.

Consumido por `legal-backend`.

Debe contener:

- Datos aprobados.
- Read models basicos.
- Freshness.
- Metadata de aprobacion.

Archivo de referencia:

- `schemas/approved-bundle.schema.json`
- `fixtures/approved-bundle.example.json`

## Reglas

- Un candidate bundle no es verdad final.
- Un approved bundle puede ser usado por backend.
- Toda interpretacion debe tener cita.
- Todo dato extraido automaticamente debe preservar `reviewStatus`.
- La promocion de candidate a approved debe quedar auditada por `legal-datavalidation`.

