-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 31 Mar 2022 pada 09.49
-- Versi server: 10.4.20-MariaDB
-- Versi PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dealer`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `id` int(225) NOT NULL,
  `id_cust` varchar(50) NOT NULL,
  `nama` varchar(225) NOT NULL,
  `tanggal` varchar(225) NOT NULL,
  `pembayaran` varchar(225) NOT NULL,
  `alamat` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`id`, `id_cust`, `nama`, `tanggal`, `pembayaran`, `alamat`) VALUES
(2, '002', 'Narendra', '21 Januari 2022', 'Rp  20.000.000', 'Bandung'),
(3, '001', 'Haikal', '21 Maret 2022', 'Rp  50.000.000', 'Jakarta'),
(4, '003', 'Javi', '4 Januari 2022', 'Rp  23.000.000', 'Bekasi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id` int(50) NOT NULL,
  `gambar` varchar(50) NOT NULL,
  `kode_kategori` varchar(225) NOT NULL,
  `merk` varchar(225) NOT NULL,
  `type` varchar(225) NOT NULL,
  `nama` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id`, `gambar`, `kode_kategori`, `merk`, `type`, `nama`) VALUES
(13, 'pcx.jpg', 'PCX-003', 'Honda', 'Matic', 'PCX 123'),
(14, 'suzuki.jpg', 'SZK-002', 'Yamaha', 'Sport', 'Suzuki 124'),
(15, 'cbr.jpg', 'CBR-043', 'Honda', 'Sport', 'CBR-25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `motor`
--

CREATE TABLE `motor` (
  `id` int(255) NOT NULL,
  `kode_motor` varchar(56) NOT NULL,
  `no_rangka` varchar(225) NOT NULL,
  `no_mesin` varchar(255) NOT NULL,
  `kode_kategori` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `tahun` varchar(225) NOT NULL,
  `warna` varchar(50) NOT NULL,
  `harga` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `motor`
--

INSERT INTO `motor` (`id`, `kode_motor`, `no_rangka`, `no_mesin`, `kode_kategori`, `type`, `tahun`, `warna`, `harga`) VALUES
(5, 'YM-003', 'MH354892', 'NS78341265', '002', 'Sport', '2020', 'Hitam', 'Rp 27.000.000'),
(6, 'SZK-045', 'SZK356892', 'S78Z34K965', 'SZK-002', 'Sport', '2020', 'Hitam', 'Rp 17.000.000'),
(7, 'PCX-004', 'PCX4867592', 'PC83X47816', 'PCX-003', 'Matic', '2021', 'Silver', 'Rp 37.000.000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(5) NOT NULL,
  `the_email` varchar(30) NOT NULL,
  `the_password` varchar(30) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `the_email`, `the_password`, `nama`, `phone`) VALUES
(1, 'test@test.com', '123456', '', ''),
(3, 'namira@gmail.com', '12345', '', ''),
(4, 'namirashi@gmail.com', '123456', 'Namira Shifwah Kumandani', '082138772462'),
(5, 'namirashi@gmail.com', '12345', 'Namira Shifwah K', '082138772462');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `motor`
--
ALTER TABLE `motor`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `motor`
--
ALTER TABLE `motor`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
