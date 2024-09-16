import { defineStore } from 'pinia';
import { TokenStoreType } from './useTokens';
import TokenManager from '@/managers/TokenManager';

export type SwapOption = {
    label: string;
    value: TokenStoreType;
    icon: string;
    balance: number;
    price: number;
    index: string;
}

export type SwapStoreType = {
    fromToken: string;
    toToken: string;
    priceFactor: number;
    amount: number;
    swapResult: number;
}

export const useSwapStore = defineStore('swap_options', {
    state: (): SwapStoreType => ({
        fromToken: TokenManager.getTokensOrderedByBalance()[0].index,
        toToken: TokenManager.getReferenceTokenStore().index,
        priceFactor: 0.01,
        amount: 0,
        swapResult: 0,
    }),
    actions: {
        getFromTokenStore() {
            return TokenManager.getTokenStore(this.fromToken);
        },
        getToTokenStore() {
            return TokenManager.getTokenStore(this.toToken);
        },
        setAmount(amount: number = 0): void {
            this.amount = amount;
        },
        getFromTokenSwapOptions(): SwapOption[] {
            const swapOptions: SwapOption[] = TokenManager.getTokensOrderedByBalance().slice().map(token => ({
                label: `${token.name} (${token.index})`,
                value: token,
                icon: token.getIcon(),
                balance: token.balance,
                price: token.price,
                index: token.index,
                updateBalance: token.updateBalance,
            }));
            return swapOptions;
        },
        getToTokenSwapOptions(): SwapOption[] {
            const swapOptions: SwapOption[] = TokenManager.getTokens().slice().filter(token => token.index !== this.fromToken).map(token => ({
                label: `${token.name} (${token.index})`,
                value: token,
                icon: token.getIcon(),
                balance: token.balance,
                price: token.price,
                index: token.index,
                updateBalance: token.updateBalance,
            }));
            return swapOptions;
        },
        switchTokens(): void {
            const temp = this.fromToken;
            this.fromToken = this.toToken;
            this.toToken = temp;
        },
        calculatePotentialSwap(): number {
            const fromTokenValue = this.getFromTokenStore().price;
            const toTokenValue = this.getToTokenStore().price;
            const fees = this.getFees();
            let swapResult = 0;

            if (this.amount > 0 && fromTokenValue > 0 && toTokenValue > 0) {
                const fromTokenValueInDollar = ((this.amount - fees) * fromTokenValue);
                swapResult = (fromTokenValueInDollar / toTokenValue);
            }
            return swapResult;
        },
        getFees(): number {
            return this.amount * this.getFromTokenStore().swapFees;
        },
    },
    persist: true,
});
