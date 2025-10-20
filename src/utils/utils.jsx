import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import dayjs from "dayjs"; 

// --- 1. INITIAL DATA ---
export const dataApp = [
  { key: "1", date: "2022-01-01", concept: "Comida", amount: 500.0 },
  { key: "2", date: "2022-01-02", concept: "Transporte", amount: 100.5 },
  { key: "3", date: "2022-01-03", concept: "Alquiler", amount: 2000.0 },
  { key: "4", date: "2022-01-04", concept: "Casa", amount: 300.0 },
  { key: "5", date: "2022-01-05", concept: "Comida", amount: 400.0 },
  { key: "6", date: "2022-01-06", concept: "Comida", amount: 500.0 },
  { key: "7", date: "2022-01-07", concept: "Comida", amount: 600.0 },
  { key: "8", date: "2022-01-08", concept: "Comida", amount: 700.0 },
  { key: "9", date: "2022-01-09", concept: "Comida", amount: 800.0 },
  { key: "10", date: "2022-01-10", concept: "Comida", amount: 900.0 },
  { key: "11", date: "2022-01-11", concept: "Comida", amount: 1000.0 },
  { key: "12", date: "2022-01-12", concept: "Comida", amount: 1100.0 },
  { key: "13", date: "2022-01-13", concept: "Comida", amount: 1200.0 },
];

// --- 2. COLUMN GENERATION ---
export const generateColumns = (handleDelete, handleUpdate) => {
  return [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date) => <Tag color="blue">{dayjs(date).format("DD/MM/YYYY")}</Tag>,
      width: 150,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Concepto",
      dataIndex: "concept",
      key: "concept",
      render: (concept) => <span>{concept}</span>,
      sorter: (a, b) => a.concept.localeCompare(b.concept),
    },
    {
      title: "Monto",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span style={{ textAlign: 'right', display: 'block' }}>
          ${Number(amount).toFixed(2)}
        </span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "action",
      render: (_, record) => ( 
        <Space size="small">
          <Button
            ghost
            type="primary"
            onClick={() => handleUpdate(record.key)}
            title="Editar"
            icon={<EditOutlined />}
            size="small"
          />
          <Button
            danger
            type="primary"
            onClick={() => handleDelete(record.key)}
            title="Eliminar"
            icon={<DeleteOutlined />}
            size="small"
          />
        </Space>
      ),
      width: 100,
    },
  ];
};