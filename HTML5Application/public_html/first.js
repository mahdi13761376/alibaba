$(document).ready(function(){
    request("istanbul");
    function request(event){
        console.log("salam ");
        if(event.data!== undefined)
            city = event.data.city;
        else 
            city = event;
        active_badge(city);
        url = "http:\/\/37.152.185.50:8080\/hotels\/" + city;
        $.ajax({ type: 'GET',
                crossDomain: true,
                headers: {'Content-Type': 'application/json'},
                url: url  
                ,success: function(result){   
                 console.log(result);
                 fill_hotels(result);
                 

                },
                error: function(xhr, status, error) {
                    alert(status);
}
        });
    }
    $("#istanbul-badge").on("click",{
        city : "istanbul"}
    ,request   
    );
    $("#baku-badge").on("click",{
        city : "baku"}
    ,request   
    );
    $("#dubai-badge").on("click",{
        city : "dubai"}
    ,request   
    );
    $("#paris-badge").on("click",{
        city : "paris"}
    ,request   
    ); 
    $("#ankara-badge").on("click",{
        city : "ankara"}
    ,request   
    );  
    $("#teflis-badge").on("click",{
        city : "tblisi"}
    ,request   
    );       
    
    function fill_hotels(hotels){
        $("#hotel_cards_container").empty();
        $.each(hotels, function(i, item) {
             url = "hotel.html?id=" + item._id;
             hotel_item="<div class='hotel-card-container'><div class='hotel-card'><a href='" + url + "'><div  class='hotel-card-image' ";
             hotel_item+= "style=\"background-image: url(" + "'" + item.image +"'"+")\"";
             console.log("style=\"background-image: url(" + "'" + item.image +"'"+")\"");
             hotel_item +="<div class='hotel-card-image-overly'></div></div><div class='hotel-card-content'><div class='hotel-card-title'><p class='hotel-name'>";
             hotel_item+=item.name;
             hotel_item+="</p> <div class='stars'>";
             fill_stars = item.stars;
             other_stars = 5-fill_stars;
             for (i=0; i< fill_stars;i++){
                 hotel_item+="<i class='fa fa-star' style='color: gold'></i>";
             }
             for (i=0; i< other_stars;i++){
                 hotel_item+="<i class='fa fa-star' style='color: transparent'></i>";
             }
             hotel_item += "</div></div> <hr> <div  class='hotel-card-links'> <div><div class='price-container-1'>شروع قیمت از </div>";
             hotel_item+="<strong  class='price-container-2'>";
             hotel_item+=item.price;
             hotel_item+=" ریال";
             hotel_item+="</strong></div><button class='hotel-card-buttun'>مشاهده و رزرو</button>  </div> </div>  </a>  </div></div>";
             $("#hotel_cards_container").prepend(hotel_item);
        });
    }
    
    function active_badge(city){
        switch(city){
            case 'istanbul':
                $("#istanbul-badge").addClass("active_badge");
                $("#dubai-badge").removeClass("active_badge");
                $("#paris-badge").removeClass("active_badge");
                $("#ankara-badge").removeClass("active_badge");
                $("#baku-badge").removeClass("active_badge");
                $("#teflis-badge").removeClass("active_badge");
                break;
            case 'dubai':
                $("#istanbul-badge").removeClass("active_badge");
                $("#dubai-badge").addClass("active_badge");
                $("#paris-badge").removeClass("active_badge");
                $("#ankara-badge").removeClass("active_badge");
                $("#baku-badge").removeClass("active_badge");
                $("#teflis-badge").removeClass("active_badge");
                break;
             case 'paris':
                $("#istanbul-badge").removeClass("active_badge");
                $("#dubai-badge").removeClass("active_badge");
                $("#paris-badge").addClass("active_badge");
                $("#ankara-badge").removeClass("active_badge");
                $("#baku-badge").removeClass("active_badge");
                $("#teflis-badge").removeClass("active_badge");
                break;
             case 'ankara':
                $("#istanbul-badge").removeClass("active_badge");
                $("#dubai-badge").removeClass("active_badge");
                $("#paris-badge").removeClass("active_badge");
                $("#ankara-badge").addClass("active_badge");
                $("#baku-badge").removeClass("active_badge");
                $("#teflis-badge").removeClass("active_badge");
                break;
             case 'baku':
                $("#istanbul-badge").removeClass("active_badge");
                $("#dubai-badge").removeClass("active_badge");
                $("#paris-badge").removeClass("active_badge");
                $("#ankara-badge").removeClass("active_badge");
                $("#baku-badge").addClass("active_badge");
                $("#teflis-badge").removeClass("active_badge");
                break;
              case 'tblisi':
                $("#istanbul-badge").removeClass("active_badge");
                $("#dubai-badge").removeClass("active_badge");
                $("#paris-badge").removeClass("active_badge");
                $("#ankara-badge").removeClass("active_badge");
                $("#baku-badge").removeClass("active_badge");
                $("#teflis-badge").addClass("active_badge");
                break;   
            default:
                break;
        }
    }
});     