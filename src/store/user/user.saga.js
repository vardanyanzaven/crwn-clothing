import { takeLatest, all, call, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, stopLoading, userSignOutFailed, userSignOutSuccess } from "./user.actions";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, extraInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      extraInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) {
        return;
    };
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* emailSignInAsync({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* googleSignInAsync() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUpAsync({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(
          createAuthUserWithEmailAndPassword,
          email,
          password
        );
        yield put(signUpSuccess(user, {displayName}));
    } catch(error) {
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({payload: {user, extraInfo}}) {
    yield call(getSnapshotFromUserAuth, user, extraInfo)
}

export function* signOutAsync() {
    try {
        yield call(signOutUser);
        yield put(userSignOutSuccess());
    } catch(error) {
        yield put(userSignOutFailed(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignInAsync);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignInAsync);
}

export function* onUserSignUp() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpAsync);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
};


export function* onUserSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutAsync);
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onUserSignUp),
    call(signUpSuccess),
    call(onUserSignOut),
  ]);
}
