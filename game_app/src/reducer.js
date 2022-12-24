export default function reducer(state, action){
    switch (action.type){
        case 'Сложение':
            return{
                priceCount: state.priceCount + action.payload,
            };
        default:
            return {...state};
    }
}