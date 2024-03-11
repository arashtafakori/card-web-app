export const BOOKLETS_PATH = `/booklets`;
export const INDICES_PATH = `/indices`;
export const CARDS_PATH = `/cards`;

export const getIndicesListPath = (bookletId) => {
    return BOOKLETS_PATH + `/${bookletId}` + INDICES_PATH;
}

export const getCardsListPath = (bookletId, indexId) => {
    return BOOKLETS_PATH + `/${bookletId}` + CARDS_PATH + `/${indexId}`;
}