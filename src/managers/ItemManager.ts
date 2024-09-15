import { Item, itemsEnum } from "@/enums/itemsEnum";
import { useItemsStore } from "@/stores/useItems";

class ItemManager {

    static getBaseItem(itemIndex: string): Item | void {
        const item = itemsEnum.find(item => item.index === itemIndex);
        if (item) return { ...item };
    }

    static getItemStore () {
        return useItemsStore();
    }
}

export default ItemManager;
