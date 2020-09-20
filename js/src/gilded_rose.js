function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

function update_quality(items) {
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

  const getType = (name) => {
    const isBackstagePass = new RegExp('^' + BACKSTAGE_PASSES, "g").test(name);
    const isConjured = new RegExp('^' + CONJURED, 'g').test(name);
    const isAgedBrie = name === AGED_BRIE;

    return (
      isConjured ? CONJURED
      : isBackstagePass ? BACKSTAGE_PASSES
      : isAgedBrie ? AGED_BRIE
      : ITEM
    )

  }

  const setQuality = (quality, qualityUpdateValue) => {
    const MAX_QUALITY = 50;
    const MIN_QUALITY = 0;
    return Math.max(Math.min(quality + qualityUpdateValue, MAX_QUALITY), MIN_QUALITY)
  }

  return items.map(item => {
    const { name, sell_in, quality } = item;

    const sulfurasRegex = new RegExp('^' + SULFURAS, "g");
    if(sulfurasRegex.test(name)) return item;

    const type = getType(name);

    const { qualityUpdateValue } = updateValues(item)[type];

    return {
      name,
      quality: setQuality(quality, qualityUpdateValue),
      sell_in: sell_in - 1,
    }
  });
};
