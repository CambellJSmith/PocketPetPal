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
dialogue.csv
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


## v7 changes

- Egg stage has a hard action lock, not just disabled buttons.
- Feed, clean, play, nap, medicine, class, catch_stars, inventory use, and active drag tools are blocked while the pet is an egg.
- The shop remains open and purchases still work while waiting.
- Stat decay remains paused while the pet is an egg.
- The old behavior that allowed food to be dragged onto the egg shell has been removed.


## v8 real-time care rebalance

- Hunger now drains slowly across a real day. Rough target: around three sensible feedings per day.
- Cleanliness now drains slowly across a real day. Rough target: around two washes per day.
- Playing adds extra mess, so frequent play means more cleaning.
- Sickness is rare. It mainly comes from serious neglect, very low health, or repeated overfeeding.
- Medicine is no longer a routine care button. It is blocked unless the pet is sick or health is seriously low.
- Stat decay remains paused while the creature is an egg.
- Dirt spots are now tied to cleanliness thresholds and do not appear immediately after a successful wash.


## v9 secret egg changes

- The egg stage no longer reveals the creature species in text.
- The creature label shows `unknown` while the pet is still an egg.
- New save text says only that a mysterious egg is waiting.
- Legacy revealing egg messages are scrubbed while the pet is still an egg.
- The egg still uses physical design hints through colour and markings, so the species is hinted visually rather than named.


## v10 visible real-time fix

- Added a `care_clock` panel so players can see whether real-time care is active.
- Added `feed_around`, `clean_around`, `medicine`, and `last_tick` readouts.
- Stat values now show one decimal place so slow daily decay is visible sooner.
- Food decay is now calibrated closer to three sensible feedings per real day.
- Cleanliness decay is now calibrated closer to two washes per real day, with extra mess from play.
- The egg stage still pauses real-time care and says `real_time_paused_until_hatch`.


## v11 timed sleep

- `nap` no longer instantly restores energy.
- Pressing `nap` now puts the creature to sleep for about 3 real hours.
- While sleeping, the same button becomes `wake_up`.
- Waking early applies a large fun and bond penalty.
- Sleeping slowly restores energy over real time.
- Hunger, cleanliness, fun, and bond decay much more slowly while sleeping.
- Feeding, cleaning, play, medicine, classes, inventory item use, and catch_stars are blocked during sleep.
- The shop stays usable while the creature sleeps.


## v12 dialogue database

- Added `dialogue.csv` as a human-readable and spreadsheet-editable phrase database.
- The game loads `dialogue.csv` using `fetch()`.
- Columns are `id,event,mood,text`.
- `event` examples: `idle`, `play`, `feed`, `clean`, `medicine`, `class`, `sleep`, `wake`, `any`.
- `mood` examples: `happy`, `calm`, `sad`, `sick`, `any`.
- Higher mood gives more frequent idle speech.
- Every successful play action forces a phrase from the `play` event.
- `catch_stars` also forces a `play` phrase when it finishes.
- If the CSV cannot be loaded, the game uses a small built-in fallback list so it does not break.

When editing the CSV, keep the header row exactly:

```csv
id,event,mood,text
```

On GitHub Pages, upload `dialogue.csv` beside `index.html`, `style.css`, and `game.js`.


## v13 life stages and aging visuals

- Added full age stages: `egg`, `baby`, `child`, `teen`, `adult`, `elder`.
- The stage label now progresses through all six life stages.
- The pet visibly changes shape as it ages.
- Early stages have smaller bodies and larger eyes.
- As the creature matures, the body grows and the eyes become more proportionate.
- Elders have a slightly more mature silhouette and gentler animation timing.

Current age thresholds:
- `egg`: under 2 minutes
- `baby`: under 60 minutes
- `child`: under 6 hours
- `teen`: under 24 hours
- `adult`: under 3 days
- `elder`: 3 days and beyond


## v14 hatch naming

- The pet cannot be named while it is still an egg.
- As soon as the egg hatches, a naming modal appears.
- Care actions, inventory use, and mini-games stay locked until the player names the new pet.
- The main name field is locked during the egg stage and during the hatch naming step.
- After naming, normal care begins.


## v15 rock paper scissors

- Added a `rps` button.
- The player can play rock_paper_scissors against the pet.
- The game keeps going automatically after every win or draw.
- The mini-game only ends when the player loses.
- Each win increases the streak.
- Coin rewards scale with the streak: win 1 gives 1 coin, win 2 gives 2 coins, and so on, capped at 20 coins per round.
- Normal care, inventory use, shop purchases, reset, and other mini-games are locked while RPS is active.
- RPS is blocked during egg stage, hatch naming, and sleep.


## v16 draggable accessories

- Equipped accessories can now be dragged directly on the pet.
- Accessory positions are saved in localStorage.
- Positions are saved by accessory item id, so `tiny_hat` and `wizard_hat` keep separate placements.
- Hats, glasses, and bows can all be moved.
- Added `reset_gear_positions` in the inventory panel.
- Dragging is disabled during egg stage, hatch naming, active care interactions, catch_stars, and RPS.


## v17 management tabs

- Replaced the long stacked inventory/shop area with tabs.
- Added `supplies`, `equipment`, and `shop` tabs.
- Supplies now only shows consumables and usable items like food, medicine, soap, and classes.
- Equipment now only shows owned accessories.
- The accessory position reset button now lives in the equipment tab.
- Shop stays in its own tab.


## v18 equipment store split

- The shop now lists only consumable/use-up items: food, medicine, soap, and class passes.
- Permanent equipment has moved out of the shop.
- The equipment tab now shows unowned and owned equipment.
- Unowned equipment can be bought directly from the equipment tab.
- Owned wearable accessories can then be equipped or unequipped from that same equipment tab.
- `toy_ball` is treated as permanent equipment; once bought, it is automatically enabled.


## v19 NFC tag tools

- Added an `nfc` tab.
- Added `write_pet_tag`.
- Added `read_pet_tag`.
- `write_pet_tag` writes two NDEF records:
  - a URL record for the current game page
  - a compact text record with a simple pet breakdown
- The pet summary format is:
  `ps:v1|id=...|n=...|st=...|sp=...|m=...|c=...|t=...`
- The full game still saves in `localStorage`; the NFC tag only stores the URL and a small pet summary.
- Web NFC is checked at runtime. Unsupported browsers show a clear status instead of breaking.
- This is expected to work mainly on Android Chrome/Chromium over HTTPS with a compatible writable NDEF tag.


## v20 softer sleep display

- Removed the visible live sleep countdown.
- The game still tracks sleep time internally.
- Players now see natural wording such as `sleeping_deeply` instead of exact remaining time.
- Starting a nap says the sleep will last about three hours, without exposing a countdown.


## v21 Android Chrome handoff

- The NFC writer now always writes the canonical page URL:
  `https://cambelljsmith.github.io/PocketPetPal/`
- If Web NFC is unavailable, the NFC tab shows `open_in_android_chrome_to_write_nfc`.
- Added `open_in_android_chrome`.
- The Chrome handoff sends the current pet save through a temporary `pet_transfer` URL parameter.
- When Chrome opens the page, the game imports that transfer into Chrome's localStorage and removes the transfer parameter from the address bar.
- This solves the localStorage problem where the pet exists in one browser but Chrome needs the data to write the NFC tag.
- The NFC tag itself remains clean: canonical URL plus tiny pet summary only.


## v22 friendly pet tag flow

- Renamed the NFC tab to `pet_tag`.
- Renamed actions to `save_to_tag`, `check_tag`, and `open_in_chrome`.
- If the browser cannot save/check physical tags, the save/check buttons are hidden.
- Unsupported browsers only show `open_in_chrome`.
- Status messages are now user-facing rather than technical.


## v23 player name

- Added a one-time player name prompt.
- The game only asks for the player name if no saved player name exists.
- Player name is stored in the normal localStorage save.
- Chrome handoff carries the player name because it carries the full current save.
- The pet tag summary now includes the player name using the compact `pl=` field:
  `ps:v1|id=...|pl=...|n=...|st=...|sp=...|m=...|c=...|t=...`


## v24 friendly care rhythm

- Removed developer-style care clock copy from the player UI.
- The care rhythm panel is hidden while the creature is still an egg or while naming is required.
- Removed `last_tick` from the UI.
- Replaced technical strings with natural text:
  - `daily care is active`
  - `sleeping deeply`
  - `soon`
  - `later today`
  - `only if sick`


## v25 travel tags and visitors

- Added travel-tag behaviour.
- `send_my_pet_to_tag` writes a full portable pet to the NFC tag and marks the local pet as away.
- When away, the pet vanishes from the computer UI and care actions are locked.
- `bring_pet_from_tag` reads a travelling pet from an NFC tag.
  - If this computer's own pet is away, it restores that pet as the main pet.
  - If this computer already has a different local pet, the scanned pet appears as a visitor beside it.
- `send_visitor_home` writes the visiting pet back to the tag and removes it from the screen.
- The NFC tag also still writes the canonical page URL first.
- This is a no-backend approximation of physical ownership. A tag with enough storage is needed for full travelling pets.


## v26 pet speech bubble

- Added a speech bubble inside the pet area.
- When the pet says a dialogue line, the spoken text now appears in a bubble that points toward the pet's mouth.
- The regular message panel is still kept for general system messages.
- The speech bubble only appears for spoken dialogue and hides for non-speech status text.


## v27 compact travel tags

- Reworked `send_my_pet_to_tag` to use a compact travel-pet record instead of the full browser save JSON.
- Travel tags now write only two NFC records:
  - the PocketPetPal URL
  - a compact `ppp2:` travelling pet record
- Old `ppp_pet_v1:` travel records can still be read.
- If a write still fails, the game now keeps the pet on the computer and shows a more useful message.
- Very small tags may still be too small for travelling pets; use a larger writable tag if that happens.


## v28 safe travel URL tags

- Reworked travelling pets again after the previous compact text record could still wipe a small tag on failed write.
- `send_my_pet_to_tag` now writes one short URL record only:
  `https://cambelljsmith.github.io/PocketPetPal/#p=...`
- The URL contains a very small travelling-pet payload.
- The page can import that payload automatically when the tag is scanned.
- `bring_pet_from_tag` can also read the URL record.
- The local full save is preserved while the pet is away, so when the same pet comes back to its own computer, equipment/inventory details are retained locally.
- The game refuses to write if the generated tag link is longer than a small-tag safety limit.
