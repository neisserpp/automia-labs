# Automia Labs — Email, Diagnóstico y Kits

## Variables de entorno
Copia `.env.example` a `.env.local` y completa `RESEND_API_KEY`.

- `RESEND_API_KEY`: clave privada de Resend.
- `LEADS_TO_EMAIL`: Gmail donde recibes los leads.
- `EMAIL_FROM`: inicialmente `onboarding@resend.dev`.
- `NEXT_PUBLIC_SITE_URL`: `https://automia-labs.vercel.app`.

## Desarrollo
Este proyecto usa PNPM:
```bash
pnpm install
pnpm dev
```

## Resend y el dominio Vercel
`https://automia-labs.vercel.app` sirve como URL pública para enlaces y descargas, pero **no puede usarse como dominio remitente de Resend** porque no es un dominio que controles. Mientras no verifiques un dominio propio en Resend, la cuenta está limitada a destinatarios de prueba (tu propia dirección).

Por eso el sistema:
1. Registra y notifica los leads a `LEADS_TO_EMAIL`.
2. Entrega el PDF inmediatamente desde la web a cualquier usuario.
3. Cuando verifiques un dominio propio en Resend, podrás cambiar `EMAIL_FROM` a `hola@tu-dominio` y activar correos automáticos a cualquier usuario.

## Endpoints
- `POST /api/diagnostico` — registra un diagnóstico y envía un email HTML al inbox.
- `POST /api/recursos` — registra una solicitud de kit y devuelve una URL de descarga inmediata.

Los emails incluyen `Reply-To` del lead y botones de respuesta por email/WhatsApp cuando el teléfono fue proporcionado.
