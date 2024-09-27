import { NFTStoreType, useNFTStores } from "@/stores/useNFTs";
import { NFTsEnum, NFTType } from "@/enums/NFTsEnum";

class NFTsManager {

    static getNFTs() {
        return Object.keys(useNFTStores).map(key => useNFTStores[key]());
    }

    static getNFT(nftIndex: string) {
        return this.getNFTs().find(nft => nft.index === nftIndex);
    }

    static getCollections() {
        return NFTsEnum;
    }

    static getLootableCollections() {
        return NFTsEnum.filter(collection => collection.lootable);
    }

    static getRandomNFT(collectionIndex: string) {
        const nfts = this.getNFTbyCollection(collectionIndex);
        if (!nfts || nfts.length === 0) {
            return null;
        }
    
        // Step 1: Calculate the exponential weight for each NFT based on rarity
        const weights = nfts.map(nft => Math.pow(2, nft.rarity));
    
        // Step 2: Calculate the total weight
        const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    
        // Step 3: Generate a random number between 0 and totalWeight
        const random = Math.random() * totalWeight;
    
        // Step 4: Use cumulative sum to find the selected NFT
        let cumulativeWeight = 0;
        for (let i = 0; i < nfts.length; i++) {
            cumulativeWeight += weights[i];
            if (random < cumulativeWeight) {
                return nfts[i];
            }
        }
    
        return null;
    }    

    static getNFTbyCollection(collectionIndex: string) {
        return this.getNFTs().filter(nft => {
            return nft.collection === collectionIndex;
        });
    }

    static getCollectionCompletion(collectionIndex: string) {
        const nfts = this.getNFTbyCollection(collectionIndex);
        let found = 0;
        nfts.forEach(nft => {
            found += (nft.isFound) ? 1 : 0;
        });
        const result = (found / nfts.length) * 100;

        return (!Number.isFinite(result)) ? 0 : result;
    }

    static isCollectionCompleted(collectionIndex: string) {
        return this.getCollectionCompletion(collectionIndex) === 100;
    }
}

export default NFTsManager;
