import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/api'

function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const token = localStorage.getItem('token');

  // console.log(JSON.parse(atob(token.split('.')[1])));
  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchProducts();
    fetchUsers();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/products', newProduct);
      setProducts([...products, res.data]);
      setNewProduct({ name: '', description: '', price: '', imageUrl: '', category: '', stock: '' });
      setShowProductForm(false);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, selectedProduct);
      setProducts(products.map((p) => (p._id === selectedProduct._id ? res.data : p)));
      closeModal();
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('/users', newUser);
      const res = await axios.post('http://localhost:5000/api/users', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, res.data]);
      setNewUser({ name: '', email: '', role: 'user' });
      setShowUserForm(false);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, selectedUser);
      const res = await axios.put(
        `http://localhost:5000/api/users/${selectedUser._id}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map((u) => (u._id === selectedUser._id ? res.data : u)));
      closeModal();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setSelectedUser(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 justify-center">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded ${
            activeTab === 'products' ? 'bg-green-600 text-white' : 'bg-white text-black border'
          }`}
        >
          Product List
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded ${
            activeTab === 'users' ? 'bg-green-600 text-white' : 'bg-white text-black border'
          }`}
        >
          User List
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product List</h2>
            <button
              onClick={() => setShowProductForm(!showProductForm)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {showProductForm ? 'Close Form' : 'Add Product'}
            </button>
          </div>

          {showProductForm && (
            <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border rounded"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full p-3 border rounded"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full p-3 border rounded"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-3 border rounded"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full p-3 border rounded"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Stock"
                className="w-full p-3 border rounded"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                required
              />
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
                Submit
              </button>
            </form>
          )}

          <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="py-2">{product.name}</td>
                    <td className="py-2">${product.price}</td>
                    <td className="py-2">{product.category}</td>
                    <td className="py-2 space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User List</h2>
            <button
              onClick={() => setShowUserForm(!showUserForm)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {showUserForm ? 'Close Form' : 'Add User'}
            </button>
          </div>

          {showUserForm && (
            <form onSubmit={handleAddUser} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border rounded"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
              <select
                className="w-full p-3 border rounded"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
                Add User
              </button>
            </form>
          )}

          <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.role}</td>
                    <td className="py-2 space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Edit Modal for Product/User */}
      {isEditModalOpen && (selectedProduct || selectedUser) && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50">
          <div className="bg-white resize p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{selectedProduct ? 'Edit Product' : 'Edit User'}</h3>
            <form
              onSubmit={selectedProduct ? handleSaveProduct : handleSaveUser}
              className="space-y-4"
            >
              {selectedProduct && (
                <>
                  <input
                    type="text"
                    value={selectedProduct.name}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                    placeholder="Product Name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                    placeholder="Description"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                    placeholder="Price"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    value={selectedProduct.imageUrl}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, imageUrl: e.target.value })}
                    placeholder="Image URL"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    value={selectedProduct.category}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    placeholder="Category"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="number"
                    value={selectedProduct.stock}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
                    placeholder="Stock"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </>
              )}

              {selectedUser && (
                <>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    placeholder="User Name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  >
                    <option value="user">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </>
              )}

              <div className="flex justify-between space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AdminPage() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     imageUrl: '',
//     category: '',
//     stock: ''
//   });
//   const [selectedProduct, setSelectedProduct] = useState(null); // To store the product being edited
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // To control modal visibility

//   const navigate = useNavigate();

//   // Fetch all products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products');
//         setProducts(response.data);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Handle adding new product
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/products', newProduct);
//       setProducts([...products, response.data]);
//       setNewProduct({
//         name: '',
//         description: '',
//         price: '',
//         imageUrl: '',
//         category: '',
//         stock: ''
//       });
//     } catch (err) {
//       console.error('Error adding product:', err);
//     }
//   };

//   // Handle deleting a product
//   const handleDeleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       setProducts(products.filter((product) => product._id !== id));
//     } catch (err) {
//       console.error('Error deleting product:', err);
//     }
//   };

//   // Open edit modal and set product data
//   const handleEditProduct = (product) => {
//     setSelectedProduct(product); // Set the product to be edited
//     setIsEditModalOpen(true); // Open the modal
//   };

//   // Handle closing the modal
//   const closeModal = () => {
//     setIsEditModalOpen(false);
//     setSelectedProduct(null); // Reset selected product
//   };

//   // Handle saving the edited product
//   const handleSaveProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, selectedProduct);
//       setProducts(products.map((product) => (product._id === selectedProduct._id ? response.data : product)));
//       closeModal(); // Close modal after saving
//     } catch (err) {
//       console.error('Error saving product:', err);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto p-8">
//         {/* Admin Page Content */}
//         <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
//         <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
//           <form onSubmit={handleAddProduct} className="space-y-4">
//             <input
//               type="text"
//               value={newProduct.name}
//               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//               placeholder="Product Name"
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//             <input
//               type="text"
//               value={newProduct.description}
//               onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//               placeholder="Description"
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//             <input
//               type="number"
//               value={newProduct.price}
//               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//               placeholder="Price"
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//             <input
//               type="text"
//               value={newProduct.imageUrl}
//               onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
//               placeholder="Image URL"
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//             <input
//               type="text"
//               value={newProduct.category}
//               onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//               placeholder="Category"
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//             <input
//               type="number"
//               value={newProduct.stock}
//               onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
//               placeholder="Stock"
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//             <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600">
//               Add Product
//             </button>
//           </form>
//         </div>

//         <h2 className="text-2xl font-semibold mb-4">Product List</h2>
//         <div className="bg-white p-6 shadow-lg rounded-lg">
//           <table className="w-full table-auto">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left">Name</th>
//                 <th className="px-4 py-2 text-left">Price</th>
//                 <th className="px-4 py-2 text-left">Category</th>
//                 <th className="px-4 py-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id} className="border-t">
//                   <td className="px-4 py-2">{product.name}</td>
//                   <td className="px-4 py-2">${product.price}</td>
//                   <td className="px-4 py-2">{product.category}</td>
//                   <td className="px-4 py-2 space-x-2">
//                     <button
//                       onClick={() => handleEditProduct(product)}
//                       className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteProduct(product._id)}
//                       className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Edit Product Modal */}
//       {isEditModalOpen && selectedProduct && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
//             <form onSubmit={handleSaveProduct} className="space-y-4">
//               <input
//                 type="text"
//                 value={selectedProduct.name}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
//                 placeholder="Product Name"
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 value={selectedProduct.description}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
//                 placeholder="Description"
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="number"
//                 value={selectedProduct.price}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
//                 placeholder="Price"
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 value={selectedProduct.imageUrl}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, imageUrl: e.target.value })}
//                 placeholder="Image URL"
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 value={selectedProduct.category}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
//                 placeholder="Category"
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="number"
//                 value={selectedProduct.stock}
//                 onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
//                 placeholder="Stock"
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <div className="flex justify-between space-x-2">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminPage;
