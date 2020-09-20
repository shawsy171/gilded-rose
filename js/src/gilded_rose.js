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

  const updateValues = (item) => ({
    [SULFURAS]: { sellInUpdateValue: 0 },
    [CONJURED]: { qualityUpdateValue: -2 },
    [AGED_BRIE]: { qualityUpdateValue: 1 },
    [BACKSTAGE_PASSES]: {
      qualityUpdateValue:
        item.sell_in < 0 ? -item.quality
        : item.sell_in > 10 ? 1
        : item.sell_in > 6 ? 2
        : 3
    },
    [ITEM]: { qualityUpdateValue: item.sell_in === 0 ? -2 : -1 }
  })

  const getUpdateValues = (item, updateValues) => {
    const { name } = item;
    const sulfurasRegex = new RegExp('^' + SULFURAS, "g");
    const backstageRegex = new RegExp('^' + BACKSTAGE_PASSES, "g");
    const conjuredRegex = new RegExp('^' + CONJURED, 'g');

    const type =
      sulfurasRegex.test(name) ? SULFURAS
      : conjuredRegex.test(name) ? CONJURED
      : name === AGED_BRIE ? AGED_BRIE
      : backstageRegex.test(name) ? BACKSTAGE_PASSES
      : ITEM

    return updateValues[type];
  }

  const setQuailty = (item, upgradeValues) => {
    const MAX_QUALITY = 50;
    const MIN_QUALITY = 0;

    const { qualityUpdateValue } = upgradeValues;

    if (qualityUpdateValue != null) {
      item.quality = Math.max(Math.min(item.quality + qualityUpdateValue, MAX_QUALITY), MIN_QUALITY)
    }
  }

  const setSellIn = (item, upgradeValues) => {
    const { sellInUpdateValue } = upgradeValues;

    item.sell_in =
      sellInUpdateValue != null ? item.sell_in - sellInUpdateValue
      : item.sell_in - 1
  }

  items.forEach(item => {
    const updateValue = getUpdateValues(item, updateValues(item));

    setQuailty(item, updateValue);
    setSellIn(item, updateValue);
  });
};
