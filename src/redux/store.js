import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import superadminReducer from './slice/superadminSlice'
import salesexecutiveReducer from './slice/salesexecutiveSlice'
import userReducer from './slice/userSlice'
import saloonownerReducer from './slice/saloonownerSlice'
import salesmanReducer from './slice/salesmanSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    superadmin: superadminReducer,
    salesexecutive: salesexecutiveReducer,
    user: userReducer,
    saloonowner: saloonownerReducer,
    salesman: salesmanReducer,
  },
})

export default store