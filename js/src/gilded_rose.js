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
  const ITEM = 'Item';

  const setQuality = (quality, qualityUpdateValue) => {
    const MAX_QUALITY = 50;
    const MIN_QUALITY = 0;
    return Math.max(Math.min(quality + qualityUpdateValue, MAX_QUALITY), MIN_QUALITY)
  }

  const updateItem = (name, sell_in) => (quality) => new Item(name, sell_in - 1, quality);

  const updateValues = (item) => {
    const { name, sell_in, quality } = item;

    const backstagePassesQuality =
      sell_in < 0 ? -quality
        : sell_in > 10 ? 1
        : sell_in > 6 ? 2
        : 3;
    const itemQuality = sell_in === 0 ? -2 : -1;

    const newItem = updateItem(name, sell_in);

    return ({
      [SULFURAS]: item,
      [CONJURED]: newItem(setQuality(quality, -2)),
      [AGED_BRIE]: newItem(setQuality(quality, 1)),
      [BACKSTAGE_PASSES]: newItem(setQuality(quality, backstagePassesQuality)),
      [ITEM]: newItem(setQuality(quality, itemQuality)),
    });
  }

  const getUpdateValue = (name, updateValues) => {
    const isSulfuras = new RegExp('^' + SULFURAS, "g").test(name);
    const isBackstagePass = new RegExp('^' + BACKSTAGE_PASSES, "g").test(name);
    const isConjured = new RegExp('^' + CONJURED, 'g').test(name);
    const isAgedBrie = name === AGED_BRIE;

    return (
      isSulfuras ? updateValues[SULFURAS]
      : isConjured ? updateValues[CONJURED]
      : isBackstagePass ? updateValues[BACKSTAGE_PASSES]
      : isAgedBrie ? updateValues[AGED_BRIE]
      : updateValues[ITEM]
    )
  }

  return items.map(item => getUpdateValue(item.name, updateValues(item)));
};
