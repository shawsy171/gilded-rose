describe("Gilded Rose", function() {
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

      it('should increase quality by 1', () => {
        items = [ new Item('Aged Brie', 2, 0) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(1);
      });

      it('should cap quality at 50', () => {
        items = [ new Item('Aged Brie', 2, 50) ];
        items = update_quality(items);
        items = update_quality(items);
        items = update_quality(items);
        expect(items[0].quality).toEqual(50);
      });

      it("should reduce sell_in by 1", () => {
        items = [ new Item('Aged Brie', 2, 50) ];
        items = update_quality(items);
        expect(items[0].sell_in).toEqual(1);
      });

    });

    describe('"Sulfuras"', () => {
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
      it('should increase quality by 1', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(21);
      });

      it('should increase quality by 2 when sell_in is 10 or less', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 4) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(6);
      });

      it('should increase quality by 3 when sell_in is 5 days less', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 6) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(9);
      });

      it('should set quality at 0 when sell_in is less than 1', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', -1, 6) ];
        items = update_quality(items);
        expect(items[0].quality).toEqual(0);
      });

      it("should reduce sell_in by 1", () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20) ];
        items = update_quality(items);
        expect(items[0].sell_in).toEqual(14);
      });

      it('should cap quality at 50', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 49) ];
        items = update_quality(items);
        items = update_quality(items);
        items = update_quality(items);
        expect(items[0].quality).toEqual(50);
      });
    });

    describe('Conjured', () => {
      it('should reduce quality by 2', () => {
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
