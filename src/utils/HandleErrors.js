import axios from "axios";

export const handleAxiosError = (error, thunkAPI) => {
  if (axios.isAxiosError(error)) {
    console.error("Axios Error:", error);

    // 🟥 Server responded (4xx / 5xx)
    if (error.response) {
      const data = error.response.data;

      return thunkAPI.rejectWithValue({
        message: data?.message || "Something went wrong",
        statusCode: error.response.status,
        errorCode: data?.errorCode || "SERVER_ERROR",
        data: data || null,
        timestamp: Date.now(),
      });
    }

    // 🟧 Network error (server unreachable)
    if (error.request) {
      return thunkAPI.rejectWithValue({
        message: "Network error. Please check your internet connection.",
        statusCode: 0,
        errorCode: "NETWORK_ERROR",
        data: null,
        timestamp: Date.now(),
      });
    }

    // 🟨 Axios config error
    return thunkAPI.rejectWithValue({
      message: error.message || "Request configuration error",
      statusCode: 0,
      errorCode: "AXIOS_ERROR",
      data: null,
      timestamp: Date.now(),
    });
  }

  // 🟥 Non-Axios error (bug, runtime issue)
  return thunkAPI.rejectWithValue({
    message: "Unexpected error occurred",
    statusCode: 0,
    errorCode: "UNEXPECTED_ERROR",
    data: null,
    timestamp: Date.now(),
  });
};
