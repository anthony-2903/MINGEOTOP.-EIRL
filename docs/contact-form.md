# Envío del formulario de contacto

El formulario envía las solicitudes a `mingeotop@gmail.com` mediante FormSubmit.
No utiliza SMTP de Gmail ni una función de correo de Vercel.

## Activación y comprobación de entrega

1. Desde `https://mingeotop.com`, enviar una consulta de prueba identificada como tal.
2. En `mingeotop@gmail.com`, buscar el mensaje de activación de FormSubmit, también en Spam y Todos.
3. Confirmar la dirección receptora siguiendo el enlace del proveedor, si aún no está activada.
4. Enviar una nueva consulta después de confirmar y comprobar que llega con el contenido correcto.

La documentación de FormSubmit indica que el primer envío genera un correo de confirmación:
https://formsubmit.co/

Una aceptación del proveedor no garantiza que el mensaje termine en la bandeja de entrada.
Si la dirección ya está activada y no llega una nueva prueba, revisar Spam y los filtros de Gmail;
si persiste, contactar al proveedor con la hora y el dominio del envío.

## Comportamiento de la aplicación

- Solo muestra confirmación si la respuesta HTTP es correcta y el JSON contiene `success: true` o `success: "true"`.
- Envía la dirección del visitante en `email` y `_replyto` para poder responderle.
- Permite hasta 120 segundos para recibir la confirmación del proveedor; no reintenta automáticamente.
- Ante un rechazo, respuesta inválida, fallo de red o espera agotada, conserva los datos y distingue el motivo. Un tiempo agotado no demuestra que el proveedor no haya procesado la solicitud.
- Ofrece un enlace para preparar el mensaje en Gmail. El visitante debe enviarlo manualmente.
- Las pruebas automatizadas usan respuestas simuladas y no envían correos reales.

Ejecutar `npm run test:contact`, `npm run lint` y `npm run build` para verificar los cambios.
Los cambios locales requieren desplegarse antes de afectar al formulario público.

## Comprobación pública del 21 de octubre de 2026

- La web pública todavía sirve `index-DlbBQX0W.js`, anterior a las correcciones locales.
- La prueba directa autorizada al endpoint AJAX recibió HTTP 403 de Cloudflare (error 1010, firma del cliente bloqueada). No confirma entrega ni estado de activación.
- Se realizó una prueba desde el formulario público con el nombre “Prueba técnica de MINGEOTOP”. Tras una espera prolongada, el formulario mostró “¡Solicitud enviada!”. La versión pública solo valida HTTP y no lee la confirmación del proveedor, por lo que esa pantalla no demuestra recepción en Gmail.
- El propietario confirmó después la recepción en Gmail mediante una captura con solicitudes recibidas de FormSubmit. La activación y la entrega quedaron confirmadas para el formulario público.
- Evidencia local: `.react-doctor-report/contact-live-test.png`.

## Revisión posterior al despliegue

- El propietario confirmó que llegó la prueba de producción del 21 de octubre, aunque el navegador había agotado la espera de 20 segundos. La entrega real de producción está confirmada; el error visual fue una confirmación tardía.
- En desarrollo, el proveedor respondió explícitamente `This form needs Activation`. Esto requiere comprobar la activación del origen local.
- La siguiente prueba local, con `_url` canónica, devolvió HTTP 500 del proveedor. No se considera una prueba aprobada.
- Los cambios pendientes amplían la espera a 120 segundos, distinguen activación, rechazo HTTP, fallo de red y tiempo agotado, y preservan los datos. Las pruebas automatizadas pasan, pero el envío real local sigue pendiente.
- No hacer push de esta revisión hasta comprobar el funcionamiento local, conforme a la instrucción del propietario.
