export type TutorialsType = {
    minesTutorial: TutorialStepsType[],
    goalsTutorial: TutorialStepsType[],
    achievementsTutorial: TutorialStepsType[],
    stakingTutorial: TutorialStepsType[],
    vaultTutorial: TutorialStepsType[],
    battleTutorial: TutorialStepsType[],
    inventoryTutorial: TutorialStepsType[],
    swapTutorial: TutorialStepsType[],
    nftTutorial: TutorialStepsType[],
    tothemoonTutorial: TutorialStepsType[],
    statsTutorial: TutorialStepsType[],
    settingsTutorial: TutorialStepsType[],
}

export type TutorialStepsType = {
    target: String,
    header?: { title: String},
    content: String,
    params: { highlight: Boolean, placement: string, enableScrolling: Boolean },
};
  
export const tutorialsEnum: TutorialsType = {
    minesTutorial: [
        {
            target: '#bitcoin_mine_btc_mine',
            header: {
                title: 'Start mining !',
            },
            content: `This is your first mine, also the first option to earn tokens.`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '#bitcoin_mine_btc_mine .mine-button',
            header: {
                title: 'Mine manually',
            },
            content: `By clicking here you can mine manually, every click will give you a certain amount of tokens, try !`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '#bitcoin_mine_btc_mine .clicks-display',
            header: {
                title: 'Stats',
            },
            content: `Here you can check how many times you mined manually (basically the number of click)`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '#bitcoin_mine_btc_mine .token-balance-display',
            header: {
                title: 'Current Balance',
            },
            content: `Here you can check your current balance`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '#bitcoin_mine_btc_mine .level-display',
            header: {
                title: 'Mine level',
            },
            content: `Here you can check the mine level, the more you level up a mine, the more tokens you mine.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '#bitcoin_mine_btc_mine .upgrade-button',
            header: {
                title: 'Mine level up',
            },
            content: `To level up your mine you will have to click here when you have enough tokens. Each level cost more and more.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '#bitcoin_mine_btc_mine .workers-section',
            header: {
                title: 'Workers area',
            },
            content: `Later, when you will unlock heroes, you will be able to drag&drop them in this area to let them mine for you.`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.hero-container',
            header: {
                title: 'Heroes',
            },
            content: `Unlocked heroes will apear here.`,
            params: {
                highlight: true,
                placement: 'left',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-goals',
            header: {
                title: 'Goals',
            },
            content: `To unlock more mines and heroes you need to complete some goals here, basically each one requieres a certain amount of various tokens.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-mines',
            header: {
                title: 'Navigate',
            },
            content: `You can come back to the mines by clicking here again.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
    ],
    goalsTutorial: [
        {
            target: '.goals-page .page-title',
            header: {
                title: 'Goals',
            },
            content: `Welcome to the goals page, here you will unlock things to click even more.`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.goals-page #goal_halving_bitcoin',
            header: {
                title: 'Goal',
            },
            content: `Each box represent a goal to unlock`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.goals-page .goal-box .goal-costs',
            header: {
                title: 'Costs',
            },
            content: `Here you can see how much to pay to unlock the goal, a goal may require multiple tokens. The buttons will unlock when you have enough tokens to pay the cost`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-goals',
            header: {
                title: 'Shiny link',
            },
            content: `Don't panic, when you have enough to pay a cost the link will becomes shiny to alert you if you are somewhere else so you don't need to come here and check every minute.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-vault',
            header: {
                title: 'the Vault',
            },
            content: `You can also check your balance in the vault but you will need to unlock the related goal first.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-swap',
            header: {
                title: 'Swap',
            },
            content: `If you don't know how to get the required tokens you can go to the swap when unlocked to exchange any tokens for any other tokens`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.goals-page .goal-box .goal-reward',
            header: {
                title: 'Rewards',
            },
            content: `Here you can check what you will unlock when all the costs are paid`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.goals-page .filters',
            header: {
                title: 'Filtering',
            },
            content: `Finally you can use these options to filter the goals. Usefull if you are here to click and not to scroll !`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
    ],
    achievementsTutorial: [],
    stakingTutorial: [
        {
            target: '.staking-page .page-title',
            header: {
                title: 'Staking',
            },
            content: `Here you can lock certains tokens and gain a small amount of passive incomes by doing nothing, except waiting. But BEWARE, when you stake a token you won't be able to unstack it !`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking',
            header: {
                title: 'Staking',
            },
            content: `Each staking allow to stake only one token type and the passive reward will be of the same token type.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking .token-icon',
            header: {
                title: 'Token',
            },
            content: `Here you can check wich token you can stake and logically which token you will earn.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking .staked-amount',
            header: {
                title: 'Staked Amount',
            },
            content: `here you can check how many tokens are already staked`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking .stored-amount',
            header: {
                title: 'Stored Amount',
            },
            content: `here you can check how many tokens are available to stake (basically how many you own). Also your staking rewards will be dropped here.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-swap',
            header: {
                title: 'Swap',
            },
            content: `If you don't have enough you can go to the swap. Since staking tokens are not minable you might have no choice to begin.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking .apr',
            header: {
                title: 'APR',
            },
            content: `Here you can see the return factor, how much percents of staked tokens you will receive as reward each turns`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking .estimated-gains',
            header: {
                title: 'Estimated gains',
            },
            content: `Here you can make an idea of how much you should receive each turns`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking .amount-input',
            header: {
                title: 'Staking input',
            },
            content: `Here you can type how much tokens you want to stake`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking .quick-select-buttons',
            header: {
                title: 'Staking buttons',
            },
            content: `Or you can use the percentage buttons for more convenience, it will fill the input with the selected percentage of owned tokens`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.staking-page #staking-widget-peercoin_staking .staking-button',
            header: {
                title: 'Staking !',
            },
            content: `When everything is ok you can click here to stake your tokens and start earning by doing nothing. But REMEMBER, you won't be able to unstake them !`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
    ],
    vaultTutorial: [
        {
            target: '.vault-page .page-title',
            header: {
                title: 'The Vault',
            },
            content: `Welcome to the vault, here you can check all your assets and their price.`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.vault-page .vault-item',
            header: {
                title: 'Tokens',
            },
            content: `Each box represent a token, you can't see a token if you don't own some of them`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.vault-page .vault-item h2',
            header: {
                title: 'Token symbol',
            },
            content: `Here you can check the token's name and symbol`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.vault-page .vault-item .current-price',
            header: {
                title: 'Price',
            },
            content: `The price is how much you can obtain by selling one of them`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.vault-page .vault-item .current-reference-value',
            header: {
                title: 'Total value',
            },
            content: `Here you can see the total value of your balance for this token, converted in reference token. (basically it is current amout * price)`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.totalAssets',
            header: {
                title: 'Total total value',
            },
            content: `A bit like there, but this one is the sum of ALL your owned tokens, converted in reference token.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-settings',
            header: {
                title: 'Settings',
            },
            content: `The reference token can be changed in the settings but for more convenience i recommand keeping the crypto dollar`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.vault-page .vault-item .current-price',
            header: {
                title: '1 = 1',
            },
            content: `Why ? because it is a fiat token, meaning it price will always be the same while the others token's price can fluctuate.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
    ],
    battleTutorial: [
        {
            target: '.page-title',
            header: {
                title: 'The Battlefields',
            },
            content: `Welcome to the battlefields, here you will fight like a real trader !`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.hero-container',
            header: {
                title: 'Heroes',
            },
            content: `You should know this box, it is your heroes list like in the mines, it means you will be able to drag&drop them to the battlefields to fight for you`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.battlefield-block',
            header: {
                title: 'Battlefield',
            },
            content: `And this is your first battlefield, you will unlock more later in the goals`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.battlefield-block .heroes-area',
            header: {
                title: 'Fighting heroes',
            },
            content: `I think you already understood but just in case, this is where you can drop your heroes to fight`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.battlefield-block .monsterThumb',
            header: {
                title: 'Monsters',
            },
            content: `Here is where the horrible monsters appears, you can click on them to do damage. Let's try !`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.battlefield-block .monsterThumb .monster-life',
            header: {
                title: 'Monster\'s life',
            },
            content: `When you damage monster it is obviously loosing lifes, when it reach 0 you won and another monster pop !`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-inventory',
            header: {
                title: 'Loot',
            },
            content: `When you kill a monster, you have a certain chance to get it loot. Each monster can loot 1 item but the item's characteristics are a bit randomised`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
    ],
    inventoryTutorial: [
        {
            target: '.page-title',
            header: {
                title: 'The Inventory',
            },
            content: `Welcome to the inventory, here you can inspect your item stach and equip or sell them`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.inventory-section',
            header: {
                title: 'Item chest',
            },
            content: `All your items will appears here`,
            params: {
                highlight: true,
                placement: 'top',
                enableScrolling: false,
            },
        },
        {
            target: '.equipement-section',
            header: {
                title: 'Equipement',
            },
            content: `Here is the equipement section where you can check your equiped items`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.equipement-section .equipement-container #headSlot',
            header: {
                title: 'Head',
            },
            content: `Each slot accepts only one item type, here is the Head`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.equipement-section #weaponSlot',
            header: {
                title: 'Weapon',
            },
            content: `Here is the Weapon etc... you can drag & drop your item in the corresponding slot to equip it`,
            params: {
                highlight: true,
                placement: 'left',
                enableScrolling: false,
            },
        },
        {
            target: '.equipement-section #equipement-stats',
            header: {
                title: 'Stats',
            },
            content: `After equiping some gear you will see the cumulated stats boost in this window`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.selling-container',
            header: {
                title: 'Selling',
            },
            content: `Or, if you don't want to keep the item you can drag and drop them here to sell if you don't want to keep it`,
            params: {
                highlight: true,
                placement: 'left',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-battle',
            header: {
                title: 'Fight !',
            },
            content: `Now let's go fighting to loot more items !`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-achievements',
            header: {
                title: 'Achievements',
            },
            content: `You can't ? erf... then maybe check in the achievements, some of them might rewards an item`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
    ],
    swapTutorial: [
        {
            target: '.page-title',
            header: {
                title: 'The Swap',
            },
            content: `Welcome to the swap, here you can exchange your tokens for another one, just like alchemy. But just like alchemy all comes at a price !`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.swap-fees',
            header: {
                title: 'Fees',
            },
            content: `The price is here, you will pay this percentage any time you want to swap tokens`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.swap-fromtoken',
            header: {
                title: 'Selling',
            },
            content: `Here you can select the token you want to sell`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.swap-totoken',
            header: {
                title: 'Buying',
            },
            content: `And here you can select the token you want to buy`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.swap-tokens-button',
            header: {
                title: 'Switch',
            },
            content: `By clicking here you can quickly switch the selling and buying token`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.amount-input',
            header: {
                title: 'Input',
            },
            content: `Here you can select the amount of token you want to sell`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.quick-select-buttons',
            header: {
                title: 'Lazy buttons',
            },
            content: `Or select one of these button for more convenience`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.swap-result',
            header: {
                title: 'Result',
            },
            content: `Here you can see the price of the selected token, or the amount of token you will receive after the swap if you selected an amount`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.swap-button',
            header: {
                title: 'JUST DO IT !',
            },
            content: `Finally, when everything is ok you can clic here to swap`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
    ],
    nftTutorial: [
        {
            target: '.page-title',
            header: {
                title: 'NFTs',
            },
            content: `Here you can check your NFTs collections.`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.nft-collection',
            header: {
                title: 'Collections',
            },
            content: `Collection consists of a set of NFTs that you can find in the game, basically they are just images but with value.`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.collection-title h3',
            header: {
                title: 'Completion',
            },
            content: `Here you can see the collection name and it's completion percentage.`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.collection-title p',
            header: {
                title: 'Bonus',
            },
            content: `Even if you need the complete collection to have a bonus, you can see the nature of that bonus when you reach 50% completion.`,
            params: {
                highlight: true,
                placement: 'bottom',
                enableScrolling: false,
            },
        },
        {
            target: '.nft-container',
            header: {
                title: 'NFT',
            },
            content: `Here you can view your NFTs for that collection. If not found yet you can't see it ! Their is no "it's just a JPEG ! I can download it" here.`,
            params: {
                highlight: true,
                placement: 'top',
                enableScrolling: false,
            },
        },
    ],
    tothemoonTutorial: [
        {
            target: '.sidemenu-tothemoon',
            header: {
                title: 'To the moon !',
            },
            content: `Finnally what you hardly clicked for is near, here you will try to reach the moon, but not in the shortest past of course.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.rocket',
            header: {
                title: 'Rocket',
            },
            content: `This is your rocket, this how how we usually travel in deep space.`,
            params: {
                highlight: true,
                placement: 'left',
                enableScrolling: false,
            },
        },
        {
            target: '.rocket button',
            header: {
                title: 'GAS',
            },
            content: `To move such a vehicule it requires some GAS, the Gas will be slowly consumed as you travel. If you run short the rocket stops.`,
            params: {
                highlight: true,
                placement: 'left',
                enableScrolling: false,
            },
        },
        {
            target: '.sidemenu-goals',
            header: {
                title: 'GAS token',
            },
            content: `Since Gas is a token you can get some by swapping.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
        {
            target: '.distance',
            header: {
                title: 'Distance',
            },
            content: `Here you can check how far you are, the more you advance the more important the rewards will be.`,
            params: {
                highlight: true,
                placement: 'right',
                enableScrolling: false,
            },
        },
    ],
    statsTutorial: [],
    settingsTutorial: [],
};
