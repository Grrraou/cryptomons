import { Item, itemsEnum } from "@/enums/ItemsEnum";
import { useItemsStore } from "@/stores/useItems";
import TokenManager from "./TokenManager";
import UXManager from "./UXManager";
import SettingsManager from "./SettingsManager";

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
        const base = SettingsManager.getSettings().itemPower;

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
        const imgPath = (item && item.img) ? `items/${item.type}/${item.index}.png` : 'items/default.png';
        return UXManager.getImagePath(imgPath);
    }

    static getItemPrice(item: Item) {
        let price = 1;
        const referencePrice = TokenManager.getReferenceTokenStore().price;
        if (item.xp) price += (item.xp + item.xp) * referencePrice;
        if (item.damage) price += (item.damage + item.damage) * referencePrice;
        if (item.mining) price += (item.mining + item.mining) * referencePrice;

        return price;
    }
}

export default ItemManager;
