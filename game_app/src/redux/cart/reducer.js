import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsInCart: [],
        itemsUsers: {
            isAuthenticated: null,
            username:'',
            pk:'',
        },
        games: {
            pk: null,
            name: '',
            developer: '',
            publisher: '',
            gernre: '',
            price: '',
        },
    },
    reducers: {
        setItemInCart: (state, action) => {
            state.itemsInCart.push(action.payload)
        },
        deleteItemFromCart: (state, action) => {
            state.itemsInCart = state.itemsInCart.filter(game => game.pk !== action.payload)
        },
        Setusername:(state, action) =>{
            state.itemsUsers.username= action.payload
        },
        Setauther:(state, action) =>{
            state.itemsUsers.isAuthenticated= action.payload
        },
        Setauthernone:(state, action) =>{
            state.itemsUsers.isAuthenticated= false
        },
        Setpk:(state, action)=>{
            state.itemsUsers.pk=action.payload
        },
        SetTitle: (state, action) => {
            state.games.name=action.payload
        },
        SetDeveloper: (state, action) => {
            state.games.developer=action.payload
        },
        SetPublisher: (state, action) => {
            state.games.publisher=action.payload
        },
        SetGenre: (state, action) => {
            state.games.genre=action.payload
        },
        SetPrice: (state, action) => {
            state.games.price=action.payload
        },
        SetId: (state, action) => {
            state.games.pk=action.payload
        }
    }
});
export const {SetId, SetTitle, SetDeveloper, SetPublisher, SetGenre, SetPrice, setItemInCart, deleteItemFromCart, Setauther, Setauthernone, Setusername, Setpk } = cartSlice.actions;
export default cartSlice.reducer;