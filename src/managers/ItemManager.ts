import { Item, itemsEnum } from "@/enums/ItemsEnum";
import { useItemsStore } from "@/stores/useItems";
import TokenManager from "./TokenManager";

class ItemManager {

    static getBaseItem(itemIndex: string): Item {
        const item = itemsEnum.find(item => item.index === itemIndex);
        return { ...item } as Item;
    }

    static generateLoot(itemIndex: string) {
        const item = ItemManager.getBaseItem(itemIndex);

        if (!item || !item.power) {
            return item;
        }
        const base = 5;

        item.xp = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);
        item.damage = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);
        item.mining = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);

        return item;
    }

    static getItemStore () {
        return useItemsStore();
    }

    static getItemImage(itemIndex: string) {
        const item = this.getBaseItem(itemIndex);
        if (item && item.img) {
            return `/items/${item.type}/${item.index}.png`;
        }
        return '/items/default.png';
    }

    static getItemPrice(item: Item) {
        let price = 1;
        const referencePrice = TokenManager.getReferenceTokenStore().price;
        if (item.xp) price += (item.xp + item.xp) * referencePrice;
        return price;
    }
}

export default ItemManager;
