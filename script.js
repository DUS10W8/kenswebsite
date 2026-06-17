const quoteForm = document.querySelector("#quote-form");

const messengerUrl = "https://m.me/61578412769982";

quoteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(quoteForm);
  const name = String(data.get("name") || "").trim();
  const service = String(data.get("service") || "").trim();
  const details = String(data.get("details") || "").trim();

  const message = [
    "Hi Ken's, I'd like a quote.",
    name ? `Name: ${name}` : "",
    service ? `Service: ${service}` : "",
    details ? `Details: ${details}` : ""
  ].filter(Boolean).join("\n");

  try {
    await navigator.clipboard.writeText(message);
  } catch {
    // Messenger does not support reliable prefilled quote text, so the form still routes there.
  }

  window.open(messengerUrl, "_blank", "noopener");
});
