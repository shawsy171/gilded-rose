describe("Gilded Rose", function() {
  // name, sell_in, quality
  describe('At the end of each day ', () => {

    // At the end of each day our system lowers both values for every item
    describe('Item', () => {
      it("should reduce sell_in by 1", () => {
        items = [ new Item("Elixir of the Mongoose", 5, 7) ];
        items = update_quality(items);
        expect(items[0].sell_in).toEqual(4);
      });

      it("should reduce quality by 1", () => {
        items = [ new Item("Elixir of the Mongoose", 5, 7) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(6);
      });

      // Once the sell by date has passed, Quality degrades twice as fast
      it('should reduce quality by 2 when sell_in is 0 or less', () => {
        items = [ new Item("Elixir of the Mongoose", 0, 7) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(5);
      });

      it('The Quality of an item is never negative', () => {
        items = [ new Item("Elixir of the Mongoose", 9, 0) ];
        items = update_quality(items);
        items = update_quality(items);
        items = update_quality(items);
        expect(items[0].quality).toEqual(0);
      });
    });

    describe('"Aged Brie"', () => {

      it('actually increases in Quality the older it gets', () => {
        items = [ new Item('Aged Brie', 2, 0) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(1);
      });

      it('The Quality of an item is never more than 50', () => {
        items = [ new Item('Aged Brie', 2, 50) ];
        items = update_quality(items);
        items = update_quality(items);
        items = update_quality(items);
        expect(items[0].quality).toEqual(50);
      });

    });

    describe('"Sulfuras"', () => {
      // being a legendary item, never has to be sold or decreases in Quality
      it('should not change quality', () => {
        items = [ new Item('Sulfuras, Hand of Ragnaros', 0, 80) ];
        items = update_quality(items);
        items = update_quality(items);
        items = update_quality(items);

        expect(items[0].quality).toEqual(80);
      });

      it('should not change sell_in value', () => {
        items = [ new Item('Sulfuras, Hand of Ragnaros', -1, 80) ];
        items = update_quality(items);
        items = update_quality(items);
        items = update_quality(items);
        expect(items[0].sell_in).toEqual(-1);
      });
    });

    describe('"Backstage passes"', () => {
      it('like aged brie, increases in Quality as its SellIn value approaches;', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(21);
      });

      it('Quality increases by 2 when there are 10 days or less', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 4) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(6);
      });

      it(' and by 3 when there are 5 days or less but', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 6) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(9);
      });

      it('Quality drops to 0 after the concert', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', -1, 6) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(0);
      });

      it("should reduce sell_in by 1", () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20) ];
        items = update_quality(items);
        expect(items[0].sell_in).toEqual(14);
      });

      it('The Quality of an item is never more than 50', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 49) ];
        items = update_quality(items);
        items = update_quality(items);
        items = update_quality(items);
        expect(items[0].quality).toEqual(50);
      });
    });

    describe('Conjured', () => {
      it('should degrade in Quality twice as fast as normal items', () => {
        items = [ new Item('Conjured Mana Cake', 15, 10) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(8);
      });

      it("should reduce sell_in by 1", () => {
        items = [ new Item('Conjured Mana Cake', 3, 10) ];
        items = update_quality(items);
        expect(items[0].sell_in).toEqual(2);
      });
    });
  });
});
