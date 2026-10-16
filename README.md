# Portfolio audiovisual

Plantilla inicial para un portfolio personal de cine, vídeo y proyectos visuales. Está hecha con HTML y CSS, sin dependencias.

## Personaliza primero

En `index.html`, busca y sustituye:

- `Nombre Apellido` y las iniciales `NA`.
- La formación, intereses y ciudad.
- Los tres proyectos de ejemplo y sus descripciones.
- `tuemail@ejemplo.com` por un correo de contacto que quieras hacer público.
- El texto descriptivo y la imagen de portada cuando tengas material.

Los fondos de color de las tarjetas son marcadores visuales; reemplázalos por fotogramas o imágenes autorizadas cuando estés listo.

## Publicar con GitHub Pages

1. En GitHub, abre **Settings → Pages**.
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Selecciona la rama **main** y la carpeta **/(root)**; guarda.
4. Espera a que GitHub Pages publique el sitio. La dirección aparecerá en esa misma sección.

La web es estática: no necesita instalar nada para funcionar. Revisa el contenido antes de publicar; el repositorio es público y el correo que pongas será visible para cualquiera.

## Carrusel de destacados

La portada incluye un carrusel manual de tres espacios destacados. Para cambiar el título o la categoría, edita los tres elementos `highlight-slide` de `index.html`. Para cambiar el fondo provisional, ajusta sus clases `image-one`, `image-two` e `image-three` en `styles.css`; cuando tengas fotogramas, podemos sustituir esos fondos por imágenes tuyas. Los controles funcionan con los botones, los puntos o las flechas izquierda y derecha del teclado.
