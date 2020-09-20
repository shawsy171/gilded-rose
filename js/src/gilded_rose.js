function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

function update_quality() {
  const AGED_BRIE = 'Aged Brie';
  const BACKSTAGE_PASSES = 'Backstage passes';
  const CONJURED = 'Conjured';
  const SULFURAS = 'Sulfuras';
  const ITEM = 'Item'

  const setType = (item) => {

    const sulfurasRegex = new RegExp('^' + SULFURAS, "g"); // originally used a template string but that looked confusing
    const backstageRegex = new RegExp('^' + BACKSTAGE_PASSES, "g");
    const conjuredRegex = new RegExp('^' + CONJURED, 'g');

    const map = new WeakMap();
    const type =
      sulfurasRegex.test(item.name) ? SULFURAS
      : backstageRegex.test(item.name) ? BACKSTAGE_PASSES
      : conjuredRegex.test(item.name) ? CONJURED
      : item.name === AGED_BRIE ? AGED_BRIE
      : ITEM
    map.set(item, { type });

    return map;
  }

  const setUpdateValues = (item, itemMap) => {
    const updateFn = {
      [AGED_BRIE]: () => ({ qualityUpdateValue: 1 }),
      [BACKSTAGE_PASSES]: () => {

        const qualityUpdateValue =
        item.sell_in < 0 ? -item.quality
        : item.sell_in > 10 ? 1
        : item.sell_in > 6 ? 2
        : 3;

        return { qualityUpdateValue }
      },
      [CONJURED]: () => ({ qualityUpdateValue: -2 }),
      [ITEM]: () => {
        const qualityUpdateValue =
          item.sell_in === 0 ? -2 : -1;

        return { qualityUpdateValue }
      },
      [SULFURAS]: () => ({ sellInUpdateValue: 0 }),
    };

    return itemMap.set(item, updateFn[itemMap.get(item).type]());
  }

  const setQuailty = (item, itemMap) => {

    const MAX_QUALITY = 50;
    const MIN_QUALITY = 0;

    const { qualityUpdateValue } = itemMap.get(item);

    if (qualityUpdateValue != null) {
      item.quality = Math.max(Math.min(item.quality + qualityUpdateValue, MAX_QUALITY), MIN_QUALITY)
    }
  }

  const setSellIn = (item, itemMap) => {
    const { sellInUpdateValue } = itemMap.get(item);

    item.sell_in =
      sellInUpdateValue != null ? item.sell_in - sellInUpdateValue
      : item.sell_in - 1
  }

  items.forEach(item => {
    const itemWithType = setType(item);
    const itemWithValues = setUpdateValues(item, itemWithType);

    setQuailty(item, itemWithValues);
    setSellIn(item, itemWithValues);
  });
};
