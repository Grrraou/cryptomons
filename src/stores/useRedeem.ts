import TokenManager from '@/managers/TokenManager';
import UXManager from '@/managers/UXManager';
import { defineStore } from 'pinia';

export const useRedeemStore = defineStore('redeem', {
  state: () => ({
    faucet: false,
  }),
  actions: {
    redeem(ticket: string) {
      if (!this.claim(ticket)) {
        ticket = '';
      }
      console.log(ticket)
      switch (ticket) {
        case 'faucet':
          TokenManager.getTokenStore('btc').updateBalance(10);
          UXManager.showFlyingTextOnElement('+10', TokenManager.getTokenIcon('btc'), 'redeem-input');
          break;
        default:
          UXManager.showError('Try harder !');
          break;
      }
    },
    claim(ticket: string) {
      if (!this[ticket]) {
        this[ticket] = true;
        return true;
      }
      return false;
    },
  },
  persist: true,
});
