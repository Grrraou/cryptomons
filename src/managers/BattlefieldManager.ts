import { monstersEnum } from "@/enums/MonstersEnum";
import { useBattlefieldsStores } from "@/stores/useBattlefields";
import UXManager from "./UXManager";
import NFTsManager from "./NFTsManager";

class BattlefieldManager {
    private autoClickerIntervals: number | null = null;

    static getBattlefields() {
        return Object.keys(useBattlefieldsStores).map(key => useBattlefieldsStores[key]());
    }

    static getBattlefieldStore(goalIndex: string) {
        return useBattlefieldsStores[goalIndex]?.();
    }

    static getAvailableBattlefields() {
        return this.getBattlefields().filter(battlefield => battlefield.isUnlocked());
    }

    static getMonsters() {
        return monstersEnum;
    }

    static getMonster(monsterIndex: string) {
        return { ...BattlefieldManager.getMonsters().find(monster => monster.index === monsterIndex)};
    }

    startAutoBattle(interval: number = 5000) {
        // Clear the existing interval if it exists
        if (this.autoClickerIntervals !== null) {
            clearInterval(this.autoClickerIntervals);
        }
    
        // Set a new interval and store its ID
        this.autoClickerIntervals = setInterval(() => {
            BattlefieldManager.getBattlefields().forEach(battlefieldStore => {
                battlefieldStore.getHeroes().forEach(heroStore => {
                    let amount = heroStore.battlePower * battlefieldStore.getDefaultDamage();
                    battlefieldStore.damageMonster(amount);
                    heroStore.gainXp(null);
                    UXManager.showFlyingTextOnElement('⚔️' + amount.toString(), null, heroStore.getDOMid());
                });
            });
        }, interval / ((NFTsManager.isCollectionCompleted('art_blocked')) ? 2 : 1)) as unknown as number;
    }
}

export default BattlefieldManager;
