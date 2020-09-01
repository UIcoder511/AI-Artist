import React, { Component } from 'react'
import './orders.css'

class SingleOrder extends Component {
    render() {

        const{
            order:{
                orderId,
                // customerId,
                // artistId,
                price,
                aName,
                aEmail,
                aPic,
                contentImage,
                styleImage,
                stylizedImage,
                time,
                date,
                address:{
                    houseno,
                    addressline,
                    postalcode,
                    country,
                    state,
                    city
                }
            }
            

        }=this.props

        return (
            <div className='single-order-container'>
                <p className='order-no'>#{orderId}</p>
                <p className='date'>{date}</p>
                <p className='time'>{time}</p>

                <div className='o-a-data'>
                    <p className='o-a-title'>Artist</p>

                    <div className='o-a-profile'>
                        <img src={aPic} className='o-a-pic' />
                        <p className='o-a-name'>{aName}</p>
                    </div>
                   
                    
                    <p className='o-a-email'>{aEmail}</p>
                </div>


                <div className='o-images-container'>
                    <img className='o-pic' src={contentImage}/>
                    <img className='o-pic' src={styleImage}/>
                    <img className='o-pic' src={stylizedImage}/>
                </div>

                <p className='o-price'>{price}$</p>

                <div className='o-add-container'>
                    <p className='o-add-title'>Address</p>
                    <p className='o-add'>{houseno}, {addressline}, {city}, {state}, {country}-{postalcode}</p>
                </div>
                

            </div>
        )
    }
}

export default SingleOrder
