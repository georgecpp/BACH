import MyNavbar from "./Components/MyNavbar";
import {useDispatch,useSelector} from "react-redux";
import {useEffect,useState} from "react";
import ProductsPage from "./Components/ProductsPage";
import AdminPage from "./Components/AdminPage";
function App() {

  const page=useSelector(state=>state.page);
  const user=useSelector(state=>state.user);
  const render=()=>{
    if(user.type==='normal'||!user.type){
      return page;
    }
    else
    {
      if(user.type==="admin"){
        console.log("admin");
        return <AdminPage/>
      }
        return <ProductsPage></ProductsPage>
    }
  }
  return (
    <div className="App">
      <MyNavbar></MyNavbar>
      {render()}
    </div>
  );
}

export default App;
