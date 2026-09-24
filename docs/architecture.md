# Architecture

goskateasesh is a static website built using HTML, CSS, JavaScript, and JSON.

## Overview

The application follows a simple client-side architecture.

The main flow is:

`HTML pages → JavaScript → items.json → User Interface`

The website does not currently use a separate backend or database server.

## Frontend Pages

The main pages are:

- `index.html` - Home page containing community artwork, photos, and video content
- `items.html` - Displays the collectible item catalogue
- `checklist.html` - Intended for tracking collected items, but is not currently implemented
- `credits.html` - Displays contributors and credits

## JavaScript

JavaScript is responsible for loading data and controlling the behaviour of the website.

The main JavaScript files include:

- `main.js`
- `setup.js`
- `ui-helper.js`

These files handle tasks such as displaying content, filtering items, and updating the user interface.

## Item Data

Collectible item information is stored locally in:

`items.json`

The Items page reads this data and uses it to display and filter items by properties such as:

- Item type
- Rarity
- Generation
- Collection

The structure of this data is documented in:

`docs/data-format.md`

## Media and Assets

The repository contains media assets used throughout the website, including:

- Item images
- Artwork
- Screenshots and photos
- Video content

These assets are referenced by the HTML, CSS, JavaScript, and item data.

## Deployment

The website is deployed through Vercel.

The deployed site is available at: https://goskateasesh.vercel.app/index.html

Changes to the GitHub repository can be deployed through the connected Vercel project.

## Current Limitations

The current architecture is intentionally simple and client-side.

Known areas for future improvement include:

- Implementing the checklist page
- Improving responsive layouts
- Updating and maintaining `items.json`
- Cleaning up duplicated or unused CSS
- Improving JavaScript organisation
- Adding missing item assets