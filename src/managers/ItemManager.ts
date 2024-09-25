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

        if (item.type === 'Consumable') {
            return this.generateConsumable(item);
        }
        
        item.rarity = 0;
        const rarityChances = Math.random();
        if (rarityChances < 1 / 200) {
            item.rarity = 5;
        } else if (rarityChances < 1 / 50) {
            item.rarity = 4;
        } else if (rarityChances < 1 / 25) {
            item.rarity = 3;
        } else if (rarityChances < 1 / 10) {
            item.rarity = 2;
        } else if (rarityChances < 1 / 5) {
            item.rarity = 1;
        }

        const base = SettingsManager.getSettings().itemPower * (item.rarity * item.rarity);

        item.xp = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);
        item.damage = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);
        item.mining = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);

        return item;
    }

    static generateConsumable(item: Item) {
        switch (item.index) {
            case 'good_news':
                item.token = TokenManager.getTokens().filter(tokenStore => tokenStore.index !== 'cryptodollar')[Math.floor(Math.random() * TokenManager.getTokens().length - 1)].index;
                break;
            default:
                break;
        }

        item.power = Math.random() * ((item.power * 2) - (item.power / 2)) + (item.power / 2);

        item.rarity = 0;
        const rarityChances = Math.random();
        if (rarityChances < 1 / 200) {
            item.rarity = 5;
        } else if (rarityChances < 1 / 50) {
            item.rarity = 4;
        } else if (rarityChances < 1 / 20) {
            item.rarity = 3;
        } else if (rarityChances < 1 / 5) {
            item.rarity = 2;
        } else if (rarityChances < 1 / 5) {
            item.rarity = 1;
        }
        item.power *= item.rarity + 1;

        return item;
    }

    static getItemStore () {
        return useItemsStore();
    }

    static getItemImage(itemIndex: string) {
        const item = this.getBaseItem(itemIndex);
        const imgPath = (item || item.img) ? `items/${item.type}/${item.index}.png` : 'items/default.png';
        console.log(imgPath)
        return UXManager.getImagePath(imgPath);
    }

    static getItemPrice(item: Item) {
        let price = 1;
        const referencePrice = TokenManager.getReferenceTokenStore().price;
        if (item.xp) price += (item.xp + item.xp) * referencePrice;
        if (item.damage) price += (item.damage + item.damage) * referencePrice;
        if (item.mining) price += (item.mining + item.mining) * referencePrice;
        if (item.index === 'good_news') price += (item.power * item.power) * referencePrice;

        return price;
    }
}

export default ItemManager;
