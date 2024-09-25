import { defineStore } from 'pinia';
import { TokenStoreType } from './useTokens';
import TokenManager from '@/managers/TokenManager';
import UXManager from '@/managers/UXManager';
import AudioManager from '@/managers/AudioManager';
import SettingsManager from '@/managers/SettingsManager';

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
    volume: number;
}

export const useSwapStore = defineStore('swap_options', {
    state: (): SwapStoreType => ({
        fromToken: TokenManager.getTokensOrderedByBalance()[0].index,
        toToken: TokenManager.getReferenceTokenStore().index,
        priceFactor: 1,
        amount: 0,
        swapResult: 0,
        volume: 0,
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
        swapTokens(): number {
            const fromToken = TokenManager.getTokenStore(this.fromToken);
            const toToken = TokenManager.getTokenStore(this.toToken);

            if (this.amount <= 0) {
              UXManager.showError(`Can't swap 0.`);
              return 0;
            }
      
            if (fromToken.balance < this.amount) {
              UXManager.showError(`Insufficient ${fromToken.index.toUpperCase()} balance.`);
              return 0;
            }
      
            if (!fromToken.isFiat()) {
              const linearImpact = this.amount * 0.001; // Small base impact for linear scaling
              const logImpact = Math.log10(this.amount + 1); // Logarithmic scaling for larger amounts
              const combinedImpact = linearImpact + logImpact; // Combine both impacts
          
              const amountImpact = Math.pow(combinedImpact, this.priceFactor); // Use priceFactor as exponent
              const priceImpact = Math.pow(fromToken.price, this.priceFactor); // Use priceFactor as exponent
      
              // Higher damping factor for fromToken
              const dampingFactor = 0.06; // Higher impact for selling
      
              // Adjusted price decrease calculation
              const priceDecrease = dampingFactor * fromToken.price * (amountImpact / (amountImpact + priceImpact));

                // History Chart
                const open = fromToken.price;
                const close = +(Math.max(fromToken.price - priceDecrease, 0.01)).toFixed(2);

                const randomFactor = 0.02; // A factor to add randomness, adjust as needed
                const high = +(Math.max(open, close) * (1 + Math.random() * randomFactor)).toFixed(2);
                const low = +(Math.min(open, close) * (1 - Math.random() * randomFactor)).toFixed(2);
                const index = fromToken.history.length + 1;

                 fromToken.history.push({ 
                    x: index, 
                    o: open, 
                    h: high, 
                    l: low, 
                    c: close 
                });
      
              // Apply the price decrease, ensuring it doesn't drop below the minimum
              fromToken.price = Math.max(fromToken.price - priceDecrease, 0.01);
          }
      
          if (!toToken.isFiat()) {
              const linearImpactToToken = this.amount * 0.001; // Small base impact for linear scaling
              const logImpactToToken = Math.log10(this.amount + 1); // Logarithmic scaling for larger amounts
              const combinedImpactToToken = linearImpactToToken + logImpactToToken; // Combine both impacts
              
              const amountImpactToToken = Math.pow(combinedImpactToToken, this.priceFactor); // Use priceFactor as exponent
              const priceImpactToToken = Math.pow(toToken.price, this.priceFactor); // Use priceFactor as exponent
      
              // Lower damping factor for toToken to ensure net negative impact over cycles
              const dampingFactorToToken = 0.03; // Less impact for buying toToken
      
              // Adjusted price increase calculation
              const priceIncrease = dampingFactorToToken * toToken.price * (amountImpactToToken / (amountImpactToToken + priceImpactToToken));


              // History Chart
              const open = toToken.price;
              const close = +(Math.max(toToken.price + priceIncrease, 0.01)).toFixed(2);

              const randomFactor = 0.02; // A factor to add randomness, adjust as needed
              const high = +(Math.max(open, close) * (1 + Math.random() * randomFactor)).toFixed(2);
              const low = +(Math.min(open, close) * (1 - Math.random() * randomFactor)).toFixed(2);
              const index = toToken.history.length + 1;

              toToken.history.push({ 
                  x: index, 
                  o: open, 
                  h: high, 
                  l: low, 
                  c: close 
              });
      
              // Apply the price increase, ensuring it doesn't drop below the minimum
              toToken.price = Math.max(toToken.price + priceIncrease, 0.01);
            }

            let swapResult = this.calculatePotentialSwap();
            fromToken.updateBalance(-this.amount);
            fromToken.sold += this.amount;
            toToken.updateBalance(swapResult);
            toToken.bought += swapResult;

            this.volume += (this.amount * fromToken.price) + (swapResult * toToken.price);
            UXManager.showSuccess(`Swapped ${this.amount.toFixed(SettingsManager.getSettings().decimals)} ${fromToken.index.toUpperCase()} to ${swapResult.toFixed(SettingsManager.getSettings().decimals)} ${toToken.index.toUpperCase()}`);
            AudioManager.play('swap.wav');
            swapResult = 0;
            this.amount = 0;
            return swapResult;
        },
        getFees(): number {
            return this.amount * this.getFromTokenStore().swapFees;
        },
    },
    persist: true,
});
