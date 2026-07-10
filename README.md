# pocket_sprout

A static browser-based virtual pet game designed for GitHub Pages.

Players can open the page directly in their browser. There is no build step, backend, account system, package install, or download required.

## features

- feed, play, clean, nap, medicine, class, and catch_stars actions
- direct on-creature care: drag food onto the mouth, rub the sponge across dirt on the creature, and apply medicine to the creature body
- health can reach zero and the creature can die from neglect, sickness, exhaustion, or overfeeding
- stat decay over real elapsed time, including time while the browser is closed
- inventory system stored in `localStorage`
- shop for food, medicine, soap, class passes, toys, hats, glasses, and bows
- equippable cosmetic accessories drawn with CSS
- 36 CSS-generated creature forms
- random starting creature on new saves
- evolution stages: egg, baby, teen, adult
- no external assets or libraries

## files

```text
index.html
style.css
game.js
.nojekyll
README.md
```

## local play

Open `index.html` in a browser.

## publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the root of the repository.
3. Go to `Settings` → `Pages`.
4. Under `Build and deployment`, choose your source branch, usually `main`, and the root folder.
5. Save the setting.
6. Visit the URL GitHub Pages gives you.

## notes

This is a generic virtual pet game. Do not use Tamagotchi names, logos, characters, or branding unless you have the right to do so.

The creatures and accessories are not sprites. They are generated from CSS shapes and JavaScript definitions, so the project does not depend on external image files.


## hands-on care

The main care buttons now create tools directly inside the normal pet screen. There is no separate feeding, cleaning, or medicine window/panel.

- `feed`: drag the selected food onto the creature’s mouth and release it.
- `clean`: drag the sponge across the creature and rub every visible dirt spot. `bubble_soap` is consumed only after the cleaning is completed.
- `medicine`: drag the syringe onto the creature’s body and release it to apply the selected medicine.

These interactions use pointer events, so they work with mouse, touch, and stylus input in modern browsers.


## v3 fix

This version restores the missing CSS for the direct-care tools. Food, sponge, syringe, and dirt spots now render visibly inside the normal pet area.


## v4 fix

This version fixes the missing `setCareMessage` function that was stopping care interactions before the tool could appear. It also adds defensive inline visibility for food, sponge, syringe, and dirt spots.


## v5 changes

- Removed the `discover` button/function.
- Dirt now appears from the clean stat instead of being forced back after every wash.
- Dirt thresholds: no dirt at high cleanliness, then 1 to 5 dirt spots as cleanliness drops.
- Cleaning now only asks the player to scrub the dirt spots currently justified by the clean value.


## v6 changes

- Egg stage is now passive.
- Feed, clean, play, nap, medicine, class, catch_stars, and inventory item use are disabled while the pet is an egg.
- The shop remains visible and usable while waiting.
- Stat decay is paused while the pet is an egg, so players are not punished before care unlocks.
- Food can no longer be dragged onto the egg shell.
