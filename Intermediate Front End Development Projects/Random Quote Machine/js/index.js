var forismaticAPI = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';

$(document).ready(function() {

  $.getJSON(forismaticAPI, function(a) {
    $(".quote").html('<p>"' + a.quoteText + '"</p>' + "<p>— " + a.quoteAuthor + "</p>");
    updateTweet(a.quoteText, a.quoteAuthor);
  });

  $("#newquote").on("click", function() {
    $.getJSON(forismaticAPI, function(a) {
      $(".quote").html('<p>"' + a.quoteText + '"</p>' + "<p>— " + a.quoteAuthor + "</p>");
      updateTweet(a.quoteText, a.quoteAuthor);
    });
  });

  function updateTweet(quote) {
    $("#twitterSend").attr("href", "https://twitter.com/intent/tweet?text=" + '"' + arguments[0] + '"' + " - " + arguments[1]);
  }
});