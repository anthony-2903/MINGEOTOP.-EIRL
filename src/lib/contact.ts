export type ContactRequest = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/mingeotop@gmail.com';

export async function submitContactRequest(
  data: ContactRequest,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal: AbortSignal.timeout(20_000),
    body: JSON.stringify({
      _subject: `Nueva solicitud de cotización - ${data.service}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: data.email.trim(),
      email: data.email.trim(),
      Nombre: data.name.trim(),
      Telefono: data.phone.trim(),
      Servicio: data.service,
      Mensaje: data.message.trim(),
    }),
  });

  if (!response.ok) throw new Error('El servicio de correo rechazó el envío.');

  // HTTP 200 alone does not confirm that the provider accepted the submission.
  const result: unknown = await response.json();
  if (
    !result || typeof result !== 'object' || !('success' in result) ||
    (result.success !== true && result.success !== 'true')
  ) {
    throw new Error('El servicio de correo no confirmó el envío.');
  }
}
