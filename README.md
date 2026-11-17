# Road Trip Locals Daily Trivia

One question a day in three categories (Yellowstone, National Parks, Road Trips) for roadtriplocals.com.

## Files
- `questions/*.json` holds the question banks and is the **master copy**. Each question links to the official source used to verify it.
- `squarespace-template.html` is the widget (HTML, CSS and JS) with a `__SRC__` placeholder for the questions URL.
- `squarespace-code-block.html` is the **built** file to paste into one Squarespace Code Block (about 15 KB).
- `preview.html` is a local test page that loads `questions/` from this folder.
- `tools/build.js` rebuilds both HTML files. `tools/config.json` sets where the live site loads questions from.
- `tools/check.js` validates the banks: required fields, three wrong answers, https sources, no duplicates.
- `tools/add-batch.js` appends a batch of new questions with new ids.

## Rules
1. **Append only.** Questions play in file order, one per day from Nov 17, 2026 (day 1). Never reorder or delete questions, or every later day shifts. To retire a bad question, fix its text in place.
2. **Sources:** NPS first, otherwise another official source (FHWA, Parks Canada, USGS, state DOTs and tourism offices, the Smithsonian). No blogs. Road Trip Locals' own trips are fine, but verify the facts independently.
3. Run `node tools/check.js` and then `node tools/build.js` after every change.

## Accessibility
Built to WCAG 2.2 AA. Text contrast is at least 4.5:1 and controls are at least 3:1. The tabs work with the keyboard (arrow keys, Home and End). Right and wrong answers use text and symbols, not just color. Results are announced to screen readers, there is a visible focus outline, and touch targets are at least 44px. axe-core found 0 violations (Nov 17, 2026).

## Icon credits
- Bison (Yellowstone): from [Fluent Emoji High Contrast](https://github.com/microsoft/fluentui-emoji), Copyright (c) Microsoft Corporation, under the MIT License. The notice is kept in the code block's opening comment.
- The pine-and-peak (National Parks) and winding road (Road Trips) icons were drawn for this project.
