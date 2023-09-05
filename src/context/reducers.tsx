import { PRODUCT } from "../constants/product";
import { initialState } from "./store";
import { Action, InitialState } from "./types/initialState";

export const reducer = (
  state: InitialState,
  { type, payload }: Action
): InitialState => {
  switch (type) {
    case "SET_INITIAL_STATE": {
      return initialState;
    }
    case "SET_APPLICATON_RESET": {
      return setApplicationReset(state);
    }
    case "SET_RELOAD": {
      return setReload(state);
    }
    case "SET_USER_PROFILE": {
      return setUserProfile(state, payload);
    }
    case "SET_TOKEN":
      return setToken(state, payload);
    case "SET_APPLICATON": {
      return setApplication(state, payload);
    }
    case "SET_APPLICATON_TAB": {
      return setApplicationTab(state, payload);
    }
    case "SET_APPLICATON_FROM_PRODUCT": {
      return setApplicationProduct(state, payload);
    }
    case "SET_APPLICATON_EKYC": {
      return setApplicationEkyc(state, payload);
    }
    case "SET_APPLICATON_VERIFIED": {
      return setApplicationVerified(state, payload);
    }
    case "SET_APPLICATON_BACK_BTN": {
      return setApplicationBackBtn(state, payload);
    }
    case "SET_APPLICATON_IS_CONSENT": {
      return setApplicationIsConsent(state, payload);
    }
    case "SET_APPLICATON_IS_OPEN_VERIFIED_OTP": {
      return setApplicationIsOpenVerifiedOtp(state, payload);
    }
    case "SET_APPLICATON_PRODUCT_BRAND": {
      return setApplicationProductBrand(state, payload);
    }
    case "SET_APPLICATON_PRODUCT_MODEL": {
      return setApplicationProductModel(state, payload);
    }
    case "SET_APPLICATON_PRODUCT_YEAR": {
      return setApplicationProductYear(state, payload);
    }
    case "SET_APPLICATON_PRODUCT_MODEL_IMAGE": {
      return setApplicationProductModelImage(state, payload);
    }
    case "SET_APPLICATON_PRODUCT_RESET": {
      return setApplicationProductReset(state);
    }
    case "SET_APPLICATON_LOAN": {
      return setApplicationLoan(state, payload);
    }
    case "SET_APPLICATON_FINANCE": {
      return setApplicationFinance(state, payload);
    }
    case "SET_APPLICATON_CUSTOMER_INFO": {
      return setApplicationCustomerInfo(state, payload);
    }
    case "SET_APPLICATON_BUNDLE_INFO": {
      return setApplicationBundleInfo(state, payload);
    }
    case "SET_APPLICATON_NEXT_BACK_TAB": {
      return setApplicationNextBackTab(state, payload);
    }
    case "SET_APPLICATON_BREADCRUMBS": {
      return setApplicationBreadcrumbs(state, payload);
    }
    default:
      return state;
  }
};

const setApplicationReset = (state: InitialState): InitialState => {
  return {
    ...state,
    applicaton: {
      ...initialState.applicaton,
    },
  };
};

const setReload = (state: InitialState): InitialState => {
  return {
    ...state,
    reload: !state.reload,
  };
};

const setUserProfile = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    user: payload.user,
    token: payload.token,
  };
};

const setToken = (state: InitialState, payload: InitialState): InitialState => {
  return {
    ...state,
    token: payload.token ?? "",
  };
};

const setApplication = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state,
      ...payload.applicaton,
    },
  };
};

const setApplicationTab = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      tab: payload.applicaton?.tab ?? "none",
    },
  };
};

const setApplicationProduct = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      fromProduct: payload.applicaton.fromProduct,
      productType: payload.applicaton.productType,
    },
  };
};

const setApplicationEkyc = (state: InitialState, payload: InitialState) => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      ekyc: payload.applicaton?.ekyc ?? "none",
      tab: payload.applicaton?.tab ?? "none",
    },
  };
};

const setApplicationVerified = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      verified: payload.applicaton?.verified ?? false,
    },
  };
};

const setApplicationBackBtn = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      backBtn: payload.applicaton?.backBtn ?? "none",
    },
  };
};

const setApplicationIsConsent = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      isConsent: payload.applicaton.isConsent,
    },
  };
};

const setApplicationIsOpenVerifiedOtp = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      isOpenVerifiedOTP: payload.applicaton.isOpenVerifiedOTP,
      otpType: payload.applicaton.otpType,
    },
  };
};

const setApplicationProductBrand = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      product: {
        ...state.applicaton.product,
        brand: payload.applicaton.product.brand,
      },
    },
  };
};

const setApplicationProductModel = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      product: {
        ...state.applicaton.product,
        model: payload.applicaton.product.model,
      },
    },
  };
};

const setApplicationProductYear = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      product: {
        ...state.applicaton.product,
        year: payload.applicaton.product.year,
      },
    },
  };
};

const setApplicationProductModelImage = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      product: {
        ...state.applicaton.product,
        modelImage: payload.applicaton.product.modelImage,
      },
    },
  };
};

const setApplicationProductReset = (state: InitialState): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      product: PRODUCT,
    },
  };
};

const setApplicationLoan = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      loan: {
        ...state.applicaton.loan,
        ...payload.applicaton.loan,
      },
    },
  };
};

const setApplicationFinance = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      finance: {
        ...state.applicaton.finance,
        ...payload.applicaton.finance,
      },
    },
  };
};

const setApplicationCustomerInfo = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      customerInfo: payload.applicaton.customerInfo,
    },
  };
};

const setApplicationBundleInfo = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      bundleInfo: payload.applicaton.bundleInfo,
    },
  };
};

const setApplicationNextBackTab = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      nextTab: payload.applicaton.nextTab,
      backTab: payload.applicaton.backTab,
    },
  };
};

const setApplicationBreadcrumbs = (
  state: InitialState,
  payload: InitialState
): InitialState => {
  return {
    ...state,
    applicaton: {
      ...state.applicaton,
      breadcrumbs: payload.applicaton.breadcrumbs,
    },
  };
};
