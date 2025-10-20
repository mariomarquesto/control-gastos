import React from "react";
import { message, Layout as AntLayout, Input, Row, Col } from "antd";
import HeaderApp from "./HeaderApp";
import FooterApp from "./FooterApp";
import TableApp from "./TableApp";
import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";
import {
    dataApp,
    generateColumns
} from "../utils/utils.jsx"; 

const { Content } = AntLayout; 

const ControlGastos = () => {
    // --- STATE VARIABLES ---
    const [keyToDelete, setKeyToDelete] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
    const [editingRecord, setEditingRecord] = React.useState(null); 
    const [data, setData] = React.useState(dataApp); 

    // --- CRUD HANDLERS ESTABILIZADOS con useCallback ---

    const handleDelete = React.useCallback((key) => {
        setKeyToDelete(key);
        setDeleteModalVisible(true);
    }, []); 

    const confirmDelete = React.useCallback(() => {
        setData(currentData => currentData.filter((item) => item.key !== keyToDelete));
        setDeleteModalVisible(false);
        setKeyToDelete(null);
        message.success("El registro se ha eliminado con éxito");
    }, [keyToDelete]); 

    const handleAdd = React.useCallback((record) => {
        const newKey = (Date.now() + Math.random()).toString();
        setData(currentData => [...currentData, { ...record, key: newKey }]);
        message.success("El registro se ha agregado con éxito");
    }, []); 

    // NOTA: 'data' es una dependencia obligatoria aquí.
    const handleUpdate = React.useCallback((key) => {
        setEditingRecord(data.find((item) => item.key === key));
        setModalVisible(true);
    }, [data]); 

    const handleUpdateRecord = React.useCallback((updatedFormValues) => {
        const recordKey = updatedFormValues.key; 

        setData(currentData => 
            currentData.map((item) => {
                if (item.key === recordKey) {
                    return { ...item, ...updatedFormValues };
                }
                return item;
            })
        );
        
        message.success("El registro se ha editado con éxito");
    }, []); 

    // --- FILTRADO Y COLUMNAS ESTABILIZADOS con useMemo ---
    
    const filteredData = React.useMemo(() => {
        if (!searchTerm) {
            return data;
        }
        
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return data.filter((item) =>
            Object.values(item).some((value) => {
                const stringValue = value ? value.toString().toLowerCase() : '';
                return stringValue.includes(lowerCaseSearchTerm);
            })
        );
    }, [data, searchTerm]);
    
    // El array de columnas debe ser estable.
    const columns = React.useMemo(() => 
        generateColumns(handleDelete, handleUpdate),
        [handleDelete, handleUpdate] // Depende de los handlers estables
    );

    // --- RENDER ---
    return (
        <AntLayout>
            <HeaderApp setModalVisible={setModalVisible} />
            <AntLayout>
                <Content>
                    <br />
                    <Row justify={"center"}>
                        <Col xs={20} md={16} lg={14} xl={12}>
                            <Input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br />

                    <TableApp
                        columns={columns} 
                        data={filteredData}
                    />
                    
                    <CreateModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleAdd={handleAdd}
                        editingRecord={editingRecord}
                        setEditingRecord={setEditingRecord}
                        handleUpdateRecord={handleUpdateRecord}
                    />
                    
                    <DeleteModal
                        deleteModalVisible={deleteModalVisible}
                        setDeleteModalVisible={setDeleteModalVisible}
                        confirmDelete={confirmDelete}
                    />
                </Content>
            </AntLayout>
            <FooterApp />
        </AntLayout>
    );
};

export default ControlGastos;