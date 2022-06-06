import {
    FirebaseDataProvider,
    FirebaseAuthProvider
  } from 'react-admin-firebase';

import { CCS_FirebaseConfig } from '../configs/FirebaseConfigs';

export const AuthProvider =  FirebaseAuthProvider(CCS_FirebaseConfig);

export const DataProvider =  FirebaseDataProvider(CCS_FirebaseConfig);