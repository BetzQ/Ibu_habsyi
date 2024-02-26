// Daftar menu yang akan ditambahkan
const menuItems = [
  {
    menuTitle: "Nasi Kepal",
    img: "./images/menu-nasi-kepal.jpeg",
    menus: [
      {
        title: "Paket 1",
        price: "Rp. 15,000",
        get: ["Nasi Kepal", "Snack 2", "Air Mineral"],
        options: [
          "Ayam Suir Pedas",
          "Ayam Suir Rendang",
          "Ayam Suir Kecap",
          "Ayam Suir Balado Ijo",
          "Ikan Suir Balado",
        ],
      },
      {
        title: "Paket 2",
        price: "Rp. 13,000",
        get: ["Nasi Kepal", "Snack", "Air Mineral"],
        options: [
          "Ayam Suir Pedas",
          "Ayam Suir Rendang",
          "Ayam Suir Kecap",
          "Ayam Suir Balado Ijo",
          "Ikan Suir Balado",
        ],
      },
      {
        title: "Paket 3",
        price: "Rp. 10,000",
        get: ["Nasi Kepal", "Snack"],
        options: [
          "Ayam Suir Pedas",
          "Ayam Suir Rendang",
          "Ayam Suir Kecap",
          "Ayam Suir Balado Ijo",
          "Ikan Suir Balado",
        ],
      },
    ],
  },
];

// Ambil elemen ul
const menuList = document.getElementById("menuList");
const menusContainer = document.getElementById("menus");

// Fungsi untuk menampilkan menu berdasarkan menu yang dipilih
function tampilkanMenu(menuIndex) {
  // Hapus semua menu yang ada
  menusContainer.innerHTML = "";

  // Ambil menu berdasarkan indeks yang dipilih
  const selectedMenu = menuItems[menuIndex];

  // Ubah gambar sesuai dengan img dari menuItems
  const imageMenu = document.getElementById("imageMenu");
  imageMenu.src = selectedMenu.img;

  // Loop melalui daftar menus dan tambahkan setiap menu ke dalam container
  selectedMenu.menus.forEach((menu, index) => {
    const menuDiv = document.createElement("div");
    menuDiv.className = "bg-white shadow-md rounded-md p-6 mb-4";

    const titleP = document.createElement("p");
    titleP.className = "text-lg font-semibold mb-2 bg-black w-20";
    titleP.textContent = menu.title;

    const priceSpan = document.createElement("span");
    priceSpan.className = "text-lg font-semibold mb-3";

    // Harga asli dengan garis coret
    const originalPrice = document.createElement("span");
    originalPrice.textContent = menu.price;
    priceSpan.appendChild(originalPrice);

    // Harga setelah ditambah Rp. 2.000
    const updatedPrice = document.createElement("span");
    updatedPrice.textContent = ` Rp. ${
      parseInt(menu.price.split(".")[1].replace(",", "")) + 2000
    }`;
    updatedPrice.style.textDecoration = "line-through";
    updatedPrice.style.fontSize = ".9em";
    updatedPrice.style.opacity = ".9";
    priceSpan.appendChild(updatedPrice);

    const getP = document.createElement("p");
    getP.className = "text-sm mb-2";
    const getPList = document.createElement("ul");
    menu.get.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = "- " + item;
      getPList.appendChild(listItem);
    });

    const selectMenu = document.createElement("select");
    selectMenu.className =
      "block w-full p-2 border border-gray-300 rounded-md mb-4";
    menu.options.forEach((option, optionIndex) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      if (optionIndex === 0) {
        optionElement.setAttribute("selected", "selected"); // Opsi default
      }
      selectMenu.appendChild(optionElement);
    });

    const selectText = document.createElement("p");
    selectText.textContent = "Pilih isinya:";

    const button = document.createElement("button");
    button.className =
      "bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full";
    button.textContent = "Pesan Sekarang";
    button.onclick = function () {
      pesanSekarang(index); // Mengirimkan indeks menu yang benar
    };

    menuDiv.appendChild(titleP);
    menuDiv.appendChild(priceSpan);
    menuDiv.appendChild(getP);
    getP.appendChild(getPList);
    menuDiv.appendChild(selectText);
    menuDiv.appendChild(selectMenu);
    menuDiv.appendChild(button);
    menusContainer.appendChild(menuDiv);
  });
}

// Loop melalui daftar menuItems dan tambahkan setiap menu ke dalam daftar
menuItems.forEach((menu, index) => {
  const li = document.createElement("li");
  li.classList.add(
    "bg-white",
    "flex-shrink-0",
    "md:w-auto",
    "rounded-lg",
    "h-8"
  );

  const span = document.createElement("span");
  span.textContent = menu.menuTitle;
  span.classList.add("text-gray-800", "hover:text-gray-900", "p-2");

  // Tambahkan event listener untuk setiap menu title
  span.addEventListener("click", function () {
    // Tampilkan menu berdasarkan indeks menuItems
    tampilkanMenu(index);
  });

  li.appendChild(span);
  menuList.appendChild(li);

  // Menampilkan menu default (indeks pertama)
  if (index === 0) {
    tampilkanMenu(index);
  }
});

// Fungsi saat tombol Pesan Sekarang diklik
function pesanSekarang(menuIndex) {
  let selectedOption = document.querySelector(
    `#menus div:nth-of-type(${menuIndex + 1}) select`
  ).value;
  let message = encodeURIComponent(
    `Saya mau pesan menu paket ${
      menuIndex + 1
    } dengan pilihan: ${selectedOption}`
  );
  let whatsappLink = `https://wa.me/6285213030554?text=${message}`;
  window.open(whatsappLink, "_blank");
}
