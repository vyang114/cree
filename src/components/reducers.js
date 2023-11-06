// src/reducers/booleanReducer.js
const initialState = {
    isBoolean: false,
    exit: false,
    category: "",
    filteredVocab: [],
    shuffledDilteredVocab: [],
    indexNotPickedYet: [],
  };

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOLEAN_FALSE':
          return {
            ...state,
            isBoolean: action.payload,
          };
          case 'UPDATE_EXIT':
            return {
              ...state,
              isBoolean: action.payload,
            };

        case 'UPDATE_CATEGORY':
          return {
            ...state,
            category: action.payload,
          };
        case 'UPDATE_FILTERED_VOCAB':
            return {
              ...state,
              filteredVocab: action.payload,
            };
        case 'UPDATE_INDEX_NOT_PICKED':
            return {
                ...state,
                indexNotPickedYet: action.payload,
            };
        case 'UPDATE_SHUFFLED_FILTERED_VOCAB':
            return {
                ...state,
                shuffledDilteredVocab: action.payload,
            };
        default:
          return state;
    }
};

export default appReducer;
