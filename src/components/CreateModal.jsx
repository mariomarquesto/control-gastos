import { DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import React from "react";
import PropTypes from "prop-types";

const CreateModal = ({
    modalVisible,
    setModalVisible,
    handleAdd,
    editingRecord,
    setEditingRecord,
    handleUpdateRecord,
}) => {
    const [form] = Form.useForm();
    
    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const record = {
                    ...values,
                    date: values.date.format('YYYY-MM-DD'),
                    amount: Number(values.amount),
                };

                if (editingRecord) {
                    handleUpdateRecord({ ...record, key: editingRecord.key }); 
                } else {
                    handleAdd(record);
                }
                
                handleCancel();
            })
            .catch((info) => {
                console.log('Error de validación:', info);
            });
    };

    const handleCancel = () => {
        setModalVisible(false);
        setEditingRecord(null); 
    };

    const initialValues = editingRecord 
        ? { ...editingRecord, date: dayjs(editingRecord.date) }
        : { date: dayjs(), concept: "", amount: 0 };


    return (
        <Modal
            open={modalVisible} 
            title={editingRecord ? "Editar Gasto" : "Agregar Gasto"}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true} 
            okText={editingRecord ? "Guardar Cambios" : "Agregar"}
            cancelText="Cancelar"
        >
            <Form 
                form={form} 
                layout="vertical"
                // La prop 'key' es la CLAVE: fuerza la reconstrucción y aplicación de initialValues.
                key={modalVisible ? 'edit' : 'add'} 
                initialValues={initialValues}
            >
                <Form.Item
                    label="Fecha"
                    name="date"
                    rules={[{ required: true, message: "La fecha es obligatoria." }]}
                >
                    <DatePicker 
                        style={{ width: "100%" }} 
                        format="DD/MM/YYYY" 
                        placeholder="Selecciona la fecha" 
                    />
                </Form.Item>
                
                <Form.Item
                    label="Concepto"
                    name="concept"
                    rules={[{ required: true, message: "El concepto es obligatorio." }]}
                >
                    <Input placeholder="Ej. Supermercado, Alquiler" />
                </Form.Item>
                
                <Form.Item
                    label="Monto"
                    name="amount"
                    rules={[
                        { required: true, message: "El monto es obligatorio." },
                        { 
                            pattern: /^[0-9]*\.?[0-9]+$/, 
                            message: "Solo se permiten números positivos." 
                        }
                    ]}
                >
                    <Input type="number" placeholder="Ej. 1500.50" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

CreateModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
    editingRecord: PropTypes.object,
    setEditingRecord: PropTypes.func.isRequired,
    handleUpdateRecord: PropTypes.func.isRequired,
};

export default CreateModal;