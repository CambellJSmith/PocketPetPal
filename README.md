# pocket_sprout

A small browser-based virtual pet game designed for GitHub Pages.

Players can open the page directly in their browser. There is no build step, backend, account system, package install, or download required.

## features

- feed, play, clean, nap, and medicine actions
- simple stat decay over real elapsed time
- browser save using `localStorage`
- evolution stages: egg, baby, teen, adult
- 36 CSS-generated creature forms
- random starting creature on new saves
- `discover` button that lets players spend coins to find another creature form
- short click-based `catch_stars` mini-game
- responsive layout for desktop and mobile
- no external assets or libraries

## files

```text
index.html
style.css
game.js
.nojekyll
README.md
```

## publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the root of the repository.
3. Go to `Settings` → `Pages`.
4. Under `Build and deployment`, choose your source branch, usually `main`, and the root folder.
5. Save the setting.
6. Visit the URL GitHub Pages gives you.

## notes

This is a generic virtual pet game. Do not use Tamagotchi names, logos, characters, or branding unless you have the right to do so.

The creatures are not sprites. They are generated from CSS shapes and JavaScript creature definitions, so the project does not depend on any external image files.
