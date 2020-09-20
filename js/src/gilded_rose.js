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

  const setQuailty = (item, qualityUpdateValue) => {
    const MAX_QUALITY = 50;
    const MIN_QUALITY = 0;
    item.quality = Math.max(Math.min(item.quality + qualityUpdateValue, MAX_QUALITY), MIN_QUALITY)
  }

  items.forEach(item => {
    const { name } = item;

    const sulfurasRegex = new RegExp('^' + SULFURAS, "g");
    const backstageRegex = new RegExp('^' + BACKSTAGE_PASSES, "g");
    const conjuredRegex = new RegExp('^' + CONJURED, 'g');

    if(sulfurasRegex.test(name)) return;

    const type =
      conjuredRegex.test(name) ? CONJURED
      : backstageRegex.test(name) ? BACKSTAGE_PASSES
      : name === AGED_BRIE ? AGED_BRIE
      : ITEM

    const { qualityUpdateValue } = updateValues(item)[type];

    setQuailty(item, qualityUpdateValue);
    item.sell_in--;
  });
};
