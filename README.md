<div align="center">
  <img src="app/public/images/capytan_front.jpeg" alt="Capytan the Capybara - Your Geography Guide" width="200"/>
  <h1>🌍 World Spinner</h1>
</div>

A geography-based educational adventure game where young explorers unlock countries, discover fascinating facts about animals, foods, cultures, and world history.

> **TL;DR** 🎮 Browser game for ages **7-12** • Open source (GPLv3) • 5 countries to explore • Intellectually stimulating without oversimplification • Translation-ready for global education

**🎮 [Play Now at worldspinner.org](https://worldspinner.org)**

## 🎯 About

World Spinner is an interactive browser game designed for children aged 7-12. Players spin a virtual globe to reveal mystery countries, solve progressive clues, and collect discovery cards filled with age-appropriate educational content.

The game uses intellectually stimulating language without oversimplification, encouraging curiosity and deeper learning through exploration.

## ✨ Features (v0.4.0)

- 🎡 **Spin the Globe**: Dramatic roulette-style spinning animation with smooth deceleration
- 🔊 **Sound Effects (NEW)**: Click sounds synchronized with rotation speed—fast at start, slow at end
- 🔇 **Sound Control (NEW)**: Mute/unmute toggle with preference saved between sessions
- 🕵️ **Progressive Clues**: Three hints per country (animal, food, flag)
- ✍️ **Guess & Learn**: Case-insensitive validation with country name aliases
- 🎉 **Discovery Cards**: Educational facts about each unlocked country
- 📱 **Responsive Design**: Works seamlessly on phones, tablets, and laptops
- 🎨 **Polished UI**: Teal color theme with Framer Motion animations
- 🌐 **Internationalization**: Full English and Spanish language support with easy-to-use language switcher
- 🔄 **Language Persistence**: Your language preference is saved between sessions
- 👥 **Translation-Ready**: Community-friendly structure for adding new languages
- 🎯 **Smart Card Removal**: Each country appears only once per session—no repetitive discoveries!
- 📊 **Progress Tracking**: See how many countries you've discovered with a live counter
- 🏆 **Game Completion**: Celebrate with an animated congratulations screen when you've found all countries
- 🔄 **Manual Reset**: Start fresh anytime with the reset button—no need to finish the game first
## 🛠️ Tech Stack

- **Frontend**: React (JavaScript)
- **Build Tool**: Vite (fast dev server, instant HMR)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Testing**: Jest (≥80% coverage)
- **Linting**: ESLint with Airbnb config
- **Formatting**: Prettier (120 char line length)

See [Stack.md](./Stack.md) for complete technical specifications.

## 📁 Project Structure

```
WorldSpinner/
├── app/                    # React application
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   └── package.json        # Dependencies
├── Ideas.md                # Feature ideas and future enhancements
├── Backlog.md              # User stories and development tasks
├── Stack.md                # Technology stack decisions
├── CHANGELOG.md            # Version history
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/zosorock/worldspinner.git

cd worldspinner/app

# Install dependencies
npm install

# Start development server
npm start
```

The game will open at `http://localhost:5173`

### Running Tests

```bash
cd app
npm test              # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Building for Production

```bash
cd app
npm run build  # Outputs to app/dist/
```

## 🌐 Contributing

We welcome contributions, especially translations! World Spinner is designed to be easily translatable so children around the world can learn geography in their native language.

### Adding a New Language

Want to help kids learn in their language? We'd love your help! Follow these beginner-friendly steps:

#### Step 1: Create Your Translation File

1. Navigate to the `app/src/locales/` directory
2. Copy `en.json` and rename it using the [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for your language:
   - French: `fr.json`
   - German: `de.json`
   - Portuguese: `pt.json`
   - Japanese: `ja.json`
   - And so on...

#### Step 2: Translate the Content

Open your new file and translate **only the values** (the text in quotes after the `:`) — keep all the keys in English!

**Good example:**
```json
{
  "buttons": {
    "spinGlobe": "🎡 Faire tourner le globe"
  }
}
```

**Bad example** (don't translate the keys):
```json
{
  "boutons": {
    "faireTournerLeGlobe": "🎡 Faire tourner le globe"
  }
}
```

**Important guidelines:**
- **Keep the structure**: Your file must have the exact same nested structure as `en.json` (max 2 levels deep)
- **Keep the keys**: Never translate the keys like `buttons`, `spinGlobe`, `feedback`, etc.
- **Keep the emojis**: Button emojis (🎡, 🔍, ✍️) are visual cues that work in any language
- **Keep the placeholders**: Text like `{country}` or `{current}/{total}` are replaced by the game — don't translate these
- **Age-appropriate language**: World Spinner is for kids ages 7-12, so keep translations simple and friendly
- **Add a comment**: Include a `_comment` field at the top describing your translation (see `en.json` for an example)

#### Step 3: Register Your Language in the App

Your translation file is ready! Now you need to register it in two places:

**3a. Import your translation in TranslationContext**

Edit `app/src/contexts/TranslationContext.jsx`:

1. Import your translation file (around line 12):
   ```jsx
   import frTranslations from '../locales/fr.json';
   ```

2. Add your language to `VALID_LANGUAGES` array (around line 15):
   ```jsx
   const VALID_LANGUAGES = ['en', 'es', 'fr'];
   ```

3. Add your translations to the `translations` map (around line 18):
   ```jsx
   const translations = {
     en: enTranslations,
     es: esTranslations,
     fr: frTranslations,
   };
   ```

**3b. Add a language button to the Switcher**

Edit `app/src/components/LanguageSwitcher.jsx`:

1. Find the existing language buttons (around lines 50-83)
2. Copy one of the existing button blocks (EN or ES)
3. Update the button with your language code, flag emoji, and aria-label

**Example for French:**
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

#### Step 4: Test Your Translation

**First time?** Install dependencies:
```bash
cd app
npm install
```

**Run automated tests** to verify your translation file structure:

```bash
npm test -- locales.test.js
```

The tests will verify:
- Your JSON file is valid
- All keys match the English version exactly
- The structure is max 2 levels deep
- You included a `_comment` field

**Common test failures:**
- "keys do not match" → You added/removed a translation key. Copy the structure from `en.json` again.
- "structure is not max 2 levels deep" → You nested categories too deep. Keep it to 2 levels max.
- "does not have documentation comment" → Add a `_comment` field at the top of your file.

**Manual testing:**
```bash
npm start
```

Then click your language button and explore the app to make sure everything looks good!

#### Step 5: Submit Your Translation

**Option A: Using Git (recommended for developers)**

1. **Fork this repository** on GitHub
2. **Create a new branch** for your translation:
   ```bash
   git checkout -b add-french-translation
   ```
3. **Commit your changes**:
   ```bash
   git add app/src/locales/fr.json app/src/contexts/TranslationContext.jsx app/src/components/LanguageSwitcher.jsx
   git commit -m "Add French translation"
   ```
4. **Push to your fork**:
   ```bash
   git push origin add-french-translation
   ```
5. **Open a Pull Request** on GitHub

**Option B: Using GitHub's web interface (easier for non-developers)**

1. **Fork this repository** using the "Fork" button on GitHub
2. Navigate to the files you modified in your fork
3. Click "Add file" → "Upload files" to upload your new `fr.json`
4. Click the pencil icon (Edit) to modify `TranslationContext.jsx` and `LanguageSwitcher.jsx`
5. Create a Pull Request from your fork's main page

**In your Pull Request, include:**
- A clear title: "Add [Language] translation"
- A description mentioning you followed the translation guide
- Any questions or notes about translation choices

We'll review your contribution and may ask questions about specific translation choices. Don't worry — we're here to help!

#### Translation Files Reference

- **Main translations**: [app/src/locales/en.json](app/src/locales/en.json) (template to copy)
- **Guidelines**: [app/src/locales/_README.json](app/src/locales/_README.json) (technical reference)
- **Translation registration**: [app/src/contexts/TranslationContext.jsx](app/src/contexts/TranslationContext.jsx) (import and register your language)
- **Language switcher**: [app/src/components/LanguageSwitcher.jsx](app/src/components/LanguageSwitcher.jsx) (add your button here)
- **Translation tests**: [app/src/locales/locales.test.js](app/src/locales/locales.test.js) (validates structure)

#### Questions?

Not sure about something? Open an issue on GitHub with the "translation" label and we'll be happy to help!

### Development Workflow

1. Check [Backlog.md](./Backlog.md) for current user stories
2. Review [Ideas.md](./Ideas.md) for feature ideas
3. Follow the tech stack in [Stack.md](./Stack.md)
4. Ensure tests pass and coverage stays ≥80%
5. Follow Airbnb JavaScript Style Guide

## 🗺️ Roadmap

### What's Next
- 🦫 **Capytan the Capybara**: Friendly game host character
- 🌍 **More Countries**: Expand beyond the initial 30 countries
- 🏆 **Progression System**: Continental badges and explorer levels
- 🎨 **Enhanced Visuals**: Country images and illustrations
- 🔊 **Audio Support**: Pronunciation guides and sound effects

See [Ideas.md](./Ideas.md) for all planned features and enhancement ideas.

## 🙏 Acknowledgments

This game was entirely dreamed up by my eldest son, Liam, boundless love for learning, with contributions from my creative director, Nolan (his younger brother) and advise, supervision, and production assistance from my lovely and multi-talented wife, Carolina. You three are the best things that ever happened to me. 🥰

Built with curiosity, exploration, and a love of learning in mind.

## 📄 License

World Spinner is dual-licensed:

- **Source Code**: Licensed under [GPLv3](./LICENSE.md) - Free to use, modify, and share. If you distribute your version, you must share the source code under the same terms.
- **Game Assets**: Licensed under [CC BY-NC-SA 4.0](./ASSETS_LICENSE.md) - Free to remix and share for non-commercial purposes with attribution.

See [LICENSE.md](./LICENSE.md) and [ASSETS_LICENSE.md](./ASSETS_LICENSE.md) for complete details.