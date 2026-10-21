import assert from 'node:assert/strict';
import { test } from 'node:test';
import { submitContactRequest, type ContactRequest } from '../src/lib/contact.ts';

const request: ContactRequest = {
  name: ' Cliente de prueba ', phone: ' 913000000 ',
  email: ' cliente@example.com ', service: 'Topografía', message: ' Consulta técnica ',
};
const respond = (body: unknown, status = 200): typeof fetch =>
  async () => new Response(JSON.stringify(body), { status });

test('accepts the boolean and string confirmations returned by the provider', async () => {
  await submitContactRequest(request, respond({ success: true }));
  await submitContactRequest(request, respond({ success: 'true' }));
});

test('rejects HTTP 200 responses that do not explicitly confirm acceptance', async () => {
  for (const body of [{ success: false }, { success: 'false' }, {}, null, { success: 1 }]) {
    await assert.rejects(submitContactRequest(request, respond(body)));
  }
});

test('rejects an HTTP error even when its body says success', async () => {
  await assert.rejects(submitContactRequest(request, respond({ success: true }, 503)));
});

test('rejects HTML or malformed JSON instead of showing a false success', async () => {
  await assert.rejects(submitContactRequest(request, async () => new Response('<html>Error</html>')));
});

test('propagates a network failure so the form can preserve the request', async () => {
  await assert.rejects(submitContactRequest(request, async () => { throw new TypeError('offline'); }));
});

test('sets the reply address, trims contact data and limits request duration', async () => {
  await submitContactRequest(request, async (url, init) => {
    assert.equal(url, 'https://formsubmit.co/ajax/mingeotop@gmail.com');
    const body = JSON.parse(String(init?.body));
    assert.equal(body._replyto, 'cliente@example.com');
    assert.equal(body.email, 'cliente@example.com');
    assert.equal(body.Nombre, 'Cliente de prueba');
    assert.equal(body.Mensaje, 'Consulta técnica');
    assert.ok(init?.signal instanceof AbortSignal);
    return new Response('{"success":"true"}');
  });
});
