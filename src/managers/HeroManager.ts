import { useHeroStores } from '@/stores/useHeroes';

class HeroManager {
    construct() {}

    static getHeroes() {
        return Object.keys(useHeroStores).map(key => useHeroStores[key]());
    }

    static getHeroStore(heroIndex: string) {
        return useHeroStores[heroIndex]?.();
    };

    static getHeroByArea(areaIndex: string) {
        return Object.values(useHeroStores).map(getHeroStore => {
            const heroStore = getHeroStore();
            return heroStore.location === areaIndex ? heroStore : null;
        }).filter(hero => hero !== null);
    }

    static recallAllHeroes() {
        this.getHeroes().forEach(heroStore => {
            heroStore.location = 'free';
        });
    }
}

export default HeroManager;
