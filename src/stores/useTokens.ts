import { tokensEnum, Token } from '@/enums/TokensEnum';
import TokenManager from '@/managers/TokenManager';
import UXManager from '@/managers/UXManager';
import { defineStore } from 'pinia';

export type TokenStoreType = {
    index: string;
    name: string;
    balance: number;
    price: number;
    swapFees: number;
    bought: number;
    sold: number;
    updateBalance: (amount: number) => void;
    getIcon: () => string;
    getBalanceInCrypto: () => number;
    isFiat: () => boolean;
};
  
export const useTokenStores: Record<string, () => TokenStoreType> = tokensEnum.reduce((acc, token) => {
  const store = defineStore(`token_${token.index}`, {
    state: (): Omit<Token, 'balance'> & { balance: number, swapFees: number, bought: number, sold: number } => ({
      ...token,
      balance: 0,
      swapFees: 0.05,
      bought: 0,
      sold: 0,
    }),
    actions: {
      updateBalance(amount: number) {
        this.balance += amount;
      },
      getIcon(): string {
        const imgPath = `tokens/${this.index}.png`;
        return UXManager.getImagePath(imgPath);
      },
      getBalanceInCrypto() {
        return TokenManager.getAssetValue(this.index);
      },
      isFiat(): boolean {
        return this.index === 'cryptodollar';
      }
    },
    persist: true,
  });

  acc[token.index] = store as unknown as () => TokenStoreType;
  return acc;
}, {} as Record<string, () => TokenStoreType>);
