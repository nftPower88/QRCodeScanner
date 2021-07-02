import { toast } from 'react-toastify';
import { getAccountName } from '../helper/get-account-name';
import apicall from '../utils/apicall';

toast.configure();

const ACCOUNT_SETTING_URL = `https://myra-create-account.azurewebsites.net/api/GetAccountSettings?AccountName=${getAccountName()}`;
const SAVE_ACCOUNT_SETTING_URL = `https://myra-create-account.azurewebsites.net/api/SaveAccountSettings`;

export const getAccountSettings = () => {
    return (dispatch) => {
        return apicall({
            url: ACCOUNT_SETTING_URL,
            method: "GET",
            type: "json",
            params: {}
        }).then(response => {
            let res = null
            if ([200, 403, 500].includes(response.status)) {
                res = JSON.parse(response.responseText)
            }
            if ([200].includes(response.status)) {
                return dispatch({ type: "SET_ACCOUNT_SETTINGS", accountSettings: res.result });
            }
            else if (res && res.Message) {
                // toast.warn(res.Message)
            } else if (res && res.Error) {
                // toast.error(res.Error)
            } else {
                // toast.error("Error: Not able to fetch account settings.")
            }
        })
    }
};

export const saveAccountSettings = (accountSettings) => ({
    type: "SAVE_ACCOUNT_SETTINGS",
    accountSettings
});

export const saveAccountSettingsAsync = (accountSettings, setLoading, flag) => {
    return (dispatch) => {
        return apicall({
            url: SAVE_ACCOUNT_SETTING_URL,
            method: "POST",
            type: "json",
            params: accountSettings,
        }).then(response => {
            let res = null
            if ([200, 403, 500].includes(response.status)) {
                res = JSON.parse(response.responseText)
            }
            if ([200].includes(response.status)) {
                setLoading(false);
                if (flag) toast.success("Appearance Settings has been updated");
                else toast.success("General Settings has been updated");
                return dispatch(saveAccountSettings(res.result));
            } else if (res && res.Message) {
                setLoading(false);
                toast.warn(res.Message)
            } else if (res && res.Error) {
                setLoading(false);
                toast.error(res.Error)
            } else {
                setLoading(false);
                toast.error("Error: Not able to update account settings.")
            }
        })
    }
};

