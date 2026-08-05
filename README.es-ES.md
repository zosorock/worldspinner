<div align="center">
  <img src="app/public/images/capytan_front.jpeg" alt="Capytan the Capybara - Your Geography Guide" width="200"/>
  <h1>🌍 World Spinner</h1>
</div>

Un juego educativo de aventura basado en geografía donde jóvenes exploradores desbloquean países, descubren interesantes datos sobre animales, comidas, culturas e historia mundial.

> **TL;DR** 🎮 Juego web para edades **7-12** • Código abierto (GPLv3) • 5 países para explorar • Estimulación intelectual sin simplificación excesiva • Listo para traducción para educación global

**🎮 [Jugar ahora en worldspinner.org](https://worldspinner.org)**

## 🎯 Sobre

World Spinner es un juego interactivo para navegador diseñado para niños de 7-12 años. Los jugadores hacen girar un globo virtual para revelar misteriosos países, resolver pistas progresivas y recopilar tarjetas de descubrimiento llenas de contenido educativo apropiado para su edad.

El juego utiliza un lenguaje estimulante intelectualmente sin simplificación excesiva, fomentando la curiosidad y el aprendizaje profundo a través de la exploración.

## ✨ Características (v0.4.0)

- 🎡 **Gira el Globo**: Animación de ruleta dramática con suave desaceleración
- 🔊 **Efectos de Sonido (NUEVO)**: Sonidos de clic sincronizados con la velocidad de rotación — rápido al comienzo, lento al final
- 🔇 **Control de Sonido (NUEVO)**: Alternar silenciar/activar sonido con preferencia guardada entre sesiones
- 🕵️ **Pistas Progresivas**: Tres pistas por país (animal, comida, bandera)
- ✍️ **Adivina y Aprende**: Validación insensible a mayúsculas/minúsculas con alias de nombres de países
- 🎉 **Tarjetas de Descubrimiento**: Datos educativos sobre cada país desbloqueado
- 📱 **Diseño Responsivo**: Funciona sin problemas en teléfonos, tabletas y portátiles
- 🎨 **Interfaz Pulida**: Tema de color teal con animaciones de Framer Motion
- 🌐 **Internacionalización**: Soporte completo en inglés y español con cambiador de idioma fácil de usar
- 🔄 **Persistencia de Idioma**: Tu preferencia de idioma se guarda entre sesiones
- 👥 **Listo para Traducción**: Estructura amigable para la comunidad para agregar nuevos idiomas
- 🎯 **Eliminación Inteligente de Tarjetas**: Cada país aparece solo una vez por sesión — ¡sin descubrimientos repetidos!
- 📊 **Seguimiento de Progreso**: Mira cuántos países has descubierto con un contador en vivo
- 🏆 **Finalización del Juego**: ¡Celebra con una pantalla animada de felicitaciones cuando hayas encontrado todos los países!
- 🔄 **Restablecimiento Manual**: ¡Comienza de nuevo en cualquier momento con el botón de restablecer — no necesitas terminar el juego primero!
## 🛠️ Tecnologías Usadas

- **Frontend**: React (JavaScript)
- **Herramienta de Construcción**: Vite (servidor de desarrollo rápido, HMR instantáneo)
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Pruebas**: Jest (≥80% de cobertura)
- **Linter**: ESLint con configuración Airbnb
- **Formateador**: Prettier (longitud de línea de 120 caracteres)

Ver [Stack.md](./Stack.md) para especificaciones técnicas completas.

## 📁 Estructura del Proyecto

```
WorldSpinner/
├── app/                    # Aplicación React
│   ├── src/                # Código fuente
│   ├── public/             # Recursos estáticos
│   └── package.json        # Dependencias
├── Ideas.md                # Ideas de funciones y mejoras futuras
├── Backlog.md              # Historias de usuarios y tareas de desarrollo
├── Stack.md                # Decisiones de tecnología
├── CHANGELOG.md            # Historial de versiones
└── README.md               # Este archivo
```

## 🚀 Primeros Pasos

### Requisitos Previos

- Node.js (v22 o superior)
- npm o yarn

### Instalación

```bash
# Clona el repositorio
git clone https://github.com/zosorock/worldspinner.git

cd worldspinner/app

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm start
```

El juego se abrirá en `http://localhost:5173`

### Ejecutando Pruebas

```bash
cd app
npm test              # Ejecuta pruebas en modo observación
npm run test:coverage # Genera reporte de cobertura
```

### Construyendo para Producción

```bash
cd app
npm run build  # Salida en app/dist/
```

## 🌐 Contribuyendo

¡Bienvenidas las contribuciones, especialmente traducciones! World Spinner está diseñado para ser fácilmente traducible para que niños de todo el mundo puedan aprender geografía en su idioma nativo.

### Agregando un Nuevo Idioma

¿Quieres ayudar a niños a aprender en tu idioma? ¡Nos encantaría tu ayuda! Sigue estos pasos amigables para principiantes:

#### Paso 1: Crea tu Archivo de Traducción

1. Navega al directorio `app/src/locales/`
2. Copia `en.json` y renómbralo usando el [código de idioma ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) de tu idioma:
   - Francés: `fr.json`
   - Alemán: `de.json`
   - Portugués: `pt.json`
   - Japonés: `ja.json`
   - Y así sucesivamente...

#### Paso 2: Traduce el Contenido

Abre tu nuevo archivo y traduce **solo los valores** (el texto en comillas después de `:`) — ¡mantén todas las claves en inglés!

**Buen ejemplo:**
```json
{
  "buttons": {
    "spinGlobe": "🎡 Faire tourner le globe"
  }
}
```

**Mal ejemplo** (no traduzcas las claves):
```json
{
  "boutons": {
    "faireTournerLeGlobe": "🎡 Faire tourner le globe"
  }
}
```

**Pautas importantes:**
- **Mantén la estructura**: Tu archivo debe tener la misma estructura anidada exacta que `en.json` (máximo 2 niveles de profundidad)
- **Mantén las claves**: Nunca traduzcas las claves como `buttons`, `spinGlobe`, `feedback`, etc.
- **Mantén los emojis**: Los emojis de botones (🎡, 🔍, ✍️) son indicaciones visuales que funcionan en cualquier idioma
- **Mantén los marcadores de posición**: Texto como `{country}` o `{current}/{total}` es reemplazado por el juego — no traduzcas estos elementos
- **Lenguaje apropiado para la edad**: World Spinner es para niños de 7-12 años, así que mantén las traducciones simples y amigables
- **Agrega un comentario**: Incluye un campo `_comment` en la parte superior describiendo tu traducción (ver `en.json` para un ejemplo)

#### Paso 3: Registra tu Idioma en la Aplicación

¡Tu archivo de traducción está listo! Ahora necesitas registrarlo en dos lugares:

**3a. Importa tu traducción en TranslationContext**

Edita `app/src/contexts/TranslationContext.jsx`:

1. Importa tu archivo de traducción (alrededor de la línea 12):
   ```jsx
   import frTranslations from '../locales/fr.json';
   ```

2. Agrega tu idioma al arreglo `VALID_LANGUAGES` (alrededor de la línea 15):
   ```jsx
   const VALID_LANGUAGES = ['en', 'es', 'fr'];
   ```

3. Agrega tus traducciones al mapa `translations` (alrededor de la línea 18):
   ```jsx
   const translations = {
     en: enTranslations,
     es: esTranslations,
     fr: frTranslations,
   };
   ```

**3b. Agrega un botón de idioma al Switcher**

Edita `app/src/components/LanguageSwitcher.jsx`:

1. Encuentra los botones de idioma existentes (alrededor de las líneas 50-83)
2. Copia uno de los bloques de botones existentes (EN o ES)
3. Actualiza el botón con el código de tu idioma, emoji de bandera y aria-label

**Ejemplo para Francés:**
```jsx
<motion.button
  type="button"
  onClick={() => handleLanguageClick('fr')}
  className={getButtonClasses(language === 'fr')}
  aria-label="Passer au français"
  aria-pressed={language === 'fr'}
  whileTap={{ scale: 0.95 }}
>
  <span className="flex items-center gap-1.5">
    <span role="img" aria-label="French flag">
      🇫🇷
    </span>
    <span>FR</span>
  </span>
</motion.button>
```

#### Paso 4: Prueba tu Traducción

**¿Primera vez?** Instala las dependencias:
```bash
cd app
npm install
```

**Ejecuta pruebas automatizadas** para verificar la estructura de tu archivo de traducción:

```bash
npm test -- locales.test.js
```

Las pruebas verificarán:
- Tu archivo JSON es válido
- Todas las claves coinciden exactamente con la versión en inglés
- La estructura tiene máximo 2 niveles de profundidad
- Incluiste un campo `_comment`

**Fallos comunes en pruebas:**
- "las claves no coinciden" → Agregaste/eliminaste una clave de traducción. Copia la estructura de `en.json` nuevamente.
- "la estructura no tiene máximo 2 niveles de profundidad" → Anidaste categorías demasiado profundamente. Manténlo a 2 niveles máximo.
- "no tiene comentario de documentación" → Agrega un campo `_comment` en la parte superior de tu archivo.

**Pruebas manuales:**
```bash
npm start
```

Luego haz clic en tu botón de idioma y explora la aplicación para asegurarte de que todo se vea bien.

#### Paso 5: Envía tu Traducción

**Opción A: Usando Git (recomendado para desarrolladores)**

1. **Haz un fork de este repositorio** en GitHub
2. **Crea una nueva rama** para tu traducción:
   ```bash
   git checkout -b add-french-translation
   ```
3. **Confirma tus cambios**:
   ```bash
   git add app/src/locales/fr.json app/src/contexts/TranslationContext.jsx app/src/components/LanguageSwitcher.jsx
   git commit -m "Add French translation"
   ```
4. **Subir a tu fork**:
   ```bash
   git push origin add-french-translation
   ```
5. **Abre un Pull Request** en GitHub

**Opción B: Usando la interfaz web de GitHub (más fácil para no desarrolladores)**

1. **Haz un fork de este repositorio** usando el botón "Fork" en GitHub
2. Navega a los archivos que modificaste en tu fork
3. Haz clic en "Add file" → "Upload files" para subir tu nuevo archivo `fr.json`
4. Haz clic en el icono de lápiz (Editar) para modificar `TranslationContext.jsx` y `LanguageSwitcher.jsx`
5. Crea un Pull Request desde la página principal de tu fork

**En tu Pull Request, incluye:**
- Un título claro: "Add [idioma] translation"
- Una descripción mencionando que seguiste la guía de traducción
- Cualquier pregunta o nota sobre las opciones de traducción

Revisaremos tu contribución y podríamos hacer preguntas sobre decisiones específicas de traducción. ¡No te preocupes — estamos aquí para ayudarte!

#### Referencia de Archivos de Traducción

- **Traducciones principales**: [app/src/locales/en.json](app/src/locales/en.json) (plantilla para copiar)
- **Pautas**: [app/src/locales/_README.json](app/src/locales/_README.json) (referencia técnica)
- **Registro de traducción**: [app/src/contexts/TranslationContext.jsx](app/src/contexts/TranslationContext.jsx) (importa y registra tu idioma)
- **Selector de idioma**: [app/src/components/LanguageSwitcher.jsx](app/src/components/LanguageSwitcher.jsx) (agrega tu botón aquí)
- **Pruebas de traducción**: [app/src/locales/locales.test.js](app/src/locales/locales.test.js) (valida estructura)

#### ¿Preguntas?

¿No estás seguro sobre algo? Abre un issue en GitHub con la etiqueta "translation" y con gusto te ayudaremos.

### Flujo de Trabajo de Desarrollo

1. Revisa [Backlog.md](./Backlog.md) para historias de usuarios actuales
2. Revisa [Ideas.md](./Ideas.md) para ideas de funciones
3. Sigue la tecnología en [Stack.md](./Stack.md)
4. Asegúrate de que las pruebas pasen y la cobertura se mantenga ≥80%
5. Sigue la Guía de Estilo JavaScript de Airbnb

## 🗺️ Hoja de Ruta

### ¿Qué viene?
- 🦫 **Capytan el Capibara**: Personaje anfitrión del juego
- 🌍 **Más Países**: Expandir más allá de los 30 países iniciales
- 🏆 **Sistema de Progresión**: Insignias continentales y niveles de explorador
- 🎨 **Visuales Mejorados**: Imágenes de países e ilustraciones
- 🔊 **Soporte de Audio**: Guías de pronunciación y efectos de sonido

Ver [Ideas.md](./Ideas.md) para todas las funciones planificadas y mejoras.

## 🙏 Agradecimientos

Este juego fue soñado enteramente por mi hijo mayor, Liam, con infinito amor por el aprendizaje, con contribuciones de mi director creativo, Nolan (su hermano menor) y consejos, supervisión y ayuda en la producción de mi hermosa y multifacética esposa, Carolina. Ustedes tres son las mejores cosas que me han pasado a mí. 🥰

Construido con curiosidad, exploración y amor por el aprendizaje.

## 📄 Licencia

World Spinner es dualmente licenciado:

- **Código Fuente**: Licenciado bajo [GPLv3](./LICENSE.md) - Gratis para usar, modificar y compartir. Si distribuyes tu versión, debes compartir el código fuente bajo los mismos términos.
- **Recursos del Juego**: Licenciado bajo [CC BY-NC-SA 4.0](./ASSETS_LICENSE.md) - Gratis para mezclar y compartir para propósitos no comerciales con atribución.

Ver [LICENSE.md](./LICENSE.md) y [ASSETS_LICENSE.md](./ASSETS_LICENSE.md) para detalles completos.
