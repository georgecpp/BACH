import HomeScreen from '../Components/HomeScreen';
import Home from '../Components/HomeScreen';
export const pageReducer = (state = <HomeScreen></HomeScreen>, action) => {
    if(action.type==="SET_PAGE") {
            state=action.payload
    
    }
    return state;
};