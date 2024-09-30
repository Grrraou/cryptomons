import { useRocketStore } from "@/stores/useRocket";
import TokenManager from "./TokenManager";
import UXManager from "./UXManager";
import NFTsManager from "./NFTsManager";
import SettingsManager from "./SettingsManager";
import HeroManager from "./HeroManager";
import BattlefieldManager from "./BattlefieldManager";
import ItemManager from "./ItemManager";
import { rocketManager } from "@/App.vue";
import { PlanetType } from "@/stores/useRocket";

type RocketType = {
    image: string,
    animationFrameId: number | null,
    lastTime: number | null,
    speed: number,
    sound: HTMLAudioElement,
}

class RocketManager {
    private autoClickerIntervals: number | null = null;
    public imgRocketStop = '/moon/rocket-stop.png'
    public imgRocketStart = '/moon/rocket-start.png'
    public rocket: RocketType = {
        image: this.imgRocketStop,
        animationFrameId: null,
        lastTime: null,
        speed: 100,
        sound: new Audio(UXManager.getImagePath('sounds/rocket.wav')),
    };

    static getRocket() {
        return useRocketStore();
    }

    static getPlanet() {
        return this.getRocket().planet;
    }

    toggleRocket() {
        const rocketStore = RocketManager.getRocket();
        rocketStore.planet = null;
        rocketStore.isActive = !rocketStore.isActive;
        this.rocket.image = rocketStore.isActive
          ? rocketManager.imgRocketStart
          : rocketManager.imgRocketStop;
        
        rocketManager.toggleRocketSound();
  
        if (rocketStore.isActive) {
          this.rocket.lastTime = performance.now();
          rocketManager.startPlanetDiscoveryInterval();
        } else {
          rocketManager.stopRocket();
        }
    };

    startPlanetDiscoveryInterval() {
        RocketManager.getRocket().planet = null;
        this.autoClickerIntervals = setInterval(
            this.checkForPlanetDiscovery, 
            (10000  / (((NFTsManager.isCollectionCompleted('women_of_the_wordly_market')) ? 2 : 1)) / SettingsManager.getSettings().rocketSpeed)
        ) as unknown as number;
    }

    stopPlanetDiscoveryInterval() {
        clearInterval(this.autoClickerIntervals);
        this.autoClickerIntervals = null;
    }

    stopRocket() {
        if (this.rocket.animationFrameId !== null) {
            cancelAnimationFrame(this.rocket.animationFrameId);
            this.rocket.animationFrameId = null;
        }
        if (this.autoClickerIntervals !== null) {
            clearInterval(this.autoClickerIntervals);
            this.autoClickerIntervals = null;
        }

        this.rocket.lastTime = null;
        const rocketStore = RocketManager.getRocket();
        rocketStore.isActive = false;
        this.rocket.image = this.imgRocketStop;
        this.toggleRocketSound();
    };

    toggleRocketSound() {
        if (RocketManager.getRocket().isActive && SettingsManager.getSettings().soundOn) {
          this.rocket.sound.play();
        } else {
          this.rocket.sound.pause();
        }
    }

    checkForPlanetDiscovery() {
        const gasStore = TokenManager.getTokenStore('gas');
        gasStore.updateBalance(-0.1);
        RocketManager.getRocket().incrementRocketDistance();
        UXManager.showFlyingTextOnElement('-0.1', gasStore.getIcon(), 'rocket', 150, 'red');
        if (gasStore.balance < 0.1) {
            rocketManager.stopRocket();
            UXManager.showFlyingTextOnElement('Out of gas', gasStore.getIcon(), 'rocket', 150, 'red');
        }
        if (Math.random() < 1 / 50) {
            RocketManager.getRocket().planet = RocketManager.generatePlanet();
            UXManager.showSuccess('Your rocket found something !')
            rocketManager.stopRocket();
        }
    };

    static generatePlanet() {
        const rand = Math.random() * 100;
  
        if (rand < 30) {
            return this.generateTokenPlanet();
        } else if (rand < 60) {
            return this.generateHeroPlanet();
        } else if (rand < 90) {
            return this.generateItemPlanet();
        } else {
            return this.generateNFTPlanet();
        }
    };

    static generateTokenPlanet() {
        const planet: PlanetType = {};
        const tokenStore = TokenManager.getTokens()[Math.floor(Math.random() * TokenManager.getTokens().length)];
        const randomPercent = Math.random() * (5 - 1) + 1; 
        const partOfAssets = (randomPercent / 100) * (RocketManager.getRocket().distance / 100);
        const gain = partOfAssets / tokenStore.price;
        tokenStore.updateBalance(gain);

        planet.name = `Found a ${tokenStore.name} deposit !`;
        planet.style = `background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(240, 240, 240, 0.7)), url("${tokenStore.getIcon()}");background-size: cover;background-position: center center;`;
        planet.description = `+${gain.toFixed(2)} ${tokenStore.index.toUpperCase()}`;
        
        UXManager.showFlyingTextOnElement(`+${gain.toFixed(SettingsManager.getSettings().decimals)}`, tokenStore.getIcon(), 'rocket', 150, 'green');
        return planet;
    }

    static generateHeroPlanet() {
        const planet: PlanetType = {};
        const unlockedHeroes = HeroManager.getHeroes()
            .filter(heroStore => {
            return heroStore.isUnlocked();
            });
        const heroStore = unlockedHeroes[Math.floor(Math.random() * unlockedHeroes.length)];
        const randomPercent = Math.random() * (5 - 1) + 1; 
        const gain = (randomPercent / 100) * (heroStore.getXpToLevel() + (RocketManager.getRocket().distance / 100));

        planet.name = `${heroStore.name} found an anomaly !`;
        planet.style = `background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(240, 240, 240, 0.7)), url("${heroStore.getPicture()}");background-size: cover;background-position: center center;`;
        planet.description = `+${gain.toFixed(2)} XP`;

        UXManager.showFlyingTextOnElement(`+${gain.toFixed(SettingsManager.getSettings().decimals)} XP`, '', 'rocket', 150, 'green');
        return planet;
    }

    static generateItemPlanet() {
        const planet: PlanetType = {};
        const unlockedBattlefields = BattlefieldManager.getBattlefields().filter(battlefield => {
            return battlefield.isUnlocked();
        });
        const monster = unlockedBattlefields[Math.floor(Math.random() * unlockedBattlefields.length)].getRandomMonster();
        const item = ItemManager.getBaseItem(monster.loot.index);

        ItemManager.getItemStore().lootItem(monster.loot.index)

        planet.name = `${monster.name} defeated !`;
        planet.style = `background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(240, 240, 240, 0.7)), url("/monsters/${monster.index}.png");background-size: cover;background-position: center center;`;
        planet.description = `Found a ${item.name}`;
        
        return planet;
    }

    static generateNFTPlanet() {
        const planet: PlanetType = {};
        const collection = NFTsManager.getLootableCollections()[Math.floor(Math.random() * NFTsManager.getCollections().length)]
        const nft = NFTsManager.getRandomNFT(collection.index);
        planet.name = 'Found an already possessed NFT...';

        if (!nft.isFound) {
            nft.findNFT();
            planet.name = 'Found a WHOLE NEW NFT !';
        }
        planet.style = `background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(240, 240, 240, 0.7)), url("${nft.getImage()}");background-size: cover;background-position: center center;`;
        planet.description = `${nft.description}`;
        
        return planet;
    }
}

export default RocketManager;
