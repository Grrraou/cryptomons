import { defineStore } from 'pinia';
import { Item } from '@/enums/ItemsEnum'; // Assuming the Item type is in a file named types.ts

interface EquipmentState {
    Head: Item | null;
    Chest: Item | null;
    Weapon: Item | null;
    inventory: Item[];
}

export const useItemsStore = defineStore('items', {
    state: (): EquipmentState => ({
        Head: null,
        Chest: null,
        Weapon: null,
        inventory: [],
    }),
    actions: {
        equipItem(slotType: 'Head' | 'Chest' | 'Weapon', inventoryIndex: number) {
            if (this[slotType]) {
                this.inventory.push(this[slotType]!);
            }
            const item = this.getItemFromInventory(inventoryIndex);
            if (slotType === item.type) {
                this[slotType] = item;
                this.removeItemFromInventory(inventoryIndex);
            }
        },
        unequipItem(slotType: 'Head' | 'Chest' | 'Weapon', isGoingToInventory: boolean = true) {
            const item = this[slotType];
            if (item) {
                if (isGoingToInventory) this.inventory.push(item);
                this[slotType] = null;
            }
        },
        addItemToInventory(item: Item) {
            this.inventory.push(item);
        },
        getItemFromInventory(inventoryIndex: number) {
            return this.inventory[inventoryIndex];
        },
        removeItemFromInventory(index: number) {
            this.inventory.splice(index, 1);
        },
        moveItemInInventory(fromIndex: number, toIndex: number) {
            const item = this.inventory.splice(fromIndex, 1)[0];
            this.inventory.splice(toIndex, 0, item);
        },
        getEquipementStats() {
            let xp = this.Head?.xp ?? 0;
            xp += this.Chest?.xp ?? 0;
            xp += this.Weapon?.xp ?? 0;

            let damage = this.Head?.damage ?? 0;
            damage += this.Chest?.damage ?? 0;
            damage += this.Weapon?.damage ?? 0;

            let mining = this.Head?.mining ?? 0;
            mining += this.Chest?.mining ?? 0;
            mining += this.Weapon?.mining ?? 0;

            return {
                xp: xp,
                damage: damage,
                mining: mining,
            };
        },
        consumeItem(index: string) {
           /*  const item = this.inventory.find((item) => item.index === index);
            if (item && item.type === 'Consumable') {
                // Execute the effect
                if (item.effect) {
                    item.effect();
                }
                
                // Remove from inventory after consumption
                this.removeItemFromInventory(index);
            } */
        },
    },
    persist: true,
});
