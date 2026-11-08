const g = (id, title, subject, grade, topic, description, featured, createdAt) => ({ id, title, subject, grade, topic, description, thumbnail: topic, featured, createdAt })
export const games = [
  g(1, 'Chú gấu tìm phương hướng', 'Địa lí', 4, 'phuong', 'Giúp chú gấu tìm đúng hướng đông, tây, nam, bắc.', true, '2026-10-01'),
  g(2, 'La bàn thám hiểm', 'Địa lí', 4, 'phuong', 'Dùng la bàn để đi qua mê cung và tìm kho báu.', false, '2026-10-05'),
  g(3, 'Bản đồ kho báu', 'Địa lí', 5, 'phuong', 'Đọc bản đồ và xác định phương của các địa điểm.', false, '2026-10-12'),
  g(4, 'Hành trình qua các đới', 'Địa lí', 5, 'khihau', 'Đưa du khách đến đúng đới khí hậu phù hợp.', true, '2026-10-15'),
  g(5, 'Ghép cặp khí hậu', 'Địa lí', 5, 'khihau', 'Ghép động vật và thực vật với đới khí hậu của chúng.', false, '2026-10-20'),
  g(6, 'Ai nóng ai lạnh', 'Khoa học', 4, 'khihau', 'Phân loại các vùng theo nhiệt độ trung bình năm.', false, '2026-10-25'),
  g(7, 'Ngày và đêm kỳ diệu', 'Khoa học', 5, 'mattroi', 'Xoay Trái Đất để hiểu vì sao có ngày và đêm.', true, '2026-11-01'),
  g(8, 'Các pha của Mặt Trăng', 'Khoa học', 5, 'mattroi', 'Sắp xếp đúng thứ tự các pha Mặt Trăng trong tháng.', false, '2026-11-03'),
  g(9, 'Bốn mùa quanh Mặt Trời', 'Khoa học', 4, 'mattroi', 'Quan sát Trái Đất quay quanh Mặt Trời qua bốn mùa.', false, '2026-11-06'),
]
