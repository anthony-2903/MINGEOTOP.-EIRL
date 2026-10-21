# Comparativa local y mingeotop.com — 21 de octubre de 2026

La versión optimizada local consume menos datos que la versión pública actual.
Los cambios todavía no están desplegados en mingeotop.com.

## Medición de carga inicial

Lighthouse 13.5.0, Chrome local, emulación móvil 412 × 823, caché reiniciada y red móvil simulada. Local: compilación de producción servida por `vite preview` en el puerto 4173. Los dos entornos cargan los proyectos reales desde Supabase.

Cada entorno se midió dos veces de forma secuencial. En la primera captura:

| Recurso | Publicado | Local optimizado | Reducción |
|---|---:|---:|---:|
| Total transferido | 1787.6 kB | 842.1 kB | 52.9% |
| Imágenes | 984.4 kB | 503.5 kB | 48.9% |
| Videos precargados | 437.8 kB | 0.0 kB | 100.0% |
| JavaScript total cargado | 255.3 kB | 232.5 kB | 8.9% |
| Fuentes | 81.3 kB | 81.2 kB | 0.2% |
| CSS | 17.6 kB | 16.2 kB | 8.4% |

- Solicitudes totales: **33 → 20** en la primera captura.
- Solicitudes de medios de video: **10 → 0**. Las solicitudes incluyen segmentos/rangos; no equivalen al número de archivos únicos.
- Segunda captura: **1,399,647 → 842,067 bytes**. La primera fue **1,787,559 → 842,118 bytes**: reducción observada de **40–53%** según el volumen parcial de video precargado.
- Supabase: **3 consultas y aproximadamente 4.5 kB por carga** en ambos entornos. Hay una consulta de proyectos y dos de sectores (activos y lista completa).
- El JavaScript principal tiene una reducción mayor que el JavaScript total: los módulos diferidos de Motion y GSAP también terminan descargándose. La tabla cuenta todos los scripts cargados durante la medición.

## Carrusel y galería: comprobación en navegador

Se navegó mediante los controles visibles y se inspeccionaron los medios presentes:

| Estado | Publicado | Local optimizado |
|---|---|---|
| Carrusel | 8 elementos de video, 4 URLs únicas; 20 imágenes | 0 videos; 28 imágenes con 14 URLs únicas |
| Galería | 4 videos y 10 imágenes | 0 videos y 14 imágenes |
| Abrir ficha local con video | — | Solo 1 video, con controles y sin reproducción automática |

El carrusel duplica las tarjetas para el movimiento continuo. Las imágenes locales duplicadas conservan la misma URL; esto permite reutilizar la caché y no representa automáticamente el doble de transferencia. En la versión publicada se duplican también los reproductores, que pueden iniciar solicitudes de rangos adicionales.

La rotación del carrusel no vuelve a consultar Supabase en cada vuelta: la carga de proyectos se realiza al montar el componente. Las tarjetas locales muestran portadas de Cloudinary limitadas a 640 píxeles; el archivo de video solo se monta cuando se abre una ficha.

Esta inspección de interacción cuenta elementos y comportamiento; no mide los bytes adicionales exactos de cada clic o de una reproducción completa. Los totales de red de la tabla pertenecen a la carga inicial.

## Límites de interpretación

- Los videos con `preload="metadata"` descargan cantidades distintas según formato, rangos, caché y navegador. Los 36 MB de PageSpeed anteriores fueron otra sesión; no son el resultado de estas capturas ni una cantidad fija por visita.
- Una prueba HEAD de los cuatro videos obtuvo archivos MP4 de aproximadamente 6.27, 6.27, 3.88 y 0.88 MB: unos 17.30 MB si se descargan completos. Cloudinary puede negociar otro formato/peso con Chrome. No se sumaron estos tamaños a los bytes efectivamente transferidos.
- La segunda medición local avisó de CPU más lenta de lo esperado. Se omiten puntuaciones y tiempos de renderizado como conclusión comparativa; aquí se comparan solicitudes y bytes observados.
- Las segundas capturas se iniciaron con `#proyectos`, pero la captura final confirmó que la navegación inicial permaneció en el hero. Se consideran repeticiones de carga inicial, no mediciones de transferencia del carrusel visible.

## Qué queda por mejorar

1. Desplegar los cambios locales para que el ahorro llegue a los visitantes reales.
2. Unificar la obtención de sectores para evitar la consulta adicional, aunque su peso actual es pequeño.
3. Si crece mucho el portafolio, paginar o limitar los proyectos y reducir las tarjetas duplicadas. Actualmente hay 14 proyectos y 28 tarjetas en el carrusel.
4. Volver a medir en el mismo dominio una vez desplegado para comparar latencia y Core Web Vitals en condiciones equivalentes.

Los informes JSON originales y `comparison-summary.json` se conservan en `.react-doctor-report/`. Esta revisión no modificó el código de la aplicación.

## Verificación del servidor de desarrollo

Se detectó que `npm run dev` (puerto 5173) no cargaba las variables de `.env.production`, de modo que Supabase y Cloudinary estaban sin configurar en desarrollo. Las mediciones anteriores corresponden a `vite preview` (puerto 4173), que sí tenía las conexiones.

Se creó `.env.development.local`, excluido de Git por la regla `*.local`, con las variables públicas de conexión existentes. No se añadieron claves privadas al cliente.

Comprobación posterior:

- Desarrollo y producción apuntan al mismo proyecto Supabase y la misma cuenta Cloudinary.
- La API devuelve 14 proyectos publicados; la galería de desarrollo muestra los mismos 14 títulos.
- Las 14 portadas tienen carga completada y dimensiones naturales válidas; no se detectaron imágenes rotas.
- Se cargan los 5 sectores activos y se muestran en el filtro.
- La consola no registra errores ni advertencias en la comprobación.

Las consultas y descargas de desarrollo utilizan las cuentas reales. Los videos se descargan bajo demanda y las imágenes pueden reutilizar la caché; esto reduce transferencia sin omitir proyectos. Esta comprobación no accede a los paneles privados de facturación ni certifica sus contadores acumulados.
