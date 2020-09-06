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
                cusName,
                cusEmail,
                cusPic,
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
            },
            loggedinCustomer
            

        }=this.props


        var name,pic,email,title;

        if(!loggedinCustomer)
        {
            name=cusName;
            email=cusEmail;
            title='Customer';
            pic=cusPic;
        }
        else{
            name=aName;
            email=aEmail;
            title='Artist';
            pic=aPic;

        }

        return (
            <div className='single-order-container'>
                
                <p className='date'>{date}</p>
                <p className='order-no'>#{orderId}</p>
                <p className='time'>{time}</p>

                <div className='o-a-data'>
                    <p className='o-a-title'>{title} </p>

                    <div className='o-a-profile'>
                        <img src={pic} className='o-a-pic' />
                        <p className='o-a-name'>{name}</p>
                    </div>
                   
                    
                    <p className='o-a-email'>{email}</p>
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
