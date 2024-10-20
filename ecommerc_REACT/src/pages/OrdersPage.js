import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Badge, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../components/Loading";

export default function OrdersPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">No order yet</h1>;
  }

  return (
    <Container>
      <h1 className="text-center">Your orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              {" "}
              {/* Added unique key */}
              <td>{order._id}</td>
              <td>
                <Badge
                  bg={'${order.status == "processing" ? "warning" : "success"}'}
                  text="white"
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.date}</td>
              <td>${order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
