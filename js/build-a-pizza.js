// Jquery document ready function
$(document).ready(function() {

	// Calling function which gives all items a price attribute regardless of the amount of items we are dealing with
	givePriceAttribute();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Filter selector click function
	$("li.categories-list__item").click(function(){
		// This variable stores the lower case text value of the clicked filter
		var filterName = $(this).text().toLowerCase();
		// Conditional to check if the clicked filter has an active (bold) class associated with it
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			// Returns the clicked filter back to its original styling with a non-linear easing animation
			if($(this).hasClass("" + filterName)){
				$("h3[item-type='"+ filterName +"']").animate({
		    		backgroundColor: "rgba(0, 0, 0, 0.4)",
		    		color: "ff",
		  		}, 1000, "easeInCubic");
			}
		// If the clicked filter does not have the active class, the active class will be added
		} else {
			$(this).addClass("active");
			// Based on the type of filter being clicked, appropriate styling will be applied with a non-linear easing animation
			if($(this).hasClass("vegetarian")){
				$("h3[item-type='vegetarian']").animate({
		    		backgroundColor: "#32CD32",
		    		color: "ff",
		  		}, 1000, "easeOutCubic");
			}

			if($(this).hasClass("meat")){
				$("h3[item-type='meat']").animate({
		    		backgroundColor: "#A52A2A",
		    		color: "ff",
		  		}, 1000, "easeOutCubic");
			}

			if($(this).hasClass("seafood")){
				$("h3[item-type='seafood']").animate({
		    		backgroundColor: "#FF8C69",
		    		color: "ff",
		  		}, 1000, "easeOutCubic");
			}

		}

	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Clear all button click function
	$(".clearall").click(function(){

		// Removes active class (bold) from all filter list items
		$("li.categories-list__item").removeClass("active");
		// Returns all clicked filters back to their original styling with a non-linear easing animation
		$("li h3").animate({
		    backgroundColor: "rgba(0, 0, 0, 0.4)",
		    color: "ff",
		}, 1000, "easeInCubic");

	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Incrementing the text value of the specific shopping cart item
	$("ul.cart-list").on("click", "span.fa.fa-plus", function(){
		// Storing the required item, whether it be dough or sauce, into a variable
		var reqItem = $(this).parent().siblings("img").attr("reqitem");
		// Storing the text value amount of a particular item into a variable
		var itemAmount = $(this).next().text();
		// Conditional to only increment an amount of particular item, if it is not one of the required items, as to limit the amount of dough and sauce to 1
		if(!reqItem){
			// Increments the amount of a particular item
			itemAmount++
		 	// Storing the itemAmount variable back into the text of item amount text value of a particular item
			$(this).next().text(itemAmount);

			// Storing the price of the item in a variable
			var imageClass = $(this).parent().siblings("img").attr("class").replace("cart-list__item-image", "");

			var itemCost = $("img.toppings-list__item-image." + imageClass).siblings(".toppings-list__item-price").attr("price").replace("$", "");

			// Storing the returned value of the called calcItem function where itemCost and itemAmount are used as arguments
			var totalItemCost = calcItem(itemCost, itemAmount);

			// Setting the text of the cart item price to equal the total cost
			$(this).parent().siblings("span.cart-list__item-price").text("$" + totalItemCost);

		};

		// Recalculate cart totals
		calcCart();

	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Decrementing the text value of the specific shopping cart item
	$("ul.cart-list").on("click", "span.fa.fa-minus", function(){

		var itemAmount = $(this).prev().text();

		// Conditional to stop decrementing the item amount variable as to avoid negative values
		if(itemAmount != 0){
			itemAmount--
		};

		// Removing the list item from the cart and pie at a glance container if the item amount hits zero
		if(itemAmount == 0){
			$(this).parent().parent("li.cart-list__item").slideUp("fast", function(){
				$(this).remove();
				// Recalculate cart totals
				calcCart();
			});

			var garbImg = $(this).parent().siblings("img").attr("class").replace("cart-list__item-image","");

			$(".glance." + garbImg).remove();
			$("." + garbImg).siblings(".addtocart").removeClass("discard");
			$("." + garbImg).siblings(".addtocart").attr("title", "Add to Cart"); // attr
		};

		// Using the .prev() method to go back to the previous (counter) element
		$(this).prev().text(itemAmount);

		var imageClass = $(this).parent().siblings("img").attr("class").replace("cart-list__item-image", "");

		var itemCost = $("img.toppings-list__item-image." + imageClass).siblings(".toppings-list__item-price").attr("price").replace("$", "");
		// Placing the returned value of the calcItem function into a variable
		var totalItemCost = calcItem(itemCost, itemAmount);
		// Using the totalItemCost variable to replace the total cost of a particular cart item
		$(this).parent().siblings("span.cart-list__item-price").text("$" + totalItemCost);

		// Recalculate cart totals
		calcCart();

	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Checkout selector
	$("div.button").click(function(){

		// Identifying the shopping cart total and storing it in a variable to be used within the alert below
		var cartTotal = $(".carttotal").text();

		// Checks if required Dough and required Sauce are within the shopping cart before succesfully ordering pizza
		// The conditional breaks down the requirements, so that the user receives specific alerts that tell them exactly what they are missing
		if(($("img[reqitem='reqDough']").length == 1) && ($("img[reqitem='reqSauce']").length == 1)){
			alert("Your order is on the way! Your Total Is " + cartTotal);
		} else if($("img[reqitem='reqDough']").length == 1){
			alert("Your Pizza Requires Sauce. Please Try Again!");
		} else if($("img[reqitem='reqSauce']").length == 1){
			alert("Your Pizza Requires Dough. Please Try Again!");
		} else {
			alert("Your Pizza Requires Dough & Sauce. Please Try Again!");
		};

	});

	// Function to animate the checkout button once required sauce and required dough are in the cart
	function animateCheckoutButton(){
		// Conditional to check if the required dough and the required sauce are in the cart already
		if(($("img[reqitem='reqDough']").length == 1) && ($("img[reqitem='reqSauce']").length == 1)){
			// Animation on the div button which fades styling in and out over 3s
			$("div.button").animate({
		    	backgroundColor: "#ff6347",
		    	color: "ff",
		  	}, 1500, function(){
		  	$(this).animate({
		  		backgroundColor: "#ffef9c",
		  		color: "#a52a2a",
		  	}, 1500);
		  	});

			};

	};

	// Using the set interval function call the animateCheckoutButton function every 10s
	setInterval(animateCheckoutButton, 10000);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Garbage bin icon selector
	$("ul.cart-list").on("click", ".trashbin", function(){
		// Storing the particular image class that is shared between the "pie at a glance" section item, and the cart list
		var garbImg = $(this).siblings("img").attr("class").replace("cart-list__item-image","");

		// Removing the corresponding "pie at a glance" section item
		$(".glance." + garbImg).remove();
		// Ensuring that the discard class is removed from the ingredient item, as to indicate it is not longer in the cart, and can now be re-added to the cart
		$("." + garbImg).siblings(".addtocart").removeClass("discard");
		$("." + garbImg).siblings(".addtocart").attr("title", "Add to Cart"); // attr
		// Using a slideUp animation to remove a particular cart item
		$(this).parent().slideUp("fast", function(){
			$(this).remove();
			// Recalculate cart totals
			calcCart();
		});

	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Shopping cart add to cart selector
	$(".addtocart").click(function(){

	var mainSelector = $(this);
	var toppingIcon = mainSelector.siblings("img");
	var imageSource = mainSelector.siblings("img").attr("src");
	var imageClassOnly = mainSelector.siblings("img").attr("class");
	var imageClass = mainSelector.siblings("img").attr("class").replace("toppings","cart");
	var onlyImageName = mainSelector.siblings("img").attr("class").replace("toppings-list__item-image","");
	var itemPrice = mainSelector.siblings("span.toppings-list__item-price").text();
	var itemName = mainSelector.siblings("h3.toppings-list__item-name").text();

		if($(this).hasClass("discard")){
			$(this).removeClass("discard");
			$(this).attr("title", "Add to Cart"); // attr
			$(".glance." + onlyImageName).remove();

			$(".cart-list__item-image." + onlyImageName).parent().slideUp("fast", function(){
				$(this).remove();
				// Recalculate cart totals
				calcCart();
			});

		} else {

			// Storing the returned value of the checkCart function into a variable called inCartAlready, which is true if the item is already in the cart
			var inCartAlready = checkCart(onlyImageName);

			// Storing the length (or amount of the particular) item into two variables entitled reqDoughAmount and reqSauceAmount
			var reqDoughAmount = $("img[reqitem='reqDough']").length;
			var reqSauceAmount = $("img[reqitem='reqSauce']").length;

			// Can be considered to be the parent conditional that ensures that any particular item selectd, isn't already in the cart
			if(!inCartAlready){
				// As a secondary measure, all the scenarios are put in place to ensure that only one dough and one sauce can be selected and placed in the cart
				if(reqDoughAmount < 1 && reqSauceAmount < 1){
					// When any of the conditions below are met, the addToAll (meaning both the "pie at a glance" and "cart" sections) function is called to create these items in the respective areas
					addToAll(mainSelector, toppingIcon, imageClass, imageSource, itemName, itemPrice, onlyImageName);
				} else if (reqDoughAmount == 1 && reqSauceAmount == 0 && (!(itemName.includes("Dough")) && ((itemName.includes("Sauce")) && (itemName.includes("Base"))))){
					addToAll(mainSelector, toppingIcon, imageClass, imageSource, itemName, itemPrice, onlyImageName);
				} else if (reqDoughAmount == 0 && reqSauceAmount == 1 && (!(itemName.includes("Sauce")) && !(itemName.includes("Base")) && (itemName.includes("Dough")))){
					addToAll(mainSelector, toppingIcon, imageClass, imageSource, itemName, itemPrice, onlyImageName);
				} else if (reqDoughAmount == 1 && reqSauceAmount == 1 && (!(itemName.includes("Sauce")) && !(itemName.includes("Base")) && !(itemName.includes("Dough")))){
					addToAll(mainSelector, toppingIcon, imageClass, imageSource, itemName, itemPrice, onlyImageName);
				} else if (reqDoughAmount == 0 && reqSauceAmount == 0 && ((itemName.includes("Sauce")) && (itemName.includes("Base")) && (itemName.includes("Dough")))){
					addToAll(mainSelector, toppingIcon, imageClass, imageSource, itemName, itemPrice, onlyImageName);
				} else if (reqDoughAmount == 1 && reqSauceAmount == 0 && (!(itemName.includes("Dough")))){
					addToAll(mainSelector, toppingIcon, imageClass, imageSource, itemName, itemPrice, onlyImageName);
				} else if (reqDoughAmount == 0 && reqSauceAmount == 1 && (!(itemName.includes("Sauce")) && !(itemName.includes("Base")))){
					addToAll(mainSelector, toppingIcon, imageClass, imageSource, itemName, itemPrice, onlyImageName);
				};

			};

		};

	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Functions being called via click functions above */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to add the item in the pie at a glance showcase and in the cart only if it meets all the criteria
function addToAll(selectorMain, iconTopping, classImage, sourceImage, nameItem, priceItem, nameImageOnly){

	selectorMain.addClass("discard");
	selectorMain.attr("title", "Remove from Cart"); // attr

	// Cloning the image of the topping to append to the 'pie at a glance' container
	iconTopping.clone().appendTo("div.box.pizza ul.toppings-list").addClass("glance");

	$("ul.cart-list").prepend("<li class='cart-list__item cf'><div class='cart-list__item-counter'><span class='fa fa-plus'></span><span class='cart-list__item-counter-quantity'>1</span><span class='fa fa-minus'></span></div><img class='" + classImage +"' src='"+  sourceImage  +"'><span class='cart-list__item-name'>" + nameItem + "</span><span class='cart-list__item-price'>" + priceItem + "</span><span class='cart-list__item-discard discard-from-cart fa fa-lg fa-trash trashbin'></span></li>");

	// Recalculate cart totals
	calcCart();
	// Conditional to add the reqitem attribute to the cart list item, and give it a reqDough value, but only if the name of the item includes the word Dough
	if(nameItem.includes("Dough")){
		$(".cart-list__item-image." + nameImageOnly).attr("reqitem", "reqDough");
	};

	// Conditional to add the reqitem attribute to the cart list item, and give it a reqSauce value, but only if the name of the item includes the words Sauce or Base (for the Oil Base item specifically)
	if((nameItem.includes("Sauce")) || (nameItem.includes("Base"))){
		$(".cart-list__item-image." + nameImageOnly).attr("reqitem", "reqSauce");
	};

};

// Function to recalculate the total of an individual item in the cart
function calcItem(costItem, amountItem){

	var costTotalItem = costItem * amountItem;

	return costTotalItem;

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to recalculate the total of the entire cart, which is called every time there is a change (plus, minus, garbage, or .addtocart icons clicked)
	function calcCart(){

		var subTotal = 0;
		var taxTotal = 0;
		var cartTotal = 0;
		var taxrate = 0.13;

		var cartStuff = $("span.cart-list__item-price");
		// As the length (or amount of) cart items keeps changing, we have a for loop to consider all of those items in the frequently updating cart when calculating our totals
		for (i = 0; i < cartStuff.length; i++) { 

    		var cartEntry = parseFloat(cartStuff.eq(i).text().replace("$", ""));

    		subTotal += cartEntry;
    		$(".subtotal").text("$" + subTotal);
    		taxTotal = subTotal * 0.13;
			$(".taxes").text("$" + taxTotal);
			cartTotal = subTotal + taxTotal;
			$(".carttotal").text("$" + cartTotal);

		};

		// If the array of cart items has come to an end the default text should be set back to $0.00
		if(cartStuff.length < 1){
			$(".subtotal").text("$0.00");
			$(".taxes").text("$0.00");
			$(".carttotal").text("$0.00");
		};

	};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to check if item is already in cart to avoid redundancy of multiple items in the cart, when the user can simply select the plus button
	function checkCart(className){
		// Conditional to check if the amount of cart lists items with a particular item's name exceeds the value of 1
		if($("img.cart-list__item-image." + className).length >= 1){
			// checkCart function returns true to indiciate the particular item is already in the cart
			var alreadyInCart = true;
			return alreadyInCart;
		};

	};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to give each ingredient item a price attribute, which is called at the beginning of the script
	function givePriceAttribute(){
		// Storing the value of the selector we are looking for into a variable called itemArray
		var itemArray = $("span.toppings-list__item-price");
		// For each item in the itemArray, we are going to give it a price attribute and a value of its corresponding price text
		for (i = 0; i < itemArray.length; i++){
			var rawItemPrice = itemArray.eq(i).text();
			$("span.toppings-list__item-price").eq(i).attr("price", rawItemPrice);
		};

	};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});






