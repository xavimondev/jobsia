<p align="center">
  <a href="https://jobsia.vercel.app/" target="_blank">
    <img src="https://jobsia.vercel.app/img/banner.jpg" width="100%" alt="Banner" />
  </a>
</p>

# Jobsia

Es una plataforma web con búsqueda avanzada de trabajo en la que podrás ser entrevistado(a) por un asistente de inteligencia artificial usando reconocimiento de voz. Además recibirás feedback por cada una de tus respuestas y podrás comparar tus resultados con los de otros candidatos en un dashboard.

## Funcionalidades

### ✨ Búsqueda avanzada con IA

Este buscador utiliza la tecnología [Embeddings](https://platform.openai.com/docs/guides/embeddings) que pertenece a OpenIA.

#### ¿Como funciona?

Básicamente consiste en generar vectores por cada cadena de texto(en este caso sería la oferta de trabajo y la consulta del usuario) para posteriormente calcular la distancia entre estos dos y arrojar como resultado la oferta que tenga *mayor relación* con la consulta deseada.

A diferencia de los filtros tradicionales que no soportan consultas como `Desarrollador C# con ASP.NET con 2 años de experiencia y modalidad presencial` o `Desarrollador Java con salario de 30.000 en Barcelona`, gracias a los embeddings podríamos realizar búsquedas de ese tipo.

Para la hackaton he generado embeddings para *2280* ofertas de trabajo en las categorías de *programacion, sistemas, administracion-bases-datos y diseno-web*. Cabe mencionar que en la aplicación se mostrarán las **10** ofertas de trabajo que tenga un `umbral(match_threshold)` de `0.88` a más.

Toda la información está almacenada en una base de datos PostgresSQL en Supabase. Esta [guía](https://supabase.com/blog/openai-embeddings-postgres-vector) fue de mucha utilidad.

#### Endpoint

El endpoint de infojobs utilizado fue: `https://api.infojobs.net/api/9/offer?subcategory=programacion&subcategory=sistemas&subcategory=administracion-bases-datos&subcategory=diseno-web`

#### Procedimiento

Desarrolle un script que recorre 114 páginas de ofertas de trabajo usando el endpoint mencionado y por cada una de estas generaba el **embedding** para posteriormente almacenarlo en base de datos.

### ✨ Entrevista con Asistente IA

El asistente recibe información de la oferta de trabajo y mediante un [prompt](/src/utils/prompt.ts) genera las preguntas aleatoriamente y brinda puntaje y feedback por cada respuesta del candidato.

Gracias a la **Web Speech API** podremos convertir el texto generado a audio y el la voz del candidato a texto.

El objetivo de cada candidato es obtener `el puntaje necesario` y de esta forma estará apto para la siguiente fase de entrevista.
Gracias este filtro los reclutadores no tendrán necesidad de realizar la primera entrevista, ahorrando costos en esfuerzo y tiempo.

#### Compatibilidad

Para una experiencia completa, se recomienda utilizar **Microsoft Edge** o **Safari**.

Actualmente la **Web Speech API** no es compatible con todos los navegadores, en este proyecto se
utilizan dos interfaces [SpeechRecognition Texto - Voz](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) y
[SpeechSynthesisUtterance Voz - Text](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance).

En **caniuse** se puede ver la compatibilidad de [SpeechRecognition](https://caniuse.com/?search=SpeechRecognition) y
[SpeechSynthesisUtterance](https://caniuse.com/?search=SpeechSynthesisUtterance).

|     Navegador     | Texto a voz | Voz a texto |
| ----------------- | ----------- | ----------- |
| Microsoft Edge 113|     ✅      |      ✅     |
| Safari 16.4       |     ✅      |      ✅     |
| Google Chrome 113 |     🤔      |      ✅     |
| Firefox 113       |     ✅      |      ❌     |
| Brave 1.51        |     ✅      |      ❌     |

En el caso de Chrome parece ser un bug, ya que reproduce parte del texto del asistente y repentinamente se detiene.

### ✨ Dashboard

Podrás visualizar los resultados de los postulantes por cada oferta de trabajo. Cuenta con indicadores como la cantidad de postulantes, candidatos que aprobaron y desaprobaron la entrevista.

Por último, por cada candidato podrás revisar las preguntas, puntaje y feedback brindado por el asistente.

## Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Estilos**: [Tailwind](https://tailwindcss.com/) y [Radix](https://www.radix-ui.com/)
- **Dashboard**: [Tremor](tremor.so)
- **Iconos**: [Phosphoricons](https://phosphoricons.com/)
- **Web Speech API**: [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
- **Reconocimiento de voz**: [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition)
- **Autenticación**: [Next Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) e [Infojobs Auth](https://developer.infojobs.net/documentation/user-oauth2/index.xhtml)
- **Deployment**: [Vercel](https://www.vercel.com/)

## Configurando API Keys

### Infojobs
Las variables se encuentran en el archivo `.env`

1. Crear una cuenta en [Infojobs developer](https://developer.infojobs.net/).
2. Click en `Register new App` e ingresa la información que solicita el formulario. Finalizado el registro, podrás ver el `Client ID` y `Client Secret`.
3. Copiar los variables en `INFOJOBS_CLIENT_ID` e `INFOJOBS_CLIENT_SECRET`. Luego el valor de `INFOJOBS_REDIRECT_URI` debe ser el mismo **Callback URL** que ingresaste en el formulario del paso 2.
4. Finalmente, ir a [App authentication](https://developer.infojobs.net/documentation/app-auth/index.xhtml) y generar el token usando el formulario. Después copiar el resultado en `INFOJOBS_TOKEN`.

### OpenIA

1. Crear una cuenta en [OpenIA](https://platform.openai.com/account/api-keys).
2. Click en `Create new secret key` y copia el valor en `OPEN_IA_KEY`.

### Supabase

1. Crear una cuenta en [Supabase](https://supabase.com/dashboard).
2. Crear un proyecto e ingresar la información solicitada en el formulario.
3. Finalizado la creación del proyecto, ir a `Project Settings` en el menu lateral.
4. En la opción `API`, copiar y pegar el `anon public` y `URL` en `SUPABASE_URL` Y `SUPABASE_KEY`.

## Ejecutar localmente

1. Clona este repositorio e instala las dependencias usando:

```bash
# npm:
npm install

# o pnpm:
pnpm install

# o yarn:
yarn install
```

2. Ejecutar:

```bash
# npm:
npm run dev

# o pnpm:
pnpm dev

# o yarn:
yarn dev
```
