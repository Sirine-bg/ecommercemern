import React, {useState, useContext, useEffect} from 'react'
 import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [cart, setCart] = state.userAPI.cart
    const addCart = state.userAPI.addCart

    console.log(cart)

    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])
   
    const [payement, setPayement] = useState({name:'', email:'', adress: '', phone: '',  cart: cart })
    console.log(payement)
    // const removeProduct = id =>{
    //         cart.forEach((item, index) => {
    //             if(item._id === id){
    //                 cart.splice(index, 1)
    //             }
    //         })
      
    //         // setCart([...cart])
    //         // addToCart(cart)
        
    //   }
    const onChangeInput = e =>{
        const {name, value} = e.target;
        setPayement({...payement, [name]:value})
    }
    const handleChange=()=>setCart({...cart, [cart.etat]:"Confirmed"});
     
    const paymentSubmit = async e =>{
        // cart.splice(0,cart.length)

        // console.log(cart.length)

        e.preventDefault()
        try {
            // cart.forEach((item) => {
            //         cart.splice(0, cart.length)
                
            // })
            await axios.post('/api/payment', {...payement})
            alert("Thank you for your purchase")
            
             window.location.href = "/";

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="payementPage">
            <form onSubmit={paymentSubmit}>

            <h2>Name </h2>
                <input type="text" name="name" required
                placeholder="Enter your name" value={payement.name} onChange={onChangeInput} />

                 <h2>Email</h2>
                <input type="email" name="email" required
                placeholder="Email" value={payement.email} onChange={onChangeInput} />

              <h2>Phone number </h2>
                <input type="text" name="phone" required
                placeholder="Enter your phone number " value={payement.phone} onChange={onChangeInput} />


                <h2>Address</h2>
                <input type="text" name="adress" required
                placeholder="Adress" value={payement.adress} onChange={onChangeInput} />
                         
       <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th> Product Images</th>
                        <th>Products name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        

                    </tr>
                </thead>
                <tbody>
                    {
                      cart.map(item =>(
                        <tr key={item._id}>
                            <td><img  style={{ width: "70px",   border: "1px solid #ddd"}} src={item.images.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td> {item.price * item.quantity} dt </td>
                           


                        </tr>
                        ))}
               
                    
                </tbody>
            </table>
              
                <div className="row">
                    <button type="submit"onClick={{handleChange}} >Confirm my order</button>
                   
                </div> 
            </form>
           
        </div>
    )

   

   
}

 export default OrderDetails
