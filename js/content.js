let current_url = window.location.href;
let activate = current_url.includes( 'google.com/search' ) || current_url.includes( 'bing.com/search' ) ||
    current_url.includes( 'duckduckgo.com' ) || current_url.includes( 'search.yahoo.com' );

console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

// activate && filtered_words !== undefined && filtered_words.length > 0 

if (true) {
    let dom_elements = document.getElementsByTagName("p")
    console.log("dom_element", dom_elements)
    var text = ""
    for ( const word of dom_elements ) {
        text += word.innerHTML
    }
    console.log("teexxxt:", text)
    chrome.runtime.sendMessage({message: "my_request", data : text}, function(response) {
        console.log(response);
        console.log(typeof response)
        html_page(response)
        
    });
    function html_page(response){
        const authentic = "green";
        const fake = "red";
        var color = ""
        var content = ""
        if (response == "fake") {
            color = fake;
            content = "from a real source."
        }
        else if ((response == "real" || response == "true")) {
            color = authentic;
            content = "from an untrusted source."
        }
        else {
            response = "Neutral";
            color = "#fff"
            content = "from an Unknown source"
        }
        let html = ``
        html += `<span class='cancel'>&times;</span>`
        html += `
            <section class="popup spacing">
                <div class="top_alert">
                    <section class="top_alert_content flex">
                        <i class="bi bi-exclamation-triangle fs-3" style="color: #fff;"></i>
                        <h4 class="fs--3">Misinformation alert</h4>
                    </section>

                </div>
                <section class="header">
                    <h1 class="fs--1">News Authenticity: <span class="response" style= " color: ${color}">${response}<span></h1>
                </section>

                <section class="main">
                    <p class="fs--2">Our algorithm label this news comming 
                        ${content}</p>
                </section>
                
                <section class="footer">
                    <p class="fs--3">Newser</p>
                </section>
            </section>
        `

        $( 'body' ).append( "<div class='content--container'>" + html + "</div>" );

        $( '.content--container .cancel' ).on( 'click', function () {
            $( '.content--container' ).hide();
        } );
    }
    
    $( '.content--container .cancel' ).on( 'click', function () {
        $( '.content--container' ).hide();
    } );
}

$( '.content--container .cancel' ).on( 'click', function () {
    $( '.content--container' ).hide();
} );
