function replaceXXX(contentId, ...values) { // {{{1
  let textContent = document.getElementById(contentId).textContent
  for (let v of values) {
    textContent = textContent.replace('XXX', v)
  }
  document.getElementById(contentId).textContent = textContent
}

function showModal (contentId, close, ...r) { // {{{1
  // Show the modal {{{2
  let modal = document.getElementById("commonParentModal");
  modal.style.display = "block";
  let content = document.getElementById(contentId)
  let text
  switch (contentId) {
    case 'inviteOrSK':
      break

    case 'accountIPaInProgress':
    case 'associateThisAddressToo':
    case 'showBrowserIP':
      replaceXXX(...r)
      break

    case 'part2End':
    case 'payingBidder':
      text = content.children[1].textContent
      content.children[1].textContent = process.presenter.userInfo.greeting + text
      break

    default: // req1Intro, confirmBidAccept, makeRequest, testClawbacks
      console.log(contentId, process)

      /*
      text = content.children[1].firstElementChild.textContent
      content.children[1].firstElementChild.textContent =
        process.presenter.userInfo.greeting + text
      */
  }
  content.style.display = "block";

  // Get the mc_close element that closes the modal {{{2
  let mc_close = document.getElementById(`${contentId}close`)

  // When the user clicks on mc_close, close the modal {{{2
  mc_close.onclick = function() {
    modal.style.display = "none";
    content.style.display = "none";
    !!close && close()
  }

  // When the user clicks anywhere outside of the modal, close it {{{2
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      content.style.display = "none";
      !!close && close()
    }
  }

  // Get the mc_help element that provides context-specific help {{{2
  let mc_help = document.getElementById(`${contentId}help`)

  // When the user clicks on mc_help, goto FAQ {{{2
  mc_help.onclick = function() {
    alert('XO!')
  }

  // }}}2
}

// }}}1
export { showModal, }
