
export type Item = {
  index: string;
  name: string;
  description: string;
  value: number;
  type: 'Consumable' | 'Head' | 'Chest' | 'Weapon';
  img?: boolean;
  xp?: number;
  damage?: number;
  effect?: () => void | number;
}

export const itemsEnum: Item[] = [
  {
    index: 'good_new_btc',
    name: 'Good News: Bitcoin is secure !',
    description: 'Increase bitcoin value by 5.',
    value: 100,
    type: 'Consumable',
    effect: function () {
      alert('good_new_btc');
      /* const storageIndex = 'cryptodollar_value_btc';
      const currentValue = parseFloat(localStorage.getItem(storageIndex) || '0');
      const newValue = currentValue + 5;
      localStorage.setItem(storageIndex, newValue.toString());
      const toast = useToast();
      toast.success('🚀 Bitcoin going to the moon ! 🚀'); */
    },
  },
  {
    index: 'binance-chestguard',
    name: 'Binance Chestguard',
    description: 'A sturdy chest armor infused with the power of Binance, offering strong protection.',
    value: 300,
    type: 'Chest',
    xp: 10,
    img: true,
  },
  {
    index: 'binance-fortress-plate',
    name: 'Binance Fortress Plate',
    description: 'An elite chestplate crafted with Binance\'s finest technology, providing superior defense.',
    value: 500,
    type: 'Chest',
    xp: 20,
    img: true,
  },
  {
    index: 'fire-sword',
    name: 'Fire Sword',
    description: 'A sword imbued with fire, increasing attack power.',
    value: 500,
    type: 'Weapon',
    damage: 10,
  },
  {
    index: 'manual-mining-potion',
    name: 'Manual Mining Potion',
    description: '2x Mining efficiency for 2 minutes',
    value: 50,
    type: 'Consumable',
    effect: function () {
      alert('manual-mining-potion');
      /* ItemManager.startBuff({
        type: 'miningMultiplier',
        source: 'manual-mining-potion',
        multiplier: 2000,
        expiration: 120000, // 2 minutes from now
      }); */
    },
  },
];
  