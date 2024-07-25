import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ref, set } from '../Authentication/firebase.js';
import { db } from '../Authentication/firebase.js'; // Adjust path as necessary
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../styles/AddToCart.css'

const AddToCart = () => {
  const { productId } = useParams();
  const location = useLocation();
  const state = location.state?.item; // Get item data from location state
  const products = useSelector((state) => state.products.items);
  const product = products.find((item) => item.id === parseInt(productId));
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(state?.quantity || 1);
  const [color, setColor] = useState(state?.color || product?.colour || '');

  const [mainImageUrl, setMainImageUrl] = useState(product?.imageUrl);
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setQuantity(state.quantity);
      setColor(state.color);
    }
  }, [state]);

  if (!product && !state) {
    return <p>Product not found.</p>;
  }
  const handleAddToCart = () => {
    if (user.isAuthenticated) {
      // Debugging logs
      console.log('Product:', product);
      console.log('State:', state);
      
      const itemPrice = product?.price.current.text || state.price;
      const itemQuantity = quantity; // Ensure quantity is an integer

      const itemPriceNumber = parseFloat(itemPrice.replace(/[^\d.-]/g, '')); // Remove non-numeric characters
      const itemQuantityNumber = Number(itemQuantity);

      const totalPrice = itemPriceNumber * itemQuantityNumber;

    
      


      // More debugging logs
      console.log('Item Price:', itemPrice);
      console.log('Item Quantity:', itemQuantity);
      console.log('Total Price:', totalPrice);
      console.log('Color ',color)

      const cartItem = {
        productId,
        name: product?.name || state?.name || 'Unnamed Product',
         price: itemPrice,
         imageUrl: product?.imageUrl || state.imageUrl,

        color,
        quantity: itemQuantity,
        totalPrice:totalPrice // Calculate totalPrice
      };

      const cartRef = ref(db, `carts/${user.uid}/${productId}`);
      set(cartRef, cartItem)
        .then(() => {
          navigate('/cart');
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        });
    } else {
      navigate('/login');
    }
  };
  const additionalImageUrls = [
    product.imageUrl,
    ...product.additionalImageUrls
  ];
  


  return (
    <>
    <Navbar />
    
    <div className="main-container">
        <div className="w-full p-6">
          <div className="flex flex-col md:flex-row gap-6 product-description-container">
            {/* Left Side Images */}
            <div className="image-container">
              {additionalImageUrls.map((url, index) => (
                <img
                  key={index}
                  className="small-image"
                  src={`https://${url}`}
                  alt={`${product.name} ${index}`}
                  onClick={() => setMainImageUrl(url)}
                  onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Add a placeholder image if needed
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full md:w-1/2">
              <img
                className="main-image"
                src={`https://${mainImageUrl}`}
                alt={product.name}
                onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Add a placeholder image if needed
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 product-details">
              <h2 className="text-3xl font-bold mb-4 product-name">{product.name}</h2>
              <div className="details-container flex flex-wrap text-lg mb-4">
                <p className="text-gray-700 mr-4">Price: <span className="font-semibold text-500">{product.price.current.text}</span></p>
                <p className="text-gray-500 mr-4">Brand: <span className="font-semibold text-500">{product.brandName}</span></p>
                <p className="text-gray-500 mr-4">Color: <span className="font-semibold text-500">{product.colour}</span></p>
                <p className="text-gray-500">Product Code: <span className="font-semibold text-500">{product.productCode}</span></p>
              </div>
              
              {/* Product Description Section */}
              <div className="mb-6 product-description">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-gray-600">
                  Condition: New with tags: A brand-new, unused, and unworn item
                </p>
                <p className="text-gray-600">Country/Region of Manufacture: China</p>
                <p className="text-gray-600">Department: Men</p>
                <p className="text-gray-600">Material: Polyester</p>
                <p className="text-gray-600">MPN: Does not apply</p>
                <p className="text-gray-600">Size Type: Regular</p>
                <p className="text-gray-600">Theme: Classic</p>
                <p className="text-gray-600">Vintage: No</p>
              </div>


  
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="quantity" className="block mb-2 ">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded p-2 w-full quantity-input"
          />
 <label htmlFor="color" className="block mb-2 ">Color</label>
<select 
  id="color"
  value={color} // Ensure this reflects the selected value
  onChange={(e) => setColor(e.target.value)}
  className="border border-gray-300 rounded p-2 w-full color-input"
>
  {/* Make sure to use product.colour to create the option */}
  <option value={product.colour}>{product.colour}</option>
</select>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded " style={{fontSize:'20px',backgroundColor:'#232f3e'
          }}
          onClick={handleAddToCart}
        >
      {state ? 'Update Cart' : 'Add to '}
      <ShoppingCartOutlinedIcon sx={{ fontSize: 32 }} />
  
        </button>
      </div>

            </div>
          </div>
        </div>
      </div>
    
        <Footer/>
    </>
  );
};

export default AddToCart;
