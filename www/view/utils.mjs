function replaceXXX(contentId, ...values) { // {{{1
  let textContent = document.getElementById(contentId).textContent
  for (let v of values) {
    textContent = textContent.replace('XXX', v)
  }
  document.getElementById(contentId).textContent = textContent
}

function showModal (contentId, close, ...r) { // {{{1
  // Show the modal
  let modal = document.getElementById("commonParentModal");
  modal.style.display = "block";
  let content = document.getElementById(contentId)
  let text
  switch (contentId) {
    case 'inviteOrSK':
      break
    case 'showBrowserIP':
      replaceXXX(...r)
      break

    case 'part2End':
    case 'payingBidder':
      text = content.children[1].textContent
      content.children[1].textContent = process.presenter.userInfo.greeting + text
      break
    default: // req1Intro, confirmBidAccept, makeRequest, testClawbacks
      text = content.children[1].firstElementChild.textContent
      content.children[1].firstElementChild.textContent =
        process.presenter.userInfo.greeting + text
  }
  content.style.display = "block";

  // Get the <span> element that closes the modal
  let span = document.getElementById(`${contentId}X`)

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    content.style.display = "none";
    !!close && close()
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      content.style.display = "none";
      !!close && close()
    }
  }
}

// }}}1
export { showModal, }
