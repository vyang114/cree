// src/reducers/booleanReducer.js
const initialState = {
    isBoolean: false,
    showMatchSoundToWord: true,
    exit: false,
    displayShowItem: false,
    category: "",
    randomIndex: 0,
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
              exit: action.payload,
            };
            case 'UPDATE_SHOW_MATCH_SOUND_TO_WORD':
                return {
                  ...state,
                  showMatchSoundToWord: action.payload,
                };
        case 'UPDATE_DISPLAY_SHOWITEM':
            return {
                ...state,
                displayShowItem: action.payload,
            };
        case 'UPDATE_CATEGORY':
          return {
            ...state,
            category: action.payload,
          };
          case 'UPDATE_ITEMR':
            return {
              ...state,
              itemR: action.payload,
            };
          case 'UPDATE_RANDOM_INDEX':
            return {
                ...state,
                randomIndex: action.payload,
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
