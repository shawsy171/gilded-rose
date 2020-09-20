function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

function update_quality() {
  const AGED_BRIE = 'Aged Brie';
  const MAX_QUALITY = 50;
  const MIN_QUALITY = 0;
  const sulfurasRegex = new RegExp(/^Sulfuras/);
  const backstageRegex = new RegExp(/^Backstage passes/);
  const conjuredRegex = new RegExp(/^Conjured/);

  items.forEach(item => {
    if(sulfurasRegex.test(item.name)) return;

    if(backstageRegex.test(item.name)) {
      const increaseQualityValue =
        item.sell_in < 0 ? -item.quality
        : item.sell_in > 10 ? 1
        : item.sell_in > 6 ? 2
        : 3;

      item.quality = Math.min(item.quality + increaseQualityValue, MAX_QUALITY);
      item.sell_in--;

      return;
    }

    if(conjuredRegex.test(item.name)) {
      item.quality = Math.max(item.quality - 2, MIN_QUALITY);
      item.sell_in--;
      return;
    }

    if(item.name === AGED_BRIE) {
      item.quality = Math.min(item.quality + 1, MAX_QUALITY);
      return;
    }

    // item
    const reduceQualityValue = item.sell_in <= 0 ? 2 : 1
    item.sell_in--;
    item.quality = Math.max(item.quality - reduceQualityValue, MIN_QUALITY);
  });
}