const API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLizOAu7p-vB1rhFZ1xMukcxNQHYzp-u4klEUvvrnWMIIXJyUjoW3vFUo2nb_Q-3XdnnAweLerhXhylEQ2fv7upKjRQcMtuLPIgsdDqbwUPkInWX6Qs_5mbHkSfA1ExboUVAxQvP_Vmh1GXHMM1Y6zlvdQEsVixVV_0SrRAYqQ01Sf9XqOuaMOjWsOdjQnBth0Uiy0R193eJ7TKOta2guXzAj2oIlOJSR7HCI29Fcr9ViG2EXEQ5dfhkVneSOR5S_xcuA-N30rEp8LEbNdjgQCC1hhLwoA&lib=My__GIgJX_oALaM1h9Gx__AN-YzWt5ix_
document.getElementById("formData").addEventListener("submit", handleSubmit);

function loadData() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("dataBody");
      tbody.innerHTML = "";
      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.ID}</td>
          <td>${row.NAMA}</td>
          <td>${row.INSTANSI}</td>
          <td>${row.KEPERLUAN}</td>
          <td>${row.WAKTU}</td>
          <td>
            <button onclick="editData('${row.ID}', \`${row.NAMA}\`, \`${row.INSTANSI}\`, \`${row.KEPERLUAN}\`, \`${row.WAKTU}\`)">Edit</button>
            <button onclick="deleteData('${row.ID}')">Hapus</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function handleSubmit(e) {
  e.preventDefault();
  const ID = document.getElementById("ID").value;
  const data = {
    NAMA: document.getElementById("NAMA").value,
    INSTANSI: document.getElementById("INSTANSI").value,
    KEPERLUAN: document.getElementById("KEPERLUAN").value,
    WAKTU: document.getElementById("WAKTU").value,
  };

  if (ID) {
    data.method = "PUT";
    data.ID = ID;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(() => {
    document.getElementById("formData").reset();
    loadData();
  });
}

function editData(ID, NAMA, INSTANSI, KEPERLUAN, WAKTU) {
  document.getElementById("ID").value = ID;
  document.getElementById("NAMA").value = NAMA;
  document.getElementById("INSTANSI").value = INSTANSI;
  document.getElementById("KEPERLUAN").value = KEPERLUAN;
  document.getElementById("WAKTU").value = WAKTU;
}

function deleteData(ID) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ method: "DELETE", ID }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(() => loadData());
}
