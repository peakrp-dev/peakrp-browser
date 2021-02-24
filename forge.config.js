module.exports = {
  packagerConfig: {
    icon: 'icons/peakrp',
    protocols: [
      {
        name: 'peakrp-protocol',
        schemes: 'peakrp',
      },
    ],
    appCategoryType: 'public.app-category.games',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://peakrp.com/img/browser-icons/peakrp.ico',
        setupIcon: 'icons/setup.ico',
        loadingGif: 'icons/setup-splash.gif',
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {},
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
  ],
};
