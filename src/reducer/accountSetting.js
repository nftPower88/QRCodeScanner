const initialState = {
    allowGuests: true,
    backgroundColor: "#FFFFFF",
    bannerUrl: null,
    guestsCanAddContent: false,
    introduction: "<h1>Welcome</h1>",
    logoUrl: null,
    themeName: 'LightTheme',
    primaryColor: "#d4d4aa",
    secondaryColor: "#ebf5df",
    textColor: "#000000"
};

const AccountSettings = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACCOUNT_SETTINGS":
            return action.accountSettings;
        case "SAVE_ACCOUNT_SETTINGS":
            return {...state, ...action.accountSettings};
        default:
            return state;
    }
};

export default AccountSettings;