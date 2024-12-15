import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState } from 'react';
import { AddItem } from './AddItem';
import { SearchItem } from "./SearchItem";
import ApiIntegration from "./ApiIntegration";
import { v4 as uuidv4 } from 'uuid';


function App(){
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [fetcherr, setfetcherr] = useState(null);
  const [isloading, setisloading] = useState(true);

  const API_URL = 'http://localhost:5053/api/List';

  useEffect(() => {

    const fetchItems = async() => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("data not found");
        const ListItems = await response.json();
        setItems(ListItems);
        setfetcherr(null)
      }catch(err){
        setfetcherr(err.message)
      }finally{
        setisloading(false)
      }
    }

    setTimeout(() => {
      (async () => await fetchItems()) ()
    },3000)
  },[])
  
  const addItem = async(item) => {
    const id = uuidv4();
    const addNewItem = {id, isChecked:false, item}
    const listItems = [...items, addNewItem];
    setItems(listItems);
    

    // API INTEGRATION

    const additem = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result =  await ApiIntegration(API_URL, additem)
    if(result) setfetcherr(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newItem) return;
    console.log(newItem)
    addItem(newItem)
    setNewItem('');
  }

  const [Search, SetSearch] = useState('')

  const handlechange = async (id, newItemName = null) => {
    const listItems = items.map((item) => {
      if (item.id === id) {
        if (newItemName) {
          return { ...item, item: newItemName };
        } else {
          return { ...item, isChecked: !item.isChecked };
        }
      }
      return item;
    });

    setItems(listItems);

    if (newItemName) {
      const myitem = listItems.find((item) => item.id === id);
      const updateitem = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: myitem.id, item: newItemName, isChecked: myitem.isChecked }),
      };

      const requesturl = `${API_URL}/${id}`;
      const result = await ApiIntegration(requesturl, updateitem);
      if (result) setfetcherr(result);
    } else {
      const myitem = listItems.find((item) => item.id === id);
      const updateitem = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: myitem.id, item: myitem.item, isChecked: myitem.isChecked }),
      };

      const requesturl = `${API_URL}/${id}`;
      const result = await ApiIntegration(requesturl, updateitem);
      if (result) setfetcherr(result);
    }
  };


  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    // API INTEGRATION
    const deleteitem = {
        method: 'DELETE',
    };

    const requesturl = `${API_URL}/${id}`;
    const result = await ApiIntegration(requesturl, deleteitem);
    if (result) setfetcherr(result);
  };

  return (
      <div className="App">
        <Header title="TO DO LIST" />
        <AddItem
          newItem = {newItem}
          setNewItem = {setNewItem}
          handleSubmit = {handleSubmit}
        />
        < SearchItem
          Search = {Search}
          SetSearch = {SetSearch}
        />
        <main>
          {isloading && <p>LODING ITEMS...</p>}
          {fetcherr && <p> {`Error: ${fetcherr}`} </p>}
          {!isloading && !fetcherr && <Content 
          items = {items.filter((item) => (item.item).toLowerCase().includes(Search.toLocaleLowerCase()))}
          setItems = {setItems}
          handleDelete = {handleDelete}
          handlechange = {handlechange}
          />}
        </main>
        <Footer
          length = {items.length}   
        />
      </div> 
    );
  }

export default App;