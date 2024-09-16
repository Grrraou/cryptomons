import { tokensEnum, Token } from '@/enums/TokensEnum';
import { defineStore } from 'pinia';

export type TokenStoreType = {
    index: string;
    name: string;
    balance: number;
    price: number;
    swapFees: number;
    updateBalance: (amount: number) => void;
    getIcon: () => string;
    getBalanceInCrypto: () => number;
    isFiat: () => boolean;
};
  
export const useTokenStores: Record<string, () => TokenStoreType> = tokensEnum.reduce((acc, token) => {
  const store = defineStore(`token_${token.index}`, {
    state: (): Omit<Token, 'balance'> & { balance: number, swapFees: number } => ({
      ...token,
      balance: 0,
      swapFees: 0.05,
    }),
    actions: {
      updateBalance(amount: number) {
        this.balance += amount;
      },
      getIcon() {
        const imgPath = `/tokens/${this.index}.png`;
        return new URL(imgPath, import.meta.url).href;
      },
      getBalanceInCrypto() {
        return this.balance * this.price;
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
