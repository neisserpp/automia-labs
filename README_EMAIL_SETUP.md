# Automia Labs — formularios y kits gratuitos

La web ya tenía los formularios como demo. Esta versión los conecta a dos endpoints reales:

- `POST /api/diagnostico`
- `POST /api/recursos`

No se necesita `nodemailer` ni añadir una dependencia: los endpoints usan la API HTTP de Resend.

## 1. Variables de entorno

Crea un archivo `.env.local` en desarrollo:

```env
RESEND_API_KEY=re_xxxxxxxxx
LEADS_TO=tuemail@gmail.com
EMAIL_FROM=Automia Labs <onboarding@resend.dev>
NEXT_PUBLIC_SITE_URL=https://automialabs.com
```

En Vercel añade exactamente las mismas variables en Project Settings → Environment Variables.

### Producción

Cuando tengas el dominio de Automia Labs verificado en Resend, cambia:

```env
EMAIL_FROM=Automia Labs <hola@automialabs.com>
```

`LEADS_TO` puede seguir siendo tu Gmail personal/provisional. No hace falta que el correo receptor sea de Google Workspace.

## 2. Kits gratuitos

Los PDFs públicos se colocan en:

`public/recursos/`

Por ejemplo:

`public/recursos/guia-automatizacion.pdf`

La URL pública será:

`https://automialabs.com/recursos/guia-automatizacion.pdf`

Para añadir otro kit, crea el PDF y añade una entrada en `lib/resources.ts`.

## 3. Flujo del diagnóstico

Cliente → `/api/diagnostico` → correo a `LEADS_TO` + confirmación al cliente.

El email enviado a Automia Labs usa `reply_to` con el correo del potencial cliente, así que desde Gmail puedes pulsar Responder y contestarle directamente.

## 4. Flujo de recursos

Cliente → `/api/recursos` → recibe el enlace del kit por email + Automia Labs recibe aviso del nuevo lead.

## 5. Importante

Los endpoints no guardan los datos en una base de datos todavía. El correo funciona como bandeja de entrada inicial de leads.

Cuando el volumen crezca, el siguiente paso recomendable será conectar los leads a un CRM/Google Sheets y automatizar seguimiento.

No pongas `RESEND_API_KEY` dentro del código ni la subas a GitHub.
