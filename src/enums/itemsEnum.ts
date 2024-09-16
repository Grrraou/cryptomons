
export type Item = {
  index: string;
  name: string;
  description: string;
  value: number;
  type: 'Consumable' | 'Head' | 'Chest' | 'Weapon';
  stat?: number;
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
    index: 'iron-helmet',
    name: 'Iron Helmet',
    description: 'A sturdy helmet made of iron that protects the head.',
    value: 100,
    type: 'Head',
    stat: 0.1,
  },
  {
    index: 'steel-chestplate',
    name: 'Steel Chestplate',
    description: 'A heavy steel chestplate that provides excellent protection.',
    value: 250,
    type: 'Chest',
    stat: 1,
  },
  {
    index: 'fire-sword',
    name: 'Fire Sword',
    description: 'A sword imbued with fire, increasing attack power.',
    value: 500,
    type: 'Weapon',
    stat: 1,
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
  