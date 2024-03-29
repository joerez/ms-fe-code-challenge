
$( function() {

// uncomment this to test from a clean slate
// localStorage.clear();

/*********

Save Layout to local storage

*********/


  //If there's no layout in localStorage, then set horizontal mode to false
  if (!localStorage.getItem('horizontalLayout')) {
    window.localStorage.setItem('horizontalLayout', 'true')
  }

  //If there's no tweetCount in localstorage, set the default tweet count to 30.
  if (!localStorage.getItem('tweetCount')) {
    window.localStorage.setItem('tweetCount', '30')
  }

  //Load values from local storage into the DOM
  if(localStorage.getItem('tweetCount')) {
    $('.tweet-count-input').val(localStorage.getItem('tweetCount'));
    $('.tweet-number').text(localStorage.getItem('tweetCount'));
  }


  //On layout button click, set horizontal mode to true, and update the layout.
  $('#layout-btn').click(function (){

    if (window.localStorage.getItem('horizontalLayout') == 'true') {
      localStorage.removeItem('horizontalLayout')
      window.localStorage.setItem('horizontalLayout', 'false')
      return loadLayout()
    }

    if (window.localStorage.getItem('horizontalLayout') == 'false') {
      localStorage.removeItem('horizontalLayout')
      window.localStorage.setItem('horizontalLayout', 'true')
      return loadLayout()
    }

  })

  //This function set's classes based on local storage values.
  let loadLayout = function() {
    console.log(localStorage.getItem('horizontalLayout'))

    if (window.localStorage.getItem('horizontalLayout') == 'false') {
      $('.tweet-columns').addClass('horizontal')
      $('.tweet-column').addClass('horizontal')
    }

    if (window.localStorage.getItem('horizontalLayout') == 'true') {
      $('.tweet-columns').removeClass('horizontal')
      $('.tweet-column').removeClass('horizontal')
    }

  }

  //Call initial layout load.
  loadLayout();

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

  let makeschoolTweetUrl = `http://localhost:7890/1.1/statuses/user_timeline.json?count=${parseInt(window.localStorage.getItem('tweetCount'), 10)}&screen_name=makeschool`

  $.getJSON( makeschoolTweetUrl, function( data ) {
    var items = [];

    console.log(data)

    $.each( data, function( key, val ) {

      let formattedText = val.text
      //grab urls
      formattedText = formattedText.replace( /(https:\/\/[^\s]+)/gi , '<a href="$1">$1</a>' )
      //change usernames to URLS
      formattedText = formattedText.replace(/(^|[^@\w])@(\w{1,15})\b/g , '$1<a href="http://twitter.com/$2">@$2</a>')
      //format hashtags
      formattedText = formattedText.replace(/(^|\s)#(\w+)/g, "$1<a href='http://search.twitter.com/search?q=%23$2' target='_blank'>#$2</a>");

      let username = val.user.screen_name;
      let usernameUrl = `<a href="http://twitter.com/${username}">${username}</a>`

      let date = val.created_at.substring(0, 10);

      // let tweetUrl = val.urls[0].url
      let tweetUrlLink = `<a href="http://twitter.com/${username}/status/${val.id_str}">View full tweet</a>`;

      items.push(
        `<li class='tweet' id='" + key + "'>
          <div class='tweet-username'>${usernameUrl}</div>
          <div class="tweet-date">${date}</div>
          <div class="tweet-text">` + formattedText + `</div>
          <div class="tweet-link">${tweetUrlLink}</div>
        </li>` );
    });


    $( "<ul/>", {
      "class": "tweets",
      html: items.join( "" )
    }).appendTo( "#makeschool" );
  });







  /********

    YCNEWS Populate Tweets

  *********/

  let ycNewsTweetUrl = `http://localhost:7890/1.1/statuses/user_timeline.json?count=${parseInt(window.localStorage.getItem('tweetCount'), 10)}&screen_name=newsycombinator`

  $.getJSON( ycNewsTweetUrl, function( data ) {
    var items = [];

    $.each( data, function( key, val ) {

      let formattedText = val.text
      //grab urls
      formattedText = formattedText.replace( /(https:\/\/[^\s]+)/gi , '<a href="$1">$1</a>' )
      //change usernames to URLS
      formattedText = formattedText.replace(/(^|[^@\w])@(\w{1,15})\b/g , '$1<a href="http://twitter.com/$2">@$2</a>')
      //format hashtags
      formattedText = formattedText.replace(/(^|\s)#(\w+)/g, "$1<a href='http://search.twitter.com/search?q=%23$2' target='_blank'>#$2</a>");

      let username = val.user.screen_name;
      let usernameUrl = `<a href="http://twitter.com/${username}">${username}</a>`

      let date = val.created_at.substring(0, 10);

      // let tweetUrl = val.urls[0].url
      let tweetUrlLink = `<a href="http://twitter.com/${username}/status/${val.id_str}">View full tweet</a>`;


      items.push(
        `<li class='tweet' id='" + key + "'>
          <div class='tweet-username'>${usernameUrl}</div>
          <div class="tweet-date">${date}</div>
          <div class="tweet-text">` + formattedText + `</div>
          <div class="tweet-link">${tweetUrlLink}</div>
        </li>` );
        });


    $( "<ul/>", {
      "class": "tweets",
      html: items.join( "" )
    }).appendTo( "#ynews" );
  });






  /********

    YCOMBINATOR Populate Tweets

  *********/
  let ycTweetUrl = `http://localhost:7890/1.1/statuses/user_timeline.json?count=${parseInt(window.localStorage.getItem('tweetCount'), 10)}&screen_name=ycombinator`

  $.getJSON( ycTweetUrl, function( data ) {
    var items = [];

    console.log(data)

    $.each( data, function( key, val ) {

      let formattedText = val.text
      //grab urls
      formattedText = formattedText.replace( /(https:\/\/[^\s]+)/gi , "<a target='_blank' href='$1'>$1</a>" )
      //change usernames to URLS
      formattedText = formattedText.replace(/(^|[^@\w])@(\w{1,15})\b/g , "$1<a target='_blank' href='http://twitter.com/$2'>@$2</a>")
      //format hashtags
      formattedText = formattedText.replace(/(^|\s)#(\w+)/g, "$1<a target='_blank' href='http://search.twitter.com/search?q=%23$2' target='_blank'>#$2</a>");

      let username = val.user.screen_name;
      let usernameUrl = `<a target="_blank" href="http://twitter.com/${username}">${username}</a>`

      let date = val.created_at.substring(0, 10);

      // let tweetUrl = val.urls[0].url
      let tweetUrlLink = `<a target="_blank" href="http://twitter.com/${username}/status/${val.id_str}">View full tweet</a>`;


      items.push(
        `<li class='tweet' id='" + key + "'>
          <div class='tweet-username'>${usernameUrl}</div>
          <div class="tweet-date">${date}</div>
          <div class="tweet-text">` + formattedText + `</div>
          <div class="tweet-link">${tweetUrlLink}</div>
        </li>` );
      });


    $( "<ul/>", {
      "class": "tweets",
      html: items.join( "" )
    }).appendTo( "#ycomb" );
  });



/*******

 Settings controller

********/

$('#settings-btn').click(function() {
  $('.settings').toggleClass('show');
})

$('.close-btn').click(function() {
  $('.settings').toggleClass('show');
})


$('#tweet-count-btn').click(function() {
  let tweetCountValue = $('.tweet-count-input').val().toString();
  localStorage.removeItem('tweetCount')
  window.localStorage.setItem('tweetCount', tweetCountValue)
  window.location = '/'
  console.log(tweetCountValue)
})



} );
