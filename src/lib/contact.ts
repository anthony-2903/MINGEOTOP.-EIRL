export type ContactRequest = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/mingeotop@gmail.com';
export const CONTACT_TIMEOUT_MS = 120_000;

type ContactErrorKind = 'timeout' | 'network' | 'http' | 'provider' | 'activation' | 'invalid-response';

export class ContactSubmissionError extends Error {
  kind: ContactErrorKind;
  status?: number;

  constructor(kind: ContactErrorKind, message: string, status?: number) {
    super(message);
    this.name = 'ContactSubmissionError';
    this.kind = kind;
    this.status = status;
  }
}

export function getContactErrorMessage(error: unknown) {
  if (error instanceof ContactSubmissionError) {
    if (error.kind === 'timeout') {
      return 'El servicio de correo tardó demasiado en responder. No podemos confirmar si procesó la solicitud. Tus datos siguen aquí; revisa la recepción antes de volver a enviarla.';
    }
    if (error.kind === 'network') {
      return 'No pudimos conectar con el servicio de correo. Revisa tu conexión. Tus datos siguen en el formulario.';
    }
    if (error.kind === 'activation') {
      return 'El formulario todavía no está habilitado para recibir solicitudes. Tus datos siguen aquí; envíanos tu consulta desde tu correo o por WhatsApp.';
    }
    if (error.kind === 'provider' || error.kind === 'http') {
      return 'El servicio de correo no aceptó la solicitud. Tus datos siguen aquí; puedes enviarla manualmente desde tu correo.';
    }
  }
  return 'No pudimos confirmar el envío. Tus datos siguen en el formulario. Puedes enviar tu solicitud desde tu correo.';
}

export async function submitContactRequest(
  data: ContactRequest,
  fetcher: typeof fetch = fetch,
  formUrl = 'https://mingeotop.com/',
) {
  const signal = AbortSignal.timeout(CONTACT_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetcher(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      signal,
      body: JSON.stringify({
        _url: formUrl,
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
  } catch (error) {
    const timedOut = signal.aborted || (error instanceof Error && error.name === 'TimeoutError');
    throw new ContactSubmissionError(timedOut ? 'timeout' : 'network', 'No se completó la conexión con el servicio de correo.');
  }

  if (!response.ok) throw new ContactSubmissionError('http', 'El servicio de correo rechazó el envío.', response.status);

  // HTTP 200 alone does not confirm that the provider accepted the submission.
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new ContactSubmissionError(signal.aborted ? 'timeout' : 'invalid-response', 'El servicio devolvió una respuesta que no se pudo verificar.');
  }
  if (
    !result || typeof result !== 'object' || !('success' in result) ||
    (result.success !== true && result.success !== 'true')
  ) {
    const reason = result && typeof result === 'object' && 'message' in result && typeof result.message === 'string'
      ? result.message.slice(0, 300)
      : 'El servicio de correo no confirmó el envío.';
    const kind = /needs activation|activate form/i.test(reason) ? 'activation' : 'provider';
    throw new ContactSubmissionError(kind, reason);
  }
}
