import { Item, itemsEnum } from "@/enums/ItemsEnum";
import { useItemsStore } from "@/stores/useItems";
import TokenManager from "./TokenManager";
import UXManager from "./UXManager";
import SettingsManager from "./SettingsManager";
import MineManager from "./MineManager";
import BattlefieldManager from "./BattlefieldManager";

class ItemManager {

    static getBaseItem(itemIndex: string): Item {
        const item = itemsEnum.find(item => item.index === itemIndex);
        return { ...item } as Item;
    }

    static generateLoot(itemIndex: string, target: string | null = null) {
        const item = ItemManager.getBaseItem(itemIndex);

        if (!item || !item.power) {
            return item;
        }

        if (item.type === 'Consumable') {
            return this.generateConsumable(item, target);
        }
        
        item.rarity = this.generateRandomRarity();

        const base = SettingsManager.getSettings().itemPower * (item.rarity * item.rarity + 1);

        item.xp = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);
        item.damage = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);
        item.mining = Math.floor(base * item.power * Math.random() * (1.2 - 0.8) + 0.8);

        return item;
    }

    static generateConsumable(item: Item, target: string | null = null) {
        item.power = Math.random() * ((item.power * 2) - (item.power / 2)) + (item.power / 2);

        item.rarity = this.generateRandomRarity();
        item.power *= item.rarity + 1;

        switch (item.index) {
            case 'good_news':
                item.token = target
                    ?? TokenManager.getTokens()
                        .filter(tokenStore => tokenStore.index !== 'cryptodollar')[Math.floor(Math.random() * TokenManager.getTokens().length - 1)]
                        .index;
                break;
            case 'mining_slot':
                item.token = target 
                    ?? MineManager.getMines()[Math.floor(Math.random() * MineManager.getMines().length)].index;
                item.power = 1;
                item.rarity = 5;
            case 'battlefield_slot':
                item.token = target 
                    ?? BattlefieldManager.getBattlefields()[Math.floor(Math.random() * BattlefieldManager.getBattlefields().length)].index;
                item.power = 1;
                item.rarity = 5;
            default:
                break;
        }

        return item;
    }

    static generateRandomRarity() {
        let rarity = 0;
        const rarityChances = Math.random();
        if (rarityChances < 1 / 200) {
            rarity = 5;
        } else if (rarityChances < 1 / 75) {
            rarity = 4;
        } else if (rarityChances < 1 / 40) {
            rarity = 3;
        } else if (rarityChances < 1 / 15) {
            rarity = 2;
        } else if (rarityChances < 1 / 5) {
            rarity = 1;
        }

        return rarity;
    }

    static getItemStore () {
        return useItemsStore();
    }

    static getItemImage(itemIndex: string) {
        const item = this.getBaseItem(itemIndex);
        const imgPath = (item || item.img) ? `items/${item.type}/${item.index}.png` : 'items/default.png';
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
