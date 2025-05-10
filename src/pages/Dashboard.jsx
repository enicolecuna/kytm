import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import penIcon from '../assets/pencil.png';

function Dashboard() {
    const [items, setItems] = useState([
        { id: 1, name: 'Box A', quantity: 20 },
        { id: 2, name: 'Box B', quantity: 5 },
        { id: 3, name: 'Box C', quantity: 12 },
    ]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredItems = items
        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name));

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
                        {/* More options can be added dynamically later */}
                    </select>
                    <button onClick={() => setSortOrder('asc')}>Ascending</button>
                    <button onClick={() => setSortOrder('desc')}>Descending</button>
                    <button className="add-btn">＋ add item</button>
                </div>

                <div className="item-list">
                    {filteredItems.map(item => (
                        <div className="item-card" key={item.id}>
                            <img src={penIcon} alt="Edit" className="item-edit" />

                            <div className="item-info">
                                <strong>{item.name}</strong>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
