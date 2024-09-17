import { Item, itemsEnum } from "@/enums/ItemsEnum";
import { useItemsStore } from "@/stores/useItems";
import TokenManager from "./TokenManager";

class ItemManager {

    static getBaseItem(itemIndex: string): Item {
        const item = itemsEnum.find(item => item.index === itemIndex);
        return { ...item } as Item;
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
        let price = 0;
        const referencePrice = TokenManager.getReferenceTokenStore().price;
        if (item.xp) price += (item.xp + item.xp) * referencePrice;
        return price;
    }
}

export default ItemManager;
