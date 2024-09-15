import { monstersEnum } from "@/enums/MonstersEnum";
import { useBattlefieldsStores } from "@/stores/useBattlefields";
import UXManager from "./UXManager";

class BattlefieldManager {
    private autoClickerIntervals: number | null = null;

    static getBattlefields() {
        return Object.keys(useBattlefieldsStores).map(key => useBattlefieldsStores[key]());
    }

    static getBattlefieldStore(goalIndex: string) {
        return useBattlefieldsStores[goalIndex]?.();
    }

    static getMonsters() {
        return monstersEnum;
    }

    static getRandomMonster() {
        const monsters = this.getMonsters();
        const randomIndex = Math.floor(Math.random() * monsters.length);
        const monster = monsters[randomIndex];
        return { ...monster };
    }

    startAutoBattle() {
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
        }, 1000);
    }
}

export default BattlefieldManager;
