export type TutorialsType = {
    minesTutorial: TutorialStepsType[],
    goalsTutorial: TutorialStepsType[],
}

export type TutorialStepsType = {
    target: String,
    header: { title: String},
    content: String,
    params: { highlight: Boolean, placement: string, enableScrolling: Boolean },
};
  
export const tutorialsEnum: TutorialsType = {
    minesTutorial: [
        {
            target: '#bitcoin_mine_btc_mine',
            header: {
                title: 'Start minning !',
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
            content: `Here you can check the mine level, the more you level up a mine, the more tokens you you mine.`,
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
                placement: 'right',
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
};
