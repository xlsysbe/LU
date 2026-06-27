// Remplacez cette URL par l'URL de votre Web App Google Apps Script.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbySlr_GKxKhcgoggTDjvOqFgKYLkJuUS_4w3RCYDFJHFolLZJGruWo5r4-wLhugfqAu/exec";

const form = document.getElementById("feedbackForm");
const message = document.getElementById("message");
const submitButton = document.getElementById("submitButton");

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
  message.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (SCRIPT_URL.includes("COLLER_ICI")) {
    showMessage("Configuration manquante : ajoutez l’URL Google Apps Script dans script.js.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Envoi…";

  const payload = {
    bureau: form.bureau.value,
    typeRetour: form.typeRetour.value,
    commentaire: form.commentaire.value,
    date: new Date().toISOString()
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    form.reset();
    showMessage("Merci, votre feedback a bien été envoyé.", "success");
  } catch (error) {
    showMessage("Une erreur est survenue. Merci de réessayer.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Envoyer";
  }
});
