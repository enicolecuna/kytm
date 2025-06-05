import React, { useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import penIcon from '../assets/pencil.png';
import { useNavigate } from 'react-router-dom';



function Dashboard() {


  const [items, setItems]= useState([]);
  const navigate = useNavigate();
  const maxQuantity = items.length > 0 
  ? Math.max(...items.map(i => i.Quantity || 0))
  : 1;


    useEffect(()=>{
      const fetchItems =async ()=>{
        try{
          const res= await fetch('http://localhost:5000/api/products');
          const data =await res.json();
          setItems(data.products); 
        }catch(err){
          console.error('Error fetching items:', err);
          alert('Error fetching items: ' + err.message);
        }
      };
      fetchItems();// Fetch items when the component mounts meaning when the page loads
    },[]);
   /**  const [items, setItems] = useState([
        { id: 1, name: 'Box A', quantity: 20 },
        { id: 2, name: 'Box B', quantity: 5 },
        { id: 3, name: 'Box C', quantity: 12 },
    ]);**/
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredItems = items
    .filter( item => item.NameofProduct.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=> sortOrder === 'asc'
        ? a.NameofProduct.localeCompare(b.NameofProduct)
        : b.NameofProduct.localeCompare(a.NameofProduct));

    
  /**   const filteredItems = items
        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name));
**/
    return (
        <div className="dashboard-page">
        <Sidebar firstName="John" lastName="Doe" />
        <div className="dashboard-content">
            
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      
          <div className="sort-controls">
            <select className="category-dropdown">
              <option value="">All Categories </option>
              <option value="Box">Box</option>
            </select>
            <button onClick={() => setSortOrder('asc')}>Ascending</button>
            <button onClick={() => setSortOrder('desc')}>Descending</button>
            <button className="add-btn">＋ add item</button>
          </div>
          <div className="summary-panel">
  <div className="summary-grid">
    <div className="summary-item">
      <p className="summary-label"> Total Items</p>
      <p className="summary-value">{filteredItems.length}</p>
    </div>
    <div className="summary-item">
      <p className="summary-label"> Total Quantity</p>
      <p className="summary-value">{filteredItems.reduce((sum, i) => sum + (parseInt(i.Quantity) || 0), 0)}
      </p>
    </div>
    <div className="summary-item">
      <p className="summary-label"> Highest Qty</p>
      <p className="summary-value">{Math.max(...filteredItems.map(i => i.Quantity))}</p>
    </div>
  </div>
</div>
      
          <div className="dashboard-body">
            {/* Item List in the middle */}
            
            <div className="item-list">
              {

              filteredItems.map(item => (
                <div className="item-card" key={item._id}>
                  <img src={penIcon} alt="Edit" className="item-edit"  onClick={() => navigate(`/edit/${item._id}`)} />
                  
                  <div className="item-info">
                    <strong>{item.NameofProduct}</strong>

                    <div className="item-meta">
                      <span>Qty: {item.Quantity}</span>
                      <span>Category: {item.Category}</span>
                      <span>Weight: {item.Weight}</span>
                      <span>Price: ${item.Price}</span>
                    </div>

                    <div className="quantity-bar-wrapper">
                      <div className="quantity-bar-bg">
                        <div
                          className="quantity-bar-fill"
                          style={{
                            width: `${(item.Quantity / maxQuantity) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                
              ))
              
              }
              
            </div>
            
      
            {/* Summary Cards on the right */}
           
          </div>
          
        </div>
      </div>
      
    );
}

export default Dashboard;
