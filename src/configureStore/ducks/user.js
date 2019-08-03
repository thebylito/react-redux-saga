export const Types = {
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_FAILURE: 'GET_USERS_FAILURE',
}

const initialState = {
  userList: [],
  userListLoading: false,
  userListError: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_USERS_REQUEST:
      return { ...state, userListLoading: true, userListError: '' };
    // Trouxe com sucesso
    case Types.GET_USERS_SUCCESS:
      return { ...state, userList: action.payload, userListLoading: false, userListError: '' };
    case Types.GET_USERS_FAILURE:
      return { ...state, userListLoading: false, userListError: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getUsersRequest: () => ({
    type: Types.GET_USERS_REQUEST,
  }),
  getUsersSuccess: ({ users }) => ({
    type: Types.GET_USERS_SUCCESS,
    payload: users
  }),
  getUsersFailure: ({ error }) => ({
    type: Types.GET_USERS_FAILURE,
    payload: error
  }),
}