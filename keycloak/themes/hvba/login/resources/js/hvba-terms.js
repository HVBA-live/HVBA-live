document.addEventListener("DOMContentLoaded", () => {
  const termsText = document.getElementById("kc-registration-terms-text");
  const checkbox = document.getElementById("termsAccepted");
  const formButtons = document.getElementById("kc-form-buttons");
  const submit = document.querySelector("#kc-form-buttons [type=submit]");

  if (!termsText || !checkbox || !formButtons || !submit) return;

  termsText.closest(".form-group").hidden = true;
  checkbox.closest(".form-group").hidden = true;

  checkbox.checked = false;
  submit.disabled = true;

  const row = document.createElement("div");
  row.className = "hvba-terms-row";
  row.innerHTML = `
    <span class="hvba-terms-status">Je moet de privacyvoorwaarden nog accepteren.</span>
    <button type="button" class="hvba-terms-open">Privacyvoorwaarden lezen</button>
  `;
  formButtons.before(row);

  const overlay = document.createElement("div");
  overlay.className = "hvba-modal-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="hvba-modal" role="dialog" aria-modal="true" aria-labelledby="hvba-modal-title">
      <h2 id="hvba-modal-title">Privacyvoorwaarden</h2>
      <div class="hvba-modal-text"></div>
      <p class="hvba-modal-hint">Scroll naar beneden om te kunnen accepteren.</p>
      <div class="hvba-modal-buttons">
        <button type="button" class="hvba-modal-decline">Weigeren</button>
        <button type="button" class="hvba-modal-accept" disabled>Accepteren</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".hvba-modal-text").appendChild(termsText);

  const status = row.querySelector(".hvba-terms-status");
  const openButton = row.querySelector(".hvba-terms-open");
  const acceptButton = overlay.querySelector(".hvba-modal-accept");
  const declineButton = overlay.querySelector(".hvba-modal-decline");
  const hint = overlay.querySelector(".hvba-modal-hint");

  const checkScrolledToBottom = () => {
    if (
      termsText.scrollTop + termsText.clientHeight >=
      termsText.scrollHeight - 5
    ) {
      acceptButton.disabled = false;
      hint.hidden = true;
    }
  };

  const openModal = () => {
    overlay.hidden = false;
    checkScrolledToBottom();
    acceptButton.focus();
  };

  const closeModal = () => {
    overlay.hidden = true;
    openButton.focus();
  };

  openButton.addEventListener("click", openModal);
  termsText.addEventListener("scroll", checkScrolledToBottom);

  acceptButton.addEventListener("click", () => {
    checkbox.checked = true;
    submit.disabled = false;
    status.textContent = "✓ Je hebt de privacyvoorwaarden geaccepteerd.";
    row.classList.add("accepted");
    closeModal();
  });

  declineButton.addEventListener("click", () => {
    checkbox.checked = false;
    submit.disabled = true;
    status.textContent = "Je moet de privacyvoorwaarden nog accepteren.";
    row.classList.remove("accepted");
    closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) {
      closeModal();
    }
  });
});
