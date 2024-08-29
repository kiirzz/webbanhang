import React, { useState } from 'react'
import AdminRevenue from './Admin_route/Store/AdminRevenue';
import AdminOrders from './Admin_route/Store/AdminOrders';
import AdminGameList from './Admin_route/Game/AdminGameList';
import AdminAddGame from './Admin_route/Game/AdminAddGame';
import AdminUpdateGame from './Admin_route/Game/AdminUpdateGame';
import AdminDeleteGame from './Admin_route/Game/AdminDeleteGame';
import AdminAddUser from './Admin_route/User/AdminAddUser';
import AdminAdminList from './Admin_route/User/AdminAdminList';
import AdminUserList from './Admin_route/User/AdminUserList';
import AdminDeleteUser from './Admin_route/User/AdminDeleteUser';
import AdminUpdateAdmin from './Admin_route/User/AdminUpdateAdmin';
import AdminUpdateUser from './Admin_route/User/AdminUpdateUser';
import AdminPublisherList from './Admin_route/Publisher/AdminPublisherList';
import AdminAddPublisher from './Admin_route/Publisher/AdminAddPublisher';
import AdminUpdatePublisher from './Admin_route/Publisher/AdminUpdatePublisher';
import AdminDeletePublisher from './Admin_route/Publisher/AdminDeletePublisher';
import AdminCategoryList from './Admin_route/Category/AdminCategoryList';
import AdminAddCategory from './Admin_route/Category/AdminAddCategory';
import AdminUpdateCategory from './Admin_route/Category/AdminUpdateCategory';
import AdminDeleteCategory from './Admin_route/Category/AdminDeleteCategory';

const HomeAdmin = () => {
    const [activeLabel, setActiveLabel] = useState(null);

    const toggleSubList = (label) => {
        setActiveLabel(activeLabel === label ? null:label)
    }

    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item) => {
        setActiveItem(item);
    }

    return (
        <div className="admin">
            <div className="admin-menu">
                <div className="menu-line"></div>

                <div className="label" onClick={() => toggleSubList("Store")}>
                    <div className="admin-menu-title">Store</div>                                    
                </div>
                <div className={`sub-list ${activeLabel === "Store" ? "active":""}`}>
                    <div className={`admin-menu-element ${activeItem === <AdminRevenue /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminRevenue />)}>
                        Information
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminOrders /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminOrders />)}>
                        Orders
                    </div>
                </div>

                <div className="label" onClick={() => toggleSubList("Game")}>
                    <div className="admin-menu-title">Game</div>                                    
                </div>
                <div className={`sub-list ${activeLabel === "Game" ? "active":""}`}>
                    <div className={`admin-menu-element ${activeItem === <AdminGameList /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminGameList />)}>
                        Game list
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminAddGame /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminAddGame />)}>
                        Add game
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminUpdateGame /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminUpdateGame />)}>
                        Update game
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminDeleteGame /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminDeleteGame />)}>
                        Delete game
                    </div>
                </div>

                <div className="label" onClick={() => toggleSubList("User")}>
                    <div className="admin-menu-title">User</div>                    
                </div>
                <div className={`sub-list ${activeLabel === "User" ? "active":""}`}>
                    <div className={`admin-menu-element ${activeItem === <AdminAdminList /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminAdminList />)}>
                        Admin list
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminUpdateAdmin /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminUpdateAdmin />)}>
                        Update admin
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminUserList /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminUserList />)}>
                        User list
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminAddUser /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminAddUser />)}>
                        Add user
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminUpdateUser /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminUpdateUser />)}>
                        Update user
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminDeleteUser /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminDeleteUser />)}>
                        Delete user
                    </div>
                </div>

                <div className="label" onClick={() => toggleSubList("Publisher")}>
                    <div className="admin-menu-title">Publisher</div> 
                </div>
                <div className={`sub-list ${activeLabel === "Publisher" ? "active":""}`}>
                    <div className={`admin-menu-element ${activeItem === <AdminPublisherList /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminPublisherList />)}>
                        Publisher list
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminAddPublisher /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminAddPublisher />)}>
                        Add publisher
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminUpdatePublisher /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminUpdatePublisher />)}>
                        Update publisher
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminDeletePublisher /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminDeletePublisher />)}>
                        Delete publisher
                    </div>
                </div>

                <div className="label" onClick={() => toggleSubList("Category")}>
                    <div className="admin-menu-title">Category</div>     
                </div>
                <div className={`sub-list ${activeLabel === "Category" ? "active":""}`}>
                    <div className={`admin-menu-element ${activeItem === <AdminCategoryList /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminCategoryList />)}>
                        Category list
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminAddCategory /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminAddCategory />)}>
                        Add category
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminUpdateCategory /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminUpdateCategory />)}>
                        Update category
                    </div>
                    <div className={`admin-menu-element ${activeItem === <AdminDeleteCategory /> ? "element-active":""}`} onClick={() => handleItemClick(<AdminDeleteCategory />)}>
                        Delete category
                    </div>
                </div>
            </div>

            <div className="admin-content">
                {activeItem ?
                    (<div className="admin-content-inner">
                        <div className="">{activeItem}</div>
                    </div>)
                    : (<div className="admin-content-placeholder">
                        <p>Select an item from the menu to view its content.</p>
                    </div>)
                }
            </div>
        </div>        
    )
}

export default HomeAdmin