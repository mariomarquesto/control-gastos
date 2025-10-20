// src/components/TableApp.jsx
import React from 'react';
import { Table, Row, Col } from 'antd';
import PropTypes from 'prop-types';

/**
 * Renders the Ant Design Table component with responsive layout.
 */
const TableApp = ({ columns, data }) => {
    return (
        <Row justify="center" style={{ padding: '20px 0' }}>
            <Col xs={24} md={22} lg={20} xl={18}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="key" // Clave obligatoria para evitar warnings
                    pagination={{ pageSize: 10 }} 
                    scroll={{ x: 'max-content' }} // Para tablas que no caben en móviles
                />
            </Col>
        </Row>
    );
};

TableApp.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};

// Usar React.memo para evitar re-renderizados innecesarios.
export default React.memo(TableApp);