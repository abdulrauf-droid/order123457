const form = document.getElementById("orderForm");
const mainOrderBtn = document.getElementById("mainOrderBtn");
const orderOptions = document.getElementById("orderOptions");
const whatsappBtn = document.getElementById("whatsappBtn");
const codBtn = document.getElementById("codBtn");
const thankYouBox = document.getElementById("thankYouBox");

// Show COD and WhatsApp buttons
mainOrderBtn.addEventListener("click", () => {
  orderOptions.style.display = "flex";
  mainOrderBtn.style.display = "none";
});

// WhatsApp logic
whatsappBtn.addEventListener("click", () => {
  const { name, phone, address, quantity, notes } = form;
  const msg = `📦 *I want To Purchase This Products*
🛍️ Smart Watch – PKR 2,500
🔢 Quantity: ${quantity.value}
📝 ${notes.value || "Address"}`;

  window.open(`https://wa.me/923052518286?text=${encodeURIComponent(msg)}`, "_blank");
});

// COD (EmailJS)
codBtn.addEventListener("click", () => {
  if (!form.name.value || !form.phone.value || !form.address.value ||
      !form.province.value || !form.city.value || !form.cod.checked) {
    return alert("❗ Please fill all fields and agree to COD.");
  }

  const params = {
    name:     form.name.value,
    phone:    form.phone.value,
    address:  form.address.value,
    province: form.province.value,
    city:     form.city.value,
    quantity: form.quantity.value,
    notes:    form.notes.value || "None"
  };

  // ✅ Use correct service ID, template ID, and public key
  emailjs.send("service_ydrofun", "template_cig7wdn", params)
    .then(() => {
      form.style.display = "none";
      thankYouBox.style.display = "block";
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("❌ Failed to send email. Please check your EmailJS template setup.");
    });
});
