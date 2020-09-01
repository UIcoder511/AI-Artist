import React, { Component } from 'react'
//import * as mapquest from "mapquest";
//import LocationPicker from 'react-location-picker';
//import * as L from "leaflet";

import $ from "jquery";
import PaypalExpressBtn from 'react-paypal-express-checkout';
import fire from '../../config/fire';


/* Default position */
// const defaultPosition = {
//   lat: 27.9878,
//   lng: 86.9250
// };

// const options = {
//   provider: 'mapquest',
  
//   // Optional depending on the providers
//  // fetch: customFetchImplementation,
//   apiKey: 'T8BANGDI3yMxUeG5yCp3dI51OlMeXkyJ', // for Mapquest, OpenCage, Google Premier
//  // formatter: 'string' // 'gpx', 'string', ...
// };

// const geocoder = NodeGeocoder(options);

class AddressPicker extends Component {
  constructor (props) {
    super(props);

    this.state = {     
         lat: 38.890385,
         long:  -77.031989,
         address:{
           houseno:'',
           addressline:'',
           postalcode:null,
           country:null,
           state:null,
           city:null
         }
      
    };
    

    //nodegeocoder.
    
     
    

  }

  
 
  getLocation=()=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else { 
      // x.innerHTML = "Geolocation is not supported by this browser.";
    }
   

    // geocoder.reverse({lat:45.767, lon:4.833})
    //     .then(function(res) {
    //       console.log(res);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    

//    console.log(res)
  }

  showPosition=(position)=> {
  //  this.state.lat=position.coords.latitude;
    this.setState({
        long:position.coords.longitude,
        lat:position.coords.latitude
    })

     let url=`https://us1.locationiq.com/v1/reverse.php?key=4525c494c44769&lat=${this.state.lat}&lon=${this.state.long}&format=json`

    const settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET"
    }
    
    let x=this

    $.ajax(settings).done(function (response) {
      console.log(response);

      x.setState((prev)=>({
            
            address:{
              ...prev.address,
              postalcode:response.address.postcode,
              country:response.address.country,
              state:response.address.state,
              city:response.address.state_district

            }
      }))
    });
      
  }


  changehandler=(e)=>{
    e.persist()
    console.log(e)
    this.setState((prev)=>({
        address:
        {
          ...prev.address,
          [e.target.name]:e.target.value
        }
    })
    )
  }

  makeid=(length)=> {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


  
  uploadBase64Image=()=>{

    var here=this
    let orderId=this.makeid(7)
    var storageref=fire.storage().ref('stylizedOrders').child(orderId+'.jpg')

   

  var task = storageref.putString(here.props.stylizedBase64, 'data_url').then(function(snapshot) {
    console.log('Uploaded a base64 string!');
    storageref.getDownloadURL().then(function(url) {
      console.log(url)

      let user=fire.auth().currentUser;
      let cusId=user.uid
      let cusEmail=user.email
      let cusName=user.displayName
      let cusPic=user.photoURL




      let artId=here.props.styleImage.artistId

      let d=new Date();
      let time=d.getHours()+':'+d.getMinutes()
      let date=d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()

      let databaseref=fire.database().ref('Orders/'+orderId)//.child(orderId)
      
      databaseref.update({
          orderId:orderId,
          customerId:cusId,
          cusEmail:cusEmail,
          cusName:cusName,
          cusPic:cusPic,
          artistId:artId,
          aPic:here.props.styleImage.artistpic,
          aEmail:here.props.styleImage.artistemail,
          aName:here.props.styleImage.artistname,
          price:here.props.styleImage.price,
          contentImage:here.props.contentImage.url,
          styleImage:here.props.styleImage.url,
          stylizedImage:url,
          time:time,
          date:date,
          address:here.state.address
          


      })

      let cusDatabaseref=fire.database().ref('Users/Customer/'+cusId+'/Orders')
      let artDatabaseref=fire.database().ref('Users/Artist/'+artId+'/Orders')

      cusDatabaseref.update({
        [orderId]:orderId
      })

      artDatabaseref.update({
        [orderId]:orderId
      })

   }); 
    });


  }


  


  




  componentDidMount(){
      this.getLocation();

  }

  render () {

    console.log(this.state)


    /*************************************** paypal **************************/

          const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
                console.log("The payment was succeeded!", payment);
                
                this.uploadBase64Image();
                // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'CAD'; // or you can set this value from your props or state
        let total = parseInt(this.props.styleImage.price); 

        const client = {
          sandbox:    'Act4yff8i2sNs_cz2vd61pS1jbMzGehSR5nCyMaBfVAR1k4ms378CFmEoV2VlvyViI7JcIN5AZH1WAuY',
          //production: 'YOUR-PRODUCTION-APP-ID',
      }


  /********************************************************** */
      console.log(this.props)



    return (
      <div>
        <h1 style={{color:'#dd2600',fontSize:'20px',textAlign:'center'}}>Address</h1>
        <form style={{margin:'auto',display:'table'}}>
        <label htmlFor='houseno' className='orderlabels'>House No</label><br/>
        <input type='text' id='houseno' name='houseno' onChange={this.changehandler} value={this.state.address.houseno}
          style={{ width:' 40px'}} className='orderinputs'/>
        <br/><br/>
        <label htmlFor='addressline' className='orderlabels'>Address line</label><br/>
        <input type='text' id='addressline' name='addressline' onChange={this.changehandler} value={this.state.address.addressline}
         className='orderinputs'/>
        <br/><br/>
        {/* <label htmlFor='postalcode'>postal Code</label> */}
        {/* <input type='text' id='postalcode' name='postalcode' onChange={this.changehandler} value={this.state.address.postalcode}/> */}
        
        <label htmlFor='city' className='orderlabels'>City</label><br/>
        <input type='text' id='city' name='city' onChange={this.changehandler} value={this.state.address.city} className='orderinputs' style={{width: '100px',
    marginRight: '10px'}} />
        
        {/* <label htmlFor='postalcode' className='orderlabels'>postalCode</label> */}
        <input type='text' id='postalcode' name='postalcode' onChange={this.changehandler} value={this.state.address.postalcode}  
           className='orderinputs' style={{width: '70px'}}/>
        <br/><br/>
        <label htmlFor='state' className='orderlabels'>State</label><br/>
        <input type='text' id='state' name='state' onChange={this.changehandler} value={this.state.address.state} 
           className='orderinputs'/>
        <br/><br/>
        <label htmlFor='country' className='orderlabels'>Country</label><br/>
        <input type='text' id='country' name='country' onChange={this.changehandler} value={this.state.address.country}  
             className='orderinputs'/>
        <br/><br/>

        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        
        </form>
        
        
        
      </div>
    )
  }
}



export default AddressPicker
