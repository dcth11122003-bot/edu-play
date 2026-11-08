const l = (id, title, subject, grade, topic, description, content) => ({ id, title, subject, grade, topic, description, thumbnail: topic, content })
export const lessons = [
  l(1, 'Bốn phương chính', 'Địa lí', 4, 'phuong', 'Tìm hiểu bốn hướng đông, tây, nam, bắc.', 'Mặt Trời mọc ở hướng đông và lặn ở hướng tây. Đứng quay mặt về hướng bắc thì bên phải là đông, bên trái là tây.'),
  l(2, 'Cách dùng la bàn', 'Địa lí', 4, 'phuong', 'Làm quen với la bàn và cách đọc kim chỉ hướng.', 'Kim la bàn luôn chỉ về hướng bắc. Xoay la bàn cho chữ N trùng với đầu kim để xác định các hướng còn lại.'),
  l(3, 'Các đới khí hậu', 'Địa lí', 5, 'khihau', 'Nhiệt đới, ôn đới và hàn đới khác nhau thế nào.', 'Trái Đất chia thành một đới nóng, hai đới ôn hòa và hai đới lạnh, dựa vào lượng nhiệt Mặt Trời chiếu xuống.'),
  l(4, 'Sinh vật ở mỗi đới', 'Khoa học', 5, 'khihau', 'Động vật và thực vật thích nghi với khí hậu.', 'Gấu bắc cực có lớp lông dày ở hàn đới, còn cọ dừa phát triển tốt ở vùng nhiệt đới nóng ẩm.'),
  l(5, 'Trái Đất tự quay', 'Khoa học', 5, 'mattroi', 'Vì sao có ngày và đêm.', 'Trái Đất tự quay một vòng khoảng 24 giờ nên nơi hướng về Mặt Trời là ban ngày, nơi còn lại là ban đêm.'),
  l(6, 'Mặt Trăng và các pha', 'Khoa học', 4, 'mattroi', 'Hình dạng Mặt Trăng thay đổi trong tháng.', 'Mặt Trăng không tự phát sáng mà phản chiếu ánh sáng Mặt Trời. Phần ta nhìn thấy sáng thay đổi theo vị trí của nó.'),
]
