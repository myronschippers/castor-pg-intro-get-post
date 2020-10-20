$(document).ready(onReady);

function onReady() {
  $('#js-add').on('click', postMusicData);

  getMusicData();
}

//
// EVENT HANDLERS
// ------------------------------

function handleClickSave() {
  let payloadObject = {
    artist: $('#js-input-artist').val(),
    track: $('#js-input-track').val(),
    rank: $('#js-input-rank').val(),
    published: $('#js-input-published').val(),
  };

  postMusicData(payloadObject);
}

//
// API / SERVER INTERACTION
// ------------------------------

// get artist data from the server
function getMusicData() {
  $('#js-musicTableBody').empty();
  $.ajax({
    type: 'GET',
    url: '/musicLibrary',
  }).then(function (response) {
    console.log('GET', response);

    // render data to the DOM
    render(response);
  });
}

function postMusicData(payloadObject) {
  $.ajax({
    type: 'POST',
    url: '/musicLibrary',
    data: payloadObject,
  })
    .then(function (response) {
      clearForm();

      getMusicData();
    })
    .catch(function (err) {
      console.log(err);
    });
}

//
// DOM INTERACTION / MANIPULATION
// ------------------------------

function clearForm() {
  // clear fields
  $('#js-input-artist').val('');
  $('#js-input-track').val('');
  $('#js-input-rank').val('');
  $('#js-input-published').val('');
}

function render(musicLibrary) {
  const $musicTableBody = $('#js-musicTableBody');

  $musicTableBody.empty();
  for (let i = 0; i < musicLibrary.length; i++) {
    const musicData = musicLibrary[i];

    $musicTableBody.append(`
      <tr>
        <td>${musicData.artist}</td>
        <td>${musicData.track}</td>
        <td>${musicData.rank}</td>
        <td>${musicData.published}</td>
      </tr>
    `);
  }
}
