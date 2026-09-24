# goskateasesh

**goskateasesh** is a community website I created for a skateboarding game community.

The site was made to showcase game-related media, provide a searchable catalogue of collectible items, and recognise people who have contributed to the community.

## Live Website

goskateasesh is deployed through Vercel.

Live site:  
https://goskateasesh.vercel.app/index.html

## Features

### Home Page

The home page showcases artwork, photos, and other media created by members of the community.

It includes:

- Community artwork
- Game screenshots and photos
- A video edit

### Items Page

A major reason for creating the website was to provide an easier way to browse the many collectible items available in the game.

Users can browse and filter item designs such as:

- Decks
- Grips
- Trucks
- Wheels

Each item may have different properties including:

- Rarity
- Generation
- Collection

Collections represent the drop or crate that an item was originally released with.

The filtering system allows users to narrow down the catalogue and find specific item designs more easily.

### Checklist Page

The project includes a checklist page intended to help users keep track of the items they have collected. \
This feature is currently not implemented.

### Credits Page

The credits page recognises people who have contributed to the website, game community, artwork, media, or other parts of the project.

## Project Structure

The website is built using standard web technologies:

- HTML
- CSS
- JavaScript
- JSON

The main project files include:

- `index.html` - Home page
- `items.html` - Collectible items catalogue
- `checklist.html` - Checklist page
- `credits.html` - Credits page
- `main.js` - Main JavaScript functionality
- `setup.js` - Website setup functionality
- `ui-helper.js` - UI-related helper functions
- `style.css` - Website styling
- `items.json` - Collectible item data

The project also contains media assets such as item images, artwork, photos, and video content.

## Item Data

Collectible item information is stored in:

`items.json`

The dataset contains information used by the Items page to display and filter the available item designs.

Item information can include properties such as:

- Item ID
- Name
- Item type
- Rarity
- Generation
- Collection
- Image path

More information about the structure of the item data can be found in:

`docs/data-format.md`

## Running the Website

GoSkateASeSH is a static website.

It can be run locally using a local development server or static web server.

For example, using the VS Code Live Server extension:

1. Open the project in Visual Studio Code.
2. Open `index.html`.
3. Start Live Server.
4. Open the provided local address in a browser.

## Deployment

GoSkateASeSH is deployed using Vercel.

The website is connected to the GitHub repository, allowing updates to the project to be deployed through Vercel.

## Current Development

Some parts of the website are still being developed.

Known areas for improvement include:

- Implementing the checklist feature
- Improving responsive page layouts
- Maintaining and updating `items.json`
- Cleaning up unused or duplicated CSS
- Improving JavaScript code organisation
- Adding missing item image assets
