// A text filter that also utilizes a tokenized string
// Note: leverages Select2, which is reqired. Ensure you use the "full" version
// Form elements should have a parent of #filter-buttons
// https://select2.github.io/examples.html

// High level:
// - Splits the user's input into keyworks
// - event:syntax filters by event
$.fn.liveFilter = function(inputEl) {
  // inputEl = target input element

  $(inputEl).bind("update", function () {
    console.log('update fn to be written',$(inputEl).val());
  });

  // strap the filter field as a select2 element
  $(inputEl).select2({
    placeholder: "Filter by a keyword or two",
    allowClear: true,
    tags: true,
    // tags:[""],
    multiple: true,
    minimumResultsForSearch: Infinity,
    dropdownCssClass: "hidden",
    tokenSeparators: [",", " "]
  })
  .on("change", function(e) {
    console.log('input-ted');
    updateIncoming();
    // _paq.push(['trackEvent', 'Events', 'Livefilter used']);
  })

  // var wrap = '#' + $(this).attr('id');
  var item = '.upcoming-event';
  $('select.select2-search__field').keyup(function () {
    updateIncoming();
  });

  // Tokenise filter options
  $('#filter-buttons input, #filter-buttons select').on('change', '', function(e){
    var targetVal          = $(this).val(),
        liveFilterType     = this.name,
        liveFilterVal      = $(inputEl).val(),
        liveFilterNewValue = '';

    // Before we add a new token, remove all existing tokens for this type
    // console.log('clearning for:',liveFilterType);
    var regexQuery = new RegExp(',{0,1}('+liveFilterType+')+:(\\w)+(\\s{0,1})+(\\w)+', "g");
    var targetValPurged = liveFilterVal.replace(regexQuery, '');
    targetValPurged = targetValPurged.replace(/^,/g, ''); // Remove comma if in first position

    // this is our search string with the old token removed
    liveFilterNewValue = targetValPurged;

    if (targetVal != 'reset') {
      // Create the token, a la: "year:2011"
      targetVal = liveFilterType+':'+targetVal;
      // Append the new token
      liveFilterNewValue = targetVal + ',' + liveFilterNewValue;
    }

    // Replace any double commas, or trailing commas
    liveFilterNewValue = liveFilterNewValue.replace(/,+$/, "").replace(/,(?=,)/g, ',g');
    // Update the text box
    $(inputEl).val(liveFilterNewValue).trigger("change");
  });

  function updateIncoming() {
    // // trigger for react
    // var element = document.getElementById('inputfilter');
    // element.value = 'triggerUpdate';
    // var event = new Event('change', { bubbles: true });
    // element.dispatchEvent(event);





    // var inputString = $(inputEl).val().join(' ').toLowerCase() + " " + $('.select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted').text().toLowerCase();
    // var filter = $(inputString);
    // var filterArray = filter.selector.split(" "); // an array of what we're to search for
    // console.log(filterArray);

    // $(wrapper + ' ' + item).each( function() { // search each entry
    //   var targetDiv = $(this);
    //
    //   $(filterArray).each( function() { // search for each term
    //     var individualSearchTerm = this;
    //
    //     var stingTermPosition = individualSearchTerm.indexOf(':');
    //
    //     if (stingTermPosition >= 0) { // year filter
    //       var searchSubject = individualSearchTerm.toLowerCase().substring(0,stingTermPosition); // get the matched search token, i.e. "topic"
    //       individualSearchTerm = individualSearchTerm.toLowerCase().substring(stingTermPosition+1,100); // drop the "topic:"
    //
    //       // assign a css selector to search for based off the searchSubject
    //       switch (searchSubject) {
    //         case 'year':
    //           searchSubject = '.event-date';
    //           break;
    //         case 'topic':
    //           searchSubject = '.ebi-topic';
    //           break;
    //         case 'type':
    //           searchSubject = '.event-'+searchSubject;
    //           break;
    //         default:
    //           searchSubject = '.'+searchSubject;
    //           break;
    //       }
    //
    //       if ($(targetDiv).find(searchSubject).text().toLowerCase().indexOf(individualSearchTerm) >= 0)  {
    //         $(targetDiv).removeClass('hidden');
    //       } else {
    //         $(targetDiv).addClass('hidden');
    //         return false; // aka break
    //       }
    //     }
    //     else {
    //       // normal text search
    //       if ($(targetDiv).text().toLowerCase().indexOf(individualSearchTerm) >= 0) {
    //         $(targetDiv).removeClass('hidden');
    //       } else {
    //         $(targetDiv).addClass('hidden');
    //         return false; // aka break
    //       }
    //     }
    //
    //   });
    //
    // });

    // conditionally hide the month header
    // $('.month-group').each( function() {
    //   var countVisible = $(this).children('.upcoming-event').length - $(this).children('.upcoming-event.hidden').length;
    //   if (countVisible == 0) {
    //     $(this).addClass('hidden');
    //   } else {
    //     $(this).removeClass('hidden');
    //   }
    // });

  }
}
