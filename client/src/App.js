import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import DateTime from './dateTime';


function App() {
const [ItemText, setItemText] = useState('');
const [listItems, setListItems] = useState([]);
const [isUpdating, setIsUpdating] = useState('');
const [updateItemText, setUpdateItemText] = useState('');


//function to create item
const addItem = async (e) =>{
  e.preventDefault();
  try{
    const res = await axios.post('http://localhost:5500/api/item', {item : ItemText})
    setListItems(prev => [...prev, res.data]); //so we dont send a new get request always
    setItemText('')
  }
  catch(err){
    console.log(err);
  }
}

//function to delete Items
const deleteItem = async (id) => {
  try{
    const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
    const newListItems = listItems.filter(item=> item._id !== id);
    setListItems(newListItems);
  }catch(err){
    console.log(err);
  }
}

//function to update items

const updateItem = async (e) => {
  e.preventDefault()
  try{
    const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText})
    console.log(res.data)
    const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
    const updatedItem = listItems[updatedItemIndex].item = updateItemText;
    setUpdateItemText('');
    setIsUpdating('');
  }catch(err){
    console.log(err);
  }
}



const renderUpdateForm = () => (
  <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
    <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
    <button className="update-new-btn" type="submit">Update</button>
  </form>
)



//function to fetch all items
useEffect(()=>{
const getItemList = async () => {
  try{
      const res = await axios.get('http://localhost:5500/api/items')
      setListItems(res.data);
      console.log('render')
  }
  catch(err){
      console.log(err)
  }
}
getItemList()
},[]);




  return (
    <div className="App">
      <h1>My Day's Must Do List </h1>
      <p><DateTime></DateTime></p>
        <form className = "form" onSubmit={e => addItem(e)}>
          <input type = "text" placeholder= "Add your today's Must do Item" onChange={e => {setItemText(e.target.value)}} value ={ItemText}/>
          <button type = "submit"> Add </button>
        </form>
        <div className = "MustDoItemsList">
          {
            listItems.map(item => (
              <div className = "MustDoItem">
                {
                  isUpdating === item._id
                  ? renderUpdateForm ()
                  : <>
                    <p className ="item-content">{item.item}</p>
                    <button className = "update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                    <button className = "delete-item" onClick={()=> {deleteItem(item._id)}}>Delete</button>
                  </>
                }
            </div>
            )
            ) 
          }

    </div>

    </div>
  );
}

export default App;
