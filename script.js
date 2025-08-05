const API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLh0PwmnG-AIsNe87kqyYS8BWd-cbh4ZE1yETKim_nIX1aK0OZrwiKW_IZXe_c7jcvxx-Wjk70fVS4oUM3mc9o4j1F1KhDwSMEdDYiAbgJKrGZ64QToANrNJ4DJhjpvbUc7cJN30TAGRMj__7avglR4Rtnhpv1ffg2gYsSF8Hp5rRn8sbCDc1piHkhEJUvhxC7UvXYTbKq_tEdrXalUe8S_TjlzAcj_eSvQypdDWTYe-n0DDb7T33dnVaUDjtfEaKvMIyKY1Tr_Ipxl_SRIslIJw_9CxQQ&lib=My__GIgJX_oALaM1h9Gx__AN-YzWt5ix_
document.addEventListener("DOMContentLoaded", loadData);
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
