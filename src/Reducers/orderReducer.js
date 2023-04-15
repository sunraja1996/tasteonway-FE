export const placeorderReducer = (state={}, action) => {

    switch (action.type){
        
        case 'PLACE_ORDER_REQ' : return {
            loading : true
        }
        case 'PLACE_ORDER_SUCCESS' : return{
            loading : false,
            success : true
        }
        case 'PLACE_ORDER_FAIL' : return{
            loading : false,
            error : action.payload
        }

        default : return state
    }
}

