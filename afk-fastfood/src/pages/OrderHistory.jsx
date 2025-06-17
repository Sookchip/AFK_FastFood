import React, { useState } from 'react';
import { Container, Table, Button, Row, Col, Modal } from 'react-bootstrap';
import { Eye, ExclamationTriangleFill } from 'react-bootstrap-icons';
import './OrderHistory.css';

const orders = [
  {
    id: 1,
    type: 'Đặt tiệc',
    name: 'Quỳnh',
    address: 'Hà Nội',
    email: 'Quynh9z@gmail.com',
    phone: '0987654321',
    date: '13/01/2025',
    partyDate: '27/02/2025',
    location: 'AFK Thanh Xuân',
    partyType: 'Sinh nhật',
    people: 10,
    note: '0',
    amount: '1.000.000 VND'
  },
  {
    id: 2,
    type: 'Đặt tiệc',
    name: 'Hoàng',
    address: 'Đà Nẵng',
    email: 'hoang@example.com',
    phone: '0935123456',
    date: '07/04/2025',
    partyDate: '20/04/2025',
    location: 'AFK Đà Nẵng',
    partyType: 'Hội thảo',
    people: 50,
    note: 'Yêu cầu thêm nước suối',
    amount: '1.230.000 VND'
  },
  {
    id: 3,
    type: 'Đặt món',
    name: 'Thành',
    address: 'Hà Nội',
    email: 'Thanhhh1@gmail.com',
    phone: '0123456789',
    date: '15/02/2025',
    location: 'AFK Đống Đa',
    foodList: '2 gà rán, 1 khoai tây chiên, 1 hamberger',
    note: '0',
    amount: '390.560 VND'
  },
  {
    id: 4,
    type: 'Đặt món',
    name: 'Hải',
    address: 'Huế',
    email: 'hai@gmail.com',
    phone: '0912345678',
    date: '10/05/2025',
    location: 'AFK Huế',
    foodList: '1 mì cay, 1 trà sữa',
    note: 'Ít cay',
    amount: '506.940 VND'
  },
  {
    id: 5,
    type: 'Đặt tiệc',
    name: 'Linh',
    address: 'Hà Nội',
    email: 'linh@example.com',
    phone: '0988989898',
    date: '22/03/2025',
    partyDate: '01/04/2025',
    location: 'AFK Cầu Giấy',
    partyType: 'Liên hoan',
    people: 20,
    note: '0',
    amount: '3.230.999 VND'
  },
];

export default function OrderHistory() {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [dateError, setDateError] = useState('');

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredOrders([]);
      setShowAlert(true);
      setDateError('');
      return;
    }

    const from = new Date(startDate);
    const to = new Date(endDate);
    const now = new Date();

    if (from > to) {
      setFilteredOrders([]);
      setDateError('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
      setShowAlert(false);
      return;
    }

    if (from > now) {
      setFilteredOrders([]);
      setDateError('Ngày bắt đầu không được lớn hơn ngày hiện tại.');
      setShowAlert(false);
      return;
    }

    const result = orders.filter(order => {
      const [day, month, year] = order.date.split('/');
      const orderDate = new Date(`${year}-${month}-${day}`);
      return orderDate >= from && orderDate <= to;
    });

    setFilteredOrders(result);
    setShowAlert(false);
    setDateError('');
  };

  const renderOrderDetails = (order) => {
    if (!order) return null;
    const isParty = order.type === 'Đặt tiệc';

    return (
      <table className="w-100">
        <tbody>
          <tr><td><strong>Mã dịch vụ:</strong></td><td>{order.id}</td></tr>
          <tr><td><strong>Loại dịch vụ:</strong></td><td>{order.type}</td></tr>
          <tr><td><strong>Họ tên:</strong></td><td>{order.name}</td></tr>
          <tr><td><strong>Địa chỉ:</strong></td><td>{order.address}</td></tr>
          <tr><td><strong>Email:</strong></td><td>{order.email}</td></tr>
          <tr><td><strong>Số điện thoại:</strong></td><td>{order.phone}</td></tr>
          {isParty ? (
            <>
              <tr><td><strong>Ngày đặt:</strong></td><td>{order.date}</td></tr>
              <tr><td><strong>Ngày tổ chức:</strong></td><td>{order.partyDate}</td></tr>
              <tr><td><strong>Địa điểm tổ chức:</strong></td><td>{order.location}</td></tr>
              <tr><td><strong>Loại tiệc:</strong></td><td>{order.partyType}</td></tr>
              <tr><td><strong>Số lượng người tham gia:</strong></td><td>{order.people}</td></tr>
              <tr><td><strong>Ghi chú:</strong></td><td>{order.note}</td></tr>
            </>
          ) : (
            <>
              <tr><td><strong>Tên món:</strong></td><td>{order.foodList}</td></tr>
              <tr><td><strong>Ngày đặt:</strong></td><td>{order.date}</td></tr>
              <tr><td><strong>Địa điểm:</strong></td><td>{order.location}</td></tr>
              <tr><td><strong>Ghi chú:</strong></td><td>{order.note}</td></tr>
            </>
          )}
          <tr><td><strong>Tổng tiền:</strong></td><td>{order.amount}</td></tr>
        </tbody>
      </table>
    );
  };

  return (
    <Container className="order-history-page my-5">
      <section className="text-center mb-4">
        <div className="line"></div>
        <h2 className="fw-bold mx-3">LỊCH SỬ ĐẶT HÀNG</h2>
        <div className="line"></div>
      </section>

      <Row className="justify-content-center align-items-center mb-4 flex-wrap gap-2">
        <Col xs="auto">
          <Button
            variant="light"
            className={`rounded-pill border px-4 ${!showDateFilter ? 'active-filter-btn' : ''}`}
            onClick={() => {
              setShowDateFilter(false);
              setFilteredOrders(orders);
              setShowAlert(false);
              setDateError('');
            }}
          >
            Xem toàn bộ đơn hàng
          </Button>
          <Button
            variant="light"
            className={`rounded-pill border px-4 ${showDateFilter ? 'active-filter-btn' : ''}`}
            onClick={() => setShowDateFilter(true)}
          >
            Lọc theo thời gian
          </Button>
        </Col>

        {showDateFilter && (
          <>
            <Col xs="auto">
              <label className="me-2">Từ:</label>
              <input
                type="date"
                className="form-control d-inline-block"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <label className="me-2">Đến:</label>
              <input
                type="date"
                className="form-control d-inline-block"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="outline-dark" className="px-4" onClick={handleFilter}>
                Xem
              </Button>
            </Col>
          </>
        )}
      </Row>

      {showAlert && (
        <div className="alert-custom mx-auto">
          <ExclamationTriangleFill className="alert-icon" />
          <span>Vui lòng nhập ngày bắt đầu và ngày kết thúc</span>
          <button className="alert-close" onClick={() => setShowAlert(false)}>×</button>
        </div>
      )}

      {dateError && (
        <div className="alert-custom alert-danger mx-auto">
          <ExclamationTriangleFill className="alert-icon" />
          <span>{dateError}</span>
          <button className="alert-close" onClick={() => setDateError('')}>×</button>
        </div>
      )}

      <Table responsive bordered hover className="text-center align-middle shadow-sm mt-3">
        <thead className="table-light">
          <tr>
            <th>Mã hàng</th>
            <th>Loại dịch vụ</th>
            <th>Ghi chú</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.type}</td>
                <td>{order.note}</td>
                <td>{order.date}</td>
                <td>
                  <div className="amount-cell">
                    <span className="amount-number">{order.amount.replace(' VND', '')}</span>
                    <span className="currency">VND</span>
                  </div>
                </td>
                <td>
                  <Eye style={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(order)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không tìm thấy đơn hàng trong khoảng thời gian đã chọn.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={selectedOrder !== null} onHide={() => setSelectedOrder(null)} centered dialogClassName="custom-modal-lg">
        <Modal.Header closeButton className="custom-header">
          <Modal.Title>
            Thông tin chi tiết {selectedOrder?.type === 'Đặt tiệc' ? 'đặt tiệc' : 'đặt món'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderOrderDetails(selectedOrder)}</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="warning" onClick={() => setSelectedOrder(null)}>Thoát</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
