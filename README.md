# Fondo · web

Home del MVP de Fondo: HTML, CSS y JavaScript sin dependencias ni paso de build.

## Estructura

- `index.html`: la home.
- `styles.css`: estilos (escritorio, tablet y móvil).
- `main.js`: interacciones (header, carrusel, cursor, elipses y formularios).
- `images/`: fotos.

## Verlo en local

Abre `index.html` en el navegador, o sirve la carpeta:

```
npx serve .
```

## Publicar en Vercel

1. En vercel.com, **Add New → Project** e importa este repositorio.
2. Framework preset: **Other**. Sin comando de build. Output directory: la raíz (`.`).
3. Deploy. Cada push a `main` vuelve a publicar.

## Pendiente

- Los formularios de newsletter aún no envían a ningún servicio (solo muestran "Gracias").
- Los enlaces a las páginas de viaje apuntan a `#viajes` hasta que existan esas páginas.
