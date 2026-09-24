# Item Data Format

The collectible item data for GoSkateASeSH is stored in `items.json`.

Each item contains information used by the Items page for display and filtering.

## Fields

### ID

Each item has an ID.

The ID is based on a shorthand version of the item's collection name and follows the order of item rarity from lowest to highest.

The ID is used to uniquely identify each item in the dataset.

### Name

Each item has a given item name.

### Type

The item type identifies what kind of skateboard component the item is.

Possible item types include:

- Deck
- Grip
- Truck
- Wheel

### Rarity

Each item has a rarity.

The main rarity order from lowest to highest is:

1. Blue
2. Dark Blue
3. Purple
4. Red
5. Gold

Additional rarity types also exist:

- Fool's Gold
- Standard
- Special

### Generation

Each item has a generation.

The generation represents the release period or drop that the item was introduced with.

### Collection

Each item belongs to a collection.

The collection represents the specific drop or crate the item was released as part of.

### Image Path

Each item contains an image path.

The image path points to the image asset used to display the item on the website.

## Example Structure

An item in `items.json` follows a structure similar to:

```json
{
  "id": "example-id",
  "name": "Example Deck",
  "type": "deck",
  "rarity": "purple",
  "generation": "Generation X",
  "collection": "Example Collection",
  "image": "assets/items/example.png"
}