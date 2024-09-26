import { defineStore } from 'pinia';
import { NFTsEnum, NFTType } from '@/enums/NFTsEnum';
import UXManager from '@/managers/UXManager';

// Type for each NFT store state
export type NFTStoreType = NFTType & {
  collection: string;
  isFound: boolean;
};

// This function will create a Pinia store for each NFT dynamically
const createNFTStore = (nft: NFTType, collectionName: string) => {
  return defineStore(`nft_${nft.index}`, {
    state: (): NFTStoreType => ({
      ...nft,
      collection: collectionName,
      isFound: false,
    }),
    actions: {
      findNFT() {
        if (!this.isFound) {
          this.isFound = true;
          UXManager.showSuccess(`🃏 New NFT found ! 🃏\n${this.name}`);
        }
      },
      getImage() {
        return (this.isFound) ? `/nft/${this.collection}/${this.index}.png` : '/nft/default.png';
      }
    },
    persist: true,
  });
};

export const useNFTStores: Record<string, () => ReturnType<ReturnType<typeof createNFTStore>>> = NFTsEnum.reduce((acc, collection) => {
  collection.nfts.forEach((nft) => {
    acc[`nft_${nft.index}`] = createNFTStore(nft, collection.index);
  });

  return acc;
}, {} as Record<string, () => ReturnType<ReturnType<typeof createNFTStore>>>);