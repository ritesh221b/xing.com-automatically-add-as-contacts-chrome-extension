
		function clickOnInviteButtons(){

			var timeAfter = 0;
			let buttons = $('button[data-qa="member-card-add-contact"]');
			buttons.each(function(i, e){
				timeAfter = timeAfter + 6000;
				console.log(i);
				console.log("Time is :"+timeAfter);

				setTimeout(function(){
					$(e).click();	
					console.log("Clicking each at "+timeAfter);

					setTimeout(r=>{
						enterText();

						setTimeout(r=>{
							clickSubmitButton();
						},1000); // Submit Form

					},3000);//Enter Text

				},timeAfter);
			});

		} 

		function enterText(){
			$("#contact-request-lightbox").contents().find("textarea").val("Hello there add me!");
			return $('#contacts_app-contact-request-lightbox>form>div>textarea[name="reason"]').length
		}

		function clickSubmitButton(){
			$("#contact-request-lightbox").contents().find('.element-form-button-solid-lime')[0].click();
		}

		function gotoNextPage(){
			$('nav>ol>li').last().show()
		}


	// ------------------ Chrome Run Time Listner --------------------------
	chrome.runtime.onMessage.addListener(function (fromPopup) {

		if (fromPopup.action == 'sendInvite') {		
			clickOnInviteButtons()
		}


	});