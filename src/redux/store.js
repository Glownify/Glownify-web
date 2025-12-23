import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import superadminReducer from './slice/superadminSlice'
import salesexecutiveReducer from './slice/salesexecutiveSlice'
import userReducer from './slice/userSlice'
import saloonownerReducer from './slice/saloonownerSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    superadmin: superadminReducer,
    salesexecutive: salesexecutiveReducer,
    user: userReducer,
    saloonowner: saloonownerReducer,
  },
})

export default store