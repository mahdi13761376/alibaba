$(document).ready(function () {
    var url_string = location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get('id');
    console.log(id);
    url = "http:\/\/37.152.185.50:8080\/hotels\/hotel\/" + id;
    $.ajax({type: 'GET',
        crossDomain: true,
        headers: {'Content-Type': 'application/json'},
        url: url
        , success: function (result) {
            console.log(result);
            fill_hotel_page(result);


        },
        error: function (xhr, status, error) {
            alert(status);
        }
    });
    var photo_index = 0;
    var photo_size;
    var images;
    function fill_hotel_page(detail) {
        breadcrumbs = detail.breadcrumbs;
        photo_size = detail.images.length;
        images = detail.images;
        console.log(breadcrumbs);
        $.each(breadcrumbs, function (i, item) {
            breadcrumb = "<li class='title-item' <a href='#' >" + item + "</a></li> ";
            $("#header_list").append(breadcrumb);
            if (i !== breadcrumbs.length - 1) {
                splitor = "<li aria-hidden='true' class='title-item' >   \/</li>";
                $("#header_list").append(splitor);
            }
        });
        address_tag = "<a href='' >" + detail.address + " </a> ";
        $("#address_container").prepend(address_tag);
        name = detail.name;

        fill_stars = detail.stars;
        other_stars = 5 - fill_stars;
        stars = "";
        for (i = 0; i < fill_stars; i++) {
            stars += "<i class='fa fa-star' style='color: gold'></i>";
        }
        for (i = 0; i < other_stars; i++) {
            stars += "<i class='fa fa-star' style='color: transparent'></i>";
        }
        $("#star_container").prepend(stars);
        name_tag = "<h2 class='hotel-title-header'>" + name + " </h2> ";
        $("#name_container").prepend(name_tag);
        if (detail.images[0] !== undefined)
            $("#main_pic").css('background-image', "url(" + detail.images[0] + ")");
        if (detail.images[0] !== undefined)
            $("#first_pic").css('background-image', "url(" + detail.images[0] + ")");
        if (detail.images[1] !== undefined)
            $("#second_pic").css('background-image', "url(" + detail.images[1] + ")");
        if (detail.images[2] !== undefined)
            $("#third_pic").css('background-image', "url(" + detail.images[2] + ")");
        if (detail.images[3] !== undefined)
            $("#fourth_pic").css('background-image', "url(" + detail.images[3] + ")");
        if (detail.images[4] !== undefined)
            $("#fifth_pic").css('background-image', "url(" + detail.images[4] + ")");
        if (detail.images[5] !== undefined)
            $("#sixth_pic").css('background-image', "url(" + detail.images[5] + ")");
        facilities = detail.facilities;
        facility_title = "";
        $.each(facilities, function (i, item) {
            facility_title += "<div > <svg xmlns:xlink='http://www.w3.org/1999/xlink'height='36px' width='36px' fill='' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 24 24' class='svg-icon' ><g id='General' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>";
            facility_title += "<path d='M12,1.5 C17.7989899,1.5 22.5,6.20101013 22.5,12 C22.5,17.7989899 17.7989899,22.5 12,22.5 C6.20101013,22.5 1.5,17.7989899 1.5,12 C1.5,6.20101013 6.20101013,1.5 12,1.5 Z M12,2.5 C6.75329488,2.5 2.5,6.75329488 2.5,12 C2.5,17.2467051 6.75329488,21.5 12,21.5 C17.2467051,21.5 21.5,17.2467051 21.5,12 C21.5,6.75329488 17.2467051,2.5 12,2.5 Z M12,17 C12.2454599,17 12.4496084,17.1768752 12.4919443,17.4101244 L12.5,17.5 L12.5,18 C12.5,18.2761424 12.2761424,18.5 12,18.5 C11.7545401,18.5 11.5503916,18.3231248 11.5080557,18.0898756 L11.5,18 L11.5,17.5 C11.5,17.2238576 11.7238576,17 12,17 Z M12,5.5 C12.2454599,5.5 12.4496084,5.67687516 12.4919443,5.91012437 L12.5,6 L12.5,15 C12.5,15.2761424 12.2761424,15.5 12,15.5 C11.7545401,15.5 11.5503916,15.3231248 11.5080557,15.0898756 L11.5,15 L11.5,6 C11.5,5.72385763 11.7238576,5.5 12,5.5 Z' id='Combined-Shape' fill='#757575' fill-rule='nonzero'>";
            facility_title += "</path></g></svg>";
            facility_title += "<div class='inline-block hotel-facilities' > <p class='text-title'>" + i + "</p> <ul class='list-inline' >";
            $.each(item, function (i1, item1) {
                facility_title += "<li class='ml-5' >" + item1 + "</li>";

            });
            facility_title += "</ul></div></div>";
        });
        $("#facilities").prepend(facility_title);

    }
    $("#first_pic").on("click", {
        index: 0}
    , change_index
            );
    $("#second_pic").on("click", {
        index: 1}
    , change_index
            );
    $("#third_pic").on("click", {
        index: 2}
    , change_index
            );
    $("#fourth_pic").on("click", {
        index: 3}
    , change_index
            );
    $("#fifth_pic").on("click", {
        index: 4}
    , change_index
            );
    $("#sixth_pic").on("click", {
        index: 5}
    , change_index
            );
    $("#next").on("click", {
        index: 1}
    , arrow_key
            );
    $("#prev").on("click", {
        index: -1}
    , arrow_key
            );
    function change_index(event) {
        index = event.data.index;
        photo_index = index;
        change_main_pic(photo_index);

    }
    function arrow_key(event) {
        index = event.data.index;
        photo_index = photo_index + index;
        change_main_pic(photo_index);

    }

    function change_main_pic(index) {
        index = index % photo_size;
        $("#main_pic").css('background-image', "url(" + images[index] + ")");
    }

    $("#room_form").submit(function (event) {
        // this takes care of disabling the form's submission
        event.preventDefault();
        go = $("#go").val();
        come = $("#come").val();
        persons = $("#persons").val();
        persons = persons.split(',');
        xml_string = "<?xml version='1.0' encoding='utf-8'?>" +
                "<reserve xsi:noNamespaceSchemaLocation='schema.xsd' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>" +
                "<id>" + id + "</id>" +
                "<from>" + go + "</from>" +
                "<to>" + come + "</to>" +
                "<guests>" +
                "<parents>" + persons[0] + "</parents>" +
                " <children>" + persons[1] + "</children>" +
                "</guests>" +
                "</reserve>";
        xml_document = $.parseXML(xml_string);
        console.log(xml_document);
        url = "http:\/\/37.152.185.50:8080\/hotels\/hotel\/" + id + "\/reserve";
        $.ajax({
            url: url,
            dataType: "text",
            type: "post",
            async: false,
            data: {
                xml: xml_document
            },
            success: function (data) {
                alert(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });



});

