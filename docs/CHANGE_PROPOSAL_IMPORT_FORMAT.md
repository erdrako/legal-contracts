# Change Proposal Import Format

Este formato sirve para pedirle a ChatGPT, a un revisor humano o a una fuente
manual que prepare datos de una reforma para LexMapa.

Objetivo: cargar propuestas de cambio legal comparables en la UI del MVP.

Regla principal: no reemplazar el texto legal con explicaciones. Cada cambio
debe traer texto actual, texto propuesto, fuente, estado y explicacion simple.

## Formato esperado

```json
{
  "schemaVersion": "0.1.0",
  "generatedAt": "2026-05-31T00:00:00.000Z",
  "proposals": [
    {
      "id": "slug-estable-de-la-propuesta",
      "title": "Titulo claro de la reforma o propuesta",
      "status": "PROPOSED",
      "jurisdiction": {
        "country": "AR",
        "level": "NATIONAL"
      },
      "summary": {
        "headline": "Que cambia con ...",
        "short": "Resumen breve en lenguaje simple.",
        "keyPoints": [
          "Cambio principal 1.",
          "Cambio principal 2.",
          "Cambio principal 3."
        ],
        "whatItMeans": [
          "Significado practico 1.",
          "Significado practico 2."
        ],
        "limitations": [
          "Alcance o limite del dato.",
          "Pendiente de revision legal si corresponde."
        ],
        "legalAdviceWarning": "LexMapa explica cambios legales en lenguaje simple, pero no brinda asesoramiento legal personalizado."
      },
      "topics": [
        {
          "id": "tema-en-slug",
          "label": "Tema afectado",
          "summaryPlainLanguage": "Explicacion corta del tema para personas no juridicas."
        }
      ],
      "affectedGroups": [
        {
          "id": "grupo-en-slug",
          "label": "Grupo impactado",
          "impactSummary": "Como podria impactar a este grupo."
        }
      ],
      "diffs": [
        {
          "id": "slug-del-cambio",
          "proposalId": "slug-estable-de-la-propuesta",
          "title": "Titulo del cambio",
          "changeType": "MODIFIED",
          "affectedTopicIds": [
            "tema-en-slug"
          ],
          "affectedGroupIds": [
            "grupo-en-slug"
          ],
          "currentVersion": {
            "id": "slug-del-cambio-actual",
            "label": "Texto actual",
            "legalItemId": "opcional",
            "legalItemTitle": "Norma vigente o referencia actual",
            "provisionId": "opcional",
            "provisionLabel": "Articulo, inciso o seccion",
            "text": "Texto legal actual completo o recorte exacto relevante.",
            "status": "VIGENTE",
            "source": {
              "id": "fuente-actual",
              "name": "Nombre de la fuente",
              "sourceUrl": "https://example.com/fuente",
              "retrievedAt": "2026-05-31T00:00:00.000Z",
              "official": true
            }
          },
          "proposedVersion": {
            "id": "slug-del-cambio-propuesto",
            "label": "Texto propuesto",
            "legalItemId": "opcional",
            "legalItemTitle": "Proyecto, dictamen o propuesta",
            "provisionId": "opcional",
            "provisionLabel": "Articulo, inciso o seccion propuesta",
            "text": "Texto propuesto completo o recorte exacto relevante.",
            "status": "PROPOSED",
            "source": {
              "id": "fuente-propuesta",
              "name": "Nombre de la fuente",
              "sourceUrl": "https://example.com/propuesta",
              "retrievedAt": "2026-05-31T00:00:00.000Z",
              "official": true
            }
          },
          "explanationPlainLanguage": "Que cambia explicado en lenguaje simple.",
          "practicalImpact": "Que podria significar en la practica.",
          "impactLevel": "MEDIUM",
          "source": {
            "id": "fuente-del-diff",
            "name": "Nombre de la fuente",
            "sourceUrl": "https://example.com/fuente",
            "retrievedAt": "2026-05-31T00:00:00.000Z",
            "official": true
          },
          "dataStatus": "NEEDS_LEGAL_REVIEW",
          "traceability": {
            "currentCitationId": "opcional",
            "proposedCitationId": "opcional",
            "notes": "Notas de alcance, recorte o duda."
          }
        }
      ],
      "queryExamples": [
        "que cambia con ...",
        "que cambia para ...",
        "que pasa con ..."
      ],
      "source": {
        "id": "fuente-principal",
        "name": "Nombre de la fuente principal",
        "sourceUrl": "https://example.com/propuesta",
        "retrievedAt": "2026-05-31T00:00:00.000Z",
        "official": true
      },
      "dataStatus": "NEEDS_LEGAL_REVIEW",
      "createdAt": "2026-05-31T00:00:00.000Z",
      "updatedAt": "2026-05-31T00:00:00.000Z",
      "scopeNote": "Alcance de la carga y limites de interpretacion.",
      "legalAdviceWarning": "LexMapa no brinda asesoramiento legal personalizado. Verifique siempre la fuente legal aplicable."
    }
  ]
}
```

## Valores permitidos principales

`status` de propuesta:

- `DRAFT`
- `PROPOSED`
- `IN_DEBATE`
- `APPROVED`
- `REJECTED`
- `ARCHIVED`
- `UNKNOWN`

`changeType`:

- `ADDED`
- `REMOVED`
- `MODIFIED`

`impactLevel`:

- `LOW`
- `MEDIUM`
- `HIGH`
- `UNKNOWN`

`dataStatus`:

- `MANUAL_FIXTURE`
- `TRUSTED_SOURCE`
- `NEEDS_LEGAL_REVIEW`
- `HUMAN_REVIEWED`
- `PRODUCTION_APPROVED`

## Prompt sugerido para ChatGPT

```text
Necesito que prepares datos para LexMapa en JSON, siguiendo exactamente el formato ChangeProposalBundle 0.1.0.

Caso: [nombre de la reforma/propuesta].
Jurisdiccion: Argentina, nivel [NATIONAL/PROVINCIAL/MUNICIPAL].
Objetivo UX: una persona sin conocimientos juridicos debe entender que cambia.

Reglas:
- No inventes texto legal.
- Si falta una fuente o texto exacto, marca el campo como pendiente en notes y usa dataStatus = "NEEDS_LEGAL_REVIEW".
- No des asesoramiento legal personalizado.
- Cada diff debe incluir texto actual, texto propuesto, tipo de cambio, tema afectado, grupo impactado, explicacion simple, impacto practico, fuente y estado del dato.
- Usa entre 3 y 5 diffs para el primer MVP.
- Mantene ids estables en slug lower-case sin espacios.
- La explicacion simple no reemplaza el texto legal.

Fuentes/textos disponibles:
[pegar aqui texto actual, texto propuesto, URLs, articulos y notas]

Devuelve solo JSON valido, sin markdown.
```

## Criterios de aceptacion

- `proposalId` de cada diff coincide con `proposal.id`.
- Todos los `affectedTopicIds` existen en `topics`.
- Todos los `affectedGroupIds` existen en `affectedGroups`.
- Cada diff tiene texto actual y texto propuesto.
- Cada diff tiene fuente y `dataStatus`.
- El JSON no presenta la explicacion como consejo legal personalizado.
