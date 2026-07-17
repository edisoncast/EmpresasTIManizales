# Validación SNIES / HECAA 2026

Fecha de consulta: **2026-07-17**  
Comandos reproducibles: `npm run validate:snies` y `npm run audit:sena-caldas`

## Alcance y método

Se contrastaron de forma secuencial las fichas públicas de HECAA para los programas de `src/data/programs.json` que tenían código SNIES. La comprobación compara código, nombre, institución, estado y modalidad. La consulta usa una sesión web JSF y el script es de solo lectura: no debe ejecutarse en CI ni modifica los datos.

## Resultado

- **70** programas académicos en el directorio.
- **66** tienen código SNIES al cierre de esta revisión.
- **63** códigos activos corresponden al programa, institución y modalidad esperados.
- **3** códigos de programas de la Universidad de Manizales se confirmaron como inactivos en HECAA y se conservaron con `verificationStatus: inactive_or_unverified`:
  - 52398 — Especialización Tecnológica en Redes.
  - 107284 — Maestría en Seguridad de la Información.
  - 107283 — Maestría en Gestión Estratégica de la Información.
- El 91151 se retiró para no mostrar una asociación incorrecta: HECAA lo asigna a Tecnología en Análisis y Desarrollo de Sistemas de Información del SENA. Para la Especialización Tecnológica en Gestión y Seguridad de Bases de Datos se conserva **217219** como código SENA, no como SNIES. La [convocatoria oficial del SENA](https://www.sena.edu.co/es-co/comunidades/instructores/Convocatorias/Formacion-Virtual-para-Especializacion-Tecnologica-en-Gestion-y-Seguridad-de-Base-de-Datos.pdf) confirma que fue formación titulada virtual, nacional y de 880 horas.
- Para la oferta local de Tecnología en Análisis y Desarrollo de Sistemas de Información se corrigió el SNIES a **107351**: HECAA lo ubica en Manizales, Caldas. El 91151 es una oferta distinta en Medellín, Antioquia. La [página del Centro de Automatización Industrial SENA Caldas](https://automatizacioncaldas.blogspot.com/p/formacion.html) también publica el 107351 para Manizales.
- La misma fuente local permitió incorporar cuatro programas afines al alcance del directorio: Técnico en Sistemas, Técnico en Programación de Software, Técnico en Programación de Aplicaciones y Servicios para la Nube y Tecnología en Análisis y Desarrollo de Software. El SNIES **110595** de este último fue contrastado en HECAA. Los tres programas técnicos permanecen en verificación parcial porque la fuente no informa un código de programa SENA ni la apertura actual.
- HECAA confirma que el SNIES **118598** de Tecnología en Implementación y Gestión de Bases de Datos está activo y tiene una oferta presencial principal en Manizales, Caldas. Aunque comparte denominación con los códigos **118599** y **118600**, esos corresponden respectivamente a ofertas a distancia y virtual ubicadas en Cauca; no se agregaron como programas de la Regional Caldas.
- El SNIES **105180** del Doctorado en Ingeniería se confirmó como un programa interinstitucional de la Red Universitaria Mutis, ofrecido por UAM, UNAB y UAO. Por ello, que HECAA muestre UNAB y la página de UAM muestre UAM no constituye una discrepancia.

Las diferencias de razón social del SENA, la referencia al convenio de la Maestría en Bioinformática y la etiqueta “(Virtual)” de Remington se verificaron como variaciones de presentación, no como códigos erróneos.

## Auditoría de cobertura SENA Caldas

`npm run audit:sena-caldas` consulta el inventario del SENA en HECAA mediante el código IES **9110** y el filtro de departamento **Caldas**; después revisa cada ficha de forma secuencial. Conserva únicamente las ofertas cuya propia tabla indica **Caldas / Manizales** y las compara con los registros `institutionSlug: sena-caldas` del repositorio. El reporte incluye el total declarado por HECAA, el número de filas realmente recuperadas y `inventoryMayBeIncomplete`; no se debe concluir que el inventario está completo cuando ese indicador sea verdadero. Como control adicional, consulta directamente cada SNIES SENA ya registrado: HECAA puede omitir algunos códigos de su listado por IES aunque sí existan en su ficha pública. El reporte JSON separa coincidencias, candidatos pertinentes faltantes, ofertas locales fuera del alcance actual, programas del directorio sin oferta local vigente y errores de consulta.

Es una herramienta de curaduría de solo lectura: no agrega ni modifica datos. Los candidatos deben revisarse con una fuente institucional adicional antes de incorporarlos al directorio.

## Próximo paso

Confirmar la oferta vigente y la relación actual de la Especialización Tecnológica en Gestión y Seguridad de Bases de Datos con la Regional Caldas; no se debe inferir ni mostrar un SNIES mientras no exista evidencia oficial de uno.
