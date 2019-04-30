/* Miriam Schnoll Narrativ Front End Excerises*/


function Smartlink(ID, element){
	this.ID = ID;
	this.element = element;
}
	Smartlink.prototype.validAuctionId = function(){ 
		return !isNaN(this.ID);
		
	}

	//function returns a promise 

	Smartlink.prototype.runAuction = function(){
    	return new Promise(function(resolve, reject) {
   				resolve( {
 					 data: {
    					destination_url: 'http://merchant.example/product/1',
    					merchant_name: 'Sephora',
    					product_name: 'Highlighter brush',
    					price: '15.89',
  					}
				});
            });
         
 }



	Smartlink.prototype.rewriteLink = function(URL,linkText){
		//with parent dom update text
		//and link text
		this.element.href = URL;
		this.element.innerText = linkText;

	}


 
 function Jstag (){
 	//array to store links
 	this.smartlinks = [];
 		findAllSmartlinks = new function(){
 		//only do after page loads
		document.addEventListener('DOMContentLoaded', (event) => {
		//create a smart link
		var  listlinks = document.links;

		for (var i=0;i<listlinks.length;i++){

			//get the id	
			var lastPart = listlinks[i].href.split("/").pop();
			//create a new smart link
  			var link = new Smartlink(lastPart,listlinks[i]);
  			
  			//if valid link push to array to be updated later
  			if(link.validAuctionId())
  				smartlinks.push(link);
  			

		}
		})
 	}
 	runAllSmartlinks = new function(){
 		document.addEventListener('DOMContentLoaded', (event) => {
 		smartlinks.forEach(function(item){
 			//get valid smart links and update data
 			// for valid ids 
 			
 			item.runAuction().then((result) => {
 				//console.log(result.data);
 				var URL = result.data.destination_url;
 				var linkText = `${result.data.product_name }, $${ result.data.price } at ${result.data.merchant_name }`;
 				
 				//pass data to update links
 				item.rewriteLink(URL,linkText);


 			});
 			});	
 		})
 				

 		}
 	
 	this.findAllSmartlinks;
 	this.runAllSmartlinks;

 }

 Jstag();


 


