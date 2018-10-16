console.log('hello')

$( function() {

  /********
    click and drag
  *********/

  //Makes this ID a sortable container.
  $( "#ui-sortable" ).sortable({scroll: false});

  //On hold, add grabbed
  $('.tweet-column').mousedown(function(){
    $(this).addClass("grabbed");
  })

  //On hold release, remove grabbed
  $('.tweet-column').mouseup(function(){
    $(this).removeClass("grabbed");
  })


  /********
    MAKESCHOOL Populate Tweets
  *********/
  let makeschoolTweetUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool'

  $.getJSON( makeschoolTweetUrl, function( data ) {
    var items = [];

    console.log(data)

    $.each( data, function( key, val ) {

      val.truncated = true;
      let formattedText = val.text
      //grab urls
      formattedText = formattedText.replace( /(https:\/\/[^\s]+)/gi , '<a href="$1">$1</a>' )
      //change usernames to URLS
      formattedText = formattedText.replace(/(^|[^@\w])@(\w{1,15})\b/g , '$1<a href="http://twitter.com/$2">@$2</a>')

      items.push( "<li class='tweet' id='" + key + "'>" +"<div>" + formattedText + "</div></li>" );
    });


    $( "<ul/>", {
      "class": "tweets",
      html: items.join( "" )
    }).appendTo( "#makeschool" );
  });







  /********
    YCNEWS Populate Tweets
  *********/
  let ycNewsTweetUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=newsycombinator'

  $.getJSON( ycNewsTweetUrl, function( data ) {
    var items = [];

    console.log(data)

    $.each( data, function( key, val ) {

      val.truncated = true;


      items.push( "<li class='tweet' id='" + key + "'>" +"<div>" + val.text + "</div></li>" );
    });


    $( "<ul/>", {
      "class": "tweets",
      html: items.join( "" )
    }).appendTo( "#ynews" );
  });






  /********
    YCOMBINATOR Populate Tweets
  *********/
  let ycTweetUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=ycombinator'

  $.getJSON( ycTweetUrl, function( data ) {
    var items = [];

    console.log(data)

    $.each( data, function( key, val ) {

      val.truncated = true;


      items.push( "<li class='tweet' id='" + key + "'>" +"<div>" + val.text + "</div></li>" );
    });


    $( "<ul/>", {
      "class": "tweets",
      html: items.join( "" )
    }).appendTo( "#ycomb" );
  });




} );
