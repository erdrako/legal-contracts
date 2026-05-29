# Mapeo de conceptos legales a objetos

Este documento explica como LexMapa transforma conceptos legales reales en contratos auditables.

```mermaid
flowchart TD
  Fuente["Fuente oficial"] --> Raw["Documento raw"]
  Raw --> Parsed["Documento parseado"]
  Parsed --> Item["LegalItem"]
  Item --> Provision["LegalProvision"]
  Provision --> Rule["LegalRule"]
  Provision --> Citation["LegalCitation"]
  Rule --> Citation
  Rule --> Concept["LegalConcept"]
  Item --> Relationship["LegalRelationship"]
  Relationship --> Item2["LegalItem relacionado"]
  Relationship --> Change["LegalChange"]
  Change --> Snapshot["LegalSnapshot"]
```

## Tabla de mapeo

| Concepto legal real | Contrato |
|---|---|
| Ley, decreto, resolucion, fallo, proyecto | `LegalItem` |
| Articulo, inciso, parrafo, anexo | `LegalProvision` |
| Obligacion, prohibicion, derecho, sancion | `LegalRule` |
| Consumidor, proveedor, dato personal | `LegalConcept` |
| Modifica, deroga, reglamenta, interpreta | `LegalRelationship` |
| Cambio normativo o semantico | `LegalChange` |
| Version en una fecha | `LegalSnapshot` |
| Fuente exacta | `LegalCitation` |

## Regla de trazabilidad

Todo dato interpretado debe poder navegar hacia:

```text
explicacion
-> objeto
-> cita exacta
-> fuente oficial
-> estado de revision
-> nivel de confianza
```

