// Elemen DOM
const loanForm = document.getElementById('loanForm');
const loanTableBody = document.getElementById('loanTableBody');
const receiptSection = document.getElementById('receipt');

// Memuat data dari localStorage
function loadLoans() {
  const loans = JSON.parse(localStorage.getItem('loans')) || [];
  renderLoans(loans);
}

// Menampilkan data ke tabel
function renderLoans(loans) {
  loanTableBody.innerHTML = '';
  loans.forEach((loan, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${loan.borrowerName}</td>
      <td>${loan.itemName}</td>
      <td>${loan.quantity}</td>
      <td>${loan.loanDate}</td>
      <td>${loan.returnDate}</td>
      <td>
        <button onclick="generateReceipt(${index})" class="btn btn-info">Struk</button>
        <button onclick="deleteLoan(${index})" class="btn btn-danger">Hapus</button>
      </td>
    `;
    loanTableBody.appendChild(row);
  });
}

// Menambahkan data baru
loanForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const borrowerName = document.getElementById('borrowerName').value;
  const itemName = document.getElementById('itemName').value;
  const quantity = document.getElementById('quantity').value;
  const loanDate = document.getElementById('loanDate').value;
  const returnDate = document.getElementById('returnDate').value;

  const loans = JSON.parse(localStorage.getItem('loans')) || [];
  loans.push({ borrowerName, itemName, quantity, loanDate, returnDate });

  localStorage.setItem('loans', JSON.stringify(loans));

  loanForm.reset();
  renderLoans(loans);
});

// Menghapus data
function deleteLoan(index) {
  const loans = JSON.parse(localStorage.getItem('loans')) || [];
  loans.splice(index, 1);
  localStorage.setItem('loans', JSON.stringify(loans));
  renderLoans(loans);
}

// Menampilkan struk peminjaman
function generateReceipt(index) {
  const loans = JSON.parse(localStorage.getItem('loans')) || [];
  const loan = loans[index];

  receiptSection.innerHTML = `
    <h3>Struk Peminjaman</h3>
    <p><strong>Nama Peminjam:</strong> ${loan.borrowerName}</p>
    <p><strong>Nama Barang:</strong> ${loan.itemName}</p>
    <p><strong>Jumlah Barang:</strong> ${loan.quantity}</p>
    <p><strong>Tanggal Peminjaman:</strong> ${loan.loanDate}</p>
    <p><strong>Tanggal Pengembalian:</strong> ${loan.returnDate}</p>
    <button onclick="printReceipt()" class="btn btn-success">Cetak Struk</button>
  `;
}

// Mencetak struk
function printReceipt() {
  const printContents = receiptSection.innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  loadLoans();
}

// Muat data saat halaman pertama kali dibuka
loadLoans();
