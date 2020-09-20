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
  // const ITEM = 'Item'

  const getUpdateValues = (item) => {

    const sulfurasRegex = new RegExp('^' + SULFURAS, "g"); // originally used a template string but that looked confusing
    const backstageRegex = new RegExp('^' + BACKSTAGE_PASSES, "g");
    const conjuredRegex = new RegExp('^' + CONJURED, 'g');

    const updateValuesFn =
      sulfurasRegex.test(item.name) ? () => ({ sellInUpdateValue: 0 })
      : conjuredRegex.test(item.name) ? () => ({ qualityUpdateValue: -2 })
      : item.name === AGED_BRIE ? () => ({ qualityUpdateValue: 1 })
      : backstageRegex.test(item.name) ? () => {

          const qualityUpdateValue =
          item.sell_in < 0 ? -item.quality
          : item.sell_in > 10 ? 1
          : item.sell_in > 6 ? 2
          : 3;

          return { qualityUpdateValue }
        }
      : () => {
        const qualityUpdateValue =
          item.sell_in === 0 ? -2 : -1;

        return { qualityUpdateValue }
      }

    return updateValuesFn();
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
    const updateValue = getUpdateValues(item);

    setQuailty(item, updateValue);
    setSellIn(item, updateValue);
  });
};
