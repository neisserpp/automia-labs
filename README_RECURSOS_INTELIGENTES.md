# AutomiaLabs — Recursos inteligentes

## Qué se añadió

La página `/recursos` ahora funciona como un recomendador guiado:

1. El visitante selecciona su problema principal.
2. Indica el tipo de negocio y la urgencia.
3. AutomiaLabs recomienda el PDF más relevante.
4. Se solicita nombre, email, empresa y WhatsApp opcional.
5. El lead se registra mediante `/api/recursos`.
6. El PDF se entrega inmediatamente desde Vercel.
7. El correo interno incluye problema, sector, urgencia, recurso recomendado, lead score y botones para responder por email/WhatsApp.

## Recursos publicados

- `/recursos/kit-10-automatizaciones-ia-para-pymes.pdf`
- `/recursos/sistema-captacion-automatica.pdf`
- `/recursos/sistema-atencion-automatica.pdf`
- `/recursos/sistema-recuperacion-clientes.pdf`

## Recomendación

Las reglas de recomendación están en `lib/resources.ts` y el flujo visual en `components/resource-advisor.tsx`.

No se utiliza una IA externa para decidir el PDF todavía. Las reglas son deterministas para que el sistema sea rápido, barato y predecible. Más adelante puede sustituirse `getRecommendedResource()` por una clasificación basada en IA sin cambiar el flujo de captación.

## Resend

Mientras el dominio propio no esté verificado en Resend, los leads se notifican a `LEADS_TO_EMAIL` y el usuario descarga el recurso directamente desde Vercel. Cuando haya un dominio verificado, se puede activar la entrega automática por email cambiando `EMAIL_FROM` y añadiendo el envío al usuario.
