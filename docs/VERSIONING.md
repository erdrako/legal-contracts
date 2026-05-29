# Versionado de contratos

Los contratos se versionan semanticamente.

## Cambios patch

Usar patch para:

- Corregir documentacion.
- Agregar comentarios.
- Ajustar nombres internos sin afectar exports publicos.

## Cambios minor

Usar minor para:

- Agregar campos opcionales.
- Agregar DTOs nuevos.
- Agregar eventos nuevos.
- Agregar enums que no rompen consumidores existentes.

## Cambios major

Usar major para:

- Renombrar campos publicos.
- Cambiar tipos existentes de forma incompatible.
- Eliminar DTOs, enums o eventos.
- Cambiar semantica de estados existentes.

## Regla operativa

Todo PR que modifique contratos debe indicar:

- Consumidores afectados.
- Tipo de cambio: patch, minor o major.
- Estrategia de migracion.
- Fixtures o ejemplos actualizados cuando aplique.

