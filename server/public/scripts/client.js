$(document).ready(onReady);

function onReady() {
  $('#js-add').on('click', handleClickSave);
  $('#js-musicTableBody').on('click', '.js-btn-delete', handleDelete);
  $('#js-musicTableBody').on('click', '.js-btn-update', handleUpdate);

  getMusicData();
}

//
// EVENT HANDLERS
// ------------------------------

function handleUpdate() {
  console.log('UPDATE');
  // $('.js-rank').html('<input type="number" placeholder="rank" />');
  const $btn = $(this);
  const currentRank = $btn.data('rank');
  const btnText = $btn.text();
  const $tdRank = $btn
    .parent() // td
    .parent() // tr
    // .closest('tr')
    // .children('.js-rank') // td class="js-rank"
    .children('.js-rank'); // td class="js-rank"

  if (btnText === 'Update') {
    $tdRank.html(
      `<input type="number" placeholder="rank" value="${currentRank}" />`
    );
    $btn.text('Save');
  } else {
    // get value from field
    const rankUpdate = $tdRank.children('input').val();
    const id = $btn.data('id');
    updateRank(rankUpdate, id);
  }
}

function handleClickSave() {
  let musicObject = {
    artist: $('.js-input-artist').val(),
    track: $('.js-input-track').val(),
    rank: $('.js-input-rank').val(),
    published: $('.js-input-published').val(),
  };

  postMusicData(musicObject);
}

function handleDelete() {
  // retrieve id
  const musicId = $(this).data('id');
  console.log('DELETE:', musicId);
  deleteMusic(musicId);
}

//
// API / SERVER INTERACTION
// ------------------------------

// get artist data from the server
function getMusicData() {
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

function deleteMusic(itemId) {
  $.ajax({
    method: 'DELETE',
    url: `/musicLibrary/${itemId}`, // /musicLibrary/5
  })
    .then((deleteMessage) => {
      getMusicData();
    })
    .catch((err) => {
      console.log(err);
      alert('Oh SHOOT!!!');
    });
}

function updateRank(newRank, id) {
  $.ajax({
    method: 'PUT',
    url: `/musicLibrary/rank/${id}`,
    data: { rank: newRank },
  })
    .then((putMessage) => {
      getMusicData();
    })
    .catch((err) => {
      console.log(err);
      alert('Oh SHOOT Did Not UPDATE!!!');
    });
}

//
// DOM INTERACTION / MANIPULATION
// ------------------------------

function clearForm() {
  // clear fields
  $('.js-input-artist').val('');
  $('.js-input-track').val('');
  $('.js-input-rank').val('');
  $('.js-input-published').val('');
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
        <td class="js-rank">${musicData.rank}</td>
        <td>${musicData.published}</td>
        <td>
          <button class="js-btn-delete" data-id="${musicData.id}">Delete</button>
          <button class="js-btn-update" data-rank="${musicData.rank}" data-id="${musicData.id}">Update</button>
        </td>
      </tr>
    `);
  }
}
